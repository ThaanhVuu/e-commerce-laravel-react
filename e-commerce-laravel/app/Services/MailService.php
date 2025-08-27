<?php

namespace App\Services;

use App\Mail\VerifyMail;
use App\Mail\ForgetMail;
use Illuminate\Support\Facades\Mail;

class MailService
{
    /**
     * Send account verification email with token link.
     *
     * @param string $email Recipient email address.
     * @param string $token Verification token.
     */
    public function sendVerifyMail(string $email, string $token)
    {
        Mail::to($email)->send(new VerifyMail($token));
    }

    /**
     * Send forget-password email with token link.
     *
     * @param string $email Recipient email address.
     * @param string $token Reset token.
     */
    public function sendForgetMail(string $email, string $token)
    {
        Mail::to($email)->send(new ForgetMail($token));
    }
}
