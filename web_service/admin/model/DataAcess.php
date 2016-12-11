<?php

/**
 * Created by PhpStorm.
 * User: DO DUY TU
 * Date: 9/25/2016
 * Time: 2:00 PM
 */
class DataAcess
{
    public function __construct()
    {
    }

    public static function getConnection()
    {
        $mysqli =  mysqli_connect("localhost", "root", "", "groundwater");
        mysqli_query( $mysqli, 'SET NAMES "utf8" COLLATE "utf8_general_ci"' );
        return $mysqli;
    }

    public static function interpolateQuery($storeprocedure, $listpara)
    {
        $sql = "CALL " . $storeprocedure . "(";
        foreach ($listpara as $key => $value) {
            $sql = $sql . '"' . $value . '"' . ", ";
        }
        $sql = $sql . ")";
        $sql = str_replace(", )", ")", $sql);
        return $sql;
    }

    public static function executeReader($storeprocedure, $listpara)
    {
        $conn = self:: getConnection();
        if (!$conn) {
            return null;
        }
        $sql = self:: interpolateQuery($storeprocedure, $listpara);
        $result = mysqli_query($conn, $sql);
        mysqli_close($conn);
        return $result;
    }

    public static function executeNonQuery($storeprocedure, $listpara)
    {
        $conn = self:: getConnection();
        if (!$conn) {
            return null;
        }
        $sql = self:: interpolateQuery($storeprocedure, $listpara);
        $result = mysqli_query($conn, $sql);
        mysqli_close($conn);
        if($result) return true;
        else return false;
        //return mysqli_affected_rows($result);
    }
}