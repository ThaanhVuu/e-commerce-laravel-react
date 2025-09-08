<?php

namespace App\Services;

use App\Models\User;
use App\Models\BlackToken;
use Carbon\Carbon;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Hash;
use Illuminate\Http\Request;

class AuthService
{
    /**
     * Service that handles email sending for verification and password reset.
     */
    protected MailService $mailService;

    /**
     * Inject MailService dependency.
     *
     * @param MailService $mailService Service for sending mails.
     */
    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    /**
     * Validate credentials against stored user and return the user or null.
     *
     * @param array{username:string,password:string} $credentials Username and password.
     * @return User|null Authenticated user or null if invalid.
     */
    public function checkUserSignIn(array $credentials) : ? User
    {
        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return null;
        }

        return $user;
    }

    /**
     * Generate an HS256 JWT for a given user.
     *
     * @param User $user Subject user.
     * @return string Encoded JWT string.
     */
    public function generateToken(User $user): string
    {
        $payload = [
            'sub' => $user->id,
            'username' => $user->username,
            'password' => $user->password,
            'role' => $user->role,
            'iat' => time(),
            'exp' => time() + (int) config('jwt.expiry_time')
        ];

        return JWT::encode($payload, config('jwt.secret'), 'HS256');
    }

    /**
     * Decode a JWT string into an associative array payload.
     *
     * @param string $token Encoded JWT token.
     * @return array Decoded payload.
     */
    public function decodeToken(string $token): array
    {
        return (array)JWT::decode($token, new Key(config('jwt.secret'), 'HS256')); //payload
    }

    /**
     * Store token into Blacklist
     *
     * @param string $token
     * @param array $payload
     * @return BlackToken
     */
    public function blacklistToken(string $token, array $payload): BlackToken
    {
        return BlackToken::create([
            'token' => $token,
            'expired_at' => Carbon::createFromTimestamp($payload['exp']),
        ]);
    }

    /**
     * Validate username/password/role fields from request.
     *
     * @param Request $request Incoming request.
     * @return array Validated data.
     */
    public function validateUsernamePassword(Request $request): array
    {
        return $request->validate([
            'username' => 'sometimes|required|string|max:30',
            'password' => 'required|string|max:30',
            'role' => 'in:USER,ADMIN,MANAGER,SALER'
        ]);
    }

    /**
     * Send verification email containing a token.
     *
     * @param string $email Receiver's email address.
     * @param string $token Verification token.
     */
    public function sendVerifyMail(string $email, string $token): void
    {
        $this->mailService->sendVerifyMail($email, $token);
    }

    /**
     * @throws Exception
     */
    /**
     * Validate token payload for sign-up: uniqueness and expiry.
     *
     * @param array $payload JWT payload.
     * @return array Same payload if valid.
     * @throws Exception If user exists or token expired.
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

    /**
     * Send forget-password email containing reset token.
     *
     * @param string $email Receiver's email address.
     * @param string $token Reset token.
     */
    public function sendForgetPasswordMail(string $email, string $token): void
    {
        $this->mailService->sendForgetMail($email, $token);
    }

}
