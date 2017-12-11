$(document).ready(function(){
 //   var isLoggedIn = false;
    function showDashboard() {
        doctor_id = sessionStorage.getItem("id");
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
            if (typeof(Storage) !== "undefined") {
                sessionStorage.setItem("id", res.doctor.doctor_id);
                sessionStorage.setItem("name", res.doctor.doctor_name);
                sessionStorage.setItem("token", res.doctor.token);
                sessionStorage.setItem("photo", res.doctor.photo);
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