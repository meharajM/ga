<?php
require_once("../includes/appointmentClass.php");
$document = json_decode(file_get_contents("php://input"));
/*
$document_id = $document->document->id;
$hs_id  = $document->document->hs_id;
$device_id = $document->session_info->device_id;
$sess_token = $document->session_info->access_token;*/

$hs_id ='2308';
$document_id='444';

$response = array();
$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);

if($validate_session != ""){
		if($hs_id  == ""){
			$response['error']['result']="0";
			$response['error']['error_code']="";	
			$response['error']['error_type']="";
			$response['error']['error_message']="Health seeker id cannot be null"; 
		}else if($document_id == ""){
			$response['error']['result']="0";
			$response['error']['error_code']="";	
			$response['error']['error_type']="";
			$response['error']['error_message']="Record id cannot be null"; 
		}else{
			$record = $appointmentObj->validate_uploaded_document($hs_id,$document_id);
			$rec_count	= mysqli_num_rows($record);
			
			if($rec_count > 0){
				$res = mysqli_fetch_assoc($record);
		          
				$response['document']['doc_type']		= $res['doc_type'];
				$response['document']['doc_name']		= $res['doc_name'];
				$response['document']['doc_data']		= base64_encode($res['doc_data']);
				$response['document']['doc_datatype']	= $res['doc_datatype'];
				$response['document']['doc_desc']		= $res['doc_desc'];
				$response['document']['doc_class']		= $res['doc_class'];
				$response['document']['uploaddate']		= $res['uploaddate'];
			}else{
					$response['error']['result']="0";
					$response['error']['error_code']="";	
					$response['error']['error_type']="";
				  	$response['error']['error_message']="Record not found"; 
			}

		}
}else{
	$response['error']['result']="-999";
	$response['error']['error_code']="";	
	$response['error']['error_type']="";
	$response['error']['error_message']="Doctor id and token Mismatch";
}
echo json_encode($response);
?>