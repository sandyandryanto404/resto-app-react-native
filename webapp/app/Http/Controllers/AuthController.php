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
use App\Models\PasswordReset;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Faker\Factory as Faker;

class AuthController extends ApiController
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => [
            'login', 
            'refresh', 
            'logout', 
            'forgot', 
            'reset', 
            'register',
            'confirm',
            'resend'
        ]]);
    }

    public function login(Request $request)
    {
        $this->validate($request, ['email' => 'required|string', 'password' => 'required|string']);
        $credentials = $request->only(['email', 'password']);
        $token = Auth::attempt($credentials, ['exp' => Carbon::now()->addDays(7)->timestamp]);

        if (!$token) {
            return response()->json(['message' => 'Please recheck the e-mail address and password and try again.'], 422);
        }

        $email = $request->email;
        $user = User::where("email", $email)->first();
        $verified = (int) $user->verified;
        $status = (int) $user->status;

        if($verified == 0){
            return response()->json(['message' => 'Please confirm your email and then we will active your account.'], 422);
        }

        if($status == 0){
            return response()->json(['message' => 'Your account has been banned, please contact administrator to continue.'], 422);
        }

        return $this->respondWithToken($token);
    }

    public function logout(Request $request)
    {
        auth()->logout();
        return $this->successResponse("Logout Successfully !!");
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function forgot(Request $request)
    {
        $this->validate($request, ['email' => 'required|string|email']);

        $email = $request->email;
        $user = User::where("email", $email)->first();

        if(null === $user)
        {
            return response()->json(['message' => 'A user was not found for this e-mail address'], 422);
        }

        $passwordReset = PasswordReset::where("user_id", $user->id)->first();
        $faker = Faker::create();
        $token = $faker->uuid();
        $expiredDate = date('Y-m-d H:i:s', strtotime("+1 hour"));
        $expiredDate = \DateTime::createFromFormat('Y-m-d H:i:s', $expiredDate); 

        if(null === $passwordReset)
        {
            PasswordReset::create([
                "user_id"=> $user->id,
                "token"=> $token,
                "status"=> 0,
                "expired_at"=> $expiredDate
            ]);
        }
        else
        {
            $passwordReset->token = $token;
            $passwordReset->status = 0;
            $passwordReset->expired_at = $expiredDate;
            $passwordReset->save();
        }

        // Sending Email
        $data = ["user"=> $user, "url"=> url("auth/reset/".$token)];
        Mail::send('reset-password', $data, function($message) use ($user) {
            $message->to($user->email, $user->name)->subject('Reset Password');
            $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        });

        return $this->successResponse("An email has been sent to ".$email." with instructions for resetting your password.");
    }

    public function reset($token, Request $request)
    {
        $this->validate($request, ['email' => 'required|email','password' => 'required|confirmed|min:6']);

        $email = $request->email;
        $password = $request->password;
        $user = User::where("email", $email)->first();

        if(null === $user)
        {
            return response()->json(['message' => 'A user was not found for this e-mail address'], 422);
        }

        $getPasswordReset = PasswordReset::where("user_id", $user->id)->where("token", $token)->where("status", 0)->first();

        if(null === $getPasswordReset)
        {
            return response()->json(['message' => 'The password reset token is invalid.'], 422);
        }


        $getPasswordReset->status = 1;
        $getPasswordReset->save();

        $user->password = Hash::make($request->password);
        $user->save();

        return $this->successResponse("Your password has been changed successfully.");

    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'gender' => 'required|string|max:2',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $faker = Faker::create();
        $token = $faker->uuid();

        $user = User::create([
            "uuid"=> $faker->uuid,
            "name"=> $request->name,
            "gender"=> $request->gender,
            "email"=> $request->email,
            "password"=> Hash::make($request->password),
            "status"=> 1,
            "verified"=> 0,
            "verification_token"=> $token
        ]);

        // Sending Email
        $data = ["user"=> $user, "url"=> url("auth/confirm/".$token)];
        Mail::send('email-confirm', $data, function($message) use ($user) {
            $message->to($user->email, $user->name)->subject('E-Mail Verification');
            $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        });

        return $this->successResponse("Registration completed successfully, please check your registered email for email verification.");
    }

    public function confirm($token)
    {
        $user = User::where("verification_token", $token)->first();

        if(null === $user)
        {
            return response()->json(['message' => 'A user was not found for this email token'], 422);
        }
        
        $verified = (int) $user->verified;

        if($verified == 1)
        {
            return response()->json(['message' => 'Your account already verified, Now you can login to continue.'], 422);
        }

        $user->verified = 1;
        $user->save();
        
        return $this->successResponse("Verification completed successfully, Now you can login to continue.");
    }

    public function resend(Request $request)
    {
        $this->validate($request, ['email' => 'required|string|email']);

        $email = $request->email;
        $user = User::where("email", $email)->first();

        if(null === $user)
        {
            return response()->json(['message' => 'A user was not found for this e-mail address'], 422);
        }

        $verified = (int) $user->verified;

        if($verified == 1)
        {
            return response()->json(['message' => 'Your account already verified, Now you can login to continue.'], 422);
        }

        $faker = Faker::create();
        $token = $faker->uuid();
        $user->verification_token = $token;
        $user->save();

        // Sending Email
        $data = ["user"=> $user, "url"=> url("auth/confirm/".$token)];
        Mail::send('email-confirm', $data, function($message) use ($user) {
            $message->to($user->email, $user->name)->subject('E-Mail Verification');
            $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        });

        return $this->successResponse("Resend e-mail completed successfully, please check your registered e-mail for email verification.");

    }
    
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user(),
            'expires_in' => auth()->factory()->getTTL() * 60 * 24
        ]);
    }
    
}