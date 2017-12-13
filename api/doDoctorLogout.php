<?php
//require_once("config.php");
require_once("../includes/appointmentClass.php");
$logout = json_decode(file_get_contents("php://input"));
$doctor_id 		= $logout->login_info->doctor_id;
$device_id 		= $logout->login_info->device_id;
$sessionID 		= $logout->login_info->sessionId;
$sessionToken 	= $logout->login_info->session_token;

$response= array();

if($doctor_id ==""){			
	$response['error']['error_message']='doctorid cannot be null';		

}

if($sessionToken ==""){			
	$response['error']['error_message']='Sessiontoken cannot be null';		

}else{

	$res = $appointmentObj->validate_session_info($doctor_id,$device_id);
//	echo $res;
	
	if($res !=""){
		$res= $appointmentObj->update_login_session_info($doctor_id,$sessionToken);
		if($res)
		$response['error']['error_message']='success';	
	}else{
		$response['error']['error_message']='DoctorID and token mismatch';	
	}
}

echo json_encode($response);

?>