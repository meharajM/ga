var session_info = {
    "user_id": "test@test.com",
    "access_token": "aeuhsy78989ljjsj",
    "device_id": "1"
};
var base_url = "http://52.66.157.195/growayu/ganewdesign";
var getData = {
    getDashboardData: function(date){
        var url = "/api/getDocAppointmentDashboard.php";
        var apmt_input = {
            "date" : date,
            "doctor_id" : "1",
            "hcc_id" : "1"
        };
        var data = {
            appntment_input: apmt_input,
            session_info: session_info
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
        }).catch(function(res){
            console.log("caught error in response"+ res);
        });
        return call;
    },
    getAppointmentDetails: function(id){
        var url = "/api/getAppointmentDetails.php";
        var doctorId = 1;
        var apmt_input= {
            apmt_id : id,
            doctor_id :doctorId,
            hcc_id : "1"
        }
        var data = {
            apmt_input: apmt_input,
            session_info: session_info
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
        }).catch(function(a,b){
            console.log("caught error in response"+a,b);
        });
        return call;
    },
    doDoctorLogin: function(username,password){
        var url = "/wapi/doDoctorLogin.php";
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
    startVideoConsultation: function(id,hs_id){
        var url = "/wapi/startVideoConsultation.php";
        var apmt_info = {
            "hcc_id" : "1",
            "doctor_id" : "1",
            "apmt_id" : id,
            "health_seeker_id" : hs_id,
            "date" : ""
        };
        var data = {
            apmt_info: apmt_info,
            session_info: session_info
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
        }).catch(function(res){
            console.log("caught error in response"+ res);
        });
        return call;
    },
    UpdatePrescriptionDetails: function (id,prescriptions) {
        var url = "/api/UpdatePrescriptionDetails.php";
        var doctorId = 1;

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


        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status){
                alert("success update pres");
                return res;

            },
            error: function (err, status) {
                console.error(err);
            }
        }).then(function(res){
            return res;
        });

        return call;
    },
    UpdateConsultationSummary: function(id,summary){
        var url = "/api/UpdateConsultationSummary.php";
        var doctorId = 1;
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
        debugger;
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res,status) {
                alert("success in update summary");
                return res;
            },
            error: function(err,status){
                alert("error in update summary");
                console.error(err, status);
            }
        }).then(function(res){
            return res;
        });
        return call;
    },
    previewConsultationSummary: function(id){
        var url = "/wapi/previewConsultationSummary.php";
        var doctorId = "1";
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
        debugger;
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
           // dataType: 'json',
            success: function (res,status) {
                alert("success in preview summary");

                return res;
            },
            error: function(err,status){
                alert("error in preview summary");
                console.error(err, status);
            }
        }).then(function(res){
            return res;
        });
        return call;
    },
    getMymedicineList: function(med){
        var url = "/getMymedicineList.php";
        var doctorId = 10;
        var medicine_list = {
            doctor_id: doctorId,
            med_name: med,
            med_id:"2",
            med_chemical_name: med,
            dosage: "200",
            dosage_uom: "mg"

        };
        var data = {
            medicine_list: medicine_list,
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
        }).catch(function(res){

        });
        return call;
    },
   /* getDoctorProfile: function(id){
        var url = "/wapi/getDoctorProfile.php";
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
        }).catch(function(res){

        });
        return call;
    }, */
    closeConsultation: function (id) {
        var url = "/wapi/closeConsultation.php";
        var doctorId = 1;
        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hcc_id:"1",
            date:"31-10-2017"
        };
        var data = {
            apmt_input: apmt_input,
            session_info: session_info
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
    },

    getDocumentBlobData: function (id) {
        var url = "/wapi/getDocumentBlobData.php";
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
                alert("success in blob");
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