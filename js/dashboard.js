var appointment_id, hs_id,hcc_id,sessionId,token,next_apmt_date,prev_apmt_date,apmt_status,prescriptions_list, appointment,apmt_type,consultation_id,record_id;
var showToaster;
var apiKey = "45638452";
function showMessage(message) {
    $('#subscriber').html("<div class='message'><div class='text'>"+ message +"</div></div>");
}
$(document).ready(function(){
	$('#filter').load('./components/filter.html');
	var actualDate=new Date();
    var date=moment(actualDate).format("YYYYMMDD");
    getData.getDashboardData(date).then(function(res){
		showDashboardDetails(res);
	});
    //getData.getDoctorProfile(2);

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
            $('#prescription').load('./components/prescription.html')
			if(res.appointments_details.appointment_det.apmt_type != "VC"){
				$('#start-vedio-consultation').hide();
			}else{
                $('#start-vedio-consultation').show();
			}
            hs_id = res.appointments_details.health_seeker_profile.hs_id;
			$("#start-vedio-consultation").on("click",function (vid) {

				getData.startVideoConsultation(appointment_id,hs_id).then(function (res) {

					sessionId=res.video_session_det.session;
					token=res.video_session_det.token;
					startVedio();
                });
				vid.preventDefault();

            });

           // getData.getDocumentBlobData(hs_id);
			apmt_status=res.appointments_details.appointment_det.apmt_status;
			prescriptions_list=res.appointments_details.consultation_details.prescription_details;
			//summary_details=res.appointments_details.consultation_details.consultation_summary;
			appointment=res.appointments_details;
			//alert(summary_list);
            $('#prescription').load('./components/prescription.html');
            $('#summary').load('./components/summary.html');

          if(apmt_status=="closed")
			{
				$("#badge-button").html('<span class="badge badge-pill badge-success">Closed</span>');
			}
			else if(apmt_status=="booked")
			{
                $("#badge-button").html('<span class="badge badge-pill badge-warning">Pending</span>');
            }

        }).catch(function(a,b){
		})
	};
	showDashboardDetails=function(res){
        $('#total').text(res.appointments_details.appointment_summary.total);
        $('#pending').text(res.appointments_details.appointment_summary.pending);
        $('#missed').text(res.appointments_details.appointment_summary.missed);
       // $('#shcedule-date').text(res.appointments_details.appointment[0].appointment_date);
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
        prev_apmt_date=res.appointments_details.prev_appointment_date;
      //  hcc_id=res.appointment_details.appointments[0].hcc_det.hcc_id;
	};
	var addPrescription = function(ev){

	};

	// Handling all of our errors here by alerting them
	function handleError(error) {
	  if (error) {
	    alert(error.message);
	  }
	}
	var publisher, subscriber;
	function initializeSession(apiKey, sessionId, token) {
		showMessage("Checking for the Support ans system requirements")
        OT.addEventListener("exception", exceptionHandler);
		if(OT.checkSystemRequirements()){
			var session = OT.initSession(apiKey, sessionId);

            // Subscribe to a newly created stream
            session.on('streamCreated', function(event) {
                if(!publisherError){
                    subscriber = session.subscribe(event.stream, 'subscriber', {
                        width: '100%',
                        height: '100%',
                        showControls: false
                    }, handleSubscriberError);
                    subscriber.on('connected', function (event) {
                    });
                }else{
                    showMessage("<span>"+current_appointment_details.health_seeker_profile.hs_name+" has joined the call but, App does not have access to Camera and Microphone. Please allow access to Camera ans Microphone.</span><br/>" +
                        "Fix : <a href='https://support.google.com/chrome/answer/2693767?hl=en'>Google chrome</a>, <a href='https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwiovJWr-tnXAhVIpZQKHSD8CPIQFggnMAE&url=https%3A%2F%2Fhelp.seesaw.me%2Fhc%2Fen-us%2Farticles%2F207891173-How-to-give-camera-mic-and-push-notifications-permissions-to-Seesaw&usg=AOvVaw2gUF7tM_fORFNgkbFoQkBv'>Firefox</a> " +
                        "<br/>>Please reload the app after access us given.");
                }

            });
            session.on({
                streamDestroyed: function (event) {
                	if (event.reason === 'networkDisconnected') {
                        event.preventDefault();
                        var subscribers = session.getSubscribersForStream(event.stream);
                        // if (subscribers.length > 0) {
                        //     var subscriber = document.getElementById(subscribers[0].id);
                        //     // Display error message inside the Subscriber
                        //     subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                        //         + 'or because the other party lost their connection.';
                        //     event.preventDefault();   // Prevent the Subscriber from being removed
                        // }
						showMessage('Lost connection. This could be due to your internet connection '
                            + 'or because the other party lost their connection.');
						event.preventDefault();
                    }
                }
            });
            session.on("sessionDisconnected", function(event) {
                //on stop consultation
            });

            // Create a publisher
            publisher = OT.initPublisher('publisher', {
                insertMode: 'append',
                width: '100%',
                height: '100%',
                showControls: false
            }, handleInitiatePublisherError);
            $('#publisher').draggable();
            // Connect to the session
            session.connect(token, function(error) {
                // If the connection is successful, publish to the session
                if (error) {
                    handleConnectionError(error);
                } else if(!publisherError){
                    session.publish(publisher, handlePublishComplete);
                }
            });
            $('.appointment-list-container').addClass('hidden-xs-up');
            $('.video-container').removeClass('hidden-xs-up');
            $($('.video-container')[0]).scrollTop(200);
            $('#start-vedio-consultation').addClass('hidden-xs-up')
            $('#close-vedio-consultation').removeClass('hidden-xs-up')
            return {session: session, stream: publisher.stream};
		}else{
			showMessage("your browser does not support webRTC please upgrade your browser");
		}
	}
	var vedioSession;
	var startVedio = function(){
		apiKey = apiKey,
        sessionId = sessionId,
        token = token,
			// (optional) add server code here
		vedioSession = initializeSession(apiKey, sessionId, token);
	};
	var stopVideo = function(){
		if(vedioSession){
			vedioSession.session.disconnect()
            $('.video-container').addClass('hidden-xs-up');
			$('.left-container').removeClass('col-12').addClass('col-3');
            $('.appointment-list-container').removeClass('hidden-xs-up');
            $('.appointment-content').removeClass('hidden-xs-up');
            $('#start-vedio-consultation').removeClass('hidden-xs-up')
	 		$('#close-vedio-consultation').addClass('hidden-xs-up')
	 		$('.audio, .video, .full-screen, .full-screen-off').addClass('hidden-xs-up');
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
            $('.appointment-content').addClass('hidden-xs-up');
            $('.left-container').addClass('col-12').removeClass('col-3');
		}else if(!$('#subscriber').hasClass('hidden-xs-up')){
			$('#subscriber').addClass('show-full-screen');
		}
		$('.full-screen-off').removeClass('hidden-xs-up')
		$('.full-screen').addClass('hidden-xs-up')
	}
	var removeFullScreen = function (ev) {
        if(!$('#publisher').hasClass('hidden-xs-up')){
        	$('.appointment-content').removeClass('hidden-xs-up');
            $('.left-container').addClass('col-3').removeClass('col-12');
        }else if(!$('#subscriber').hasClass('hidden-xs-up')){
            $('#subscriber').removeClass('show-full-screen');
        }
        $('.full-screen').removeClass('hidden-xs-up')
		$('.full-screen-off').addClass('hidden-xs-up')
    }
    showToaster = function (message) {
        var x = $('#toaster');

        // Add the "show" class to DIV
        x.html(message);
        x.addClass("show");


        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.removeClass("show"); x.html('')}, 1000);
    }
    function getDocument() {
		getData.getDocumentBlobData()
    }
    $("#appointment-list").on("click", function (evt) {
        var next = $('#mytabs li.active').next();
        next.length?
            next.find('a').click():
            $('#mytabs li a')[0].click();

    });
	$('#appointment-list, #appointment-list-phone').on('click touchstart', '.appointment',getAppointmentDetails)
	$('.appointment-details #prescription').on('submit', addPrescription)
	//$('#start-vedio-consultation').on('click', startVedio)
	$('#close-vedio-consultation').on('click', stopVideo)
	$('#toggleLocalAudio').on('click', muteAudio)
	$('#toggleLocalVideo').on('click', muteVideo)
	$('.full-screen').on('click', showFullScreen)
	$('.App-control-container').on('click', '.full-screen-off', removeFullScreen)
	$('.embedURL').on('click', getDocument);
})
