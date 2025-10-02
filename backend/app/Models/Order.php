<?php

namespace App\Models;

use App\Enums\OrderStatus;
use MongoDB\Laravel\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'status',
        'items',
        'total',
        'user_email',
        'amount',
        'currency',
        'tx_ref',
        'payment_url',
        'delivery_person_id',
        'delivery_address'
    ];

    protected $casts = [
        'items' => 'array',
        'total' => 'decimal:2',
        'status' => OrderStatus::class
    ];

    public function deliveryPerson()
    {
        return $this->belongsTo(User::class, 'delivery_person_id');
    }
}
