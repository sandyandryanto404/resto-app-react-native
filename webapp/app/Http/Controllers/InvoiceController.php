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
use App\Models\Order;
use App\Models\Cart;
use App\Models\User;

class InvoiceController extends ApiController
{
    public function show($token)
    {
        $order = Order::where("uuid", $token)->first();

        if(null === $order)
        {
            abort(404);
        }

        $carts = Cart::where("carts.order_id", $order->id)
            ->select(["carts.*", "menus.name as menu_name", "menus.image as menu_image"])
            ->join("menus", "menus.id", "carts.menu_id")
            ->orderBy("carts.id")
            ->get();

        $user = User::where("id", $order->user_id)->first();

        $total_disc_ = $order->discount / 100;
        $total_tax_ = $order->tax / 100;

        $total_disc = $total_disc_ * $order->subtotal;
        $total_tax = $total_tax_ * $order->subtotal;

        $data = [
            "order"=> $order, 
            "carts"=> $carts, 
            "user"=> $user,
            "total_disc"=> $total_disc,
            "total_tax"=> $total_tax
        ];

        return view("invoice")->with($data);
    }
}