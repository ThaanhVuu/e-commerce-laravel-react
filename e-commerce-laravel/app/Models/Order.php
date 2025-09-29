<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'orders';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'profile_id' => 'string',
        'user_id' => 'string'
    ];
    protected $fillable = [
        'user_id',
        'total_price',
        'status',
        'profile_id',
        'shipping_address',
        'payment_method'
    ];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    public function orderDetails(): Order|HasMany
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }
}
