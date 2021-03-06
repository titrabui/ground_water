<?php

/**
 * Created by PhpStorm.
 * User: DO DUY TU
 * Date: 9/25/2016
 * Time: 9:11 AM
 */

require_once('Model.php');

class Model_WaterColumn extends Model
{
	public $id;
	public $group_water_column_id;
	public $name;
	public $height;
	public $latitude;
	public $longitude;
	public $gsmnumber;
	public $note;
	public $created_at;
	public $updated_at;

	public function __construct() { }

	public static function getWaterColumnByGroupid($id)
	{
		$listpara = array();
		$listvalue = array();

		$storeprocedure = "getwatercolumnbygroupid";
		$listpara[0] = $id;

		$result = DataAcess::executeReader($storeprocedure, $listpara);
		if (mysqli_num_rows($result) > 0) {
			while ($obj = mysqli_fetch_object($result, 'Model_WaterColumn')) {
				$listvalue[] = $obj;
			}
		}
		mysqli_free_result($result);
		return $listvalue;
	}

	public static function GetRequestStatByWaterColumnid($id)
	{
		$listpara = array();
		$storeprocedure = "getrequeststatbywatercolumnid";
		$listpara[0] = $id;
		$ret = 0;
		$result = DataAcess::executeReader($storeprocedure, $listpara);
		if (mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc()) {
				$ret = $row["is_request"];
    		}
		}
		mysqli_free_result($result);
		return $ret;
	}

	public static function SetRequestStatByWaterColumnid($id)
	{
		$listpara = array();
		$storeprocedure = "setrequeststatbywatercolumnid";
		$listpara[0] = $id;
		$result = DataAcess::executeNonQuery($storeprocedure, $listpara);
		return $result;
	}

	public static function CreateWaterColumn($array_data = array())
	{
		$storeprocedure = "createwatercolumn";
		$result = DataAcess::executeNonQuery($storeprocedure, $array_data);

		return $result;
	}

	public static function EditWaterColumn($array_data = array())
	{
		$storeprocedure = "editwatercolumn";
		$result = DataAcess::executeNonQuery($storeprocedure, $array_data);

		return $result;
	}

	public static function DeleteWaterColumn($array_data = array())
	{
		$storeprocedure = "deletewatercolumn";
		$result = DataAcess::executeNonQuery($storeprocedure, $array_data);

		return $result;
	}

	public static function RequestWaterColumn($id)
	{
		$listpara = array();
		$storeprocedure = "requestwatercolumn";
		$listpara[0] = $id;
		$result = DataAcess::executeNonQuery($storeprocedure, $listpara);
		return $result;
	}


}
