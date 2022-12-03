<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");
require_once(dirname(__FILE__).DS. "../lib/Session.php");

class Notification extends AppModel {
	protected $table = 'notification';
	protected $alias = 'Notification';
	
	private $session = null;

	//private $cart = array();
	//private $cartNum = 0;
	
	protected $rules = array(
		"id" => array(
			"form" => array(
				"type" => "hidden"
			)
		),
		"user_account_1" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			),
			"isEmail" => array(
				"rule" => "email",
				"message" => MSG_ERR_EMAIL
			)
		),
		"publicity_state" => array(
			"form" => array(
				"type" => "text"
			),
			"isNumber" => array(
				"rule" => "isNumber",
				"message" => MSG_ERR_NUMER
			)
		),
		"type" => array(
			"form" => array(
				"type" => "text"
			),
			"isNumber" => array(
				"rule" => "isNumber",
				"message" => MSG_ERR_NUMER
			)
		),
		"message" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
	);

		//Publicity_state: 0 là private, 1 là friend_only, 2 là public
		//Type: 0 là bài viết mới, 1 là comment trong bài viết của bạn, 2 là comment nhắc tới bạn
		//, 3 là friend request send, 4 là friend request accept
	public function __construct() {
		parent::__construct();
		
		$this->session = new Session();
	}

}