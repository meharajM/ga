<?php
require_once("../includes/appointmentClass.php");
$consultation = json_decode(file_get_contents("php://input"));

$response= array();

$apmt_id	= $consultation->apmt_input->apmt_id;
$doctor_id 	= $consultation->apmt_input->doctor_id;
$hs_id 		= $consultation->apmt_input->hs_id;
$hcc_id 	= $consultation->apmt_input->hcc_id;
$device_id     = $medicine->session_info->device_id;
$sess_token    = $medicine->session_info->access_token;
$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);

if($validate_session != ""){
	if($apmt_id =="" ){
		$response['error']['result']="0";
		$response['error']['error_code']="";
		$response['error']['error_type']="";
		$response['error']['error_message']='Appointmentid cannot be null';
	}else{
		$response['error']['result']="1";
		$response['error']['error_code']="";
		$response['error']['error_message']="";
		$response['error']['error_type']="";
		$apmtData = $appointmentObj->validate_doctor($apmt_id);
		$apmt 	  =  mysqli_fetch_assoc($apmtData);
		if($apmt['status'] == 'closed'){
			$response['error']['error_message']='Appointment has been closed already';
		}
		if(($apmt['doctor_id']  == $doctor_id) && ($apmt['appointment_id']  == $apmt_id) && ($apmt['health_seeker_id']== $hs_id)){

		$suggested_test	=  $consultation->summary->suggested_test;
		$tids = array(); 
		$tname= array(); 
		foreach($suggested_test as  $val){
			 $test_count = $appointmentObj->validate_test_id($test_id);
			 if($test_count['cnt'] == 0){
			 	$response['error']['result']="0";
				$response['error']['error_code']="";
				$response['error']['error_type']="";	
			 	$response['error']['error_message']='Invalid Data : Testid not valid';	
			 }
			 $tids[] = $val->test_id; 
			 $tname[] = $val->test_name; 			
		}
		$test_id= implode(',',$tids);
		$test_name= implode(',',$tname);

		$seeker_info	=  $consultation->summary->seeker_instructions;
		$info_ids = array(); 
		$info_text= array(); 
		foreach($suggested_test as  $val){
			 $info_ids[]  = $val->instruction_id; 
			 $info_text[] = $val->instruction_text; 			
		}
		$seeker_info_id   = implode(',',$info_ids);
		$seeker_info_text = implode(',',$info_text);
		
		$consultation_id= $consultation->summary->consultation_id;
		$diagnosis 		= $consultation->summary->diagnosis;
		$mgmt_plan 		= $consultation->summary->mgmt_plan;
		$followup_date 	= $consultation->summary->followup_date;
		$followup_in	= $consultation->summary->followup_in;
		$waiver_status	= $consultation->summary->waiver_status;
		$waived_amount	= $consultation->summary->waived_amount;
		//$gaNotes		= $consultation->summary->ga_notes;
		//$doctorNotes	= $consultation->summary->doctor_notes;
		$referedDoctor	= $consultation->summary->reffered_doctor;
		$test_ids       = $test_id;
		$seeker_instruction_id = $seeker_info_id;
			$res = $appointmentObj->update_consultation_summary($consultation_id,$apmt_id,$doctor_id,$diagnosis,$mgmt_plan,$followup_in,$followup_date,$waiver_status,$waived_amount,$test_ids,$seeker_instruction_id,$referedDoctor);
				$response['error']['result']="1";
				$response['error']['error_code']="";
				$response['error']['error_type']="";
				$response['error']['error_message']='success';
		}else{
				$response['error']['result']="0";
				$response['error']['error_code']="";
				$response['error']['error_type']="";
				$response['error']['error_message']='Appointmentid mismatch with doctor id and health seekerid';
		}
	$response['summary']['consultation_id']=$res;
}

}else{
    $response['error']['result']="-999";
    $response['error']['error_code']="";    
    $response['error']['error_type']="";
    $response['error']['error_message']="Doctor id and token Mismatch";
}
echo json_encode($response);
?>