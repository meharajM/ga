<?php
include_once('dbClass.php');

class Appointment extends myDBC{

			// FUNCTIONS RELATED TO DOCTOR'S PROFILE WILL START HERE //

	#function to validate doctor id based on appointment id

	public function validate_doctor($apmt_id){

		$sql = "SELECT appointment_id,hcc_id,health_seeker_id,doctor_id,status FROM appointments WHERE appointment_id= $apmt_id";
		$res = $this->runQuery($sql);
		return $res; 
	}

	#function to check whether the given doctorid is existing in the table or not based on the doctor_id

 	public function validate_doctor_registration($doctor_id){

 		$sql = "SELECT count(*) as cnt FROM doctors WHERE  doctor_id= $doctor_id";
 		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
 	}

 	#function to get the registered doctor's information based on the doctor_id

 	public function get_doctor_profile($doctor_id){

 		$sql = "SELECT * FROM doctors WHERE doctor_id='$doctor_id'";
 		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
 	}

 	#function to validate the doctor login

 	public function validate_doctor_login($doctor_email,$doctor_pwd){
 		 $sql ="SELECT  doctor_id,full_name,mobile,photo,signed_for_self_vc,signed_for_self_pc,signed_for_offline_chat,signed_for_hcc,signed_for_hcc_inclinic,signed_for_hcc_video,email  FROM doctors WHERE email='$doctor_email' and password='$doctor_pwd' and status='active'";
 		$res = $this->runQuery($sql);		
		return $res;

 	}


 		#function to fetch the hcc name based on the doctor_id

 	public function get_doctor_hcc($doctor_id){

 		$sql="SELECT a.hcc_id,a.doctor_id,b.hcc_name FROM hcc_doctor_link as a,health_care_centre as b where a.hcc_id = b.hcc_id and a.doctor_id=$doctor_id";
 		$res = $this->runQuery($sql);
		return $res;
 	}


			// FUNCTIONS RELATED TO DOCTOR'S PROFILE WILL END HERE //

 			// FUNCTIONS RELATED TO APPOINTMENT DETAILS WILL START HERE //

	#function to get appointment details based on dates for individual doctors

	public function get_date_based_appointment_data($doctor_id,$date){

		$sql = "SELECT a.*,b.name,b.age,b.photo_url,b.gender,b.height_feet,b.weight,b.blood_group,b.allergies,b.ailments, b.habits,b.address1 FROM appointments a,health_seeker b where a.doctor_id=$doctor_id and a.health_seeker_id=b.health_seeker_id and a.status in ('booked','paid','inprogress','expired','closed')  AND a.booking_date ='$date' order by booking_date,booking_time";
		$res = $this->runQuery($sql);
		return $res;     
	}

	#function to get all the appointment details based on Appointment ID

	public function get_appointment_data($apmt_id){

		 $sql= "SELECT a.*,b.name,b.age,b.gender,b.height_feet,b.weight,b.blood_group,b.allergies,b.ailments,b.mobile, b.habits,b.address1,b.health_seeker_id FROM appointments a,health_seeker b where a.health_seeker_id=b.health_seeker_id and a.appointment_id=$apmt_id";
		$res = $this->runQuery($sql);
		return $res; 
	}

	#function to get the csesheet details based on AppointmentID

	public function get_casesheet_details($apmt_id){

		$sql="SELECT * FROM  casesheet where  appointment_id = $apmt_id ";
		$res = $this->runQuery($sql);
		return $res;
	}

	#function to get the health record details based on AppointmentID

	public function get_health_record_details($apmt_id){

		$sql="SELECT a.health_record_id,a.health_seeker_id,a.appointment_id,b.doc_name,
	b.doc_datatype,b.doc_type,b.doc_desc,b.doc_class FROM health_record a,health_record_blob  b where a.health_record_id = b.health_record_id and a.appointment_id=$apmt_id";
		$res = $this->runQuery($sql);
		return $res;
	}

	#function to get the seeker instruction based on DoctorID and InstructionID

	public function get_seeker_instructions($doctor_id,$instructionIDs){
		if($instructionIDs !=''){
			$sql="SELECT instruction_text,instruction_id FROM  seeker_instruction where  doctor_id = $doctor_id and instruction_id IN($instructionIDs)";
			$res = $this->runQuery($sql);
		}else{
			$res="-1";
		}
			return $res;	
	}

	#function to get the HCC details based on HCC ID

	public function get_hcc_details($hcc_id){

	 	$sql="SELECT hcc_id,hcc_name,alias FROM health_care_centre WHERE hcc_id=$hcc_id";
		$res = $this->runQuery($sql);
		return $res;
	}

	#function to fetch my appointmnet details based on doctorid,hcc id,fromdate,todate

    public function get_my_appointment($doctor_id,$hcc_id,$fromDate,$toDate){

    	if($fromDate == "" && $toDate == ""){

    		$bookinDate = " and a.booking_date = NOW()";

    	}else if($fromDate != "" && $toDate == ""){

    		$bookinDate = " and a.booking_date >= $fromDate";

    	}else if($fromDate == "" && $toDate != ""){

    		$bookinDate = " and a.booking_date < $toDate";

    	}else{

    		 $bookinDate = " and a.booking_date BETWEEN '" . $fromDate . "' AND  '" . $toDate . "'";
    	}

        if($hcc_id !=""){

        	$hcc = " and a.hcc_id=$hcc_id";
        }else{
        	$hcc = "";
        }

        $sql ="SELECT a.*,b.name,b.age,b.gender,b.height_feet,b.weight,b.blood_group,b.allergies,b.ailments,b.mobile, b.habits,b.address1,b.health_seeker_id FROM appointments a,health_seeker b where  a.doctor_id='$doctor_id'  and a.health_seeker_id=b.health_seeker_id $bookinDate  $hcc order by booking_date,booking_time";
        	$res = $this->runQuery($sql);
		return $res;
    }


    #function to get the doctors appointment date for previous date

	public function get_doctor_previous_apmt($doctor_id,$date){

		$sql="SELECT appointment_id,booking_date FROM appointments WHERE booking_date < '$date' AND doctor_id='$doctor_id' ORDER BY booking_date DESC LIMIT 1";
		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
	}


	#function to get the doctors appointment date for next date or upcoming date

	public function get_doctor_next_apmt($doctor_id,$date){

	   	$sql="SELECT appointment_id,booking_date FROM appointments WHERE booking_date > '$date' AND doctor_id='$doctor_id'  ORDER BY booking_date ASC LIMIT 1";
		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
	}

	#function to get health seeker previous appointments

	public function get_myPrevious_apmts($doctor_id,$hs_id,$date,$status){

		if($status == "Y"){
			$sql="SELECT DISTINCT a.appointment_id,b.booking_date,b.purpose FROM prescription a ,appointments b WHERE a.appointment_id = b.appointment_id AND b.health_seeker_id ='$hs_id' AND b.booking_date < '$date'";
	    }else{
	    	$sql=" SELECT appointment_id,booking_date,purpose FROM appointments WHERE health_seeker_id ='$hs_id' AND doctor_id='$doctor_id' AND booking_date < '$date'";
	    }
		$res = $this->runQuery($sql);
		return $res;
	}

 			// FUNCTIONS RELATED TO APPOINTMENT DETAILS WILL END HERE //


			// FUNCTIONS RELATED TO PRESCRIPTION DETAILS WILL START HERE //


	#function to get the Prescription details based on AppointmentID

	public function get_prescription_details($apmt_id){

	 	$sql="SELECT * FROM  prescription where appointment_id =$apmt_id";
		$res = $this->runQuery($sql);
		return $res;
	}

	#function to get the Labtest details based on test ID

	public function get_labtest_data($labtestIDs){

 		if($labtestIDs !=''){
			$sql="SELECT labtest_id,labtest_name,labtest_code FROM  labtest_code_mst where  labtest_id IN($labtestIDs)";
			$res = $this->runQuery($sql);
	    }else{
	    	$res ="-1";
	    }
		return $res;
	}

	#function to update prescription details
	
	public function update_prescription_details($apmt_id,$doctor_id,$prescription_id,$med_name,$med_type,$med_dosage,$med_timings,$med_duration,$food_timings,$instructions,$delete_flag,$template_id){	
		
		if($prescription_id == "" && $delete_flag != "Y"){
			$db = $this->mysqli;
			$query = "INSERT INTO prescription(  appointment_id,doctor_id,med_type,med_name,dosage,frequency_string,course,med_intake,remarks) VALUES (?,?,?,?,?,?,?,?,?)";
			$stmt =$db->prepare($query);
			$stmt->bind_param('sssssssss',$apmt_id,$doctor_id,$med_type,$med_name,$med_dosage,$med_timings,$med_duration,$food_timings,$instructions);
				if($stmt->execute()){
					$res =  $stmt->insert_id;
				}else{
					$res =$stmt->error;
				}						
		}else if($prescription_id != ""  && $delete_flag != "Y"){
			
			$sql ="UPDATE prescription SET med_type='$med_type',med_name='$med_name',dosage='$med_dosage',frequency_string='$med_timings',course='$med_duration',med_intake='$food_timings',remarks='$instructions',template_id='$template_id' WHERE prescription_id=$prescription_id";
			$res = $this->runQuery($sql);
		}else{

			$sql ="DELETE FROM prescription  WHERE prescription_id=$prescription_id";	
			$res = $this->runQuery($sql);
		}
		return $res;
 	}

 	#function to validate prescription id is already exist or not

	public function validate_prescription($prescription_id){

		$sql   ="SELECT count(*) as cnt  FROM prescription WHERE prescription_id=$prescription_id";
		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
	}

	#function to get the medicine list based on doctor id and medicine name

 	public function get_my_medicine_list($doctor_id,$med_name){

 		  $sql= "SELECT * FROM my_medicine_list WHERE doctor_id='$doctor_id' AND med_brand_name   LIKE '$med_name%' OR med_generic_name LIKE '$med_name%'";
 		$res = $this->runQuery($sql);
 		return $res;
 	}

 	#function to get all the template list list based on the doctor_id

	public function get_my_template_list($doctor_id,$hcc_id,$template_name,$speaility_id){

		if($hcc_id != ""){
			$hcc = "AND  hcc_id='$hcc_id'";
		}else{
			$hcc = "";
		}
         
	    if($template_name !=""){
	    	$template = "AND  template_name LIKE '$template_name%'";
	    }else {
	    	$template = "";
	    }

	    if($speaility_id !=""){
	    	$special = "AND speciality = $speaility_id";
	    }else{
	    	$special = "";
	    }        

		$sql= "SELECT * FROM template_list WHERE doctor_id ='$doctor_id' $hcc $template $special";
		$res = $this->runQuery($sql);
		return $res;	  
	}

	#function to get the specialization based on the speaciality id 

	public function get_specialization($speciality){
 
		$sql="SELECT id,description FROM specialization WHERE id ='$speciality'";
		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
	}

	#function to get the medicine list based on the template id

	public function get_template_medicine($template_id){

		$sql="SELECT * FROM prescription_template_det WHERE  template_id ='$template_id'";
		$res = $this->runQuery($sql);
		return $res;
	}

  	#function to get the  previous prescribtion details

	public function get_previous_prescription($doctor_id,$healthSeeker,$apmt_id){
	    $sql="select * from prescription where  appointment_id='$apmt_id'";
		$res = $this->runQuery($sql);
		return $res; 
	}


	#function to get list of tests to be displayed in the dropdown

	public function get_lab_test($test_name){

		$sql="SELECT * FROM labtest_code_mst WHERE labtest_name LIKE '%$test_name%'";
		$res = $this->runQuery($sql);
		return $res;
	}

			// FUNCTIONS RELATED TO PRESCRIPTION DETAILS WILL END HERE //


			// FUNCTIONS RELATED TO CONSULTATION SUMMARY DETAILS WILL START HERE //

	#function to insert consultation summary details into table
 	
 	public function update_consultation_summary($consultation_id,$apmt_id,$doctor_id,$diagnosis,$mgmt_plan,$followup_in,$followup_date,$waiver_status,$waived_amount,$test_ids,$seeker_instruction_id,$referedDoctor){

 		if($consultation_id !=""){
			 $sql= "UPDATE consultation_summary SET diagnosis='$diagnosis',details_diagnosis='$mgmt_plan',next_followup='$followup_in',next_followup_date='$followup_date',waiver_status='$waiver_status',waived_amt='$waived_amount',test_ids='$test_ids',seeker_instruction_id='$seeker_instruction_id', reffered_doctor='$referedDoctor' WHERE consultation_id='$consultation_id'";
 				$res = $this->runQuery($sql);
 				return $res;
  		}else{
		
			$db = $this->mysqli;
			$query = "INSERT INTO consultation_summary(appointment_id,diagnosis,details_diagnosis,next_followup,next_followup_date,waiver_status,waived_amt,test_ids,seeker_instruction_id,reffered_doctor) VALUES (?,?,?,?,?,?,?,?,?,?)";
			$stmt =$db->prepare($query);
			$stmt->bind_param('ssssssssss',$apmt_id,$diagnosis,$mgmt_plan,$followup_in,$followup_date,$waiver_status,$waived_amount,$test_ids,$seeker_instruction_id,$referedDoctor);
			if($stmt->execute()){
				$res =  $stmt->insert_id;
			}else{
				$res =$stmt->error;
			}
				return $res;	
		}
		//return $res;				
 	}	

 	#function to get the health seeker consultation summary based on appointment id

    public function get_healthseeker_consultation_summary($apmt_id){
    	$sql = "select c.health_seeker_id,b.hcc_id,c.name,c.mobile,d.full_name,d.qualifications,d.licence_no from appointments b,health_seeker c,doctors d where b.health_seeker_id=c.health_seeker_id and b.doctor_id=d.doctor_id and b.appointment_id=$apmt_id";
    	$res = $this->runQuery($sql);
		$result = mysqli_fetch_assoc($res);
     	return $result;
    }

    #function to update the consultation status based on the appointment id

 	public function update_consultation_status($apmt_id){

 		$sql="UPDATE appointments SET status='closed' WHERE appointment_id='$apmt_id'";
 		$res = $this->runQuery($sql);
 		return $res;
 	}


 	#function to get the health seeker details and their appointment details

	public function get_pdfGeneratedDetails($apmt_id){

		$sql= "select a.booking_date,a.health_seeker_id,b.full_name from appointments a,doctors b where a.doctor_id=b.doctor_id and a.appointment_id='$apmt_id'";
		$res = $this->runQuery($sql);
		$result = mysqli_fetch_assoc($res);
		return $result;
	}

	#function to insert the pdf blob details into health record blob table
	public function add_health_recordBlob($health_seeker_id,$filename,$content,$description){

		$db = $this->mysqli;
		$docType= 'consultation_summary';
		$docClass='G';
		$dataType= 'application/pdf';
		$sql= "INSERT INTO health_record_blob(health_seeker_id,doc_type,doc_name,doc_data,doc_datatype,doc_desc, doc_class) VALUES(?,?,?,?,?,?,?)";	
		$stmt =$db->prepare($sql);
		$stmt->bind_param('sssssss',$health_seeker_id,$docType,$filename,$content,$dataType,$description,$docClass);
			if($stmt->execute()){
				$res =  $stmt->insert_id;
			}else{
				$res =$stmt->error;
			}	
		return $res;
	}

	#function to update the health record id and details into health record table
	public function update_health_record($hid,$health_seeker_id,$appointment_id,$description){

		$sql = "INSERT INTO health_record(health_record_id,health_seeker_id,appointment_id,description,document) VALUES ('$hid','$health_seeker_id','$appointment_id','$description','G')";
		$res = $this->runQuery($sql);
		return $res;
	}

	#function to validate record id and health seeker id is match

	public function validate_uploaded_document($hs_id,$document_id){

		$sql="select * from health_record_blob where health_record_id='$document_id' and health_seeker_id='$hs_id'";
		$res = $this->runQuery($sql);
		return $res;
	}


	#function to verify the test id is exists or not

 	public function validate_test_id($test_id){

 		$sql= "SELECT count(*) as cnt  FROM labtest_code_mst WHERE labtest_id='$test_id'";
 		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
 	}

 	#function to get the Consultation Summary details based on AppointmentID

	public function get_consultation_summary($apmt_id){

		$sql="SELECT * FROM  consultation_summary where appointment_id =$apmt_id";
		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
	}


			// FUNCTIONS RELATED TO CONSULTATION SUMMARY DETAILS WILL END HERE //

			// LOGIN/LOGOUT/SESSION RELATED FUNCTIONS WILL START HERE//

	#function to save the device access details for login page

 	public function save_access_token($doctor_id,$device_id,$lattitude,$longitude){

		$token = md5(uniqid($doctor_id.$doctor_email. $device_id.rand())); 
		$expiry_time  = date("Y:m:d H:i:s", strtotime("+24 hour"));
		$status       = 'active';
		$db = $this->mysqli;

		$sql= "INSERT INTO doctor_login_info(doctor_id,device_id,token,lattitude,longitude,status,expiry_time,created_time) VALUES(?,?,?,?,?,?,?,NOW())";	
			$stmt =$db->prepare($sql);
			$stmt->bind_param('sssssss',$doctor_id,$device_id,$token,$lattitude,$longitude,$status,$expiry_time);
			if($stmt->execute()){
				$res =  $stmt->insert_id;
			}else{
				$res =$stmt->error;
			}				
			return $res;
 	}


	#function to validate the session information is valid or not

	public function validate_session_info($doctor_id,$device_id){

		$sql="SELECT * FROM doctor_login_info WHERE doctor_id='$doctor_id' AND device_id ='$device_id'";
		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
	}

	#function to expire the session value on logout time

	public function update_login_session_info($doctor_id,$sessionToken){

		 $sql="UPDATE doctor_login_info SET expiry_time='Now()',status='inactive' WHERE doctor_id='$doctor_id' AND token='$sessionToken'";
		$res = $this->runQuery($sql);
		return $res;
	}

	#function to update doctor login info before delete / update the login infor

	public function archive_doctor_login_info($id,$doctor_id,$device_id,$device_type,$device_name,$device_version,$session_token,$lattitude,$longitude,$created_time,$exp_date){

    	$db = $this->mysqli;
		$sql= "INSERT INTO session_info_history(login_id,doctor_id,device_id,device_type,device_name,device_version,token,lattitude,longitude,created_time,expiry_time,status,his_created_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,'inactive','NOW()')";	
		$stmt =$db->prepare($sql);
		$stmt->bind_param('sssssssssss',$id,$doctor_id,$device_id,$device_type,$device_name,$device_version,$session_token,$lattitude,$longitude,$created_time,$exp_date);
			if($stmt->execute()){
					$sql ="DELETE FROM doctor_login_info WHERE id = '$id'";
					$res = $this->runQuery($sql);
					return $res;
			}else{
				$res =$stmt->error;
			}	
		return $res;
	}

			// LOGIN/LOGOUT/SESSION RELATED FUNCTIONS WILL END HERE//

			// START VIDEO CONSULTATION RELATED FUNCTIONS WILL START HERE//

	#function to update the consultation status based on the appointment id

	public function get_tokbox_url($apmt_id){

		$sql="SELECT * FROM schedules WHERE appointment_id='$apmt_id'";
		$reslt = $this->runQuery($sql);
		$res   = mysqli_fetch_assoc($reslt);
		return $res;
	}

		// START VIDEO CONSULTATION RELATED FUNCTIONS WILL END HERE//


		//COMMOMLY USED FUNCTIONS WILL START HERE //

	#function to get the patient id based on health seeker id
    public function get_patient_id($healthSeeker){        	
    	 $sql = "select patient_id,card_no from hcc_health_seeker where growayu_health_seeker_id=$healthSeeker";
		$res = $this->runQuery($sql);
		$result = mysqli_fetch_assoc($res);
     	return $result;
    }

	public function fromsqldmy_hypen($input){
	    $y=substr($input,0,4);
	    $m=substr($input,4,2);
	    $d=substr($input,6,2);
	    return($d."-".$m."-".$y);
	}
		//COMMOMLY USED FUNCTIONS WILL END HERE //

}


$appointmentObj = new Appointment();	
?>
