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

 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid', 36)->index();
            $table->string('image')->nullable()->index();
            $table->string('name')->index();
            $table->string('gender', 2)->index();
            $table->string('email')->unique()->index();
            $table->string('password')->index();
            $table->tinyInteger('verified')->default(0)->index();
            $table->string('verification_token', 36)->nullable()->index();
            $table->tinyInteger('status')->default(0)->index();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid', 36)->index();
            $table->string('name')->index();
            $table->text('description')->nullable();
            $table->tinyInteger('status')->default(0)->index();
            $table->softDeletes();
            $table->timestamps();
            $table->engine = 'InnoDB';
        });


        Schema::create('menus', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid', 36)->index();
            $table->string('image')->nullable()->index();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('name')->index();
            $table->decimal('price', 20, 4)->default(0)->index();
            $table->text('description')->nullable();
            $table->tinyInteger('status')->default(0)->index();
            $table->softDeletes();
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid', 36)->index();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('order_number')->index();
            $table->string('order_date')->index();
            $table->string('customer_name')->nullable()->index();
            $table->string('customer_phone')->nullable()->index();
            $table->integer('total_item')->default(0)->index();
            $table->decimal('subtotal', 20, 4)->default(0)->index();
            $table->decimal('discount', 10, 2)->default(0)->index();
            $table->decimal('tax', 10, 2)->default(0)->index();
            $table->decimal('grand_total', 20, 4)->default(0)->index();
            $table->decimal('cash', 20, 4)->default(0)->index();
            $table->decimal('change', 20, 4)->default(0)->index();
            $table->text('notes')->nullable();
            $table->tinyInteger('status')->default(0)->index();
            $table->softDeletes();
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

        Schema::create('carts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid', 36)->index();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('menu_id')->constrained('menus')->onDelete('cascade');
            $table->decimal('price', 20, 4)->default(0)->index();
            $table->integer('qty')->default(0)->index();
            $table->decimal('total', 20, 4)->default(0)->index();
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('menus');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');
    }
};
