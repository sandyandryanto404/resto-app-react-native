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


namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Order;
use App\Models\User;

class DatabaseSeeder extends Seeder
{

    private string $defaultPassword = "P@ssw0rd!123";

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->CreateUser();
        $this->CreateCategory();
        $this->CreateMenu();
        $this->CreateOrder();
    }

    private function CreateUser()
    {
        $total = User::where("id", "<>", 0)->count();

        if($total == 0)
        {
            for($i = 1; $i <= 10; $i++)
            {
                $faker = Faker::create();
                $email = $i == 1 ? "admin@administrator.com" : $faker->safeEmail;
                $gender = (int) rand(1, 2);
                $first_name = $gender == 1 ? $faker->firstNameMale : $faker->firstNameFemale;
                User::create([
                    'uuid'=> $faker->uuid,
                    'name'=> $first_name." ".$faker->lastName,
                    "gender"=> $gender == 1 ? 'M' : 'F',
                    'email'=> $email,
                    'password' => Hash::make($this->defaultPassword),
                    'verified'=> 1,
                    'status'=> 1,
                    'remember_token'=> $faker->uuid
                ]);
            }
        }

    }

    private function CreateCategory()
    {
        $total = Category::where("id", "<>", 0)->count();

        if($total == 0)
        {
            $categories = ["Beverage", "Main Course", "Snack"];
            foreach($categories as $category)
            {
                $faker = Faker::create();
                Category::create([
                    'uuid'=> $faker->uuid,
                    'name'=> $category,
                    'description'=> $faker->text,
                    'status'=> 1
                ]);
            }
        }
    }

    private function CreateMenu()
    {
        $total = Menu::where("id", "<>", 0)->count();

        if($total == 0)
        {
            $beverages = ["Cappuccino", "Expresso", "Milk", "Orange Juice"];
            $courses = ["Burger",  "Fried Chicken", "Sandwitch"];
            $snacks = ["Donut", "French Fries", "Pancake"];

            foreach($beverages as $beverage)
            {
                $category = Category::where("name", "Beverage")->first();
                $faker = Faker::create();
                Menu::create([
                    'image'=> "menu-".$this->slugify($beverage).".jpg",
                    'uuid'=> $faker->uuid,
                    'category_id'=> $category->id,
                    'name'=> $beverage,
                    'price'=> rand(1, 100),
                    'description'=> $faker->text,
                    'status'=> 1
                ]);
            }

            foreach($courses as $course)
            {
                $category = Category::where("name", "Main Course")->first();
                $faker = Faker::create();
                Menu::create([
                    'image'=> "menu-".$this->slugify($course).".jpg",
                    'uuid'=> $faker->uuid,
                    'category_id'=> $category->id,
                    'name'=> $course,
                    'price'=> rand(1, 100),
                    'description'=> $faker->text,
                    'status'=> 1
                ]);
            }

            foreach($snacks as $snack)
            {
                $category = Category::where("name", "Snack")->first();
                $faker = Faker::create();
                Menu::create([
                    'image'=> "uploads/menu-".$this->slugify($snack).".jpg",
                    'uuid'=> $faker->uuid,
                    'category_id'=> $category->id,
                    'name'=> $snack,
                    'price'=> rand(1, 100),
                    'description'=> $faker->text,
                    'status'=> 1
                ]);
            }

        }
    }

    private function CreateOrder()
    {
        $total = Order::where("id", "<>", 0)->count();

        if($total == 0)
        {
            for($i = 1; $i <= 20; $i++)
            {
                $user = User::inRandomOrder()->first();
                $faker = Faker::create();
                $index = strlen($i) == 1 ? "000".$i : "00".$i;
                Order::create([
                    'uuid'=> $faker->uuid,
                    'user_id'=> $user->id,
                    'order_number'=> date('Ymd')."000".$index,
                    'order_date'=> date('Y-m-d'),
                    'customer_name'=> $faker->name,
                    'customer_phone'=> $faker->phoneNumber,
                    'notes'=> $faker->text,
                    'status'=> 1
                ]);
            }

            $orders = Order::where("status", 1)->get();

            foreach($orders as $order)
            {
                $disc = rand(1, 10);
                $tax = rand(1, 5);
                $total_item = 0;
                $subtotal = 0;

                for($j  = 1; $j <= 3; $j++)
                {
                    $faker = Faker::create();
                    $menu = Menu::inRandomOrder()->first();
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
                $cash = $grand_total + ($grand_total * 0.2);
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


            }

        }
    }

    private function slugify($text, string $divider = '-')
    {
        $text = preg_replace('~[^\pL\d]+~u', $divider, $text);
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = trim($text, $divider);
        $text = preg_replace('~-+~', $divider, $text);
        $text = strtolower($text);
        return empty($text) ? 'n-a' : $text;
    }

}
