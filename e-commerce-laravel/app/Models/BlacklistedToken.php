<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlacklistedToken extends Model
{
protected $table = 'blacklisted_tokens';
public $timestamps = false;
protected $fillable = ['token', 'expired_at'];
}
