$(document).ready(function(){
    var isLoggedIn = true;
    function showDashboard() {
        if(checkLogin()){

            $('#body').load('../components/dashboard.html');
        }else{
            debugger
            $('#body').load('../components/login.html');
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
            debugger
            isLoggedIn = true
            showDashboard();
        });
    })
});