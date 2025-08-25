<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Hash;
use Illuminate\Http\Request;

class AuthService
{

    protected MailService $mailService;

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    public function checkUserSignIn(array $credentials) : ? User
    {
        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return null;
        }

        return $user;
    }

    public function generateToken(User $user): string
    {
        $payload = [
            'sub' => $user->id,
            'username' => $user->username,
            'password' => $user->password,
            'role' => $user->role,
            'iat' => time(),
            'exp' => time() + 60 * 60 * 24
        ];

        return JWT::encode($payload, env('JWT_SECRET'), 'HS256');
    }

    public function decodeToken(string $token): array
    {
        return (array)JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256')); //payload
    }

    public function validateUsernamePassword(Request $request)
    {
        return $request->validate([
            'username' => 'sometimes|required|string|max:30',
            'password' => 'required|string|max:30',
            'role' => 'in:USER,ADMIN,MANAGER,SALER'
        ]);
    }

    public function sendVerifyMail(string $email, string $token): void
    {
        $this->mailService->sendVerifyMail($email, $token);
    }

    /**
     * @throws Exception
     */
    public function handlePayload(array $payload): array
    {
        if (User::where('username', $payload['username'])->exists()) {
            throw new Exception("User existed");
        }

        if ($payload['exp'] < time()) {
            throw new Exception("Email expired");
        }

        return $payload;
    }

    public function sendForgetPasswordMail(string $email, string $token): void
    {
        $this->mailService->sendForgetMail($email, $token);
    }

}
