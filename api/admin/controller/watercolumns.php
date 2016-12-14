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

	public function get_by_groupid()
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

	public function create() {
		if ($this->get_request_method() != "POST") {
			$this->response(
				$this->json(
					array(
						'status' => 'false',
						'message' => 'method not allowed.'
					)
				),
				405
			);
		}

		$watercolumn['groupwatercolumn_id'] = $_POST['groupwatercolumn_id'];
		$watercolumn['name'] = $_POST['name'];
		$watercolumn['height'] = $_POST['height'];
		$watercolumn['latitude'] = $_POST['latitude'];
		$watercolumn['longitude'] = $_POST['longitude'];
		$watercolumn['note'] = $_POST['note'];
		$watercolumn['gmsnumber'] = $_POST['gmsnumber'];

		$listvalue = Model_WaterColumn::CreateWaterColumn($watercolumn);
		if ($listvalue) {
			$res = array(
				'status' => 'true',
				'message' => "true"
			);
			$this->response($this->json($watercolumn), 200);
		}
		else
		{
			$res = array(
				'status' => 'true',
				'message' => "false"
			);
			$this->response($this->json($watercolumn), 200);
		}
	}

	public function edit() {
		if ($this->get_request_method() != "POST") {
			$this->response(
				$this->json(
					array(
						'status' => 'false',
						'message' => 'method not allowed.'
					)
				),
				405
			);
		}

		$watercolumn['id'] = $_POST['id'];
		$watercolumn['name'] = $_POST['name'];
		$watercolumn['height'] = $_POST['height'];
		$watercolumn['latitude'] = $_POST['latitude'];
		$watercolumn['longitude'] = $_POST['longitude'];
		$watercolumn['note'] = $_POST['note'];
		$watercolumn['gmsnumber'] = $_POST['gmsnumber'];

		$listvalue = Model_WaterColumn::EditWaterColumn($watercolumn);
		if ($listvalue) {
			$res = array(
				'status' => 'true',
				'message' => "true"
			);
			$this->response($this->json($res), 200);
		}
		else
		{
			$res = array(
				'status' => 'true',
				'message' => "false"
			);
			$this->response($this->json($res), 200);
		}
	}

	public function delete() {
		if ($this->get_request_method() != "POST") {
			$this->response(
				$this->json(
					array(
						'status' => 'false',
						'message' => 'method not allowed.'
					)
				),
				405
			);
		}

		$watercolumn['id'] = $_POST['id'];

		$listvalue = Model_WaterColumn::DeleteWaterColumn($watercolumn);
		if ($listvalue) {
			$res = array(
				'status' => 'true',
				'message' => "true"
			);
			$this->response($this->json($res), 200);
		}
		else
		{
			$res = array(
				'status' => 'true',
				'message' => "false"
			);
			$this->response($this->json($res), 200);
		}
	}


	public function request() {
		if ($this->get_request_method() != "POST") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}
		$id = $_POST['id'];
		$result = Model_WaterColumn::RequestWaterColumn($id);
		if ($result) {
			$res = array('status' => 'true', 'message' => $result);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => $result);
		$this->response($this->json($error), 200);
	}

	public function getrequeststatus()
	{
		if ($this->get_request_method() != "GET") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}

		$id = $_GET['id'];
		$listvalue = Model_WaterColumn::GetRequestStatByWaterColumnid($id);
		if ($listvalue != null) {
			$res = array('status' => 'true', 'message' => $listvalue);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => 'NoData');
		$this->response($this->json($error), 200);
	}

	public function setrequeststatus() {
		if ($this->get_request_method() != "POST") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}
		$id = $_POST['id'];
		$result = Model_WaterColumn::SetRequestStatByWaterColumnid($id);
		if ($result) {
			$res = array('status' => 'true', 'message' => $result);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => $result);
		$this->response($this->json($error), 200);
	}
}

$init = new WaterColumns;