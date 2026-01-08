<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Food extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_foods';
    protected $primaryKey = 'food_id';
    protected $fillable = [
        'food_image',
        'food_name',
        'description',
        'price',
        'food_category_id',
        'food_status_id'
    ];

    public function food_category(): BelongsTo {
        return $this->belongsTo(FoodCategory::class, 'food_category_id', 'food_category_id')->withTrashed();
    }

    public function food_status(): BelongsTo {
        return $this->belongsTo(FoodStatus::class, 'food_status_id', 'food_status_id')->withTrashed();
    }
}
