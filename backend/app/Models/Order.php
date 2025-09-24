<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'status',
        'items',
        'total'
    ];

    protected $casts = [
        'items' => 'array',
        'total' => 'decimal:2'
    ];
}
