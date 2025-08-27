<?php

namespace App\Http\Controllers;

use App\Models\BlackToken;
use App\Models\User;
use App\Services\AuthService;
use Exception;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected AuthService $authService;

    /**
     * Inject dependencies for authentication workflows.
     *
     * @param AuthService $authService Service handling auth logic and JWT.
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Authenticate user credentials and issue an HTTP-only JWT cookie.
     *
     * @param Request $request Incoming request containing username/password.
     * @return JsonResponse JSON message with cookie set on success.
     */
    public function signIn(Request $request): JsonResponse
    {
        $credentials = $this->authService->validateUsernamePassword($request);

        $user = $this->authService->checkUserSignIn($credentials);

        if (!$user) return response()->json(['message' => 'Invalid credentials']);

        $token = $this->authService->generateToken($user);

        return response()->json([
            'message' => 'Sign in successful',
        ])->cookie('access_token', $token, (int) env('JWT_EXPIRY_TIME') / 60, '/', null, false, true, false, 'Lax');
    }

    /**
     * Invalidate current JWT by blacklisting it and clearing the cookie.
     *
     * @param Request $request Request holding current access_token cookie.
     * @return JsonResponse Operation result message.
     */
    public function signOut(Request $request): JsonResponse
    {
        $token = $request->cookie('access_token');

        if (!$token) {
            return response()->json(['message' => 'No token found'], 400);
        }

        if (BlackToken::where('token', $token)->exists()) {
            return response()->json(['message' => 'Token already invalid'], 400);
        }

        $payload = $this->authService->decodeToken($token);

        $this->authService->blacklistToken($token, $payload);

        return response()->json(['message' => 'Sign out successful'])
            ->cookie('access_token', '', -1, '/', null, false, true, false, 'Lax');
    }

    /**
     * signUp -> sendMail -> verify mail by token (get from url get from <a> in mail)
     * ->get username, password from token -> create User
     */
    /**
     * Start sign-up flow by validating input and sending verification email.
     *
     * @param Request $request Contains username/password for provisional account.
     * @return JsonResponse Instruction message to verify email.
     */
    public function signUp(Request $request): JsonResponse
    {
        $credentials = $this->authService->validateUsernamePassword($request);

        if (User::where('username', $credentials['username'])->exists())
            return response()->json(['message' => 'User existed']);

        $user = new User([
            'username' => $credentials['username'],
            'password' => Hash::make($credentials['password']),
            'role' => 'user'
        ]);

        $token = $this->authService->generateToken($user);

        $this->authService->sendVerifyMail($credentials['username'], $token);

        return response()->json(['message' => 'Sign up successful, please check email to verify']);
    }

    /**
     * Complete email verification and create the user from token payload.
     *
     * @param string $token JWT token received via email link.
     * @return JsonResponse Created user or error message.
     */
    public function handleVerificationEmail(string $token): JsonResponse
    {
        try {
            $payload = $this->authService->decodeToken($token);

            $payload = $this->authService->handlePayload($payload);

            $user = User::create([
                'username' => $payload['username'],
                'password' => $payload['password'], //pass đã đợc hash sẵn trong token
                'role' => $payload['role'] ?? 'user', // fallback role
            ]);

            $this->authService->blacklistToken($token, $payload);

            return response()->json($user, 201);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }

    /**
     * forgetpass(email) -> send ForgetMail (token(username,password Hash)) -> reset password by token
     */
    /**
     * Initiate password reset by emailing a token with the new hashed password.
     *
     * @param Request $request Contains username and new password.
     * @return JsonResponse Message indicating email has been sent.
     */
    public function forgetPassword(Request $request): JsonResponse
    {
        $credentials = $this->authService->validateUsernamePassword($request);

        if (!User::where('username', $credentials['username'])->exists())
            return response()->json(['message' => 'Reset password successful, please check email to verify']);

        $user = User::where('username', $credentials['username'])->first();

        $user->password = Hash::make($credentials['password']); //Hash sẵn password trong token

        $token = $this->authService->generateToken($user);

        $this->authService->sendForgetPasswordMail($credentials['username'], $token);

        return response()->json(['message' => 'Reset password successful, please check email to verify']);
    }

    /**
     * Finalize password reset using the emailed token and blacklist it.
     *
     * @param string $token JWT token carrying username and hashed password.
     * @return JsonResponse Operation result message.
     */
    public function resetPassword(string $token): JsonResponse
    {
        $payload = $this->authService->decodeToken($token);

        if (BlackToken::where('token', $token)->exists())
            return response()->json(['error' => 'Token revoked'], 401);

        $this->authService->blacklistToken($token, $payload);

        $user = User::where('username', $payload['username'])->first();

        if (!$user)
            return response()->json(['message' => 'Something went wrong'], 403);

        $user->password = $payload['password']; //password trong token đã hash sẵn

        $user->update();

        return response()->json(['message' => 'Reset password for user ' . $user->username . ' successful'], 201);
    }
}

