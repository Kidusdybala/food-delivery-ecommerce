<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'tx_ref',
        'amount',
        'currency',
        'status',
        'user_email',
        'payment_url'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];
}
