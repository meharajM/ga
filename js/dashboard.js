var appointment_id, hs_id,appointment_list,sessionId,token,apiKey,next_apmt_date,prev_apmt_date,apmt_status,prescriptions_list, summary_details, note_content, notes_id, health_param_speciality;
var appointment,apmt_type,consultation_id,record_id,summary_record_id;
var showToaster, session;
var doctor_id, doctor_name,doc_photo, template_id, login_token, appointment_date, selectedAppointment
function showMessage(message) {
    $('#subscriber').html("<div class='message'><div class='text'>"+ message +"</div></div>");
}
function showLoader() {
    $('.loading').removeClass('hidden-xs-up');
}
function hideLoader() {
    $('.loading').addClass('hidden-xs-up');
}
$(document).ready(function(){
    var actualDate=new Date();
    var date=moment(actualDate).format("YYYYMMDD");
    getData.getDashboardData(date).then(function(res){
        $('#filter').load(filter);
        appointment_list=res.appointments_details.appointment;
        showDashboardDetails(res);
        appointment_date=moment(actualDate).format("YYYY-MM-DD");

    });
    /*getting appointment details*/
    var getAppointmentDetails = function(ev) {
        appointment_id = ev.currentTarget.id;
        selectedAppointment = appointment_list.filter(function (ap) {
            return ap.appointment_id === appointment_id;
        })[0];
        getData.getAppointmentDetails(appointment_id).then(function (res) {
            $('.no-appointment-selected').addClass('d-none');
            $('.appointment-info').removeClass('d-none');
            var source = $('#detailsTemplate').html();
            var template = Handlebars.compile(source);
            var html = template(res.appointments_details);
            $('#details').html(html);

/*            $(".note-badge").on('click', function () {
                $('.float-note').removeClass('hidden-xs-up');
                $('.float-note').draggable();
                showToaster("You can drag the note popup wherever you want", "bottom", "1500");
            });*/
            $('#add-note-1').unbind().on('click', function (ev) {
                if(!$(".float-note").hasClass("hidden-xs-up")){
                    $('.float-note').addClass('hidden-xs-up');
                    $('#add-note-1').attr("title", "Doctor-Notes");


                }else{
                    $('.float-note').removeClass('hidden-xs-up');
                    $('.float-note').draggable();
                    $('#add-note-1').attr("title", "Click to close Doctor-Notes");
                    showToaster("You can drag the note popup wherever you want", "bottom", "1500");
                }
            });
            $("#note-content").unbind().blur(function(){
                if(apmt_status!="closed") {
                  //  debugger
                    getData.addGaNotes(appointment_id, $("#note-content").val()).then(function (res) {
                        notes_id = res.ga_notes.id;
                        if(!res.error.error_message) {
                            $("#api-success").removeClass('hidden-xs-up');
                            $("#api-success-message").show();
                            $("#api-success-message").html("Doctor Notes have been saved successfully !!");
                            $('#api-success-message').delay(3000).fadeOut("slow", function (evt) {
                            });
                        }
                    });
                }
            });
            $('#close-note-1').on('click', function () {
                $('.float-note').addClass('hidden-xs-up');
            });
            notes_id=res.appointments_details.appointment_det.ga_notes_id;
            if(!notes_id){
                notes_id="";
            }
            note_content=res.appointments_details.appointment_det.ga_notes;
            $("#note-content").val(note_content);
            $('#prescription').load(prescription);
            $('#history').load(history_file);
            $("#summary").load(summary);
            $("#health_parameters").load(health_parameters);       //Added By Nishant
            if (res.appointments_details.appointment_det.summary_record_id) {
                summary_record_id = res.appointments_details.appointment_det.summary_record_id;
            }
            if (res.appointments_details.appointment_det.health_record.length == 0) {
                $('.attach-docs').hide();
                $('.attached-records').hide();
            }
            if (res.appointments_details.appointment_det.summary_record_id == null) {
                $('.summary-docs').hide();
                $('.sumary_img').hide();
            }
            if (res.appointments_details.appointment_det.apmt_type != "VC") {
                $('#start-vedio-consultation').hide();
            } else {
                $('#start-vedio-consultation').show();
            }
            hs_id = res.appointments_details.health_seeker_profile.hs_id;
            health_param_speciality=res.appointments_details.appointment_det.health_param_speciality;
            apmt_type=res.appointments_details.appointment_det.apmt_type;
//          $('#parameters').html("<iframe class='iframe' src='"+base_url+"/growayuassist/hs_health_param_tab.php?prog_hcc="+selectedAppointment.hcc_det.hcc_id+"&hs_id="+hs_id+"&patient_id=IND01-17-C00001&visit_id=4&first_time=1'></iframe>");
            $(".parameters_tab").on('click', function (evt) { //click function added later, previously, it was loading in the start of click of an apointment
                //$('#parameters').html("<iframe class='iframe' src='https://13.126.208.181/growayuassist/hs_health_param_tab.php?prog_hcc="+selectedAppointment.hcc_det.hcc_id+"&hs_id="+hs_id+"&patient_id=IND01-17-C00001&visit_id=4&first_time=1'></iframe>");
               if(selectedAppointment.hcc_det.hcc_id) {
                   //debugger
                   $('#parameters').html("<iframe class='iframe' src='https://13.126.208.181/growayuassist/health_param.php?&origin=docboard&hcc_id=" + selectedAppointment.hcc_det.hcc_id + "&id=" + appointment_id + "'></iframe>");
               }
               else{
                   //debugger
                   $('#parameters').html("<iframe class='iframe' src='https://13.126.208.181/growayuassist/hs_health_param_tab.php?&origin=docboard&hcc_id=0&id=" + appointment_id + "'></iframe>");

               }
                // $('#parameters').html("<iframe class='iframe' src='https://doctor.growayu.com/growayuassist/hs_health_param_tab.php?prog_hcc="+selectedAppointment.hcc_det.hcc_id+"&hs_id="+hs_id+"&patient_id=IND01-17-C00001&visit_id=4&first_time=1'></iframe>");
            });
            $("#start-vedio-consultation").on("click", function (vid) {
                getData.startVideoConsultation(appointment_id, hs_id).then(function (res) {
                    sessionId = res.video_session_det.session;
                    token = res.video_session_det.token;
                    apiKey = res.video_session_det.apiKey;
                    startVedio();
                });
             /*   $(".nav-tabs").removeClass("heading-font");
                $(".nav-tabs").addClass("body-font");*/
                vid.preventDefault();
            });

            $(".health_record").on("click", function (evt) {
                var rec_id = this.id;
                $('.modal-body').html("<iframe class='iframe' src='"+base_url+"/api/viewHealthRecord.php?health_record_id=" + rec_id + "&health_seeker_id="+hs_id+"&session_token="+login_token+"'></iframe>");
                evt.preventDefault();
            });
            apmt_status = res.appointments_details.appointment_det.apmt_status;
            prescriptions_list = res.appointments_details.consultation_details.prescription_details;
            summary_details = res.appointments_details.consultation_details.consultation_summary;
            appointment = res.appointments_details;
            consultation_id = summary_details.consultation_id;
            if(note_content){
                $("#note-title").text("Notes Saved");
            }
            if(apmt_status=="closed" && note_content){
                $("#note-title").text("Notes Saved");
                $("#note-content").attr('readonly', true);
            }else{
                //$("#note-title").text("Add Note");
                $("#note-content").attr('readonly', false);
            }
            if((apmt_status=="expired" || apmt_status=="closed")&&(!note_content)){
               // $("#add-note-1").hide();
                $("#note-title").text("Notes Saved");
                $("#note-content").val('No Doctor Notes!!');
                $("#note-content").attr('readonly', true);
            }
        });
    };
    showDashboardDetails=function(res, fromFilter){
        $('.appointment-info.details').addClass('d-none');
        $('.no-appointment-selected').removeClass('d-none');
        $("#no-appointment-selected-message").html("Please select an appointment");
        $(".filter-area").removeClass("hidden-xs-up");
        $('.float-note').addClass('hidden-xs-up'); //Added for hiding note-cntent on appointment dashboard details change
        if(res.appointments_details.appointment.length === 0 && !fromFilter){
            $(".filter-area").addClass("hidden-xs-up");
            $("#no-appointment-selected-message").html("You don't have any scheduled appointments");
        }
        if(res.appointments_details.appointment_summary)
        {
            $('#all_button').text(res.appointments_details.appointment.length);
            $('#pending_button').text(res.appointments_details.appointment.filter(function(ap){ return ap.appointment_status === "inprogress" || ap.appointment_status === "booked" || ap.appointment_status === "paid"}).length);
            $('#closed_button').text(res.appointments_details.appointment.filter(function(ap){ return ap.appointment_status === "closed" || ap.appointment_status === "expired"}).length);
        }
        $('.iframe').load(function (ev) {
            var iframe = $('.iframe').contents();
            iframe.find('#page-wrapper').css('margin', '0 !important');
            iframe.find('nav').css('display', 'none');
            iframe.find('nav').hide();
        });
        // $('#shcedule-date').text(res.appointments_details.appointment[0].appointment_date);
        var source   = $("#appointmentTemplate").html();
        var template = Handlebars.compile(source);
        var html = template(res.appointments_details);
        if($(window).width() < 500){
            $('#appointment-list-phone').html(html);
            $('#appointment-list-phone').removeClass('list-group').addClass('list-inline');
            $('#appointment-list-phone .list-group-item').removeClass('list-group-item').addClass('list-inline-item')
        }else{
            $('#appointment-list').html(html)
        }
        if(!fromFilter){
            $('#next_day').show();
            $('#previous_day').show();
            next_apmt_date=res.appointments_details.next_appointment_date;
            prev_apmt_date=res.appointments_details.prev_appointment_date;
            if(!next_apmt_date){
                $('#next_day').hide();
            }
            if(!prev_apmt_date){
                $('#prev_apmt_date').hide();
            }
        }
        //  hcc_id=res.appointment_details.appointments[0].hcc_det.hcc_id;
        $(".PC").html('<i class="fa fa-user"></i>');
        $(".VC").html('<i class="fa fa-video-camera"></i>');
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
        showMessage("Checking for the Support ans system requirements");
        try{
            OT.addEventListener("exception", exceptionHandler);
            if(OT.checkSystemRequirements()){
                session = OT.initSession(apiKey, sessionId);
                session.on('streamCreated', function(event) {
                    if(!publisherError){
                        $('#subscriber').html("<div id='subscriber-container'></div>");
                        subscriber = session.subscribe(event.stream, 'subscriber-container', {
                            width: '100%',
                            height: '100%',
                            showControls: false,
                        }, handleSubscriberError);
                        subscriber.on('connected', function (event) {
                        });
                        subscriber.on('streamDestroyed', subscriberStreamDestroyed);
                    }else{
                        showMessage("<span>"+current_appointment_details.health_seeker_profile.hs_name+" has joined the call but, App does not have access to Camera and Microphone. Please allow access to Camera ans Microphone.</span><br/>" +
                            "Fix : <a href='https://support.google.com/chrome/answer/2693767?hl=en'>Google chrome</a>, <a href='https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwiovJWr-tnXAhVIpZQKHSD8CPIQFggnMAE&url=https%3A%2F%2Fhelp.seesaw.me%2Fhc%2Fen-us%2Farticles%2F207891173-How-to-give-camera-mic-and-push-notifications-permissions-to-Seesaw&usg=AOvVaw2gUF7tM_fORFNgkbFoQkBv'>Firefox</a> " +
                            "<br/>>Please reload the app after access us given.");
                    }

                });
                session.on('sessionDisconnected', function (event) {
                    if (event.reason === 'networkDisconnected') {
                        event.preventDefault();
                        // var subscribers = session.getSubscribersForStream(event.stream);
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
                });
                session.on("streamDestroyed", sessionStreamDestroyed);
                // Create a publisher
                $('#publisher').html("<div id='publisher-container'></div>");
                publisher = OT.initPublisher('publisher-container', {
                    insertMode: 'append',
                    width: '100%',
                    height: '100%',
                    showControls: false,
                }, handleInitiatePublisherError);
                publisher.on('streamDestroyed', publisherStreamDestroyed);
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
                $('.left-container').removeClass('col-3').addClass('col-5');
                $('.appointment-content').removeClass('col-9').addClass('col-7');
                $($('.video-container')[0]).scrollTop(200);
                $('#start-vedio-consultation').addClass('hidden-xs-up');
                $('#close-vedio-consultation').removeClass('hidden-xs-up');
                return {session: session, stream: publisher.stream};
            }else{
                showMessage("your browser does not support webRTC please upgrade your browser");
            }}catch (e){
            console.error(e)
        }
    }
    var vedioSession;
    var startVedio = function(){
        apiKey = apiKey,
            sessionId = sessionId,
            token = token,
            // (optional) add server code here
            vedioSession = initializeSession(apiKey, sessionId, token);
        $(".nav-tabs").removeClass("heading-font");
        $(".nav-tabs").addClass("body-font");
    };
    var stopVideo = function(){
        if(confirm("Do You really want to close the session ? ")){
            if(session){
                clearInterval(videoTimer);
                session.disconnect()
                $('.video-container').addClass('hidden-xs-up');
                $('.left-container').removeClass('col-12').removeClass('col-5').addClass('col-3');
                $('.appointment-list-container').removeClass('hidden-xs-up');
                $('.appointment-content').removeClass('hidden-xs-up').removeClass('col-7').addClass('col-9');
                $('#start-vedio-consultation').removeClass('hidden-xs-up');
                $('#close-vedio-consultation').addClass('hidden-xs-up');
                $('.audio, .video, .full-screen, .full-screen-off').addClass('hidden-xs-up');

                $(".nav-tabs").removeClass("body-font");
                $(".nav-tabs").addClass("heading-font");
            }
        }
    };
    var muteAudio = function(ev){
        if($(this).hasClass('muted')){
            publisher.publishAudio(true);
            $(this).removeClass('muted');
        }else{
            publisher.publishAudio(false);
            $(this).addClass('muted');
        }
    };
    var muteVideo = function(ev){
        if($(this).hasClass('muted')){
            publisher.publishVideo(true);
            $(this).removeClass('muted');
        }else{
            publisher.publishVideo(false);
            $(this).addClass('muted');
        }
    };
    var showFullScreen = function(ev){
        if(!$('#publisher').hasClass('hidden-xs-up')){
            $('.appointment-content').addClass('hidden-xs-up');
            $('.left-container').addClass('col-12').removeClass('col-3');
        }else if(!$('#subscriber').hasClass('hidden-xs-up')){
            $('#subscriber').addClass('show-full-screen');
        }
        $('.full-screen-off').removeClass('hidden-xs-up');
        $('.full-screen').addClass('hidden-xs-up')
    };
    var removeFullScreen = function (ev) {
        if(!$('#publisher').hasClass('hidden-xs-up')){
            $('.appointment-content').removeClass('hidden-xs-up');
            $('.left-container').addClass('col-3').removeClass('col-12');
        }else if(!$('#subscriber').hasClass('hidden-xs-up')){
            $('#subscriber').removeClass('show-full-screen');
        }
        $('.full-screen').removeClass('hidden-xs-up');
        $('.full-screen-off').addClass('hidden-xs-up');
    };
    showToaster = function (message, position, delay) {
        var x = $('#toaster');
        // Add the "show" class to DIV
        x.html(message);
        x.addClass("show");
        if(position){
            x.addClass(position);
        }else{
            x.addClass('bottom');
        }
        var tDelay = 1000;
        if(delay){
            tDelay = delay;
        }
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.removeClass("show"); x.html('')}, tDelay);
    };
    function showProfile() {
    }
    $("#appointment-list").on("click", function (evt) {
        var next = $('#mytabs li.active').next();
        next.length?
            next.find('a').click():
            $('#mytabs li a')[0].click();

        $('.float-note').addClass('hidden-xs-up');
        if(!note_content) {
            $("#note-content").val("");
        }
    });
    $("#appointment-list").on('click','li', function(e) {
        var $this = $(this);
        $('#appointment-list').find('.active').removeClass('active');
        $this.addClass('active');
    });
    $('#appointment-list, #appointment-list-phone').on('click touchstart', '.appointment',getAppointmentDetails);
    $('.appointment-details #prescription').on('submit', addPrescription);
    //$('#start-vedio-consultation').on('click', startVedio)
    $('#close-vedio-consultation').on('click', stopVideo);
    $('#toggleLocalAudio').on('click', muteAudio);
    $('#toggleLocalVideo').on('click', muteVideo);
    $('.full-screen').on('click', showFullScreen);
    $('.App-control-container').on('click', '.full-screen-off', removeFullScreen);
    $('#appointment-list').on('click', '.heath-seeker-profile', showProfile);
    //$('.health_record').on('click', getDocument);

    $('#logout').on('click', logout);
    $('#api-error').on("click", '.fa-times', function (ev) {
        hideApiError();
    });
    $(".icon-logo").on('click', function () {
        var actualDate=new Date();
        var date=moment(actualDate).format("YYYYMMDD");
        getData.getDashboardData(date).then(function(res){
            $('#filter').load(filter);
            appointment_list=res.appointments_details.appointment;
            showDashboardDetails(res);
            appointment_date=moment(actualDate).format("YYYY-MM-DD");
        });
    })
});
function logout() {
    getData.doDoctorLogout().then(function (res) {
        isLoggedIn = false;
        window.location = '/';
        delete sessionStorage.userId;
        delete sessionStorage.doctorId;
        location.reload();
    });
}