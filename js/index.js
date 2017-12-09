$(document).ready(function(){
    var isLoggedIn = true;
    function showDashboard() {
        if(checkLogin()){

            $('#body').load('./components/dashboard.html');
        }else{
            $('#body').load('./components/login.html');
        }
    }
    function checkLogin() {
        return isLoggedIn;
    }
    showDashboard();
    $('#body').on('click', '#login', function () {
        var user = $('#username').val();
        var pass = $('#password').val();
        getData.doDoctorLogin(user,pass).then(function (res) {
            if(res.error.error_message == "Invalid Data : Email and password mismatch"){
                $('.error-message').html(res.error.error_message)
            }else{
                isLoggedIn = true;
                showDashboard();
                doctor_id=res.doctor.doctor_id;
                doctor_name=res.doctor.doctor_name;
                login_token=res.doctor.token;

            }

        });
    })
});