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

 
/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('invoice/{token}', ['uses' => 'InvoiceController@show']);

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('dashboard', ['uses' => 'DashboardController@index']);
    $router->group(['prefix' => 'auth'], function () use ($router) {
        $router->post('login', ['uses' => 'AuthController@login']);
        $router->post('logout', ['uses' => 'AuthController@logout']);
        $router->post('refresh', ['uses' => 'AuthController@refresh']);
        $router->post('register', ['uses' => 'AuthController@register']);
        $router->get('confirm/{token}', ['uses' => 'AuthController@confirm']);
        $router->post('resend', ['uses' => 'AuthController@resend']);
        $router->post('email/forgot', ['uses' => 'AuthController@forgot']);
        $router->post('email/reset/{token}', ['uses' => 'AuthController@reset']);
    });
    $router->group(['prefix' => 'account'], function () use ($router) {
        $router->get('profile/me', ['uses' => 'AccountController@me']);
        $router->post('profile/update', ['uses' => 'AccountController@profile']);
        $router->post('profile/password', ['uses' => 'AccountController@password']);
    });
    $router->group(['prefix' => 'category'], function () use ($router) {
        $router->get('list', ['uses' => 'CategoryController@list']);
        $router->post('create', ['uses' => 'CategoryController@create']);
        $router->get('show/{id}', ['uses' => 'CategoryController@show']);
        $router->put('edit/{id}', ['uses' => 'CategoryController@edit']);
        $router->delete('delete/{id}', ['uses' => 'CategoryController@delete']);
    });
    $router->group(['prefix' => 'menu'], function () use ($router) {
        $router->get('list', ['uses' => 'MenuController@list']);
        $router->post('create', ['uses' => 'MenuController@create']);
        $router->get('show/{id}', ['uses' => 'MenuController@show']);
        $router->put('edit/{id}', ['uses' => 'MenuController@edit']);
        $router->delete('delete/{id}', ['uses' => 'MenuController@delete']);
    });
    $router->group(['prefix' => 'order'], function () use ($router) {
        $router->get('list', ['uses' => 'OrderController@list']);
        $router->post('create', ['uses' => 'OrderController@create']);
        $router->get('show/{id}', ['uses' => 'OrderController@show']);
        $router->put('edit/{id}', ['uses' => 'OrderController@edit']);
        $router->delete('delete/{id}', ['uses' => 'OrderController@delete']);
    });
});