<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @method static create(array $validated)
 */
class GalleryImage extends Model
{
    //
    protected $table = 'gallery_image'; // nếu table là Banner_Image thì nên để snake_case

    protected $fillable = [
        'name',
        'img_url',
        'status',
    ];

    public $incrementing = false; // vì id là UUID
    protected $keyType = 'string';

    // Tự generate UUID khi tạo mới
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
