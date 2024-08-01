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

use Laravel\Lumen\Routing\Controller as BaseController;

class ApiController extends BaseController
{
    protected function errorResponse($message, $errors = null, $code = 422) {
        return response()->json([
            'errors' => $errors,
            'data' => null,
            'message' => $message == null && is_string($errors) ? $errors : $message,
            'status' => 'error'
        ], $code);
    }

    protected function successResponse($message, $data = null, $code = 200) {
        return response()->json([
            'errors' => null,
            'data' => $data,
            'message' => $message,
            'status' => 'success'
        ], $code);
    }
}   