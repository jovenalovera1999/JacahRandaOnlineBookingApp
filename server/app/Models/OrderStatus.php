<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class OrderStatus extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_order_statuses';
    protected $primaryKey = 'order_status_id';
    protected $fillable = [
        'order_status'
    ];

    public function orders(): HasMany {
        return $this->hasMany(Order::class, 'order_status_id', 'order_status_id')->withTrashed();
    }
}
