<?php
require_once("../includes/appointmentClass.php");

$consultation = json_decode(file_get_contents("php://input"));


$apmt_id    = $consultation->apmt_input->apmt_id;
$doctor_id  = $consultation->apmt_input->doctor_id;
$hcc_id     = $consultation->apmt_input->hcc_id;
$date     = $consultation->apmt_input->date;
$device_id  = $consultation->session_info->device_id;
$sess_token = $consultation->session_info->access_token;
/*
echo "==$apmt_id == $sess_token == $doctor_id";*/
/*
$apmt_id ='553';
$doctor_id ='21';
*/
$response = array();
$validate_session = $appointmentObj->validate_session_info($doctor_id,$device_id,$sess_token);
if($validate_session != ""){
        if($apmt_id  == ""){    
            $response['error']['result']="0";
            $response['error']['error_code']="";
            $response['error']['error_type']="";
            $response['error']['error_message']="Appointment id cannot be null"; 

        }else if($doctor_id == ""){
            $response['error']['result']="0";
            $response['error']['error_code']="";
            $response['error']['error_type']="";
            $response['error']['error_message']="Doctor id cannot be null"; 

        }else{
    $res =  $appointmentObj->update_consultation_status($apmt_id);

    #function to get the Doctor details based on doctor id
	$doctor = $appointmentObj->get_doctor_profile($doctor_id);
    $doctor_name = $doctor['full_name'];

    #function to get the health seeker summary details
	$healthSeekerData =$appointmentObj->get_healthseeker_consultation_summary($apmt_id);
    $healthSeeker = $healthSeekerData['health_seeker_id'];

    #function to get the prescription details based on the appointment id
	$pres = $appointmentObj->get_previous_prescription($doctor_id,$healthSeeker,$apmt_id);

    #function to get the patient id
	$result2    = $appointmentObj->get_patient_id($healthSeeker);
    $patient_id = $result2['patient_id'];

    #function to get the consultation history
	$consultation =$appointmentObj->get_consultation_summary($apmt_id);

    $health_seeker_id   = $healthSeekerData['health_seeker_id'];
    $patient_name       = $healthSeekerData['name'];
    $mobile             = $healthSeekerData['mobile'];
    $hcc_id             = $healthSeekerData['hcc_id'];
    $doc_name           = $healthSeekerData['full_name'];
    $qualifications     = $healthSeekerData['qualifications'];
    $licence_no         = $healthSeekerData['licence_no'];

    $diagnosis         = $consultation['diagnosis'];
    $details_diagnosis = $consultation['details_diagnosis'];
    $change_medication = $consultation['medication_changes'];
    $diet              = $consultation['diet'];
    $next_followup_in  = $consultation['next_followup'];
    $next_followup_date  = $consultation['next_followup_date '];
    $tests_to_be_done  = $consultation['tests_to_be_done'];
    $waiver            = $consultation['waiver_status'];
    $doctor_referred   = $consultation['reffered_doctor'];
    $doctor_notes      = $consultation['doctor_notes  '];

    $response['consultation']['health_seeker']['health_seeker_id']  = $health_seeker_id;
    $response['consultation']['health_seeker']['patient_name']      = $patient_name;
    $response['consultation']['health_seeker']['mobile']            = $mobile;
    $response['consultation']['doctor']['full_name']        =   $doc_name;
    $response['consultation']['doctor']['qualifications']   =   $qualifications;
    $response['consultation']['doctor']['licence_no']       =   $licence_no;
    $response['consultation']['summary']['diagnosis']           =  $diagnosis;
    $response['consultation']['summary']['details_diagnosis']   =  $details_diagnosis;
    $response['consultation']['summary']['medication_changes']  =  $change_medication;
    $response['consultation']['summary']['next_followup_in']    =  $next_followup_in;
    $response['consultation']['summary']['next_followup_date']  =  $next_followup_date;
    $response['consultation']['summary']['reffered_doctor']     =  $doctor_referred;
    $response['consultation']['summary']['tests_to_be_done']    =  $tests_to_be_done;
    $response['consultation']['summary']['doctor_notes']        =  $doctor_notes;

    $age= 'Not Mentioned';
    $date = date("d-M-Y");

    $prescription_details = '';

    $top = '<div class="col-md-12 no-padding margin" style="width: 600px">
    <div class="col-md-12 no-padding lcNo">
    <div style="text-align:right" class="col-md-12 no-padding pull-right">
    <span>' . $date . '</span>
    </div>
    <div class="col-md-6 no-padding text-right">
    <span>Patient Name: </span>
    <span>' . $patient_name . '</span>
    </div>
    </div>
    <div class="col-md-12 no-padding text-center fnt-20">
    <span>Mobile Number: </span>
    <span>' . $mobile . '</span>
    </div>
    <div class="col-md-12 no-padding text-center fnt-18">
    <span>' . $patient_id . '</span>
    </div>
    </div>';

    $prescription_details .= '
    <article class="col-md-12 no-padding">

    <section class="col-md-12">
    <form id="students" method="post" name="students" action="index.php">

    <table border="0" cellspacing="0" width="600px">';
    $prescription_details .= "<tr><td colspan='6'><hr></td></tr>";
    $prescription_details .= '<tr><td colspan="6">Diagnosis: ' . $diagnosis . '</td></tr>';
    $prescription_details .= '<tr><td colspan="6">' . $details_diagnosis . '</td></tr>';
    $prescription_details .= '<tr style="font-weight: bold"><td colspan="6"><b>&nbsp;</b></td></tr>';
    $prescription_details .= '<tr style="font-weight: bold"><td colspan="6"><b>Rx</b></td></tr>';
    $prescription_details .= '<tr style="font-weight: bold"><td colspan="6"><b>&nbsp;</b></td></tr>';

    $prescription_details .= '';

    $response['consultation']['prescription']=array();
    $i = 0;
    $sos=false;
    while ($row1 = mysqli_fetch_array($pres)) {
        $i++;
        $med_type   = $row1['med_type'];
        $med_name   = $row1['med_name'];
        $dosage     = $row1['dosage'];
        $frequency  = $row1['frequency'];
        $course     = $row1['course'];
        $med_intake = $row1['med_intake'];
        //if($med_intake=="SoS") $sos=true;
        $remarks = trim($row1['remarks']);
        $prescription_details .= "<tr>";
        $prescription_details .= "<td>" . $i . ")</td>";
        $prescription_details .= "<td><b>" . $med_name . "</b></td>";
        $prescription_details .= "<td>" . $dosage . "</td>";
        $prescription_details .= "<td>" . $med_intake . "</td>";
        $prescription_details .= "<td>" . $frequency . "</td>";
        $prescription_details .= "<td>" . $course . "</td>";
        $prescription_details .= "</tr>";

        $medicine['med_type']    =   $row1['med_type'];
        $medicine['med_name']    =   $row1['med_name'];
        $medicine['dosage']      =   $row1['dosage'];
        $medicine['frequency']   =   $row1['frequency'];
        $medicine['course']      =   $row1['course'];
        $medicine['med_intake']  =   $row1['med_intake'];
        $medicine['remarks']     =   $row1['remarks'];

       array_push($response['consultation']['prescription'], $medicine);                  
       if($remarks!="") $prescription_details .= "<tr style='font-style: italic'><td></td><td colspan='5'>Note: ".$remarks."</td></tr>";
    }


    $prescription_details .= '<tr><td colspan="6">&nbsp;</td></tr>';
    if($sos) $prescription_details .= '<tr><td align="right" colspan="6">*SoS: When needed</td></tr>';
    $prescription_details .= '<tr><td colspan="4">Tests Prescribed</td><td align="right" colspan="2">Next Visit</td></tr>';
    $prescription_details .= '<tr><td colspan="4">' . $tests_to_be_done . '</td><td align="right" colspan="2">' . $next_followup . '</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">&nbsp;</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">&nbsp;</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">&nbsp;</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">&nbsp;</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">&nbsp;</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">' . $doc_name . '</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">' . $qualifications . '</td></tr>';
    $prescription_details .= '<tr><td align="right" colspan="6">' . $licence_no . '</td></tr>';
    $prescription_details .= '</table>';
    $prescription_details .= '<p style="margin:10px 0;">

    </p>
    </form>
    </section>
    </article>';

        $closedsummary = "";
        $closedsummary .= '<div class="col-xs-12 col-sm-12 col-dm-12 col-lg-12 hedr-3 fnt-15">
        Following  <b>' . date("d/m/y") . '</b> on-line consultation with patient &nbsp;<b> ' . $patient_name  . '</b>&nbsp; age &nbsp;<b> ' . $age . '</b>.&nbsp; I would like to summarise it as follows
        </div>
        <form id="consultation_summary" method="post" > 
            <section class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-20">
            <div class="col-xs-12 col-sm-12 col-dm-12 col-lg-12">
            <span class="col-md-4 text-right fnt-15 pt5">Diagnosis:</span> 
            <span class="col-md-4">
            ' . $diagnosis . '
            </span>
            </div>

            <div class="col-xs-12 col-sm-12 col-dm-12 col-lg-12 margin">
            <span class="col-md-4 text-right fnt-15 pt15">Explanation about the diagnosis: </span> 
            <span class="col-md-4">
            ' . $details_diagnosis . '
            </span>
            </div>
            <div class="col-xs-12 col-sm-12 col-dm-12 col-lg-12 margin">
            <span class="col-md-4 text-right fnt-15 pt5">Next Follow-up Consultation: </span> 
            <span class="col-md-4">
            ' . $next_followup . '
            </span>
            </div>
            <div class="col-xs-12 col-sm-12 col-dm-12 col-lg-12 margin">
            <span class="col-md-4 text-right fnt-15 pt5">Suggested Invstigations: </span> 
            <span class="col-md-4">
            ' . $tests_to_be_done . '
            </span>
            </div>

            </section>
            <div class="col-xs-12 col-sm-12 col-dm-12 col-lg-12 hedr-4">
            <span class="col-md-12 fnt-15"></span> <br>
            <span class="col-md-12 fnt-15 margin" style="color:#000">Regards</span>
            <span class="col-md-12 fnt-15" style="color:#000;">
            <span style="padding-right:5px;">DR.</span>' . $doctor['full_name'] . '
            </span>
            <br><br><br>
            <span class="col-md-12 fnt-15" style="color:#000;margin-bottom:10px;">
            <span class="thtle">(This is electronically generated consultation summary. Signature not required.) </span>
            </span>
            </div>
        </form>   ';
        $end ='';
        $res1 =   $top . "<br>" . $prescription_details . "<br>" . "<br>" . $end; 

        if ($res1) {
            include_once("../MPDF57/mpdf.php");
            //echo $res1;
            $mpdf = new mPDF();
            $mpdf->WriteHTML($res1);
            $content = $mpdf->Output(" ", "S");
            $getdata=$appointmentObj->get_pdfGeneratedDetails($apmt_id);
            $health_seeker_id = $getdata['health_seeker_id'];
            $doctor_name      = $getdata['full_name'];
            $bookingDate      = $appointmentObj->fromsqldmy_hypen($getdata['booking_date']);
            $filename         = "prescription_GRCS_" .  $bookingDate  .".pdf";
            $mpdf->Output("../pdfs/$filename", "F");
            $description = "Consultation with Dr." . $doctor_name . " on " .   $bookingDate;
            $hid = $appointmentObj->add_health_recordBlob($health_seeker_id,$filename,$content,$description);
                if(isset($hid)){
                $rslt1= $appointmentObj->update_health_record($hid,$health_seeker_id,$appointment_id,$description);
                }

                $response['consultation']['record_id']     = $hid;
                $response['consultation']['record_name']   = $filename;
                /*$response['consultation']['file_link']     = "http://52.66.157.195/growayu/ganewdesign/pdfs/";*/

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
