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
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class AccountController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function me()
    {
        $user = Auth::User();
        return $this->successResponse("Your data has been fetched!", $user);
    }

    public function profile(Request $request)
    {
        $user = Auth::User();
        $id = $user->id;

        $this->validate($request, [
            'name' => 'required|string|max:255',
            'gender' => 'required|string|max:2',
            'email' => 'required|string|max:255|unique:users,email,' . $id,
        ]);

        if($request->image){
            $user->image = $request->image;
        }

        $user->name = $request->name;
        $user->gender = $request->gender;
        $user->email = $request->email;
        $user->save();

        return $this->successResponse("Your profile has been modified!", $user);

    }

    public function password(Request $request)
    {
        $this->validate($request, [
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = Auth::User();
        $current_password = $request->current_password;
        $password = $request->password;

        if (!Hash::check($current_password, $user->password))
        {
            return response()->json(['message' => 'Current password does not match with your account.'], 422);
        }

        $user->password = Hash::make($password);
        $user->save();

        return $this->successResponse("Your password has been changed!", $user);
    }
}