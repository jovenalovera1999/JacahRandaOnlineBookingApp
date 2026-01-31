<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    // Traits
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;

    // Name of table
    protected $table = 'tbl_users';

    // Primary key column
    protected $primaryKey = 'user_id';

    // Columns that can be modified or attributes that are mass assignable.
    protected $fillable = [
        'google_id',
        'name',
        'address',
        'contact_number',
        'email',
        'username',
        'password',
        'role_id',
        'last_login_at',
        'remember_token',
    ];

    // The attributes that should be hidden for serialization.
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Appends attributes
    protected $appends = ['has_occupied_room'];

    // Get the attributes that should be cast.
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'has_occupied_room' => 'boolean'
        ];
    }

    // Relationships with other tables
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id')->withTrashed();
    }

    public function bookings(): HasMany {
        return $this->hasMany(Booking::class, 'user_id', 'user_id');
    }

    // Function to verify if the user has occupied room
    protected function hasOccupiedRoom(): Attribute {
        return Attribute::make(
            get: fn () =>
                $this->bookings()
                    ->whereHas('room.room_status', fn ($q) =>
                        $q->where('room_status', 'Occupied')
                    )
                    ->orWhereHas('booking_status', fn ($q) =>
                        $q->where('booking_status', 'Checked In')
                    )
                    ->exists()
        );
    }
}
