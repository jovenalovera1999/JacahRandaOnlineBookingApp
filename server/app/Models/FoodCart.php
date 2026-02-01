<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FoodCart extends Model
{
    protected $table = 'tbl_food_carts';
    protected $primaryKey = 'food_cart_id';
    protected $fillable = [
        'order_id',
        'food_id',
        'quantity',
        'subtotal'
    ];

    // Relationships with other tables
    public function order(): BelongsTo {
        return $this->belongsTo(Order::class, 'order_id', 'order_id')->withTrashed();
    }

    public function food(): BelongsTo {
        return $this->belongsTo(Food::class, 'food_id', 'food_id')->withTrashed();
    }
}
