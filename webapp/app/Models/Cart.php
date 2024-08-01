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
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Order;
use App\Models\Menu;

class Cart extends Model
{
    use HasFactory;

    protected $table = "carts";

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'uuid',
        'order_id',
        'menu_id',
        'price',
        'qty',
        'total'
    ];

    public function Order() {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function Menu() {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

}
