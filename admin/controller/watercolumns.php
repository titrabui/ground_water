<?php
require_once('../model/WaterColumn.php');
require_once("api.php");

class WaterColumns extends API
{
	public function __construct()
	{
		parent::__construct();
		$this->processApi();
	}

	public function get_water_column_by_groupid()
	{
		$id = $_GET['id'];
		if ($this->get_request_method() != "GET") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}

		$listvalue = Model_WaterColumn::getWaterColumnByGroupid($id);
		if ($listvalue != null) {
			$res = array('status' => 'true', 'message' => $listvalue);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => 'NoData');
		$this->response($this->json($error), 200);
	}
}

$init = new WaterColumns;