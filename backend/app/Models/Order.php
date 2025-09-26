<?php

namespace App\Models;

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
        'payment_url'
    ];

    protected $casts = [
        'items' => 'array',
        'total' => 'decimal:2'
    ];
}
