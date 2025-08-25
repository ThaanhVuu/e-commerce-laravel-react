<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, array|string $token)
 * @method static create(array $array)
 */
class BlackToken extends Model
{
    //
    protected $fillable = ['token', 'expired_at'];
}
