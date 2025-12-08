<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Role extends Model
{
    // Traits
    use HasFactory, Notifiable, SoftDeletes;

    // Name of table
    protected $table = 'tbl_roles';

    // Primary key column
    protected $primaryKey = 'role_id';

    // Columns that can be modified or attributes that are mass assignable
    protected $fillable = [
        'role'
    ];

    // Relationships with other tables
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'role_id', 'role_id')->withTrashed();
    }
}
