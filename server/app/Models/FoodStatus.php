<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class FoodStatus extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_food_statuses';
    protected $primaryKey = 'food_status_id';
    protected $fillable = [
        'food_status'
    ];

    public function foods(): HasMany {
        return $this->hasMany(Food::class, 'food_status_id', 'food_status_id')->withTrashed();
    }
}
