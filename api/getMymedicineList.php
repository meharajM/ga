<?php
require_once("../includes/appointmentClass.php");
$medicine = json_decode(file_get_contents("php://input"));

 echo $doctor_id = $medicine->medicine_list->doctor_id;
 $med_name  = $medicine->medicine_list->med_name;
 $device_id     = $medicine->session_info->device_id;
 $sess_token    = $medicine->session_info->access_token;
/*
$doctor_id=1;
$med_name  = 'C';
*/

$response = array();
$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);

if($validate_session != ""){
    if($doctor_id == ""){
        $response['error']['result']="1";
        $response['error']['error_code']="";    
        $response['error']['error_type']="";
        $response['error']['error_message']="Doctor id cannot be null";
    }else if($med_name == ""){
        $response['error']['result']="1";
        $response['error']['error_code']="";    
        $response['error']['error_type']="";
        $response['error']['error_message']="Medicine name cannot be null";
    }else{
        $response['error']['result']="0";
        $response['error']['error_code']="";
        $response['error']['error_message']="";
        $response['error']['error_type']="";
        $response['my_medicine'] = array();
        $medList =  $appointmentObj->get_my_medicine_list($doctor_id,$med_name);  
	    while($row= mysqli_fetch_assoc($medList)){
            $med['med_id']		=$row['med_id'];
        	$med['med_brand_name']	=$row['med_brand_name'];
        	$med['med_generic_name']=$row['med_generic_name'];
        	$med['dosage']		=$row['dosage'];
        	$med['dosage_uom']	=$row['dosage_uom'];
        	array_push($response['my_medicine'] ,$med);
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