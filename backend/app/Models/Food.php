<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Food extends Model
{
    protected $fillable = [
        'name',
        'restaurant',
        'price',
        'image',
        'description'
    ];
}
