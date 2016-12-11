<?php
require_once('../model/WaterColumnValue.php');
require_once("api.php");

class WaterColumnValues extends API
{
	public function __construct()
	{
		parent::__construct();
		$this->processApi();
	}

	public function get_by_columnid()
	{
		$id = $_GET['id'];
		if ($this->get_request_method() != "GET") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}

		$listvalue = Model_WaterColumnValue::getWaterValueByColumnId($id);
		if ($listvalue != null) {
			$res = array('status' => 'true', 'message' => $listvalue);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => 'NoData');
		$this->response($this->json($error), 200);
	}

	public function get_by_columnid_and_date()
	{
		$id = $_GET['id'];
		$date = $_GET['date'];
		if ($this->get_request_method() != "GET") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}

		$listvalue = Model_WaterColumnValue::getWaterValueByColumnIdAndDay($id, $date);
		if ($listvalue != null) {
			$res = array('status' => 'true', 'message' => $listvalue);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => 'NoData');
		$this->response($this->json($error), 200);
	}

	public function create_by_columnid()
	{
		$columnid = $_GET['id'];
		$value = $_GET['value'];
		if ($this->get_request_method() != "PUT") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}

		$listvalue = Model_WaterColumnValue::CreateWaterValueByColumnid($columnid, $value);
		if ($listvalue) {
			$res = array('status' => 'true', 'message' => "true");
			$this->response($this->json($res), 200);
		}
		else{
			$res = array('status' => 'true', 'message' => "false");
			$this->response($this->json($res), 200);
		}
	}
}

$init = new WaterColumnValues;