<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class RoomStatus extends Model
{
    // Traits
    use HasFactory, Notifiable, SoftDeletes;

    // Name of table
    protected $table = 'tbl_room_statuses';

    // Primary key column
    protected $primaryKey = 'room_status_id';

    // Columns that can be modified or attributes that are mass assignable
    protected $fillable = [
        'room_status'
    ];

    // Relationships with other tables
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class, 'room_status_id', 'room_status_id')->withTrashed();
    }
}
