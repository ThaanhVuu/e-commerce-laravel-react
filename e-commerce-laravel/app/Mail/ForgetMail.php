<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ForgetMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * JWT token used to reset the password.
     */
    protected string $token;
    /**
     * Create a new message instance.
     */
    public function __construct(string $token)
    {
        //
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
            subject: 'Forget Mail',
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
            view: 'emails.ResetPasswordEmail',
            with: [
                'url' => 'http://localhost:8000/api/v1.0/resetpassword/' . $this->token
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
