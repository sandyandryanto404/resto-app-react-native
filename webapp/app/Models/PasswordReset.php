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

 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class PasswordReset extends Model
{   
    use SoftDeletes;

    protected $table = "password_resets";

    protected $dates = ['deleted_at'];
    
    protected $fillable = [
       "user_id",
       "token",
       "status",
       "expired_at",
    ];

    public function User() {
        return $this->belongsTo(User::class, 'user_id');
    }

}