<?php

/**
 * Created by PhpStorm.
 * User: DO DUY TU
 * Date: 9/25/2016
 * Time: 9:11 AM
 */

require_once('Model.php');

class Model_WaterColumnValue extends Model
{
    public $id;
    public $water_column_id;
    public $value;
    public $note;
    public $created_at;
    public $updated_at;

    public function __construct() { }

    public static function getWaterValueByColumnId($id)
	{
		$listpara = array();
		$listvalue = array();

		$storeprocedure = "getwatervaluebycolumnid";
		$listpara[0] = $id;

		$result = DataAcess::executeReader($storeprocedure, $listpara);
		if (mysqli_num_rows($result) > 0) {
			while ($obj = mysqli_fetch_object($result, 'Model_WaterColumnValue')) {
				$listvalue[] = $obj;
			}
		}
		mysqli_free_result($result);
		return $listvalue;
	}

	public static function getWaterValueByColumnIdAndDay($id, $date)
	{
		$listpara = array();
		$listvalue = array();

		$storeprocedure = "getwatervaluebycolumnidandday";
		$listpara[0] = $id;
		$listpara[1] = $date;
		
		$result = DataAcess::executeReader($storeprocedure, $listpara);
		if (mysqli_num_rows($result) > 0) {
			while ($obj = mysqli_fetch_object($result, 'Model_WaterColumnValue')) {
				$listvalue[] = $obj;
			}
		}
		mysqli_free_result($result);
		return $listvalue;
	}

	public static function CreateWaterValueByColumnid($columnid, $value)
	{
		$listpara = array();

		$storeprocedure = "addnewwatervaluebycolumnid";
		$listpara[0] = $columnid;
		$listpara[1] = $value;
		$result = DataAcess::executeNonQuery($storeprocedure, $listpara);
		return $result;
	}
}
