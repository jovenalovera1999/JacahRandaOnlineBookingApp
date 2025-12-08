<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class Booking extends Model
{
    // Traits
    use HasFactory, Notifiable;

    // Name of table
    protected $table = 'tbl_bookings';

    // Primary key column
    protected $primaryKey = 'booking_id';

    // Columns that can be modified or attributes that are mass assignable
    protected $fillable = [
        'room_id',
        'date_from',
        'date_to',
        'additional_information'
    ];

    // Relationships with other tables
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_id', 'room_id')->withTrashed();
    }
}
