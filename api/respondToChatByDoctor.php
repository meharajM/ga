<?php
require_once("../includes/chatClass.php");
$chat = json_decode(file_get_contents("php://input"));

/*$doctor_id 		= $chat->chat_input->doctor_id;
$hs_id			= $chat->chat_input->hs_id;
$thread_id		= $chat->chat_input->thread_id;
$package_id		= $chat->chat_input->package_id;
$chatMsg 		= $chat->chat_input->chat_msg;
$attachement	= $chat->chat_input->attachement;*/


$doctor_id 		= 12;
$hs_id			= 21;
$thread_id		= 10;
$package_id		= 2;
$chatMsg 		= "Can you come to the video consultation ?";
$attachement	= "no";
$response= array();

if($thread_id == ""){
	$response['error']['result']="1";
	$response['error']['error_code']="";
	$response['error']['error_type']="";
	$response['error']['error_message']="Thread id cannot be null";
}else if($package_id == ""){
	$response['error']['result']="1";
	$response['error']['error_code']="";
	$response['error']['error_type']="";
	$response['error']['error_message']="Package id cannot be null";
}else if($chatMsg == ""){
	$response['error']['result']="1";
	$response['error']['error_code']="";
	$response['error']['error_type']="";
	$response['error']['error_message']="Chat message id cannot be null";
}else{
	$response['error']['result']="0";
	$response['error']['error_code']="";
	$response['error']['error_type']="";

	$res = $chatObj->add_doctor_chat($thread_id,$package_id,$hs_id,$doctor_id,$chatMsg,$attachement);
	if($res){
		$sender = 'doctor';
		$update = $chatObj->update_thread_status($thread_id,$sender,$credits='');
	}
	$response['doctor_chat']['chat_conversation_id']=$res;

}

echo json_encode($response);
?>
