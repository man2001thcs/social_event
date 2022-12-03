<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Post.php';
require_once '../../model/User.php';
require_once '../../model/Friend_relation.php';
require_once '../../model/Log_temp.php';

if (!isset($user)) {
	$user = new User();
}

$post = new Post();

$limit = 5;

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
	$content = trim(file_get_contents("php://input"));
	$decoded = json_decode($content, true);

	if(is_array($decoded)) {
		$limit = $decoded['limit'];
		$emailS = $decoded['emailS'];
		$codeS = $decoded['codeS'];
		$getMore = $decoded['getMore'];

		if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0  && $user->is_admin($decoded['emailS']) == false){			
			$post_list = $post->get_post($emailS, $limit);	

			if(sizeof($post_list) > $limit || intval($getMore) == 0){
				//echo json_encode($decoded);			
				$response = array(
					'response' => array(
					'id' =>  1,
					'description' => 'success',
					'data' => json_encode($post_list)
					)
				);
				echo json_encode($response);	
			} else {
				$response = array(
					'response' => array(
					'id' =>  0,
					'description' =>  'fail',
					'data' => 'none'
					)
				);
				echo json_encode($response);
			} 
		} else {
			$response = array(
				'response' => array(
				'id' =>  0,
				'description' =>  'fail',
				'data' => 'none'
				)
			);
			echo json_encode($response);
		} 
	} else {
		$response = array(
			'response' => array(
			'id' =>  0,
			'description' =>  'fail',
			'data' => 'none'
			)
		);
		echo json_encode($response);
	} 
}


?>