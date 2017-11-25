function handleInitiatePublisherError(error){// The method succeeds when the user grants access to the camera and microphone. The method fails if the user denies access to the camera and microphone
    $('#subscriber').html("<div class='message'><div class='spinner'><span class='fa fa-circle-o-notch fa-spin'></span> </div></div>");

}
function handleSubscriberError(error){
    debugger
}
function handlePublishComplete(error){
    $('#publisher').removeClass('hidden-xs-up')
    $('.audio, .video, .full-screen').removeClass('hidden-xs-up')
    $('#subscriber').html("<div class='message'><div class='text'>Waiting for <span id='calli-name'>"+ current_appointment_details.health_seeker_profile.hs_name +"</span> to join</div></div>");

}
function handleConnectionError(error){
    debugger

}