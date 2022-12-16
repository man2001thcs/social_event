const client_link = "http://localhost:3000/";

//Server link
const server_link = "http://192.168.1.153/php_social/";

//

//other link
const image_link = server_link + "img/post/";

const login_img_link = server_link + "img/login.gif";

const user_link = server_link + "controller/user/log_session/";

const user_image_link = server_link + "img/user/";

const post_link = server_link + "controller/post/list.php";

const post_personal_link = server_link + "controller/post/list_personal.php";

const commment_link = server_link + "controller/comment/list.php";

const emotion_send_link = server_link + "controller/post/emotion/send.php";

const emotion_list_link = server_link + "controller/post/emotion/emotion_list.php";

const emotion_com_send_link = server_link + "controller/comment/emotion/send.php";

const emotion_com_list_link = server_link + "controller/comment/emotion/emotion_list.php";

const friend_request_link = server_link + "controller/friend/list.php";

const friend_suggest_link = server_link + "controller/user/list.php";
//

export default {
  client_link,
  server_link,
  image_link,
  user_link,
  post_link,
  post_personal_link,
  commment_link,
  login_img_link,
  user_image_link,
  emotion_list_link,
  emotion_send_link,
  emotion_com_send_link,
  emotion_com_list_link,
  friend_request_link,
  friend_suggest_link
};
