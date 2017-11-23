var appointment_id, hs_id,next_apmt_date,prev_apmt_date,apmt_status,prescriptions_list;
$(document).ready(function(){
	$('#summary').load('./components/summary.html')
	$('#filter').load('./components/filter.html')
	var actualDate=new Date();
    var date=moment(actualDate).format("YYYYMMDD");
    getData.getDashboardData(date).then(function(res){
		showDashboardDetails(res);
	})

	/*getting appointment details*/

	var getAppointmentDetails = function(ev){
		appointment_id = ev.currentTarget.id;
		getData.getAppointmentDetails(appointment_id).then(function(res){
		    $('.no-appointment-selected').addClass('d-none')
		    $('.appointment-info').removeClass('d-none')
		    var source = $('#detailsTemplate').html();
            var template = Handlebars.compile(source);
            var html = template(res.appointments_details);
            $('#details').html(html)
			if(res.appointments_details.appointment_det.apmt_type != "VC"){
				$('#start-vedio-consultation').hide();
			}else{
                $('#start-vedio-consultation').show();
			}
			hs_id = res.appointments_details.health_seeker_profile.hs_id;
			apmt_status=res.appointments_details.appointment_det.apmt_status;
			prescriptions_list=res.appointments_details.consultation_details.prescription_details;
            $('#prescription').load('./components/prescription.html');

        }).catch(function(a,b){

		    debugger
		})
	};
	showDashboardDetails=function(res){
        $('#total').text(res.appointments_details.appointment_summary.total)
        $('#pending').text(res.appointments_details.appointment_summary.pending)
        $('#missed').text(res.appointments_details.appointment_summary.missed)
        $('#shcedule-date').text(res.appointments_details.appointment[0].appointment_date)
        var source   = $("#appointmentTemplate").html();
        var template = Handlebars.compile(source);
        var html = template(res.appointments_details);

        if($(window).width() < 500){
            $('#appointment-list-phone').html(html)
            $('#appointment-list-phone').removeClass('list-group').addClass('list-inline')
            $('#appointment-list-phone .list-group-item').removeClass('list-group-item').addClass('list-inline-item')
        }else{
            $('#appointment-list').html(html)
        }
        next_apmt_date=res.appointments_details.next_appointment_date;
        prev_apmt_date=res.appointments_details_.prev_appointment_date;
	}
	var addPrescription = function(ev){

		debugger
	}

	// Handling all of our errors here by alerting them
	function handleError(error) {
	  if (error) {
	    alert(error.message);
	  }
	}
	var publisher;
	function initializeSession(apiKey, sessionId, token) {
	  var session = OT.initSession(apiKey, sessionId);

	  // Subscribe to a newly created stream
	  session.on('streamCreated', function(event) {
	  	$('#subscriber').removeClass('hidden-xs-up')
		  session.subscribe(event.stream, 'subscriber', {
		    insertMode: 'append',
		    width: '100%',
		    height: '100%',
		    showControls: false
		  }, handleError);
		});

	  // Create a publisher
	  $('#publisher').removeClass('hidden-xs-up')
	  $('.audio, .video, .full-screen').removeClass('hidden-xs-up')
	  publisher = OT.initPublisher('publisher', {
		    insertMode: 'append',
		    width: '100%',
		    height: '100%',
		    showControls: false
		  }, handleError);

	  // Connect to the session
	  session.connect(token, function(error) {
	    // If the connection is successful, publish to the session
	    if (error) {
	      handleError(error);
	    } else {
	      session.publish(publisher, handleError);
	    }
	  });
	  $('.video-container').removeClass('hidden-xs-up');
	  $($('.video-container')[0]).scrollTop(200);
	  $('.appointment-info.details').addClass('hidden-xs-up')
	  $('#start-vedio-consultation').addClass('hidden-xs-up')
	  $('#close-vedio-consultation').removeClass('hidden-xs-up')
	  return {session: session, stream: publisher.stream};
	}
	var vedioSession;
	var startVedio = function(){
		var apiKey = "45638452",
        sessionId = "2_MX40NTYzODQ1Mn5-MTUxMDU5Nzg0NzE4OH5wV3h6Smc0M1ZQTTJVQ2xWUUdLK0lpODZ-fg",
        token = "T1==cGFydG5lcl9pZD00NTYzODQ1MiZzaWc9YjYzNTRlYzI4NDRkMTgyY2Y3ZjNjMWQ2MmYzZjMzYjg2NGZmNjA4NDpzZXNzaW9uX2lkPTJfTVg0ME5UWXpPRFExTW41LU1UVXhNRFU1TnpnME56RTRPSDV3VjNoNlNtYzBNMVpRVFRKVlEyeFdVVWRMSzBscE9EWi1mZyZjcmVhdGVfdGltZT0xNTEwNTk3OTA0Jm5vbmNlPTAuNjk5OTgzMTcyNzA4OTc0JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1MTMxODk5MDMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0="
			// (optional) add server code here
		vedioSession = initializeSession(apiKey, sessionId, token);
	}
	var stopVideo = function(){
		if(vedioSession){
			vedioSession.session.disconnect()
            $('.video-container').addClass('hidden-xs-up');
            $('.appointment-info.details').removeClass('hidden-xs-up')

            $('#start-vedio-consultation').removeClass('hidden-xs-up')
	 		$('#close-vedio-consultation').addClass('hidden-xs-up')
	 		$('.audio, .video, .full-screen').addClass('hidden-xs-up');
		}
	}
	var muteAudio = function(ev){
		if($(this).hasClass('muted')){
			publisher.publishAudio(true)
			$(this).removeClass('muted');
		}else{
			publisher.publishAudio(false);
			$(this).addClass('muted');	
		}		
	}
	var muteVideo = function(ev){
		if($(this).hasClass('muted')){
			publisher.publishVideo(true);
			$(this).removeClass('muted');
		}else{
			publisher.publishVideo(false);
			$(this).addClass('muted');
		}
	}
	var showFullScreen = function(ev){
		if(!$('#publisher').hasClass('hidden-xs-up')){
			$('.video-container').removeClass('col-md-4').addClass('col-md-12').addClass('show-full-screen');
			$('.appointment-info.details').addClass('hidden-xs-up')
		}else if(!$('#subscriber').hasClass('hidden-xs-up')){
			$('#subscriber').addClass('show-full-screen');
		}
		$('.full-screen-off').removeClass('hidden-xs-up')
		$('.full-screen').addClass('hidden-xs-up')
	}
	var removeFullScreen = function (ev) {
        if(!$('#publisher').hasClass('hidden-xs-up')){
            $('.video-container').addClass('col-md-4').removeClass('col-md-12').removeClass('show-full-screen');
            $('.appointment-info.details').removeClass('hidden-xs-up')
        }else if(!$('#subscriber').hasClass('hidden-xs-up')){
            $('#subscriber').removeClass('show-full-screen');
        }
        $('.full-screen').removeClass('hidden-xs-up')
		$('.full-screen-off').addClass('hidden-xs-up')
    }
	$('#appointment-list, #appointment-list-phone').on('click touchstart', '.appointment',getAppointmentDetails)
	$('.appointment-details #prescription').on('submit', addPrescription)
	$('#start-vedio-consultation').on('click', startVedio)
	$('#close-vedio-consultation').on('click', stopVideo)
	$('#toggleLocalAudio').on('click', muteAudio)
	$('#toggleLocalVideo').on('click', muteVideo)
	$('.full-screen').on('click', showFullScreen)
	$('.App-control-container').on('click', '.full-screen-off', removeFullScreen)
})
