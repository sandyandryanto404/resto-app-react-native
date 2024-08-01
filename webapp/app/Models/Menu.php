<?php

/**
 * This file is part of the Sandy Andryanto Company Profile Website.
 *
 * @author     Sandy Andryanto <sandy.andryanto404@gmail.com>
 * @copyright  2024
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Category;
use App\Models\Cart;

class Menu extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = "menus";

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'uuid',
        'image',
        'category_id',
        'name',
        'price',
        'description',
        'status'
    ];

    public function Cart() {
        return $this->hasMany(Cart::class);
    }

    public function Category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

}
