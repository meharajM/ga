<?php
//require_once("config.php");
require_once("../includes/appointmentClass.php");
$login = json_decode(file_get_contents("php://input"));

 $doctor_email 	= $login->doctor_info->doctor_email;
 $doctor_password= $login->doctor_info->doctor_pwd;// hash format encrypt
 $doctor_pwd 	= hash('sha256',$doctor_password); 
 $hcc_id		= $login->doctor_info->hcc_id;
 $device_id		= $login->doctor_info->device_id;
 $lattitude		= $login->doctor_info->location->latitude;
 $longitude		= $login->doctor_info->location->langitude;
 //$path 		= "https://doctor.growayu.com/growayudoctor/uploads/doctor_photo/";
 $path 			= "http://52.66.157.195/growayu/ganewdesign/uploads/doctor_photo/";

$response= array();

if($doctor_email ==""){	
	$response['error']['result']="1";
	$response['error']['error_code']="";	
	$response['error']['error_type']="";			
	$response['error']['error_message']='Emailid cannot be null';	
}
if($doctor_pwd ==""){	
	$response['error']['result']="1";
	$response['error']['error_code']="";	
	$response['error']['error_type']="";	
	$response['error']['error_message']='Password cannot be null';		
}

if($doctor_email !="" && $doctor_pwd !=""){
	
	$response['error']['result']="0";
	$response['error']['error_code']="";
	//$response['error']['error_message']="";
	$response['error']['error_type']="";

	$doctorLogin = $appointmentObj->validate_doctor_login($doctor_email,$doctor_pwd);
	$count = mysqli_num_rows($doctorLogin);

	if($count >0){
    $doc_details = mysqli_fetch_assoc($doctorLogin);
    $doctor_id = $doc_details['doctor_id'];

            	$validate = $appointmentObj->validate_session_info($doctor_id,$device_id);
            
            	if(isset($validate)){
            		$id    			= $validate['id'];
            		$session_token 	= $validate['token'];
            		$exp_date 		= $validate['expiry_time'];
            		$device_name	= $validate['device_name'];
            		$device_type	= $validate['device_type'];
            		$device_version	= $validate['device_version'];
            		$lattitude		= $validate['lattitude'];
            		$longitude 		= $validate['longitude'];
            		$created_time 	= $validate['created_time'];	

                    if($exp_date  > date("Y:m:d H:i:s")){
                    	$token = $session_token;
                    	$expiry_time = $exp_date;
                    	$response['doctor']['token']=$token;
                    }else{

                    	
                    	$res   = $appointmentObj->archive_doctor_login_info($id,$doctor_id,$device_id,$session_token,$exp_date,$device_name,$device_type,$device_version,$lattitude,$longitude,$created_time);
                        $updateDoctor = $appointmentObj->save_access_token($doctor_id,$device_id,$lattitude,$longitude);  

                    	if($updateDoctor)
 						$tok = $appointmentObj->validate_session_info($doctor_id,$device_id);
						$response['doctor']['token']=$tok['token'];
                    }
                }else{
                		$updateDoctor = $appointmentObj->save_access_token($doctor_id,$device_id,$lattitude,$longitude); 
						if($updateDoctor)
 						$tok = $appointmentObj->validate_session_info($doctor_id,$device_id);
						$response['doctor']['token']=$tok['token'];
                }	 
				
				$response['doctor']['doctor_name']	= $doc_details['full_name'];
				$response['doctor']['doctor_id']	= $doctor_id;
				$response['doctor']['photo']  		= $path.$doc_details['photo'];
				$response['doctor']['user_id'] 		= $doc_details['email'];
			

                $response['doctor']['subscription_type'] = array();
	                $type['signed_for_self_vc'] 	= $doc_details['signed_for_self_vc'];
	                $type['signed_for_self_pc'] 	= $doc_details['signed_for_self_pc'];
	                $type['signed_for_offline_chat']=  $doc_details['signed_for_offline_chat'];	
               		array_push($response['doctor']['subscription_type'] ,$type);

		  		$hcc_details = $appointmentObj->get_doctor_hcc($doctor_id);
				$response['doctor']['hcc_id'] = array();
					while($row = mysqli_fetch_assoc($hcc_details)){
						$hcc['hcc_id'] = $row['hcc_id'];
						$hcc['hcc_name'] = $row['hcc_name'];
						array_push( $response['doctor']['hcc_id'],$hcc);   
					}       		         
		}else{
			$response['error']['result']="1";
			$response['error']['error_code']="";	
			$response['error']['error_type']="";	
			$response['error']['error_message']='Invalid Data : Email and password mismatch';	
	}
} 

 echo json_encode($response);
?>
