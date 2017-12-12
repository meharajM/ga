<?php
require_once("../includes/appointmentClass.php");
include "../vendor/opentok.phar";

use OpenTok\OpenTok;

$apiKey = '45638452';
$apiSecret = '00d33147f4afff2bda321893396d8dafd8a37eba';
$opentok = new OpenTok($apiKey, $apiSecret);
$video = json_decode(file_get_contents("php://input"));


$apmt_id	= $video->apmt_info->apmt_id;
$doctor_id	= $video->apmt_info->doctor_id;
$hcc_id		= $video->apmt_info->hcc_id;
$hs_id		= $video->apmt_info->health_seeker_id;
$date		= $video->apmt_info->date;




/*$apmt_id='557';
$doctor_id=1;
$hcc_id='0';
$hs_id='2039';
$date='24-11-2017';*/

$response= array();

if($doctor_id == ""){
	$response['error']['result']="0";
	$response['error']['error_code']="";    
	$response['error']['error_type']="";
	$response['error']['error_message']="Doctor id cannot be null";
}else if($apmt_id == ""){
	$response['error']['result']="0";
	$response['error']['error_code']="";    
	$response['error']['error_type']="";
	$response['error']['error_message']="Appointment id cannot be null";
}else{

/*if($hs_id == ""){
	$response['error']['error_message']="Health seeker id cannot be null";
}


if($date == ""){
	$response['error']['error_message']="Date cannot be null";
}*/
$response['error']['result']="0";
	$response['error']['error_code']="";
	$response['error']['error_message']="";
	$response['error']['error_type']="";
$res = $appointmentObj->get_tokbox_url($apmt_id);



$sessionId = $res['Sessionid'];


$token = $opentok->generateToken($sessionId);

$response['video_session_det']['provider']='tokbox';
$response['video_session_det']['session']=$sessionId;
$response['video_session_det']['token']=$token;
$response['video_session_det']['apiKey']=$apiKey;


}
echo json_encode($response);


?>
