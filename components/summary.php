<?php 
if($_REQUEST["btn_sub"] == "Register"){
$values = array(
  "diagnosis" =>     $_POST["diagnosis"],
  "advice" =>        $_POST["advice"],
  "changes" =>       $_POST["changes"],
  "waive" =>         $_POST["waive"],
  "p_check" =>       $_POST["p_check"],
  "follow_up" =>   	$_POST["follow_up"],
  "date" =>   		$_POST["date"],
  "suggested_invest" => $_POST["suggested_invest"],
  "refer" =>     	 $_POST["refer"]
  );
  $json_obj = json_encode($values);
  echo $json_obj;
  
}

?>



<!--
php

if(isset($_POST['save'])){


//$diagnosis = $_POST['diagnosis'];

$values = array(
  "diagnosis" =>     $_POST["diagnosis"],
  "advice" =>        $_POST["advice"],
  "changes" =>       $_POST["changes"],
  "waive" =>         $_POST["waive"],
  "p_check" =>       $_POST["p_check"],
  "follow_up" =>   	$_POST["follow_up"],
  "date" =>   		$_POST["date"],
  "suggested_invest" => $_POST["suggested_invest"],
  "refer" =>     	 $_POST["refer"]
  );
  $json_obj = json_encode($values);
  echo $json_obj;
  
}

?> l;l; -->

<!-- Special version of Bootstrap that only affects content wrapped in .bootstrap-iso -->
<link rel="stylesheet" href="https://formden.com/static/cdn/bootstrap-iso.css" /> 
<!--Font Awesome-->
<!--
<link rel="stylesheet" href="https://formden.com/static/cdn/font-awesome/4.4.0/css/font-awesome.min.css" />
<link href="css/font-awesome.min.css" rel="stylesheet">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-iso.css" rel="stylesheet">
<link href="css/bootstrap-datepicker3.css" rel="stylesheet">

<script src="./js/jquery-1.11.3.js"></script>
<script src="./js/tether.min.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="./js/bootstrap-datepicker.min.js"></script>
<script src="./js/moment.min.js"></script> 
 -->

<!--Inline CSS based on choices in "Settings" tab 
<style>.bootstrap-iso .formden_header h2, .bootstrap-iso .formden_header p, .bootstrap-iso form{font-family: Arial, Helvetica, sans-serif; color: black}.bootstrap-iso form button, .bootstrap-iso form button:hover{color: #ffffff !important;} .asteriskField{color: red;}</style> -->

<!-- HTML Form (wrapped in a .bootstrap-iso div) -->

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.min.js"></script>
<script  type="text/x-handlebars-template" id="summarypage">
{{#summary}}

{{/summary}}
</script>

<!Doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width", initial-scale="1">

</head>
<title>Summary
</title>
<body id="tab2">
<div class="bootstrap-iso">
 <div class="container-fluid">
  <div class="row">
   <div class="col-md-12 col-sm-6 col-xs-12">
    <form method="post" id="form4">
     <div class="form-group ">
      <label class="control-label requiredField" for="name">
       Patient Diagnosis / Diagnoses are:
       <span class="asteriskField">
        *
       </span>
      </label>
      <input class="form-control" id="name" name="diagnosis" placeholder="Enter Diagnosis/ Diagnoses" type="text"/>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="textarea">
		Management Plan / Advice:
	  <span class="asteriskField">
        *
       </span>
      </label>
      <textarea class="form-control" cols="40" id="textarea" name="advice" rows="5"></textarea>
     </div>
     <div class="form-group" id="div_radio">
      <label class="control-label " for="radio">
       Changes made to current medication?
      </label>
      <div class="">
       <label class="radio-inline">
        <input name="changes" type="radio" value="Yes"/>
        Yes
       </label>
       <label class="radio-inline">
        <input name="changes" type="radio" value="No"/>
        No
       </label>
      </div>
     </div>
     <div class="form-group" id="div_radio1">
      <label class="control-label " for="radio1">
       Waive Fee for this Consultation?
      </label>
      <div class="">
	  <table style="margin: 0 -5px; width: 100%; border-spacing: 0;">
	  <tr style="margin: 0 -5px; width: 100%; border-spacing: 0;">
		<td>
		<div class="col-md-1">
       <label class="radio-inline">
        <input name="waive" type="radio" value="No" id="No" onclick="javascript:yesnoCheck();"/>
        No
       </label>
	   </div>
	   </td>
	   <td>
	   <div class="col-md-1">
       <label class="radio-inline">
        <input name="waive" type="radio" value="Partial" id="Partial" onclick="javascript:yesnoCheck();"/>
        Partial
       </label>
	   </div>
	   </td>
	   <td>
	   <div class="col-md-1">
		<div class="">
			<label class="radio-inline">
			<input name="waive" type="radio" value="Full" id="Full" onclick="javascript:yesnoCheck();"/>
			Full
		   </label>
			</td>		   
			<td>		  
				<div id="ifPartial" style="visibility:hidden" class="col-md-12" >
					<input type='text' id='p_check' name='p_check' style='width:75px' maxlength='5'><br>
				</div>
		
		</td></div>
		</div>
      </div></table>
     </div>
     <div class="form-group ">
      <label class="control-label " for="select">
       Next Follow-up?
      </label>
	  <div class="">
	  <div class="col-md-6">
      <select class="select form-control" id="follow_up" name="follow_up" onclick="javascript:answers();">
		<option value="select"  onclick="javascript:answers();"  selected>
        select
		</option>
	   
	  <!-- <option value="After 3 Days"  onclick="answers();">
        After 3 Days
       </option> -->
       <option value="After 1 Week" onclick="javascript:answers();">
        After 1 Week
       </option>
       <option value="After 10 Days" onclick="javascript:answers();">
        After 10 Days
       </option>
       <option value="After 2 Weeks" onclick="javascript:answers();">
        After 2 Weeks
       </option>
       <option value="After 1 Month" onclick="javascript:answers();">
        After 1 Month
       </option>

      </select>
     </div>
     
      <div class="input-group col-md-6">
       <input class="form-control" id="date" name="date" placeholder="MM/DD/YYYY" type="text"/>
       <div class="input-group-addon">
        <i class="fa fa-calendar-times-o">
        </i>
       </div>
	   </div>
      </div>
    
	 </div>
     <div class="form-group ">
      <label class="control-label " for="textarea1">
       Suggested Investigations (Optional)
      </label>
      <textarea class="form-control" cols="40" id="textarea1" name="suggested_invest" rows="3"></textarea>
     </div>
     <div class="form-group ">
      <label class="control-label " for="text">
       Referred to Doctor (Optional)
      </label>
      <input class="form-control" id="text" name="refer" type="text"/>
     </div>
     <div class="form-group">
      <div class="col-md-6 col-xs-6">
       <button class="btn btn-success col-md-12 btn-lg" id="save" name="btn_sub" type="submit" value="Save">
        Save
       </button>
	   </div>
	   <div class="col-md-6 col-xs-6">
	<button class="btn btn-info col-md-12 btn-lg" name="close" id="close" type="submit">
        Close
       	</button>
      </div>
     </div>
    </form>
   </div>
  </div>
 </div>
</div>

</body>
</html>
<script type="text/javascript">
	$(document).ready(function(){
		$("#save").on("click",function(evt){
			var formData=$("#form4").serializeArray();
			evt.preventDefault();
		debugger
		var data={};
		formData.map(function(feild){
			data[feild.name]=feild.value;
		});
        var source   = $("#summarypage").html();
		var template = Handlebars.compile(source);
		var html = template({summary: data});
         $('#tab2').html(html);


		});
		

	});
</script>

<!-- Include jQuery -->
<!-- <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script> -->

<!-- Include Date Picker -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"> </script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

<script>
    $(document).ready(function(){
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'DD, dd-M-yy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        })
		
		
    })
</script>

<script>
function yesnoCheck() {
    if (document.getElementById('Partial').checked) {
        document.getElementById('p_check').style.visibility = 'visible';
		document.getElementById('p_check').value=' ';
    }
	else if(document.getElementById('Full').checked) {
		document.getElementById('p_check').style.visibility = 'visible';
		document.getElementById('p_check').value='100';
	}	
    else document.getElementById('p_check').style.visibility = 'hidden';

}	
</script>

<script>
function answers() 
{

//	var d = new Date();
	var today= moment().format("MMM Do YY");
	var dd=document.getElementById('follow_up');
	var days=dd.options[dd.selectedIndex].text;
	var day=moment().format('dddd');
	

	if(days=='After 3 Days')
		{
		today=moment().add(3, 'days').calendar();
		today=moment().format("MMM Do YY");
		}
//	if(days=='select')
	//	today="";
	if(days=='After 1 Week')
	{
		today=moment().add(7, 'days').format("MMM Do YY");
		//today=moment().format("MMM Do YY");
		day=moment().add(7,'days').format('dddd');
		}
	if(days=='After 10 Days')
		{
		today=moment().add(10, 'days').format("MMM Do YY");
		day=moment().add(10,'days').format('dddd');
		}
	if(days=='After 2 Weeks')
		{
		today=moment().add(14, 'days').format("MMM Do YY");
		day=moment().add(14,'days').format('dddd');
		}
	if(days=='After 1 Month')
		{
		today=moment().add(30, 'days').format("MMM Do YY");
		day=moment().add(30,'days').format('dddd');
		}
	
	document.getElementById('date').value = day+', '+today;

}
</script>