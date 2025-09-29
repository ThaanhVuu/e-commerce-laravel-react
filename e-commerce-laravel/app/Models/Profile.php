<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ramsey\Uuid\UuidInterface;

/**
 * @method static paginate(int $limit)
 * @method static create(array|UuidInterface[] $array_merge)
 * @method static find(string $id)
 */
class Profile extends Model
{
    protected $table = 'profiles';
    public $incrementing = false; // vì dùng UUID
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'full_name',
        'phone',
        'address',
        'gender',
        'dob',
    ];

    /**
     * Quan hệ: Profile thuộc về một User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
