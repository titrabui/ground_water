<?php
$favoriteColor = array();
$favoriteColor[1] = 1;
$favoriteColor[2] = 2;
$favoriteColor[3] = 3;
echo interpolateQuery("abc", $favoriteColor);

function interpolateQuery($procedurename, $listpara)
{
	$sql = "CALL " . $procedurename . "(";
	foreach ($listpara as $key => $value) {
		$sql = $sql . $value . ", ";
	}
	$sql = $sql . ")";
	$sql = str_replace(", )", ")", $sql);
	return $sql;
}