<?php
require_once("../includes/appointmentClass.php");

$templatePrescription = json_decode(file_get_contents("php://input"));

$doctor_id 		= $templatePrescription->template_input->doctor_id;
$template_id	= $templatePrescription->template_input->template_id;
$device_id 		= $templatePrescription->session_info->device_id;
$sess_token 	= $templatePrescription->session_info->access_token;

$response= array();

$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);
if($validate_session != ""){
	if($template_id ==""){	
			$response['error']['result']="0";
	        $response['error']['error_code']="";    
	        $response['error']['error_type']="";		
			$response['error']['error_message']='Template id cannot be null';	
	}else{
		$response['error']['result']="0";
		$response['error']['error_code']="";
		$response['error']['error_message']="";
		$response['error']['error_type']="";
		$prescription = $appointmentObj->get_template_medicine($template_id);
		if($prescription !=""){
			$response['prescription_details'] = array();
			while($row = mysqli_fetch_assoc($prescription)){ 
				$medicine['med_id']			= $row['med_id'];
				$medicine['med_name']		= $row['med_name'];
				$medicine['med_type']		= $row['med_type'];
				$medicine['dosage']			= $row['med_dosage'];
				$medicine['course']			= $row['med_duration'];
				$medicine['frequency']		= $row['med_frequency_string'];
				$medicine['frequency_type']	= $row['med_frequency_type'];
				$medicine['med_intake']		= $row['food_timimgs'];
				$medicine['remarks']		= $row['discription'];	
				array_push($response['prescription_details'] ,$medicine);
			}
		}else{
			$response['error']['result']="0";
			$response['error']['error_code']="";    
			$response['error']['error_type']="";
			$response['error']['error_message']='Medicines Not Found';	
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