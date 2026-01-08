<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class FoodCategory extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_food_categories';
    protected $primaryKey = 'food_category_id';
    protected $fillable = [
        'food_category'
    ];

    public function foods(): HasMany {
        return $this->hasMany(Food::class, 'food_category_id', 'food_category_id')->withTrashed();
    }
}
