<?php

namespace App\Http\Controllers;

use App\Mail\VerifyMail;
use App\Models\BlacklistedToken;
use App\Models\User;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Login user và trả về token
     */
    public function signIn(Request $request): JsonResponse
    {
        $credentials = $request->only('username', 'password');

        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        try {
            $payload = [
                'sub' => $user->id,
                'username' => $user->username,
                'role' => $user->role,
                'exp' => time() + 60 * 60 * 24 * 365
            ];
            $token = JWT::encode($payload, env('jwt_secret'), 'HS512');
        } catch (Exception $ex) {
            return response()->json(['error' => 'Could not create token: ' . $ex->getMessage()], 500);
        }
        return response()->json([
            'token' => $token
        ]);
    }

    /**
     * Xoá token
     */
    public function signOut(Request $request): JsonResponse
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer')) {
            return response()->json(['eror' => 'Authorization header is missing'], 401);
        }

        $token = substr($authHeader, 7);

        try {
            $payload = (array)JWT::decode($token, new Key(env('JWT_SECRET'), 'HS512'));
            BlacklistedToken::created([
                'token' => $token,
                'expired_at' => date('Y-m-d H:i:s', $payload['exp'])
            ]);

            return response()->json(['message' => 'Sign out successful']);
        } catch (ExpiredException) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (Exception $e) {
            return response()->json(['error' => 'Invalid token: ' . $e->getMessage()], 401);
        }
    }

    /**
     * phần register
     */

    /**
     * @param Request $request
     * @return array
     * validate request từ người dùng
     */
    protected function validateRegisterRequest(Request $request): array
    {
        return $request->validate([
            'username' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);
    }

    /**
     * @param array $data
     * @return array
     * Tạo payload cho token
     */
    protected function createVerifyTokenPayload(array $data): array
    {
        return [
            'username' => $data['username'],
            'password' => Hash::make($data['password']),
            'role' => 'USER',
            'exp' => time() + 60 * 15
        ];
    }

    /**
     * @param array $payload
     * @return string
     * tạo token
     */
    protected function generateToken(array $payload): string
    {
        return JWT::encode($payload, env('JWT_SECRET'), 'HS512');
    }

    /**
     * @param string $email
     * @param string $token
     * @return void
     * gửi email
     */
    protected function sendVerificationEmail(string $email, string $token): void
    {
        //sử dụng lớp Mail của ill/facades, send lớp VerifyEmail tới $email (kèm token)
        Mail::to($email)->send(new VerifyMail($token));
    }

    /**
     * @param Request $request
     * @return JsonResponse đăng kí => validate theo request-> tạo payload theo request đã được validate -> tạo token theo payload -> gửi token tới email (username)
     * đăng kí => validate theo request-> tạo payload theo request đã được validate -> tạo token theo payload -> gửi token tới email (username)
     */
    public function register(Request $request): JsonResponse
    {
        $data = $this->validateRegisterRequest($request);
        $payload = $this->createVerifyTokenPayload($data);
        $token = $this->generateToken($payload);
        $this->sendVerificationEmail($data['username'], $token);
        return response()->json(['message' => 'Check your email to verify your account.']);
    }

    /**
     * Hàm nhận->giải token-> tạo user dựa vào payload
     */
    public function verifyEmailAndCreateUser(string $token): JsonResponse|Redirector|RedirectResponse
    {
        try {
            $payload = (array)JWT::decode($token, new Key(env('JWT_SECRET'), 'HS512'));

            if ($payload['exp'] < time()) {
                return response()->json(['error' => 'Token expired'], 400);
            }

            if (User::where('username', $payload['username'])->exists()) {
                return response()->json(['error' => 'User already exists'], 400);
            }

            User::create([
                'username' => $payload['username'],
                'password' => $payload['password'],
                'role' => 'USER'
            ]);

            // Redirect về frontend sau khi tạo user thành công
            return redirect(env('FRONTEND_URL'));
        } catch (\Firebase\JWT\ExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'Invalid token'], 500);
        }
    }

}
