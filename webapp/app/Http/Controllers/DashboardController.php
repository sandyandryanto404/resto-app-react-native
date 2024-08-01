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

 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Cart;

class DashboardController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $total_order    = Order::where("id", "<>", 0)->count();
        $total_income   = Order::where("status",  1)->sum("grand_total");
        $total_menu     = Menu::where("id", "<>", 0)->count();
        $total_pending  = Order::where("status",  0)->count();

        $data = [
            "total_order"=> $total_order,
            "total_income"=> (float) $total_income,
            "total_menu"=> $total_order,
            "total_pending"=> $total_pending
        ];

        return $this->successResponse("Your data has been fetched!", $data);
    }
}