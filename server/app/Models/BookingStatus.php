<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class BookingStatus extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    // Name of table
    protected $table = 'tbl_booking_statuses';

    // Primary key column
    protected $primaryKey = 'booking_status_id';

    // Columns that can be modified or attributes that are mass assignable
    protected $fillable = [
        'booking_status',
    ];

    // Relationships with other tables
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'booking_status_id', 'booking_status_id')->withTrashed();
    }
}
