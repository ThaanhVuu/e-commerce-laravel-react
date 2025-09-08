<?php

return [
    // Secret key để ký JWT
    'secret' => env('JWT_SECRET', 'fallback_secret'),

    // Thời gian hết hạn token (giây)
    'expiry_time' => env('JWT_EXPIRY_TIME', 3600),
];
