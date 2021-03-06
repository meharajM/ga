var session_info = {
    "user_id": sessionStorage.getItem("userId"),
    "access_token": sessionStorage.getItem("token"),
    "device_id": "web",
    "doctor_id": sessionStorage.getItem("doctorId")
};
var doctor_id = sessionStorage.getItem("doctorId");
//var base_url = "https://52.77.171.116/gadoctor";                        //Stage Server
//var API_BASE_PATH="https://doctor.growayu.com/growayuassist/api";       //Production Server
//var base_url = "https://doctor.growayu.com/gadoctor";                  //Production Server
var base_url = "https://13.126.208.181/gadoctor";                   //Migration Server
var API_BASE_PATH="https://13.126.208.181/growayuassist/api";       //Migration Server



var getData = {
    getDashboardData: function(date){
        var url = "/api/getDocAppointmentDashboard.php";
        var apmt_input = {
            "date" : date,
            "doctor_id" : doctor_id,
            "hcc_id" : ""
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
        var apmt_input= {
            apmt_id : id,
            doctor_id :doctor_id,
            "hcc_id" : selectedAppointment.hcc_det.hcc_id
        };
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
                "longitude": ""
            },
            "device_id": "web",
            //Added by Nishant, Later
            "device_name":"browser",
            "device_type":"",
            "device_version":"",
            "push_not_token":"",
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
            "hcc_id" : selectedAppointment.hcc_det.hcc_id,
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
            "hcc_id" : selectedAppointment.hcc_det.hcc_id
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
            "hcc_id" : selectedAppointment.hcc_det.hcc_id,
        };
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
    previewConsultationSummary: function(id){
        var url = "/api/previewConsultationSummary.php";
        var doctorId = doctor_id;
        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hcc_id: selectedAppointment.hcc_det.hcc_id,
            date: "",
            apmt_type: apmt_type
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
                    med_name: term
                },
                session_info: session_info
            }),
            dataType: 'json',
            success: function (res) {
                showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        });
        return call;
    },
    addMyMedicineList: function(medicine){
        var url = "/api/addMyMedicineList.php";
        var data = {
            medicine: medicine,
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
                },
                session_info: session_info
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
        };
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


    addPrescriptionTemplate: function(template_name,diseases, prescription){
        var url = "/api/addPrescriptionTemplate.php";
        var doctorId = doctor_id;
        var template= {
            doctor_id: doctorId,
            "hcc_id" : selectedAppointment.hcc_det.hcc_id,
            template_id: "",
            template_name:template_name,
            disease:diseases
        };

        var prescription=prescription;
        var data = {
            template_details: {
                "template":template,
                "prescription": prescription
            },
            session_info: session_info
        };
        showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            //url: base_url + url,
            url:base_url+url,
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
            hcc_id : selectedAppointment.hcc_det.hcc_id,
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
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    getDocumentBlobData: function (hs_id,rec_id) {
        var url = "/api/getDocumentBlobData.php";
        var hs_id = hs_id;
        var record_id= rec_id;
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
                showApiError(res.error);
                return res;
            },
            error: function (err, status) {
                alert("error in blob");
                console.error(err, status);
            }
        });
        return call;
    },


    /* Bala Code starts for get previous appointment dates */
    getPreviousAppointmentDate: function(){
        var url = "/api/getPreviousAppointments.php";
        var doctorId = doctor_id;
        var date     = moment(appointment_date).format("YYYYMMDD");
        var hsId    = hs_id;

        hideApiError();
        call = $.ajax({
            type: "POST",
            url: base_url + url,
            data:JSON.stringify({
                apmt_input : {
                    doctor_id : doctorId,
                    hs_id     : hsId,
                    date      : date,
                    apmt_with_prescription  : ""
                },
                session_info: session_info
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

    getPreviousPrescriptions: function(){
        var url = "/api/getPreviousAppointments.php";
        var doctorId = doctor_id;
        var date     = moment(appointment_date).format("YYYYMMDD");
        var hsId    = hs_id;

        hideApiError();
        call = $.ajax({
            type: "POST",
            url: base_url + url,
            data:JSON.stringify({
                apmt_input : {
                    doctor_id : doctorId,
                    hs_id     : hsId,
                    date      : date,
                    apmt_with_prescription  : "Y"
                },
                session_info: session_info
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
    /* Bala Code ends for get previous appointment date */

    /* Bala code starts here for copy previous prescription */

    getPrescription: function(apmt_id){
        var url = "/api/getPrescription.php";
        var doctorId = doctor_id;
        var apmt_input = {
            doctor_id: doctorId,
            apmt_id: apmt_id
        };
        var data = {
            apmt_input  : apmt_input,
            session_info: session_info
        }
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
               // console.log(res);
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
    /* Bala Code ends here for copy  previous prescription */

    addGaNotes: function(apmt_id, notes){
        var url = "/api/addGaNotes.php";
        var doctorId = doctor_id;
        var ga_info = {
            doctor_id: doctorId,
            apmt_id: apmt_id,
            hs_id: hs_id,
            notes:notes,
            notes_id:notes_id
        };
        var data = {
            ga_info  : ga_info,
            session_info: session_info
        };
       // showLoader();
        hideApiError();
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
              //  console.log(res);
                showApiError(res.error);
                return res;
            },
            error: function(err,status){
                console.error(err, status);
            }
        }).then(function(res){
           // hideLoader();
            return res;
        });
        return call;
    }
};