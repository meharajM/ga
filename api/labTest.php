<?php
require_once("../includes/appointmentClass.php");

$labtest = json_decode(file_get_contents("php://input"));
$test_name  = $labtest->suggested_test->labtest_name;
//$test_name  = $labtest->lab_tests;

$response = array();
$labtest = $appointmentObj->get_lab_test($test_name);
$response['labTest']=array();
  $response['error']['result']="0";
        $response['error']['error_code']="";
        $response['error']['error_message']="";
        $response['error']['error_type']="";
while ($row = mysqli_fetch_assoc($labtest)) {
	$test['labtest_id'] = $row['labtest_id'];
	$test['labtest_code'] = $row['labtest_code'];
	$test['labtest_name'] = $row['labtest_name'];
	$test['labtest_specialization'] = $row['labtest_specialization'];
	array_push($response['labTest'], $test);
}
 echo json_encode($response);


?>