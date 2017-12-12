<?php 
include_once('dbClass.php');


class Chat extends myDBC{


		/* Function to get the health seeker id count from health seeker table based on search id */
		public function get_healthSeekerID($search) {

			  $sql = "SELECT DISTINCT(health_seeker_id) FROM health_seeker WHERE name LIKE '%".$search."'";
			  $res = $this->runQuery($sql);
		      $rcount=mysqli_num_rows($res);
				if($rcount == 1){
					$hsID = mysqli_fetch_assoc($res);
					$healthSeeker =  $hsID['health_seeker_id'];
				}else if($rcount >1){
					$HID = array();
					while($hesid= mysqli_fetch_assoc($res)){
						$HID[] = $hesid['health_seeker_id'];
					}
					$healthSeeker = "'".implode("','", $HID)."'";
				}
				return $healthSeeker;
		}

		/* Function to get the health seeker id count from seeker_chat_pkg table based on search id */
		public function get_pkg_healthSeekerID($search){

		    $sql = "SELECT DISTINCT(health_seeker_id) FROM seeker_chat_pkg WHERE  thread_title LIKE '".$search."%'" ;
			$res = $this->runQuery($sql);
			$rcount=mysqli_num_rows($res);
				if($rcount == 1){
					$hsID = mysqli_fetch_assoc($res);
					$healthSeeker =  $hsID['health_seeker_id'];
				}else if($rcount >1){
					$HID = array();
					while($hesid=mysqli_fetch_assoc($res)){
						 $HID[] = $hesid['health_seeker_id'];
					}
					$healthSeeker = "'".implode("','", $HID)."'";
				}
			return $healthSeeker;
		}


		/* Function to get the chat_thread_id  based on health_seeker_id */
		public function get_chat_threadID($ids,$did){

			$sql= "SELECT chat_thread_id FROM seeker_chat_pkg WHERE thread_status='active' and doctor_id='$did' and (chat_status='with doctor' || chat_status='with seeker') and health_seeker_id IN (".$ids.");";
			$res = $this->runQuery($sql);
			$rcount=mysqli_num_rows($res);			         
				if($rcount <= 1){
					$recID = mysqli_fetch_assoc($res);
					$thread_id =  $recID['chat_thread_id'];
				}else{
					$ID = array();
					while($tid= mysqli_fetch_assoc($res)){
						$ID[] = $tid['chat_thread_id'];
                   	}
					$thread_id = "'".implode("','", $ID)."'";					
				}
				return $thread_id;
		}


	/* Function to get the all thread ID based on doctor's id and chat status */
		public function get_all_threadID($did){
			 $sql= "SELECT chat_thread_id FROM seeker_chat_pkg WHERE thread_status='active' and doctor_id='$did' and (chat_status='with doctor' || chat_status ='with seeker')";
			$res = $this->runQuery($sql);
			$rcount=mysqli_num_rows($res);
			         
				if($rcount <= 1){
					$recID = mysqli_fetch_assoc($res);
					$thread_id =  $recID['chat_thread_id'];
				}else{
					$ID = array();
					while($tid= mysqli_fetch_assoc($res)){
						$ID[] = $tid['chat_thread_id'];                   
					}
					$thread_id = "'".implode("','", $ID)."'";					
				}
			return $thread_id;
		}




		/* Function to get the chat conversation history based on chat thread ID */
		public function get_chat_conversation_history($tid){

			$sql = "SELECT chat_thread_id,chat_cnv_id,pkg_id,sender_type,health_seeker_id,doctor_id,sender_id,chat_cnv_msg,chat_attachments,DATE_FORMAT(chat_timestamp,'%h:%i %p') as time,chat_timestamp FROM chat_conversation WHERE chat_thread_id IN(".$tid.") and sender_type='seeker' group by chat_thread_id";
			$res = $this->runQuery($sql);
			return $res;
		}


		/* Function to get the thread title  based on chat thread ID and health seeker ID*/
		public function get_thread_title($hsid,$tid){

			$sql ="SELECT thread_title FROM seeker_chat_pkg WHERE health_seeker_id ='".$hsid."' and doctor_id ='$doctor_id' and thread_status='active' and chat_thread_id='".$tid."'";
			$res = $this->runQuery($sql);
			$result = mysqli_fetch_assoc($res);
			return $result['thread_title'];
		}

		/* Function to get the chat conversation count  based on chat thread ID */
		public function  get_conversation_count($tid){

			$sql="SELECT count(chat_cnv_id) as cnt  FROM chat_conversation where chat_thread_id= '".$tid."' and sender_type='seeker'";
			$res = $this->runQuery($sql);
			$rowcount= mysqli_fetch_assoc($res);
			return $rowcount['cnt'];
		}

		/* Function to get the health seeker details(name,photoURL) based on their ID*/
		public function get_health_seeker_details($hsid){

			$sql ="SELECT name,photo_url FROM health_seeker WHERE health_seeker_id='".$hsid."'";
			$res = $this->runQuery($sql);
			$rsl = mysqli_fetch_assoc($res);
			return $rsl;
		}

		/* Function to insert the doctor's replied data to the conversation table*/
		public function add_doctor_chat($tid,$pid,$hsid,$did,$msgdata,$attach){

			$sql ="INSERT INTO chat_conversation(chat_thread_id,pkg_id,sender_type,health_seeker_id,doctor_id,sender_id,chat_cnv_msg,chat_attachments,
			chat_deleted) VALUES('$tid','$pid','doctor','$hsid','$did','$did','$msgdata','$attach','no')";
			$res = $this->runQuery($sql);
			$last_id = $this->lastInsertID($res);
			return $last_id;
		}	

		/* Function to update the thread status based on threadid and health seeker id*/
		public function update_thread_status($tid,$hsid){

			$sql = "UPDATE seeker_chat_pkg SET chat_status='with seeker',thread_status='active'  WHERE chat_thread_id='$tid' and 	health_seeker_id='$hsid'";
			$res = $this->runQuery($sql);
			return $res;
		}

		/* Function to get the conversation details  based on threadid*/
		public function get_conversation_details($tid){

			$sql = "select chat_thread_id,chat_cnv_id,chat_attachments,sender_type,health_seeker_id, doctor_id,chat_cnv_msg,DATE_FORMAT(chat_timestamp,'%h:%i %p') as ctime,DATE_FORMAT(chat_timestamp,'%a  %b  %Y') as cdate  from chat_conversation where  sender_type ='doctor' and chat_thread_id='$tid' order by  chat_timestamp desc limit 1" ;
			$res = $this->runQuery($sql);
			return $res;
		}

		/* Function to get the attached record details  based on threadid and uploaded recordid*/
		public function get_individual_attached_data($tid,$rid){

			 $sql ="select a.health_record_id,a.chat_thread_id,b.doc_name,b.doc_datatype from health_record as a,health_record_blob as b where a.health_record_id=b.health_record_id and a.chat_thread_id='$tid' and a.health_record_id='$rid'";
			$res = $this->runQuery($sql); 
			return $res;
		}


		/* Function to get the attached record details  based on threadid and uploaded recordid*/
		public function get_attached_details($tid){

			$sql ="select a.health_record_id,a.chat_thread_id,a.health_seeker_id,a.document,b.doc_name,b.doc_datatype,b.doc_type,DATE_FORMAT(b.uploaddate,'%d  %b  %Y') as cdate  from health_record as a,health_record_blob as b where a.health_record_id=b.health_record_id and a.chat_thread_id='$tid' order by  b.uploaddate DESC";
			$res = $this->runQuery($sql);
			return $res;
		}

		/* Function to get the attached file content  based on uploaded recordid*/
		public function get_attached_content($rid){

			$sql="SELECT health_seeker_id,doc_type,doc_name,doc_data,doc_datatype,DATE_FORMAT(uploaddate,'%d  %b  %Y') as cdate FROM health_record_blob WHERE health_record_id='$rid'";
			$res = $this->runQuery($sql);
			return $res;
		}


		/* Function to get the chat conversation of selected health seeker*/
        public function get_single_conversation($tid,$hsid){

       		 $sql= "select chat_thread_id,chat_cnv_id,sender_type,health_seeker_id, doctor_id,chat_cnv_msg,chat_attachments,DATE_FORMAT(chat_timestamp,'%h:%i %p') as ctime,DATE_FORMAT(chat_timestamp,'%a  %b  %Y') as cdate from chat_conversation where chat_thread_id='$tid' and  health_seeker_id='$hsid'";
			$res = $this->runQuery($sql);
			return $res;
        }


		/* Function to  save the uploaded file details into table*/
        public function add_doctor_upload_file($hsid,$fname,$data,$ftype,$msg,$dclass){
        	$sql="INSERT INTO health_record_blob(health_seeker_id,doc_type,doc_name,doc_data,doc_datatype,doc_desc,doc_class) VALUES ('$hsid','doctor_chat_reply','$fname','$data','$ftype','$msg','$dclass')";
        	$res = $this->runQuery($sql);
			$last_id = $this->lastInsertID($res);
			return $last_id;
        }


        /* Function to  update the uploaded file content into table*/
        public function update_upload_file_details($lid,$hsid,$msg,$dclass,$tid){
        	 $sql="INSERT INTO health_record(health_record_id,health_seeker_id,description,document,chat_thread_id) VALUES('$lid','$hsid','$msg','$dclass','$tid')";
        	$res = $this->runQuery($sql);
			//$last_id = $this->lastInsertID($res);
			return $res;
        }

        /* Function to get the doctor's details(name,photoURL) based on their ID*/
		public function get_doctor_details($did){

			$sql ="SELECT full_name,photo FROM doctors WHERE doctor_id='".$did."'";
			$res = $this->runQuery($sql);
			$rsl = mysqli_fetch_assoc($res);
			return $rsl;
		}

}

$chatObj = new Chat();

?>