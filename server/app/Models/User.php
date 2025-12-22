<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    // Traits
    use HasFactory, Notifiable, SoftDeletes;

    // Name of table
    protected $table = 'tbl_users';

    // Primary key column
    protected $primaryKey = 'user_id';

    // Columns that can be modified or attributes that are mass assignable.
    protected $fillable = [
        'google_id',
        'email',
        'username',
        'password',
        'role_id',
        'last_login_at'
    ];

    // The attributes that should be hidden for serialization.
    protected $hidden = [
        'password',
    ];

    // Get the attributes that should be cast.
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // Relationships with other tables
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id')->withTrashed();
    }

    // JWT Authentication
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
