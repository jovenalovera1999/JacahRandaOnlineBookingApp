<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class RoomType extends Model
{
    // Traits
    use HasFactory, Notifiable;

    // Name of table
    protected $table = 'tbl_room_types';

    // Primary key column
    protected $primaryKey = 'room_type_id';

    // Columns that can be modified or attributes that are mass assignable
    protected $fillable = [
        'room_image',
        'room_type',
        'price'
    ];

    // Relationships with other tables
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class, 'room_type_id', 'room_type_id')->withTrashed();
    }
}
