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
use Illuminate\Http\Request;
use Faker\Factory as Faker;

class MenuController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function list(Request $request)
    {
        $sort_by = $request->sort_by ? $request->sort_by : "menus.id";
        $sort_dir = $request->sort_dir ? $request->sort_dir : "menus.desc";
        $page = $request->page ? $request->page : 1;
        $limit = $request->limit ? $request->limit : 10;
        $models = Menu::where('menus.id', "<>", 0)
            ->select(["menus.*", "categories.name as category_name"])
            ->join("categories", "categories.id", "menus.category_id")
            ->limit($limit)
            ->offset(($page - 1) * $limit);

        if($request->search){
            $models = $models->where(function($query) use ($request){
                return $query
                    ->where('menus.name', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('categories.name', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('menus.description', 'LIKE', '%'.$request->search.'%');
            });
        }

        $models = $models->get();
        return $this->successResponse("Your data has been fetched!", $models);
    }

    public function show($id)
    {
        $model = Menu::where('menus.id', $id)->select(["menus.*", "categories.name as category_name"])->join("categories", "categories.id", "menus.category_id")->first();

        if(null === $model)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        return $this->successResponse("Your data has been fetched!", $model);
    }

    public function create(Request $request)
    {
        $id = 0;

        $this->validate($request, [
            'name' => 'required|string|max:255|unique:menus,name,' . $id,
            'category_id' => 'required|integer|min:1',
            'price' => 'required|integer|min:1',
            'status' => 'required|integer|min:0|digits_between: 0,1',
        ]);

        $category_id = $request->category_id;
        $category = Category::where("id", $category_id)->first();

        if(null == $category)
        {
            return $this->errorResponse("Category with id ".$category_id." was not found in our system. ", null, 422);
        }


        $faker = Faker::create();
        $uuid = $faker->uuid();
        $fileName = $faker->uuid();
        $filePath = null;

        if($request->file('file'))
        {
           $upload = $request->file('file')->move(storage_path('uploads'), $fileName);

           if($upload)
           {
                $filePath = "uploads/".$fileName.".jpg";
           }

        }

        $model = Menu::create([
            "uuid"=> $uuid,
            "image"=> $filePath,
            "name"=> $request->name,
            "category_id"=> $request->category_id,
            "price"=> $request->price,
            "description"=> $request->description,
            "status"=> $request->status
        ]);

        return $this->successResponse("Your data has been created!", $model);

    }

    public function edit($id, Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255|unique:menus,name,' . $id,
            'category_id' => 'required|integer|min:1',
            'price' => 'required|integer|min:1',
            'status' => 'required|integer|min:0|digits_between: 0,1',
        ]);

        $model = Menu::where("id", $id)->first();

        if(null === $model)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        $filePath = $model->image;
        $category_id = $request->category_id;
        $category = Category::where("id", $category_id)->first();

        if(null == $category)
        {
            return $this->errorResponse("Category with id ".$category_id." was not found in our system. ", null, 422);
        }

        if($request->file('file'))
        {
           $upload = $request->file('file')->move(storage_path('uploads'), $fileName);

           if($upload)
           {
                $filePath = "uploads/".$fileName.".jpg";
           }

        }

        $model->image = $filePath;
        $model->name = $request->name;
        $model->price = $request->price;
        $model->category_id = $request->category_id;
        $model->description = $request->description;
        $model->status = $request->status;
        $model->save();

        return $this->successResponse("Your data has been updated!", $model);
    }

    public function delete($id)
    {
        $model = Menu::where("id", $id)->first();

        if(null === $model)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        Menu::where("id", $id)->delete();

        return $this->successResponse("Your data has been deleted!");
    }

}