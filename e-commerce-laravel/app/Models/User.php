<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * App\Models\User
 *
 * @method static Builder|User create(array $attributes = [])
 * @method static find(string $id)
 * @method static where(string $string, mixed $username)
 */
class User extends Authenticatable implements JWTSubject
{
    //
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
      'username', 'password', 'role'
    ];

    protected $hidden = [
        'password'
    ];

    public function getJWTIdentifier()
    {
        // TODO: Implement getJWTIdentifier() method.
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        // TODO: Implement getJWTCustomClaims() method.
        return [
            'username' => $this->username,
            'role' => $this->role
        ];
    }
}
