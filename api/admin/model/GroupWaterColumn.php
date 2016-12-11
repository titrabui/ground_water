<?php
/**
 * Created by PhpStorm.
 * User: DO DUY TU
 * Date: 9/25/2016
 * Time: 9:11 AM
 */
require_once('Model.php');

class Model_GroupWaterColumn extends Model
{
	public $id;
	public $area_id;
	public $name;
	public $latitude;
	public $longitude;
	public $note;
	public $created_at;
	public $updated_at;

	public function __construct() {}

	public static function getGroupByAreaid($id)
	{
		$listpara = array();
		$listvalue = array();

		$storeprocedure = "getgroupbyareaid";
		$listpara[0] = $id;

		$result = DataAcess::executeReader($storeprocedure, $listpara);
		if (mysqli_num_rows($result) > 0) {
			while ($obj = mysqli_fetch_object($result, 'Model_GroupWaterColumn')) {
				$listvalue[] = $obj;
			}
		}
		mysqli_free_result($result);
		return $listvalue;
	}

	public static function CreateGroupWaterColumn($array_data = array())
	{
		$storeprocedure = "creategroupwatercolumn";
		$result = DataAcess::executeNonQuery($storeprocedure, $array_data);

		return $result;
	}

	public static function EditGroupWaterColumn($array_data = array())
	{
		$storeprocedure = "editgroupwatercolumn";
		$result = DataAcess::executeNonQuery($storeprocedure, $array_data);

		return $result;
	}

	public static function DeleteGroupWaterColumn($array_data = array())
	{
		$storeprocedure = "deletegroupwatercolumn";
		$result = DataAcess::executeNonQuery($storeprocedure, $array_data);

		return $result;
	}
}
