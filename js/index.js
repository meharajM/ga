$(document).ready(function(){
	$('#prescription').load('./components/prescription.html')
	$('#summary').load('./components/summary.html')
	$('#filter').load('./components/filter.html')
	getData.getDashboardData().then(function(res){
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
	})

	/*getting appointment details*/
	var getAppointmentDetails = function(ev){
		var id = ev.currentTarget.id;
		getData.getAppointmentDetails(id).then(function(res){
		    $('.no-appointment-selected').addClass('d-none')
		    $('.appointment-info').removeClass('d-none')
		    var source = $('#detailsTemplate').html();
            var template = Handlebars.compile(source);
            var html = template(res.appointments_details);
            $('#detailsTemplate').html(html)

		}).catch(function(a,b){

		    debugger
		})
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
	  $('#start-vedio-consultation').addClass('hidden-xs-up')
	  $('#close-vedio-consultation').removeClass('hidden-xs-up')
	  return {session: session, stream: publisher.stream};
	}
	var vedioSession;
	var startVedio = function(){
		var apiKey = "45638452",
        sessionId = "2_MX40NTYzODQ1Mn5-MTUwODQzMDQzMDgzMn5HQUtvVlFYTDVxZnpUSXNPd3pRVGxUSEF-fg",
        token = "T1==cGFydG5lcl9pZD00NTYzODQ1MiZzaWc9NjE1ZGJmZDYxZjBhNmRhMzUxNTA5NjQwYzQ4YTUyOWYwN2FiNDkzZjpzZXNzaW9uX2lkPTJfTVg0ME5UWXpPRFExTW41LU1UVXdPRFF6TURRek1EZ3pNbjVIUVV0dlZsRllURFZ4Wm5wVVNYTlBkM3BSVkd4VVNFRi1mZyZjcmVhdGVfdGltZT0xNTA5MjE2MzM1JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MDkyMTYzMzUuODI4Mzc0MzAwNDI4OA==";
       // (optional) add server code here
		vedioSession = initializeSession(apiKey, sessionId, token);
	}
	var stopVideo = function(){
		if(vedioSession){
			vedioSession.session.disconnect()
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
	$('#appointment-list, #appointment-list-phone').on('click touchstart', '.appointment',getAppointmentDetails)
	$('.appointment-details #prescription').on('submit', addPrescription)
	$('#start-vedio-consultation').on('click', startVedio)
	$('#close-vedio-consultation').on('click', stopVideo)
	$('#toggleLocalAudio').on('click', muteAudio)
	$('#toggleLocalVideo').on('click', muteVideo)
	
})
