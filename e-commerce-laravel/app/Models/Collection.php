<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @method static paginate(mixed $limit)
 */
class Collection extends Model
{
    protected $table = 'feature_collections';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name', 'img_url', 'status'];

//    protected static function boot(): void
//    {
//        parent::boot();
//
//        static::creating(function ($model) {
//            if (empty($model->id)) {
//                $model->id = (string) Str::uuid();
//            }
//        });
//    }
}
