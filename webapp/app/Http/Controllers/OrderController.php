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

use App\Http\Controllers\ApiController;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Faker\Factory as Faker;

class OrderController extends ApiController
{
    private float $discount = 0.05;
    private float $tax = 0.11;

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function list(Request $request)
    {
        $sort_by = $request->sort_by ? $request->sort_by : "orders.id";
        $sort_dir = $request->sort_dir ? $request->sort_dir : "desc";
        $page = $request->page ? $request->page : 1;
        $limit = $request->limit ? $request->limit : 10;

        $models = Order::where('orders.id', "<>", 0)
            ->select(["orders.*", "users.name as user_name", "users.email as user_email"])
            ->join("users", "users.id", "orders.user_id")
            ->limit($limit)->offset(($page - 1) * $limit);

        if($request->search){
            $models = $models->where(function($query) use ($request){
                return $query
                    ->where('orders.order_number', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('orders.order_date', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('orders.customer_name', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('orders.customer_phone', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('users.name', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('users.email', 'LIKE', '%'.$request->search.'%');
            });
        }

        $models = $models->get();
        return $this->successResponse("Your data has been fetched!", $models);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'customer_name' => 'required|string',
            'status' => 'required|integer|min:0|digits_between: 0,1'
        ]);

        if(!$request->cart){
            return $this->errorResponse("Your cart cannot be empty !!", null, 422);
        }

        if(!is_array($request->cart)){
            return $this->errorResponse("Your cart must 1 items or more !!", null, 422);
        }

        if(empty($request->cart)){
            return $this->errorResponse("Your cart must 1 items or more !!", null, 422);
        }

        $lastOrder = Order::where('orders.id', "<>", 0)->where("order_date", date("Y-m-d"))->orderBy("order_number", "DESC")->first();
        $orderNumber = date('Ymd')."0001";

        if(null !== $lastOrder)
        {
            $lastIndex = strlen($orderNumber);
            $lastNumberIndex = substr($lastOrder->order_number, $lastIndex);
            $number = (int) $lastNumberIndex;
            $number+= 1;
            $index = strlen($number) == 1 ? "000".$number : "00".$number;
            $orderNumber = date('Ymd')."000".$index;
        }
        
        $carts = $request->cart;
        $invalid_menu = [];

        foreach($carts as $cart)
        {
            $check_menu = Menu::where("id", $cart["menu_id"])->first();
            if(null === $check_menu){
                $invalid_menu[] = $cart["menu_id"];
            }
        }

        if(count($invalid_menu) > 0){
            return $this->errorResponse("Menu with id not exists !!", $invalid_menu, 422);
        }

        $faker = Faker::create();
        $order_uuid = $faker->uuid;
        $user = Auth::User();

        $order =  Order::create([
            'uuid'=> $order_uuid,
            'user_id'=> $user->id,
            'order_number'=> $orderNumber,
            'order_date'=> date('Y-m-d'),
            'customer_name'=> $request->customer_name,
            'customer_phone'=> $request->customer_phone,
            'notes'=> $request->notes,
            'status'=> $request->status
        ]);

        $disc = $this->discount;
        $tax = $this->tax;
        $total_item = 0;
        $subtotal = 0;

        foreach($carts as $cart)
        {
            $menu = Menu::where("id", $cart["menu_id"])->first();
            $price = $menu->price;
            $qty = rand(1, 5);
            $total = $price * $qty;

            Cart::create([
                'uuid'=> $faker->uuid,
                'order_id'=> $order->id,
                'menu_id'=> $menu->id,
                'price'=> $price,
                'qty'=> $qty,
                'total'=> $total
            ]);

            $total_item += $qty;
            $subtotal += $total;
        }

        
        $total_discount = $subtotal * ($disc / 100);
        $total_tax = $subtotal * ($tax / 100);
        $grand_total = ($subtotal + $total_tax) - $total_discount;
        $cash = $request->cash ? $request->cash : $grand_total;
        $change = $cash - $grand_total;

        Order::where("id", $order->id)->update([
            'total_item'=> $total_item,
            'subtotal'=> $subtotal,
            'discount'=> $disc,
            'tax'=> $tax,
            'grand_total'=> $grand_total,
            'cash'=> $cash,
            'change'=> $change
        ]);
        
        $carts = Cart::where("carts.order_id", $order->id)
            ->select(["carts.*", "menus.name as menu_name", "menus.image as menu_image"])
            ->join("menus", "menus.id", "carts.menu_id")
            ->orderBy("carts.id")
            ->get();

        $data = ["order"=> $order, "chart"=> $carts];

        return $this->successResponse("Your data has been created!", $data);
            
    }   
    

    public function edit($id, Request $request)
    {
        $this->validate($request, [
            'customer_name' => 'required|string',
            'status' => 'required|integer|min:0|digits_between: 0,1'
        ]);

        $order = Order::where("id", $id)->first();

        if(null === $order)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        if($order->status == 1)
        {
            return $this->errorResponse("Your order has been check out !!", null, 422);
        }

        if(!$request->cart){
            return $this->errorResponse("Your cart cannot be empty !!", null, 422);
        }

        if(!is_array($request->cart)){
            return $this->errorResponse("Your cart must 1 items or more !!", null, 422);
        }

        if(empty($request->cart)){
            return $this->errorResponse("Your cart must 1 items or more !!", null, 422);
        }
        
        $carts = $request->cart;
        $invalid_menu = [];

        foreach($carts as $cart)
        {
            $check_menu = Menu::where("id", $cart["menu_id"])->first();
            if(null === $check_menu){
                $invalid_menu[] = $cart["menu_id"];
            }
        }

        if(count($invalid_menu) > 0){
            return $this->errorResponse("Menu with id not exists !!", $invalid_menu, 422);
        }

        $disc = $this->discount;
        $tax = $this->tax;
        $total_item = 0;
        $subtotal = 0;

        Cart::where("order_id", $id)->delete();
        
        foreach($carts as $cart)
        {
            $faker = Faker::create();
            $menu = Menu::where("id", $cart["menu_id"])->first();
            $price = $menu->price;
            $qty = rand(1, 5);
            $total = $price * $qty;

            Cart::create([
                'uuid'=> $faker->uuid,
                'order_id'=> $order->id,
                'menu_id'=> $menu->id,
                'price'=> $price,
                'qty'=> $qty,
                'total'=> $total
            ]);

            $total_item += $qty;
            $subtotal += $total;
        }

        
        $total_discount = $subtotal * ($disc / 100);
        $total_tax = $subtotal * ($tax / 100);
        $grand_total = ($subtotal + $total_tax) - $total_discount;
        $cash = $request->cash ? $request->cash : $grand_total;
        $change = $cash - $grand_total;

        Order::where("id", $id)->update([
            'total_item'=> $total_item,
            'subtotal'=> $subtotal,
            'discount'=> $disc,
            'tax'=> $tax,
            'grand_total'=> $grand_total,
            'cash'=> $cash,
            'change'=> $change,
            'customer_name'=> $request->customer_name,
            'customer_phone'=> $request->customer_phone,
            'notes'=> $request->notes,
            'status'=> $request->status
        ]);
        
        $carts = Cart::where("carts.order_id", $order->id)
            ->select(["carts.*", "menus.name as menu_name", "menus.image as menu_image"])
            ->join("menus", "menus.id", "carts.menu_id")
            ->orderBy("carts.id")
            ->get();

        $data = ["order"=> $order, "chart"=> $carts];

        return $this->successResponse("Your data has been updated!", $data);
    }

    public function show($id)
    {
        $model = Order::where("id", $id)->first();

        if(null === $model)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        $cart = Cart::where("carts.order_id", $id)
            ->select(["carts.*", "menus.name as menu_name", "menus.image as menu_image"])
            ->join("menus", "menus.id", "carts.menu_id")
            ->orderBy("carts.id")
            ->get();

        $data = ["order"=> $model, "chart"=> $cart];

        return $this->successResponse("Your data has been fetched!",  $data);
    }

    public function delete($id)
    {
        $model = Order::where("id", $id)->first();

        if(null === $model)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        if($model->status == 1)
        {
            return $this->errorResponse("Your order has been check out !!", null, 422);
        }

        Cart::where("order_id", $id)->delete();
        Order::where("id", $id)->delete();

        return $this->successResponse("Your data has been deleted!");
    }

}