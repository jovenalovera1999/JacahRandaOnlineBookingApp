<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Room extends Model
{
    // Traits
    use HasFactory, Notifiable, SoftDeletes;

    // Name of table
    protected $table = 'tbl_rooms';

    // Primary key column
    protected $primaryKey = 'room_id';

    // Columns that can be modified or attributes that are mass assignable
    protected $fillable = [
        'room_image',
        'room_no',
        'room_type_id',
        'capacity',
        'description',
        'price',
        'room_status_id'
    ];

    // Relationship with other tables
    public function room_type(): BelongsTo
    {
        return $this->belongsTo(RoomType::class, 'room_type_id', 'room_type_id')->withTrashed();
    }

    public function room_status(): BelongsTo
    {
        return $this->belongsTo(RoomStatus::class, 'room_status_id', 'room_status_id')->withTrashed();
    }
}
