<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Booking extends Model
{
    // Traits
    use HasFactory, Notifiable, SoftDeletes;

    // Name of table
    protected $table = 'tbl_bookings';

    // Primary key column
    protected $primaryKey = 'booking_id';

    // Columns that can be modified or attributes that are mass assignable
    protected $fillable = [
        'user_id',
        'room_id',
        'check_in_date',
        'check_out_date',
        'additional_information',
        'booking_status_id',
    ];

    // Relationships with other tables
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id')->withTrashed();
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_id', 'room_id')->withTrashed();
    }

    public function booking_status(): BelongsTo
    {
        return $this->belongsTo(BookingStatus::class, 'booking_status_id', 'booking_status_id')->withTrashed();
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'booking_id', 'booking_id')->withTrashed();
    }
}
