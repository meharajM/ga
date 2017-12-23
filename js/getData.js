var session_info = {
    "user_id": sessionStorage.getItem("userId"),
    "access_token": sessionStorage.getItem("token"),
    "device_id": "web",
    "doctor_id": sessionStorage.getItem("doctorId")
};
var doctor_id = sessionStorage.getItem("doctorId");
var base_url = "https://52.66.157.195/growayu/ganewdesign/"           //Test Server
//var base_url = "https://52.77.171.116/gadoctor";                        //Stage Server
var getData = {
    getDashboardData: function(date){
        var url = "/api/getDocAppointmentDashboard.php";
        var apmt_input = {
            "date" : date,
            "doctor_id" : doctor_id,
            "hcc_id" : "1"
        };
        var data = {
            appntment_input: apmt_input,
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    getAppointmentDetails: function(id){
        var url = "/api/getAppointmentDetails.php";
        var doctorId = "1";
        var apmt_input= {
            apmt_id : id,
            doctor_id :doctorId,
            hcc_id : "1"
        }
        var data = {
            apmt_input: apmt_input,
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    doDoctorLogin: function(username,password){
        var url = "/api/doDoctorLogin.php";
        var doctor_info = {
            "doctor_email": username,
            "doctor_pwd": password,
            "location": {
                "latitude": "",
                "langitude": ""
            },
            "device_id": "web",
        };
        var data = {
            doctor_info: doctor_info
        };
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
            return res;
        });
        return call;
    },
    doDoctorLogout: function(){
        var url = "/api/doDoctorLogout.php";
        var login_info = {
            "session_token" : login_token,
            "sessionId" : "",
            "doctor_id" : doctor_id,
            "device_id": ""
        };
        var data = {
            login_info : login_info,
            session_info: session_info
        };
        showLoader();
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                 //showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    startVideoConsultation: function(id,hs_id){
        var url = "/api/startVideoConsultation.php";
        var apmt_info = {
            "hcc_id" : "1",
            "doctor_id" : doctor_id,
            "apmt_id" : id,
            "health_seeker_id" : hs_id,
            "date" : ""
        };
        var data = {
            apmt_info: apmt_info,
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
           dataType: 'json',
            success: function (res,status) {
                 showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    UpdatePrescriptionDetails: function (id,prescriptions) {
        var url = "/api/UpdatePrescriptionDetails.php";
        var doctorId = doctor_id;

        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hs_id: hs_id,
            hcc_id: "1"
        };

        var data = {
            apmt_input: apmt_input,
            prescription: prescriptions,
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status){
                 showApiError(res.error);
                // alert("success update pres");
                return res;

            },
            error: function (err, status) {
                console.error(err);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });

        return call;
    },
    UpdateConsultationSummary: function(id,summary){
        var url = "/api/UpdateConsultationSummary.php";
        var doctorId = doctor_id;
        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hs_id: hs_id,
            hcc_id: "1"
        };
        /* var summary={
             consultation_id: "",
             diagnosis:"pain in chest",
             mgmt_plan:"hello",
             followup_date:"20-12-2017",
             followup_in: "2 days",
             waiver_status: "Partial",
             waived_amount: "1000",
             ga_notes: "bye",
             doctor_notes: "hi there",
             suggested_test: [
                 {
                     test_id: "1",
                     test_name: "Blood"
                 },
                 {
                     test_id: "2",
                     test_name: "Chemo"
                 }
             ],
             seeker_instructions: [
                 {
                     instruction_id: "",
                     instruction_text: ""
                 }
             ]
         };*/


        var data = {
            apmt_input: apmt_input,
            summary:summary,
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                //alert("success in update summary");
                 showApiError(res.error);
                return res;
            },
            error: function(err,status){
                //alert("error in update summary");
                console.error(err, status);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    previewConsultationSummary: function(id){
        var url = "/api/previewConsultationSummary.php";
        var doctorId = doctor_id;
        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hcc_id: "",
            date: ""
        };
        var data = {
            apmt_input: apmt_input,
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
               // console.log(res);
            
                 showApiError(res.error);
                //  alert("success in preview summary");

                return res;
            },
            error: function(err,status){
                // alert("error in preview summary");
                console.error(err, status);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    getMymedicineList: function(term){
        var url = "/api/getMymedicineList.php";
        var doctorId = doctor_id;
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify({
                medicine_list: {
                    doctor_id: doctorId,
                    //doctor_id:1,
                    med_name: term
                },
                session_info: session_info
            }),
            dataType: 'json',
            success: function (res) {
                //   alert("success in med");
                showApiError(res.error)
                return res;
            },
            error: function(err,status){
                //  alert("error in med");
                console.error(err, status);
            }
        });
        return call;
    },
    getPrescriptionTemplateList: function(term){
        var url = "/api/getPrescriptionTemplateList.php";
        var doctorId = doctor_id;
        hideApiError();
        call = $.ajax({
            type: "POST",
            url: base_url + url,
            data:JSON.stringify({
                template_input : {
                    doctor_id: doctorId,
                    //doctor_id: 1,
                    template_id: 1,
                    template_name:term,
                    speciality: ""
                }
            }),
            dataType: 'json',
            success: function (res,status) {
                 showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
            return res;
        });
        return call;
    },
    getMyprescriptionTemplateDetails: function(id){
        var url = "/api/getMyprescriptionTemplateDetails.php";
        var doctorId = doctor_id;
        var template_input = {
            doctor_id: doctorId,
            template_id: id,
        };
        var data = {
            template_input: template_input,
            session_info: session_info
        }
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                 showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
            return res;
        });
        return call;
    },
/* Bala Code Starts Here*/

    getLabTest: function(term){
        var url = "/api/labTest.php";
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify({
                suggested_test: {
                    labtest_name:  term
                },
                session_info: session_info
            }),
            dataType: 'json',

            success: function (res,status) {
             
                //showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        });
        return call;
    },

/* Bala Code Ends Here*/

    
    closeConsultation: function (id) {
        var url = "/api/closeConsultation.php";
        var doctorId = doctor_id;
        var date=appointment_date;
        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hcc_id:"1",
            date: date
        };
        var data = {
            apmt_input: apmt_input,
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                 showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        });
        return call;
    },
    getDocumentBlobData: function (id) {
        var url = "/api/getDocumentBlobData.php";
        var hs_id = id;
        var record_id=441;
        var document = {
            hs_id:hs_id,
            record_id:record_id
        };
        var data = {
            document: document,
            session_info: session_info
        };
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status){
               // alert("success in blob");
                showApiError(res.error);
                return res;
            },
            error: function (err, status) {
                alert("error in blob");
                console.error(err, status);
            }
        });
        return call;
    }
}