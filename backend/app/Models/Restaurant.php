<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'cuisine',
        'rating',
        'delivery_time',
        'delivery_fee',
        'image',
        'description'
    ];
}
