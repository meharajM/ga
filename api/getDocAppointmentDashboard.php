<?php
require_once("../includes/appointmentClass.php");

$apmt = json_decode(file_get_contents("php://input"));
$date		= $apmt->appntment_input->date;
$doctor_id	= $apmt->appntment_input->doctor_id;
$hcc_id		= $apmt->appntment_input->hcc_id;
$device_id  = $apmt->session_info->device_id;
$sess_token = $apmt->session_info->access_token;
/*
  $doctor_id	='1';
  $hcc_id		='1';
  $date		='20171031';
  */

//session info - validate token
$response = array();
$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);

if($validate_session != ""){
		if($doctor_id == ""){
			$response['error']['result']="0";
			$response['error']['error_code']="";
			$response['error']['error_type']="";
			$response['error']['error_message']="Doctor id cannot be null";
		}else {
				$response['error']['result']="0";
				$response['error']['error_code']="";
				$response['error']['error_message']="";
				$response['error']['error_type']="";

				if($date == ''){
					$date = date('Ymd');
				}
				$apmtData 		= $appointmentObj->get_date_based_appointment_data($doctor_id,$date);
				$previous		= $appointmentObj->get_doctor_previous_apmt($doctor_id,$date);
				$next 			= $appointmentObj->get_doctor_next_apmt($doctor_id,$date);
				$response['appointments_details']['appointment']= array();
				$locHccId = "";
				$locHccName = "";

				while($row = mysqli_fetch_assoc($apmtData)){
					if($row['appointment_type'] == 'Video/Audio'){
						$apmt_type= 'VC';
					}else{
						$apmt_type= 'PC';
					}

					$data['appointment_id']	= $row['appointment_id'] ;
					$data['appointment_type']	= 	$apmt_type;
					$data['appointment_date']	= $row['booking_date'];
					$data['appointment_time']	= $row['booking_time'];
					$data['appointment_status']= $row['status'];
					$hcc_id = $row['hcc_id'];

					if ($hcc_id != 0 && $hcc_id != $locHccId) {
						$hccData1= $appointmentObj->get_hcc_details($hcc_id);
						$hccData = mysqli_fetch_assoc($hccData1);
						$locHccId = $hccData['hcc_id'];
						$locHccName = $hccData['hcc_name'];
					}
					$data['hcc_det']['hcc_id']    = $locHccId;
					$data['hcc_det']['hcc_name']  = $locHccName;
					if( $row['age'] == ""){
						$age = $row['age1'];
					}else{
						$age =$row['age'];
					}
					$data['health_seeker']['health_seeker_id']   = $row['health_seeker_id'];
					$data['health_seeker']['health_seeker_name'] = $row['name'];		
					$data['health_seeker']['age']      = $age;
					$data['health_seeker']['gender']   =  $row['gender'];
					$data['health_seeker']['mobile']   =  $row['mobile'];	
					$data['health_seeker']['photo_url']	 = $row['photo_url']; 	
					array_push($response['appointments_details']['appointment'] ,$data);
				}
				$response['appointments_details']['appointment_summary']['total'] ="10";
				$response['appointments_details']['appointment_summary']['pending'] ="10";
				$response['appointments_details']['appointment_summary']['missed'] ="10";
				$response['appointments_details']['next_appointment_date']=$next['booking_date'];
				$response['appointments_details']['prev_appointment_date']=$previous['booking_date'];
		}
}else{
	$response['error']['result']="-999";
	$response['error']['error_code']="";	
	$response['error']['error_type']="";
	$response['error']['error_message']="Doctor id and token Mismatch";
}
	echo json_encode($response);

?>
