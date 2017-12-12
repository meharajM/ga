<?php
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');
ini_set('display_errors', 1);
error_reporting(E_ALL);
include "../vendor/opentok.phar";
use OpenTok\OpenTok;

$apiKey = '45638452';
$apiSecret = '00d33147f4afff2bda321893396d8dafd8a37eba';
$opentok = new OpenTok($apiKey, $apiSecret);

//based on apmt id shuld get the sesion id and passit

$sessionId = "1_MX40NTYzODQ1Mn5-MTUxMTgwOTE3MDYwNn5zMXdxaTJHeXBTbW8yNzRZTHhmU3RLTVV-fg";
//session id has to be selected from schedules table

$token = $opentok->generateToken($sessionId);

echo $token;

//response 
/*{
	error {}
	video_session_det : {provider, session_id, token}*/

?>
