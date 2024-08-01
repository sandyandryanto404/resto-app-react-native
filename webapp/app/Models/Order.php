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
use App\Models\User;
use App\Models\Cart;

class Order extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = "orders";

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'uuid',
        'user_id',
        'order_number',
        'order_date',
        'customer_name',
        'customer_phone',
        'total_item',
        'subtotal',
        'discount',
        'tax',
        'grand_total',
        'cash',
        'change',
        'notes',
        'status'
    ];

    public function Cart() {
        return $this->hasMany(Cart::class);
    }

    public function User() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
