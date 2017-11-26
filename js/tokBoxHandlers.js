var publisherError;
function handleInitiatePublisherError(error){// The method succeeds when the user grants access to the camera and microphone. The method fails if the user denies access to the camera and microphone
    if(error){
        publisherError = true;
        if(error.name === "OT_USER_MEDIA_ACCESS_DENIED" || error.name === "OT_MEDIA_ERR_ABORTED"){
            showMessage("<span>App does not have access to Camera and Microphone. Please allow access to Camera ans Microphone.</span><br/>" +
                "Fix : <a href='https://support.google.com/chrome/answer/2693767?hl=en'>Google chrome</a>, <a href='https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwiovJWr-tnXAhVIpZQKHSD8CPIQFggnMAE&url=https%3A%2F%2Fhelp.seesaw.me%2Fhc%2Fen-us%2Farticles%2F207891173-How-to-give-camera-mic-and-push-notifications-permissions-to-Seesaw&usg=AOvVaw2gUF7tM_fORFNgkbFoQkBv'>Firefox</a> ")
        }
    }else{
        $('#subscriber').html("<div class='message'><div class='spinner'><span class='fa fa-circle-o-notch fa-spin'></span> </div></div>");
    }
}
function handleSubscriberError(error){
    if(error){
        showMessage(error)
    }else{
        showToaster(current_appointment_details.health_seeker_profile.hs_name + " has joined the call.")
    }
}
function handlePublishComplete(error){
    $('#publisher').removeClass('hidden-xs-up')
    $('.audio, .video, .full-screen').removeClass('hidden-xs-up')
    showMessage("Waiting for <span id='calli-name'>"+ current_appointment_details.health_seeker_profile.hs_name +"</span> to join");
}
function handleConnectionError(error){
    debugger

}