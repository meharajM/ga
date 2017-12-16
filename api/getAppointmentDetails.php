<?php
require_once("../includes/appointmentClass.php");
$apmt = json_decode(file_get_contents("php://input"));

$apmt_id	= $apmt->apmt_input->apmt_id;
$doctor_id	= $apmt->apmt_input->doctor_id;
$hcc_id		= $apmt->apmt_input->hcc_id;

$response = array();
$inputData		= $appointmentObj->validate_doctor($apmt_id);
while($row = mysqli_fetch_assoc($inputData)){
	$input_doctor = $row['doctor_id'];
	$input_hcc    = $row['hcc_id'];
	if($doctor_id!="" )	{
		if(	$input_doctor != $doctor_id ){
			$response['error']['error_message']='Invalid data : Doctor id did not match with appointment id';
		}
	}
	if($hcc_id!="" )	{	
		if($input_hcc !=$hcc_id){
			$response['error']['error_message']='Invalid data : HCC id did not match with appointment id';
		}
	}
}



$apmt_type="";
if($apmt_id == ""){
	$message="Appointment ID cannot be null";
}else {

	$response['error']['result']="0";
	$response['error']['error_code']="";
	$response['error']['error_message']="";
	$response['error']['error_type']="";
		$apmtData 		= $appointmentObj->get_appointment_data($apmt_id);	
		$caseData		= $appointmentObj->get_casesheet_details($apmt_id);
		$healthRecord 	= $appointmentObj->get_health_record_details($apmt_id);
		$precription	= $appointmentObj->get_prescription_details($apmt_id);
     	$consultation	= $appointmentObj->get_consultation_summary($apmt_id);   	
     
	while($row = mysqli_fetch_assoc($apmtData)){

		$apmt_type=$row['appointment_type'];

		 if($apmt_type== 'Video/Audio'){
        	$apmnt_type= 'VC';
        }else{
        	$apmnt_type= 'PC';
        }
		$response['appointments_details']['appointment_det']['apmt_id']		= $apmt_id ;
		$response['appointments_details']['appointment_det']['apmt_type']	= $apmnt_type;
		$response['appointments_details']['appointment_det']['apmt_date']	= $row['booking_date'];
		$response['appointments_details']['appointment_det']['apmt_time']	= $row['booking_time'];
		$response['appointments_details']['appointment_det']['apmt_status']	= $row['status'];

		$response['appointments_details']['health_seeker_profile']['hs_id']	=$row['health_seeker_id'];
		$response['appointments_details']['health_seeker_profile']['hs_name']	= $row['name'];
		$response['appointments_details']['health_seeker_profile']['hs_phone']	= $row['mobile'];
		$response['appointments_details']['health_seeker_profile']['age']	  	=$row['age'];
		$response['appointments_details']['health_seeker_profile']['blood_group']= $row['blood_group'];
		$response['appointments_details']['health_seeker_profile']['gender']	 = $row['gender'];
		$response['appointments_details']['health_seeker_profile']['address']	 = $row['address1'];
		$response['appointments_details']['health_seeker_profile']['height']	 = $row['height_feet'];
		$response['appointments_details']['health_seeker_profile']['weight']	 = $row['weight'];
		$response['appointments_details']['health_seeker_profile']['habbits']	 = $row['habits'];
		$response['appointments_details']['health_seeker_profile']['allergies']	 = $row['allergies'];
		$response['appointments_details']['health_seeker_profile']['ailments']   = $row['ailments'];
		$response['appointments_details']['health_seeker_profile']['photo_url']	 = $row['photo_url']; 	
	}
    
    	$response['appointments_details']['appointment_det']['case_sheet']['consultation_reason']= 
		"";
		$response['appointments_details']['appointment_det']['case_sheet']['first_time_consult']= 
		"";
		$response['appointments_details']['appointment_det']['case_sheet']['case_description']=
		"";
		
    while($row = mysqli_fetch_assoc($caseData)){ 

		$response['appointments_details']['appointment_det']['case_sheet']['consultation_reason']= 
		$row['consultation_reason'];
		$response['appointments_details']['appointment_det']['case_sheet']['first_time_consult']= 
		$row['first_time_consult'];
		$response['appointments_details']['appointment_det']['case_sheet']['case_description']=
		$row['problem_details'];
		
    }   


    $response['appointments_details']['appointment_det']['health_record']=array();
	$health_count = mysqli_num_rows($healthRecord);
	if($health_count > 0){	
		while($row = mysqli_fetch_assoc($healthRecord)){
			  	$record['id'] =$row['health_record_id'];
				$record['name'] =$row['doc_name'];
				$record['doc_datatype'] =$row['doc_datatype'];
				$record['description'] =$row['doc_desc'];
				$record['doc_type'] =$row['doc_type'];
				$record['doc_class'] =$row['doc_class'];
				array_push($response['appointments_details']['appointment_det']['health_record'],$record);
		} 
	}


	$response['appointments_details']['consultation_details']['prescription_details'] = array();
	while($row = mysqli_fetch_assoc($precription)){ 
		$prescription['prescription_id']= (isset($row['prescription_id']) ) ? $row['prescription_id'] : '';
		$prescription['med_name']	= (isset($row['med_name'])) ? $row['med_name'] : '';
		$prescription['med_type']	=(isset($row['med_type'])) ? $row['med_type'] : ''; 
		$prescription['dosage']		= (isset($row['dosage'])) ? $row['dosage'] : '';
		$prescription['frequency_string']= (isset($row['frequency_string'])) ? $row['frequency_string'] : '';
		$prescription['frequency_type']	= (isset($row['frequency_type'])) ? $row['frequency_type'] : '';
		$prescription['course']		= (isset($row['course'])) ? $row['course'] : '';
		$prescription['med_intake']	= (isset($row['med_intake'])) ? $row['med_intake'] : '';
		$prescription['remarks']	= (isset($row['remarks'])) ? $row['remarks'] : '';
		$prescription['template_id']= (isset($row['template_id'])) ? $row['template_id'] : '';
		array_push($response['appointments_details']['consultation_details']['prescription_details'] ,$prescription);
	}

	if(isset($consultation)){	
		$response['appointments_details']['consultation_details']['consultation_summary']['consultation_id']			= $consultation['consultation_id'];
		$response['appointments_details']['consultation_details']['consultation_summary']['Diagnosis']			= $consultation['diagnosis'];
		$response['appointments_details']['consultation_details']['consultation_summary']['mgmt_plan']			= $consultation['details_diagnosis'];
		$response['appointments_details']['consultation_details']['consultation_summary']['followup_in']	    =$consultation['next_followup'];
		$response['appointments_details']['consultation_details']['consultation_summary']['followup_date']	    = $consultation['next_followup_date'];
		$response['appointments_details']['consultation_details']['consultation_summary']['waive_fee']			=$consultation['waiver_status'];
		$response['appointments_details']['consultation_details']['consultation_summary']['waived_amount']		=$consultation['waived_amt'];
		$response['appointments_details']['consultation_details']['consultation_summary']['doctor_notes']=$consultation['doctor_notes'];
		$response['appointments_details']['consultation_details']['consultation_summary']['ga_notes']=$consultation['notes_to_ga'];
		$response['appointments_details']['consultation_details']['consultation_summary']['reffered_doctor']=$consultation['reffered_doctor'];
		$testIDs 	   = trim($consultation['test_ids']);
		$instructionIDs =  trim($consultation['seeker_instruction_id']);
		$response['appointments_details']['consultation_details']['consultation_summary']['suggested_test']=array();

			if($testIDs !=""){
				$labTest 	= $appointmentObj->get_labtest_data($testIDs);
				while($row = mysqli_fetch_assoc($labTest)){
					$test['test_id']   = $row['labtest_id'];
					$test['test_name'] = $row['labtest_name'];
					array_push($response['appointments_details']['consultation_details']['consultation_summary']['suggested_test'],$test);
				}
			} 

			if($instructionIDs !=""){
			$seekerInstruction 	= $appointmentObj->get_seeker_instructions($doctor_id,$instructionIDs);
				while($row = mysqli_fetch_assoc($seekerInstruction)){
					$response['appointments_details']['consultation_details']['consultation_summary']['seeker_instructions']= array();
					$instructions['instruction_id']   = $row['instruction_id'];
					$instructions['instruction_text'] = $row['instruction_text'];
					array_push($response['appointments_details']['consultation_details']['consultation_summary']['seeker_instructions'],$instructions);
				}
			}
	}else{
		$response['appointments_details']['consultation_details']['consultation_summary']="";
	}	

}
echo json_encode($response);
?>