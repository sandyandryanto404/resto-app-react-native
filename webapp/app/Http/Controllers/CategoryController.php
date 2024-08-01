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
use Illuminate\Http\Request;
use Faker\Factory as Faker;

class CategoryController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function list(Request $request)
    {
        $sort_by = $request->sort_by ? $request->sort_by : "id";
        $sort_dir = $request->sort_dir ? $request->sort_dir : "desc";
        $page = $request->page ? $request->page : 1;
        $limit = $request->limit ? $request->limit : 10;
        $models = Category::where('id', "<>", 0)->limit($limit)->offset(($page - 1) * $limit);

        if($request->search){
            $models = $models->where(function($query) use ($request){
                return $query
                    ->where('name', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('description', 'LIKE', '%'.$request->search.'%');
            });
        }

        $models = $models->get();
        return $this->successResponse("Your data has been fetched!", $models);
    }

    public function show($id)
    {
        $model = Category::where("id", $id)->first();

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
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'status' => 'required|integer|min:0|digits_between: 0,1',
        ]);

        $faker = Faker::create();
        $uuid = $faker->uuid();

        $model = Category::create([
            "uuid"=> $uuid,
            "name"=> $request->name,
            "description"=> $request->description,
            "status"=> $request->status
        ]);

        return $this->successResponse("Your data has been created!", $model);

    }

    public function edit($id, Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'status' => 'required|integer|min:0|digits_between: 0,1',
        ]);

        $model = Category::where("id", $id)->first();

        if(null === $model)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        $model->name = $request->name;
        $model->description = $request->description;
        $model->status = $request->status;
        $model->save();

        return $this->successResponse("Your data has been updated!", $model);
    }

    public function delete($id)
    {
        $model = Category::where("id", $id)->first();

        if(null === $model)
        {
            return $this->errorResponse("Record with id ".$id." was not found in our system. ", null, 422);
        }

        Category::where("id", $id)->delete();

        return $this->successResponse("Your data has been deleted!");
    }

}