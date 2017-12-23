<?php
require_once("../includes/chatClass.php");
$chat = json_decode(file_get_contents("php://input"));
#$doctor_id	=  $chat->doctor_info->doctor_id;
$doctor_id =12;


$response= array();
if($doctor_id == ""){
	$response['error']['result']="1";
	$response['error']['error_code']="";
	$response['error']['error_type']="";
	$response['error']['error_message']="Doctor id cannot be null";
}else{
	$response['error']['result']="0";
	$response['error']['error_code']="";
	$response['error']['error_type']="";
	$getThreadId= $chatObj->get_all_chat_details($doctor_id);

	$response['chat_det'] = array();

	while ($row = mysqli_fetch_assoc($getThreadId)) {   

        $chatData['health_seeker_id']	= $row['health_seeker_id'];
		$chatData['health_seeker_name']	= $row['name'];
		$chatData['photo']				= $row['photo_url'];
		$chatData['chat_status']		= $row['chat_status'];
		$chatData['thread_id']		    = $row['chat_thread_id'];
		$chatData['thread_title']		= $row['thread_title'];
		$chatData['apmt_id']			= $row['appointment_id'];
        array_push($response['chat_det'],$chatData);

	}
	
}
echo json_encode($response);
?>
