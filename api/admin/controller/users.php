<?php
require_once('../model/User.php');
require_once("api.php");

class Users extends API
{
	public function __construct()
	{
		parent::__construct();
		$this->processApi();
	}

	public function login()
	{
		$user = $_POST;
		if ($this->get_request_method() != "POST") {
			$this->response($this->json(array('status' => 'false', 'message' => 'method not allowed.')), 405);
		}

		$listvalue = Model_User::login($user);
		if ($listvalue != null) {
			$res = array('status' => 'true', 'message' => $listvalue);
			$this->response($this->json($res), 200);
		}

		$error = array('status' => 'false', 'message' => 'NoData');
		$this->response($this->json($error), 200);
	}
}

$init = new Users;