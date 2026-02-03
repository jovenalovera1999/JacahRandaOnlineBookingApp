<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_orders';
    protected $primaryKey = 'order_id';
    protected $fillable = [
        'booking_id',
        'order_status_id',
        'additional_information'
    ];

    public function food_carts(): HasMany {
        return $this->hasMany(FoodCart::class, 'order_id', 'order_id');
    }

    public function booking(): BelongsTo {
        return $this->belongsTo(Booking::class, 'booking_id', 'booking_id')->withTrashed();
    }

    public function order_status(): BelongsTo {
        return $this->belongsTo(OrderStatus::class, 'order_status_id', 'order_status_id')->withTrashed();
    }
}
