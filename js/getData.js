var session_info = {
                "user_id": "test@test.com",
                "access_token": "aeuhsy78989ljjsj",
                "device_id": "1"
    		}
var base_url = "http://52.66.157.195/growayu/ganewdesign/api"
var getData = {
	getDashboardData: function(){
		var url = "/getDocAppointmentDashboard.php"
		var appntment_input = {
                "date" : "20-09-2017",
                "doctor_id" : "12",
                "hcc_id" : ""
    	}
        var data = {
        	appntment_input: appntment_input,
        	session_info: session_info
        }
        var call = $.ajax({
        	type: "POST",
        	url: base_url+url,
        	data: data,
        	dataType: 'jsonp',
        	success: function (res,status) {
	        	return res;
	      	},
	   		error: function(err,status){
	   			return 	{
				  "error": {
				    "result": "0",
				    "error_code": "00",
				    "error_message": "",
				    "error_type": ""
				  },
				  "appointments_details": {
				    "appointment": [
				      {
				        "appointment_id": "156",
				        "appointment_type": "VC",
				        "appointment_date": "12-04-2017",
				        "appointment_time": "19:30:00+05:30",
				        "appointment_status": "booked",
				        "health_seeker": {
				          "health_seeker_name": "Sachindran K",
				          "health_seeker_id": "21"
				        },
				        "hcc_det": {
				          "hcc_id": "",
				          "hcc_name": ""
				        }
				      },
				      {
				        "appointment_id": "156",
				        "appointment_type": "VC",
				        "appointment_date": "12-04-2017",
				        "appointment_time": "19:30:00+05:30",
				        "appointment_status": "booked",
				        "health_seeker": {
				          "health_seeker_name": "Sachindran K",
				          "health_seeker_id": "21"
				        },
				        "hcc_det": {
				          "hcc_id": "",
				          "hcc_name": ""
				        }
				      },
				      {
				        "appointment_id": "156",
				        "appointment_type": "VC",
				        "appointment_date": "12-04-2017",
				        "appointment_time": "19:30:00+05:30",
				        "appointment_status": "booked",
				        "health_seeker": {
				          "health_seeker_name": "Sachindran K",
				          "health_seeker_id": "21"
				        },
				        "hcc_det": {
				          "hcc_id": "",
				          "hcc_name": ""
				        }
				      }
				    ],
				    "appointment_summary": {
				      "total": "10",
				      "pending": "10",
				      "missed": "10"
				    },
				    "next_appointment_date": "14-10-2017",
				    "prev_appointment_date": "14-08-2017"
				  }
				}
	   		}	
		}).then(function(res){
			return res
		}).catch(function(res){
			return 	{
				  "error": {
				    "result": "0",
				    "error_code": "00",
				    "error_message": "",
				    "error_type": ""
				  },
				  "appointments_details": {
				    "appointment": [
				      {
				        "appointment_id": "156",
				        "appointment_type": "VC",
				        "appointment_date": "12-04-2017",
				        "appointment_time": "19:30:00+05:30",
				        "appointment_status": "booked",
				        "health_seeker": {
				          "health_seeker_name": "Sachindran K",
				          "health_seeker_id": "21"
				        },
				        "hcc_det": {
				          "hcc_id": "",
				          "hcc_name": ""
				        }
				      },
				      {
				        "appointment_id": "156",
				        "appointment_type": "VC",
				        "appointment_date": "12-04-2017",
				        "appointment_time": "19:30:00+05:30",
				        "appointment_status": "booked",
				        "health_seeker": {
				          "health_seeker_name": "Sachindran K",
				          "health_seeker_id": "21"
				        },
				        "hcc_det": {
				          "hcc_id": "",
				          "hcc_name": ""
				        }
				      },
				      {
				        "appointment_id": "156",
				        "appointment_type": "VC",
				        "appointment_date": "12-04-2017",
				        "appointment_time": "19:30:00+05:30",
				        "appointment_status": "booked",
				        "health_seeker": {
				          "health_seeker_name": "Sachindran K",
				          "health_seeker_id": "21"
				        },
				        "hcc_det": {
				          "hcc_id": "",
				          "hcc_name": ""
				        }
				      }
				    ],
				    "appointment_summary": {
				      "total": "10",
				      "pending": "10",
				      "missed": "10"
				    },
				    "next_appointment_date": "14-10-2017",
				    "prev_appointment_date": "14-08-2017"
				  }
				}
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
                return 	{
                          "error": {
                            "result": "0",
                            "error_code": "00",
                            "error_message": "",
                            "error_type": ""
                          },
                          "appointments_details": {
                            "appointment_det": {
                              "apmt_id": "156",
                              "apmt_type": "VC",
                              "apmt_date": "12-04-2017",
                              "apmt_time": "19:30:00+05:30",
                              "apmt_status": "Paid",
                              "case_sheet": {
                                "consultation_reason": "General Checkup",
                                "firsttime_with_doctor": "Yes",
                                "case_description": "test description",
                                "health_record": [
                                  {
                                    "id": "10",
                                    "name": "doctor.jpg"
                                  }
                                ]
                              }
                            },
                            "health_seeker_profile": {
                              "hs_id": "21",
                              "hs_name": "Yes",
                              "hs_phone": "9876543210",
                              "age": "35",
                              "blood_group": "A+",
                              "gender": "Male",
                              "address": "Bangalore",
                              "height": "5.7",
                              "weight": "65",
                              "habbits": "nil",
                              "allergies": "nil",
                              "ailments": "nil"
                            },
                            "consultation_details": {
                              "prescription_details": [
                                {
                                  "med_name": "Paracitamal",
                                  "med_type": "Tablet",
                                  "med_dosage": "2 mg",
                                  "med_timings": "1-0-1",
                                  "med_duration": "2 Days",
                                  "food_timings": "After Food",
                                  "instructions": "Drink Water more",
                                  "template_id": "20"
                                }
                              ],
                              "doctor_notes": "Test note added by the developer",
                              "consultation_summary": {
                                "Diagnosis": "test",
                                "mgmt_plan": "Test",
                                "followup_date": "20-09-2017",
                                "followup_in": "30 days",
                                "waive_fee": "Partial",
                                "waived_amount": "1000",
                                "suggested_test": [
                                  {
                                    "test_id": "123",
                                    "test_name": "Blood"
                                  }
                                ],
                                "seeker_instructions": [
                                  {
                                    "instruct_id": "23",
                                    "instruct_name": "bp"
                                  }
                                ],
                                "instructions_to_ga": "Test Notes"
                              }
                            },
                            "appointments_history": [
                              {
                                "apmt_id": "1",
                                "apmt_date": "23-09-2017"
                              }
                            ]
                          }
                        }
            }
        }).then(function(a,b){
            return {
                     "error": {
                       "result": "0",
                       "error_code": "00",
                       "error_message": "",
                       "error_type": ""
                     },
                     "appointments_details": {
                       "appointment_det": {
                         "apmt_id": "156",
                         "apmt_type": "VC",
                         "apmt_date": "12-04-2017",
                         "apmt_time": "19:30:00+05:30",
                         "apmt_status": "Paid",
                         "case_sheet": {
                           "consultation_reason": "General Checkup",
                           "firsttime_with_doctor": "Yes",
                           "case_description": "test description",
                           "health_record": [
                             {
                               "id": "10",
                               "name": "doctor.jpg"
                             }
                           ]
                         }
                       },
                       "health_seeker_profile": {
                         "hs_id": "21",
                         "hs_name": "Yes",
                         "hs_phone": "9876543210",
                         "age": "35",
                         "blood_group": "A+",
                         "gender": "Male",
                         "address": "Bangalore",
                         "height": "5.7",
                         "weight": "65",
                         "habbits": "nil",
                         "allergies": "nil",
                         "ailments": "nil"
                       },
                       "consultation_details": {
                         "prescription_details": [
                           {
                             "med_name": "Paracitamal",
                             "med_type": "Tablet",
                             "med_dosage": "2 mg",
                             "med_timings": "1-0-1",
                             "med_duration": "2 Days",
                             "food_timings": "After Food",
                             "instructions": "Drink Water more",
                             "template_id": "20"
                           }
                         ],
                         "doctor_notes": "Test note added by the developer",
                         "consultation_summary": {
                           "Diagnosis": "test",
                           "mgmt_plan": "Test",
                           "followup_date": "20-09-2017",
                           "followup_in": "30 days",
                           "waive_fee": "Partial",
                           "waived_amount": "1000",
                           "suggested_test": [
                             {
                               "test_id": "123",
                               "test_name": "Blood"
                             }
                           ],
                           "seeker_instructions": [
                             {
                               "instruct_id": "23",
                               "instruct_name": "bp"
                             }
                           ],
                           "instructions_to_ga": "Test Notes"
                         }
                       },
                       "appointments_history": [
                         {
                           "apmt_id": "1",
                           "apmt_date": "23-09-2017"
                         }
                       ]
                     }
                   }
        }).catch(function(a,b){
            return {
                     "error": {
                       "result": "0",
                       "error_code": "00",
                       "error_message": "",
                       "error_type": ""
                     },
                     "appointments_details": {
                       "appointment_det": {
                         "apmt_id": "156",
                         "apmt_type": "VC",
                         "apmt_date": "12-04-2017",
                         "apmt_time": "19:30:00+05:30",
                         "apmt_status": "Paid",
                         "case_sheet": {
                           "consultation_reason": "General Checkup",
                           "firsttime_with_doctor": "Yes",
                           "case_description": "test description",
                           "health_record": [
                             {
                               "id": "10",
                               "name": "doctor.jpg"
                             }
                           ]
                         }
                       },
                       "health_seeker_profile": {
                         "hs_id": "21",
                         "hs_name": "Yes",
                         "hs_phone": "9876543210",
                         "age": "35",
                         "blood_group": "A+",
                         "gender": "Male",
                         "address": "Bangalore",
                         "height": "5.7",
                         "weight": "65",
                         "habbits": "nil",
                         "allergies": "nil",
                         "ailments": "nil"
                       },
                       "consultation_details": {
                         "prescription_details": [
                           {
                             "med_name": "Paracitamal",
                             "med_type": "Tablet",
                             "med_dosage": "2 mg",
                             "med_timings": "1-0-1",
                             "med_duration": "2 Days",
                             "food_timings": "After Food",
                             "instructions": "Drink Water more",
                             "template_id": "20"
                           }
                         ],
                         "doctor_notes": "Test note added by the developer",
                         "consultation_summary": {
                           "Diagnosis": "test",
                           "mgmt_plan": "Test",
                           "followup_date": "20-09-2017",
                           "followup_in": "30 days",
                           "waive_fee": "Partial",
                           "waived_amount": "1000",
                           "suggested_test": [
                             {
                               "test_id": "123",
                               "test_name": "Blood"
                             }
                           ],
                           "seeker_instructions": [
                             {
                               "instruct_id": "23",
                               "instruct_name": "bp"
                             }
                           ],
                           "instructions_to_ga": "Test Notes"
                         }
                       },
                       "appointments_history": [
                         {
                           "apmt_id": "1",
                           "apmt_date": "23-09-2017"
                         }
                       ]
                     }
                   }
        })
        return call;
	}
}
