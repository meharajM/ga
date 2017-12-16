<?php
require_once("../includes/appointmentClass.php");

$template = json_decode(file_get_contents("php://input"));


$hcc_id 		= $template->template_input->hcc_id;
$doctor_id 		= $template->template_input->doctor_id;
$template_name 	= $template->template_input->template_name;
$speciality 	= $template->template_input->speciality;
$device_id 		= $template->session_info->device_id;
$sess_token 	= $template->session_info->access_token;

$response= array();

$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);
if($validate_session != ""){
		if($doctor_id ==""){
			$response['error']['result']="0";
		    $response['error']['error_code']="";    
		    $response['error']['error_type']="";			
			$response['error']['error_message']='Doctor id cannot be null';				
		}else{
			$response['error']['result']="0";
			$response['error']['error_code']="";
			$response['error']['error_message']="";
			$response['error']['error_type']="";
			if($speciality !=""){
				$special = $aapointmentObj->get_specialization($speciality);
				$speaility_id= $special['id'];
			}else{
				$speaility_id = "";
			}
			$res = $appointmentObj->get_my_template_list($doctor_id,$hcc_id,$template_name,$speaility_id);
			if($res !=""){
				$response['template_det'] = array();
					while($row = mysqli_fetch_assoc($res)){ 	
						$templateList['template_id']	=$row['template_id'];
						$templateList['template_name']	=$row['template_name'];
						$templateList['diseases']		=$row['diseases'];
						$templateList['speciality']		=$row['speciality'];
						array_push($response['template_det'],$templateList);
					}
			}else{
				$response['error']['error_message']='Templates Not found';	
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