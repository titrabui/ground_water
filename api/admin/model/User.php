<?php

/**
 * Created by PhpStorm.
 * User: DO DUY TU
 * Date: 9/25/2016
 * Time: 9:11 AM
 */
require_once('Model.php');

class Model_User
{
    public $id;
    public $username;
    public $password;
    public $role;
    public $fullname;
    public $address;
    public $email;
    public $phonenumber;
    public $note;
    public $created_at;
    public $updated_at;

    public function __construct() { }

    public static function login($array_data = array())
    {
        $storeprocedure = "login";
        $result = DataAcess::executeReader($storeprocedure, $array_data);
        if (mysqli_num_rows($result) > 0) {
            while ($obj = mysqli_fetch_object($result, 'Model_User')) {
                $listvalue[] = $obj;
            }
        }
        mysqli_free_result($result);
        return $listvalue;
    }

}
