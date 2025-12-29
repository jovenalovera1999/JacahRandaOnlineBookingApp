<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Notification extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    // Table name
    protected $table = 'tbl_notifications';

    // Primary key column
    protected $primaryKey = 'notification_id';

    // Columns or attributes that can be modified
    protected $fillable = [
        'booking_id',
        'description',
        'is_seen',
    ];

    // Relationships with other tables
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class, 'booking_id', 'booking_id')->withTrashed();
    }
}
