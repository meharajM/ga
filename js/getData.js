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
                "date" : "20-09-2017",
                "doctor_id" : "12",
                "hcc_id" : ""
    	}
        var data = {
        	appntment_input: apmt_input,
        	session_info: session_info
        }
        var call = $.ajax({
        	type: "POST",
        	url: base_url+url,
        	data: data,
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
		var doctorId = 13;
		var apmt_input= {
            apmt_id : id,
            doctor_id :doctorId,
            hcc_id : "",
        }
        var data = {
        	apmt_input: apmt_input,
        	session_info: session_info
        }
        var call = $.ajax({
            type: "POST",
            url: base_url+url,
            data: data,
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
        var doctorId = 13;
        var apmt_input = {
            apmt_id: id,
            doctor_id: 13,
            hs_id: 57,
            hcc_id: "",
        }

        debugger
        var data = {
            apmt_input: apmt_input,
            prescription: prescriptions,
            session_info: session_info
        }
        var call = $.ajax({
            type: "POST",
            url: base_url + url,
            data: data,
            dataType: 'json',
            success: function (res, status){
                debugger
                return res;

            },
             error: function (err, status) {
            }

        });
        return call;
    },

    UpdateConsultationSummary: function(id,summary){
        var url = "/UpdateConsultationSummary.php";
        var doctorId = 13;
        var apmt_input = {
            apmt_id: id,
            doctor_id: 26,
            hs_id: 21,
            hcc_id: "",
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
            data: data,
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
            console.log("caught error in response: Summary API"+res);
        })
        return call;
    },
    }