$(document).ready(function(){
 //   var isLoggedIn = false;
    function showDashboard() {
        doctor_id = sessionStorage.getItem("doctorId");
        doctor_name = sessionStorage.getItem("name");
        login_token = sessionStorage.getItem("token");
        doc_photo = sessionStorage.getItem("photo");
        if(checkLogin()){

            $('#body').load('./components/dashboard.html');
        }else{
            $('#body').load('./components/login.html');
        }
    }
    function checkLogin() {

        if(doctor_id)
        {
            isLoggedIn=true;
        }
        else
            isLoggedIn=false;

        return isLoggedIn;
    }
    showDashboard();
    $('#body').on('click', '#login', function () {
        var user = $('#username').val();
        var pass = $('#password').val();
        getData.doDoctorLogin(user,pass).then(function (res) {
            debugger
            if (typeof(Storage) !== "undefined") {
                sessionStorage.setItem("userId", res.doctor.user_id);
                sessionStorage.setItem("doctorId", res.doctor.doctor_id);
                sessionStorage.setItem("name", res.doctor.doctor_name);
                sessionStorage.setItem("token", res.doctor.token);
                sessionStorage.setItem("photo", res.doctor.photo);
                //sessionStorage.setItem("hccId", res.doctor.hcc_id);
            }
            if(res.error.error_message == "Invalid Data : Email and password mismatch"){
                $('.error-message').html(res.error.error_message)
            }else{
                isLoggedIn = checkLogin();
                showDashboard();
                }
        });
    })
});
function showApiError(error){
    if(error.result != 0){
        $('#api-error').removeClass('hidden-xs-up');
        $('#api-error-message').html("['"+error.error_code + "']: "+ error.error_message);
        return false;
    }
    switch (error.result){
        case "-999":
            logout();
            return false;
    }
    return true;
}