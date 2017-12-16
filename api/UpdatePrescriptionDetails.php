<?php
//require_once("config.php");
error_reporting(0);
require_once("../includes/appointmentClass.php");
$prescription = json_decode(file_get_contents("php://input"));


$apmt_id 	=	$prescription->apmt_input->apmt_id;
$doctor_id	=	$prescription->apmt_input->doctor_id;
$hs_id		=	$prescription->apmt_input->hs_id;
$hcc_id		=	$prescription->apmt_input->hcc_id;
$prescriptionData = $prescription->prescription;
$device_id 		= $prescription->session_info->device_id;
$sess_token 	= $prescription->session_info->access_token;

$response = array();
$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);
if($validate_session != ""){

   if($apmt_id =="" ){
		$response['error']['result']="0";
		$response['error']['error_code']="";    
		$response['error']['error_type']="";			
		$response['error']['error_message']='Appointmentid cannot be null';		
	}else{		
		$response['error']['result'] ="0";
		$response['error']['error_code']="";
		$response['error']['error_message']="";
		$response['error']['error_type']="";

		$apmtData = $appointmentObj->validate_doctor($apmt_id);

		$apmt 	  =  mysqli_fetch_assoc($apmtData);
		
		if(($apmt['doctor_id']  == $doctor_id) && ($apmt['appointment_id']  == $apmt_id)){  

			foreach($prescriptionData as  $val){			
				
 					if($val->med_type == ""){
						$response['error']['result']="0";
						$response['error']['error_code']="";    
						$response['error']['error_type']="";
						$response['error']['error_message']= "Medicine type cannot be null";
 					}else if($val->med_name == ""){
						$response['error']['result']="0";
						$response['error']['error_code']="";    
						$response['error']['error_type']="";
						$response['error']['error_message']= "Medicine name cannot be null";
					}else if($val->dosage == ""){
						$response['error']['result']="0";
						$response['error']['error_code']="";    
						$response['error']['error_type']="";
						$response['error']['error_message']= "Medicine dosage cannot be null";
 					}else if($val->frequency_string== ""){
 						  $response['error']['result']="0";
						  $response['error']['error_code']="";    
						  $response['error']['error_type']="";
 						  $response['error']['error_message']= "Medicine timings cannot be null";
 					}else{	
 						if($val->prescription_id != ""){
 							$recordCount = $appointmentObj->validate_prescription($val->prescription_id);
 							if($recordCount['cnt'] == 0){
 								  $response['error']['result']="0";
								  $response['error']['error_code']="";    
								  $response['error']['error_type']="";
 								  $response['error']['error_message']= "Prescription id mismatch";
 							}
 						}
 						$prescription_id = $val->prescription_id;
 						$med_name		 = $val->med_name;
 						$med_type		 = $val->med_type;
 						$med_dosage      = $val->dosage;
 						$frequency_type  = $val->frequency_type;
 						$frequency_string= $val->frequency_string;
 						$med_duration 	 = $val->course;
 						$food_timings 	 = $val->med_intake;
 						$instructions 	 = $val->remarks;
 						$delete_flag     = $val->delete_flag;	
 						$template_id     = $val->template_id; 					
						$res = $appointmentObj->update_prescription_details($apmt_id,$doctor_id,$prescription_id,$med_name,$med_type,$med_dosage,$frequency_type,$frequency_string,$med_duration,$food_timings,$instructions,$delete_flag,$template_id);
						if(isset($res)){
							$rslt = $appointmentObj->get_prescription_details($apmt_id);
							$response['prescription_details']=array();						
							if($rslt!=""){
								foreach($rslt  as $value){
									$medicine['prescription_id']= (isset($value['prescription_id'])) ? $value['prescription_id'] : '';
									$medicine['med_name']= (isset($value['med_name']))?$value['med_name'] : '';
									$medicine['med_type']=(isset($value['med_type']))?$value['med_type'] : '';
									$medicine['dosage']=(isset($value['dosage']))?$value['dosage'] : '';
									$medicine['frequency']=(isset($value['frequency_string']))?$value['frequency_string'] : '';
									$medicine['frequency']=(isset($value['frequency_type']))?$value['frequency_type'] : '';
									$medicine['course']=(isset($value['course'])) ? $value['course'] : '';
									$medicine['med_intake']	=(isset($value['med_intake'])) ? $value['med_intake'] : '';
									$medicine['remarks']	=(isset($value['remarks'])) ? $value['remarks'] : '';
									$medicine['template_id']	=(isset($value['template_id'])) ? $value['template_id'] : '';
									array_push($response['prescription_details'],$medicine);		
								}
						    }else{
						    	$response['prescription_details'] ="";
						    }
						}
					}
			}        		
		}else{
			$response['error']['result']="0";
		    $response['error']['error_code']="";    
		    $response['error']['error_type']="";
			$response['error']['error_message']='Appointmentid and doctor id is mismatching';		
		}
	}
}else{
    $response['error']['result']="0";
    $response['error']['error_code']="";    
    $response['error']['error_type']="";
    $response['error']['error_message']="Doctor id and token Mismatch";
}	
     
echo json_encode($response);

?>
