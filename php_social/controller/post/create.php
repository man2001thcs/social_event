<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Post.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Notification.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$post = new Post();
$notification = new Notification();

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
	$content = trim(file_get_contents("php://input"));

	$decoded = json_decode($content, true);

	if(is_array($decoded)) {

		$dataSub = array(
			'Post' => array(
			'user_account' =>  $decoded['emailS'],
			'user_id' =>  $user->get_id($decoded['emailS'])['id'],
			'user_name' =>  $user->get_full_name($decoded['emailS'])['fullname'],
			'post_body' =>  $decoded['post_body'],
			'publicity_state' =>  $decoded['publicity_state'],
			'img_num'=>  $decoded['img_num'],
			'like_num'=>  0,
			'dislike_num'=>  0,
			'love_num'=>  0,
			'hate_num'=>  0,			
			'comment_num'=>  0,
			'created' => date('Y-m-d H:i:s'),
			'modified' => date('Y-m-d H:i:s')	
			)
		);

		//echo json_encode($dataSub);

		if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0  && $user->is_admin($decoded['emailS']) == false){
			//echo json_encode($dataSub);
			if ($post->save($dataSub)) {
				$dataSub2 = array(
					'Notification' => array(
					'user_account_1' =>  $decoded['emailS'],
					'user_account_2' =>  "none",
					'publicity_state' =>  $decoded['publicity_state'],
					'type'=>  0,
					'message' =>  "New post",
					)
				);

				if ($notification->save($dataSub2)) {
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
						'id' =>  1,
						'description' =>  'success but notification fail'
						)
					);
					echo json_encode($response);
				}

			} else {
				//header('Location: ' . CLIENT_URL . '/book/input?success=0');}
				$response = array(
					'response' => array(
					'id' =>  0,
					'description' =>  'fail'
					)
				);
				echo json_encode($response);
			}	
		}
		else{
			//header('Location: ' . CLIENT_URL . '/book/input?success=0');
			$response = array(
				'response' => array(
				'id' =>  0,
				'description' =>  'fail'
				)
			);
			echo json_encode($response);
		}
	}
	else{
		//header('Location: ' . CLIENT_URL . '/book/input?success=0');
		$response = array(
			'response' => array(
			'id' =>  0,
			'description' =>  'fail'
			)
		);
		echo json_encode($response);
	}
}
?>