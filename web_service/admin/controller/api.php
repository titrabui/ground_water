<?php
require_once("class.rest.php");

class API extends REST
{
	public function __construct()
	{
		parent::__construct();
	}

	public function processApi()
	{
		$func = strtolower(trim(str_replace("/", "", $_REQUEST['action'])));
		if ((int)method_exists($this, $func) > 0)
			$this->$func();
		else
			$this->response('', 404);
	}

	public function json($data)
	{
		if (is_array($data)) {
			return json_encode($data);
		}
	}
}

/*$api = new API;
$api->processApi();*/