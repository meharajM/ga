var session_info = {
                "user_id": "test@test.com",
                "access_token": "aeuhsy78989ljjsj",
                "device_id": "1"
    		}
var base_url = "http://52.66.157.195/growayu/ganewdesign";
var getData = {
	getDashboardData: function(date){
		var url = "/getDocAppointmentDashboard.php"
		var apmt_input = {
                "date" : date,
                "doctor_id" : "1",
                "hcc_id" : "1"
    	}
        var data = {
        	appntment_input: apmt_input,
        	session_info: session_info
        }
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
		var url = "/getAppointmentDetails.php"
		var doctorId = 1;
		var apmt_input= {
            apmt_id : id,
            doctor_id :doctorId,
            hcc_id : "1",
        }
        var data = {
        	apmt_input: apmt_input,
        	session_info: session_info
        }
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
        })
        return call;
    },
    UpdatePrescriptionDetails: function (id,prescriptions) {
        var url = "/UpdatePrescriptionDetails.php";
        var doctorId = 1;

        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hs_id: hs_id,
            hcc_id: "1"
        }

        var data = {
            apmt_input: apmt_input,
            prescription: prescriptions,
            session_info: session_info
        }
        debugger
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status){
                return res;

            },
             error: function (err, status) {
               console.error(err);
            }

        });
        return call;
    },

    UpdateConsultationSummary: function(id,summary){
        var url = "/UpdateConsultationSummary.php";
        var doctorId = 1;
        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hs_id: hs_id,
            hcc_id: "1",
        }

        debugger
        var data = {
            apmt_input: apmt_input,
            summary: summary,
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
            alert("caught error in response: Update Summary API");
        })
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

        }
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
                alert("caught error in response: Medicine List API");
                console.error(err, status);
            }
        }).then(function(res){
            return res;
        }).catch(function(res){

        })
        return call;
    },
    CloseConsultation: function (id) {
        var url = "/CloseConsultation.php";
        var doctorId = 1;
        var apmt_input = {
            apmt_id: id,
            doctor_id: doctorId,
            hcc_id:"1",
            date:"12-04-2017"
        }
        var data = {
            apmt_input: apmt_input,
            session_info: session_info
        }
        debugger
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (res, status){
                return res;

            },
            error: function (err, status) {
                alert("error in Close Consultation Summary");
            }

        });
        return call;
    },

    }