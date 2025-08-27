<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * JWT token used to verify the account.
     */
    public string $token;

    /**
     * Create a new message instance.
     */
    public function __construct($token)
    {
        //Nhận token qua hàm sendMail ở AuthController
        $this->token = $token;
    }

    /**
     * Get the message envelope (subject, etc.).
     *
     * @return Envelope
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Verify Your Account From e-Commerce',
        );
    }

    /**
     * Get the message content definition and view data.
     *
     * @return Content
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.EmailVerification',
            with: [
                //link xác nhận token (gửi token đến server)
                'url' => 'http://localhost:8000/api/v1.0/verify/' . $this->token
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
