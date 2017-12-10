var session_info = {
    "user_id": "test@test.com",
    "access_token": "aeuhsy78989ljjsj",
    "device_id": "1"
};
var base_url = "https://52.66.157.195/growayu/ganewdesign";           //Test Server
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
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
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
        var doctorId = doctor_id;
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
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
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
            "device_id": ""
        };
        var data = {
            doctor_info: doctor_info
        };
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
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
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
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

        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status){
                //  alert("success update pres");
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

        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                //    alert("success in update summary");
                return res;
            },
            error: function(err,status){
                //  alert("error in update summary");
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
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            // dataType: 'json',
            success: function (res,status) {
                //  alert("success in preview summary");

                return res;
            },
            error: function(err,status){
                //  alert("error in preview summary");
                console.error(err, status);
            }
        }).then(function(res){
            hideLoader();
            return res;
        });
        return call;
    },
    getMymedicineList: function(){
        var url = "/api/getMymedicineList.php";
        var doctorId = doctor_id;
        var medicine_list = {
            doctor_id: doctorId,
            med_name: "C"
            //           med_id:"2",
            //         med_chemical_name: "",
            //       dosage: "200",
            //     dosage_uom: "mg"

        };
        var data = {
            medicine_list: medicine_list,
            session_info: session_info
        };
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                //  alert("success in med");
                return res;
            },
            error: function(err,status){
                //   alert("error in med");
                console.error(err, status);
            }
        }).then(function(res){
            return res;
        });
        return call;
    },
    getPrescriptionTemplateList: function(id){
        var url = "/api/getPrescriptionTemplateList.php";
        var doctorId = doctor_id;
        var template_input = {
            doctor_id: doctorId,
            template_id: id,
            template_name:"",
            speciality: ""
        };
        var data = {
            template_input: template_input,
            session_info: session_info
        };
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
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
            template_id: id
        };
        var data = {
            template_input: template_input,
            session_info: session_info
        };
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
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

    /* getDoctorProfile: function(id){
         var url = "/api/getDoctorProfile.php";
         var doctorId = id;
         var hcc_id="1";
         var doctor_info = {
             doctor_id: doctorId,
             hcc_id: hcc_id
         };
         var data = {
             doctor_info: doctor_info,
             session_info: session_info
         }
         var call = $.ajax({
             type: "POST",
             url: base_url + url,
             data: JSON.stringify(data),
             dataType: 'json',
             success: function (res,status) {
                 return res;
             },
             error: function(err,status){
                 console.error(err, status);
             }
         }).then(function(res){
             return res;
         });
         return call;
     }, */
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
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
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
    getDocumentBlobData: function (id) {
        var url = "/api/getDocumentBlobData.php";
        var hs_id = id;
        var record_id=441;
        var document = {
            hs_id:hs_id,
            record_id:record_id
        };
        var data = {
            document: document
        };
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status){
                return res;
            },
            error: function (err, status) {
                console.error(err, status);
            }
        });
        return call;
    }
}