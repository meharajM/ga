<?php
require_once("../includes/appointmentClass.php");

$labtest = json_decode(file_get_contents("php://input"));
$test_name  = $labtest->lab_tests->labtest_name;
$response = array();
$labtest = $appointmentObj->get_lab_test($test_name);
$response['labTest']['tests']=array();
while ($row = mysqli_fetch_assoc($labtest)) {
	$test['labtest_id'] = $row['labtest_id'];
	$test['labtest_code'] = $row['labtest_code'];
	$test['labtest_name'] = $row['labtest_name'];
	$test['labtest_specialization'] = $row['labtest_specialization'];
	array_push($response['labTest']['tests'], $test);
}
 echo json_encode($response);


?>