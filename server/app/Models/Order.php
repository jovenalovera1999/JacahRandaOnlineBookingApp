<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_orders';
    protected $primaryKey = 'order_id';
    protected $fillable = [
        'booking_id',
        'food_id',
        'quantity',
        'additional_information',
        'sub_total',
        'order_status_id'
    ];

    public function booking(): BelongsTo {
        return $this->belongsTo(Booking::class, 'booking_id', 'booking_id')->withTrashed();
    }

    public function food(): BelongsTo {
        return $this->belongsTo(Food::class, 'food_id', 'food_id')->withTrashed();
    }

    public function order_status(): BelongsTo {
        return $this->belongsTo(OrderStatus::class, 'order_status_id', 'order_status_id')->withTrashed();
    }
}
