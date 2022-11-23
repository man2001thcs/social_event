<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Log_temp.php';

if (!isset($user)) {
	$user = new User();
}

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
	$content = trim(file_get_contents("php://input"));

	$decoded = json_decode($content, true);

	if(is_array($decoded)) {
		$dataSub = array(
			'User' => array(
			'email' =>  $decoded['emailS'],
			'password' =>  $decoded['passwordS'],
			'code_login'=>  $decoded['codeS']
			)
		);
	
		if ($user->login($dataSub)) {	
			$link = $decoded['codeS'].'.json';
			$linka = './log_session/'.$link;	
			file_put_contents($linka, json_encode($user->welcome($decoded['emailS'])));	
			$response = array(
				'response' => array(
				'id' =>  1,
				'description' =>  'success'
				)
			);
			echo json_encode($response);
			
		} else {
			$response = array(
				'response' => array(
				'id' =>  0,
				'description' =>  'fail'
				)
			);
			echo json_encode($response);
		}
	}
	
		//header('Location:' . CLIENT_URL, true, 301);

		//If json_decode failed, the JSON is invalid.
	if(! is_array($decoded)) {
		$response = array(
			'response' => array(
			'id' =>  0,
			'description' =>  'fail'
			)
		);
		echo json_encode($response);
	}
} else {
	$response = array(
		'response' => array(
		'id' =>  0,
		'description' =>  'fail'
		)
	);
	echo json_encode($response);
}

//echo json_encode($decoded);

?>
