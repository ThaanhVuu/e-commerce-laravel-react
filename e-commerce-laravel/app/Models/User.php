<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Model
{
    use HasFactory, Notifiable;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'username', 'password', 'role'];
    protected $hidden = ['password'];

//    protected static function boot(): void
//    {
//        parent::boot();
//        static::creating(function ($model) {
//            if (empty($model->id)) {
//                $model->id = (string) Str::uuid();
//            }
//        });
//    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }
}
