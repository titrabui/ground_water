<?php
require_once('../model/GroupWaterColumn.php');
require_once("api.php");

header("access-control-allow-origin: *");

class GroupWaterColumns extends API
{
	public function __construct()
	{
		parent::__construct();
		$this->processApi();
	}

	public function get_by_areaid()
	{
		$id = $_GET['id'];
		if ($this->get_request_method() != "GET") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}

		$listvalue = Model_GroupWaterColumn::getGroupByAreaid($id);
		if ($listvalue != null) {
			$res = array('status' => 'true', 'message' => $listvalue);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => 'NoData');
		$this->response($this->json($error), 200);
	}

	public function create() {
		$groupwatercolumn = $_POST;

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

		$listvalue = Model_GroupWaterColumn::CreateGroupWaterColumn($groupwatercolumn);
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
}

$init = new GroupWaterColumns;