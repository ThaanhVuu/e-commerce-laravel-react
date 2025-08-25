<?php

namespace App\Services;

use App\Mail\VerifyMail;
use App\Mail\ForgetMail;
use Illuminate\Support\Facades\Mail;

class MailService
{
    public function sendVerifyMail(string $email, string $token)
    {
        Mail::to($email)->send(new VerifyMail($token));
    }

    public function sendForgetMail(string $email, string $token)
    {
        Mail::to($email)->send(new ForgetMail($token));
    }
}
