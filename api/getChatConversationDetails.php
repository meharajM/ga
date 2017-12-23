<?php
require_once("../includes/chatClass.php");
$chat_conv = json_decode(file_get_contents("php://input"));
//$thread_id 		= $chat->thread_info->thread_id;
//$doctor_id 		= $chat->thread_info->doctor_id;
//$health_seeker_id = $chat->thread_info->hs_id;
$doctor_id 				= 12;
$thread_id 				= 10;
$health_seeker_id		= 21;
$apmt_id				= '';
$chatConversationMsg 	=$chatObj->get_chat_conversation_history($thread_id,$health_seeker_id);


$response= array();
if($thread_id == ""){
	$response['error']['result']="1";
	$response['error']['error_code']="";
	$response['error']['error_type']="";
	$response['error']['error_message']="Thread id cannot be null";
}else{

	$response['error']['result']="0";
	$response['error']['error_code']="";
	$response['error']['error_type']="";

		$response['chat_conversation']['thread_id'] 		= $thread_id;
		$response['chat_conversation']['doctor_id'] 		= $doctor_id;
		$response['chat_conversation']['health_seeker_id'] 	= $health_seeker_id;
		$response['chat_conversation']['thread_status'] 	= '';
		$response['chat_conversation']['chat_status'] 		= 'with doctor';
		$response['chat_conversation']['apmt_id']			= '';

		$response['chat_conversation']['chat_det'] = array();	

		while($row = mysqli_fetch_assoc($chatConversationMsg)){
			$chat['conv_id']	=	$row['chat_cnv_id'];
			$chat['sender_type']=	$row['sender_type'];
			$chat['sender_id']	=	$row['sender_id'];
			$chat['conversation_msg']	=	$row['chat_cnv_msg'];
			$chat['chat_time']	=	$row['chat_timestamp'];
			$chat['attachments']=array();
			if($row['chat_attachments'] != 'no'){
				$upload_rec = $chatObj->get_attached_details($thread_id);				
				while($rec = mysqli_fetch_assoc($upload_rec)){
					$upload['health_record_id'] =	$rec['health_record_id'];
					$upload['doc_name'] 		=	$rec['doc_name'];
					array_push($chat['attachments'],$upload);
				}				
			}

			array_push($response['chat_conversation']['chat_det'],$chat);
		}
}
echo json_encode($response);
?>
