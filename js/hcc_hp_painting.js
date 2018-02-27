/**
* Draw painting for each component
*/
hpPainting = new (function(){

	var self = this;

	/** sub group color label */
	var SUB_GROUP_COLOR = 'steelblue';

	/** sub group label font size */
	var SUB_GROUP_FONT_SIZE = '16';

	/** sub sub group color label */
	var SUB_SUB_GROUP_COLOR = 'brown';

	/** sub sub group label font size */
	var SUB_SUB_GROUP_FONT_SIZE = 12;

	var GROUP_FIELD = 'group';

	var SUB_GROUP_FIELD = 'sub_group';

	var LABEL_FIELD = "display_name";

	var REQUIED_FIELD = "required";

	var hasError = false;

	var DEFAULT_DATE_FORMAT = "dd/mm/yyyy";

//	var API_BASE_PATH = "https://13.126.208.181/growayuassist/api";

    var locationId = undefined;

    var healthSeekerId = undefined;

    var type = "APPOINTMENT";

    var onSuccess = undefined;

    self.onSuccessCallback = function(call_back) {
        onSuccess = call_back;
    };

	self.validate = function(dom_id) {
		var v = $("#"+dom_id).val();
		var dataType = $("#"+dom_id).attr("data-type");
		switch(dataType) {
			case "integer":
				if(v != '' && !v.match(/^\d+$/)) {
					hasError = true;
					self.appendErrorElem(dom_id, "Must be an Integer");
				} else {
					hasError = false;
				}
			 break;
			case "date":
				if(v != '' && !self.isDate(v)) {
					hasError = true;
					self.appendErrorElem(dom_id, "Date must be "+DEFAULT_DATE_FORMAT+" format");
				} else {
					hasError = false;
				}
				break;
			case "double":
				if(v != '' && !self.isFloat(v)) {
					hasError = true;
					self.appendErrorElem(dom_id, "Enter a value in double");
				} else {
					hasError = false;
				}
				break;
		}
		if(!hasError && $('#error_'+dom_id).length)
			$('#error_'+dom_id).remove();
	}

	self.restrict_max = function(maximum,code,formula){
        var val=$('#'+code).val();
        val= val>maximum?maximum:val;
        $('#'+code).val(val);
        self.calculate(formula);
    }

	self.calculate = function(formula) {
        var formula = formula.split("=");
        total_target_id = formula[0];
        var source_id = formula[1];
        source_id = source_id.split("+");
        var result_value = 0;
        var p_value = 0;
        for (var i = 0; i < source_id.length; i++) {
            p_value = ~~$('#' + source_id[i]).val();
            result_value = result_value + p_value;
        }
        input_total=result_value;
        $('#' + total_target_id).val(result_value+check_total);
    }

	self.isDate = function(arg) {
		var date = arg.split("/");
		if(date.length != 3) 
			return false;
		if(parseInt(date[0]) <= 0 || parseInt(date[0]) > 31)
			return false;
		if(parseInt(date[1]) <= 0  || parseInt(date[1]) > 12)
			return false;
		if(date[2].length != 4)
			return false;
		return true;
	}

	self.isFloat = function(arg) {
		return Number(arg) === arg && arg % 1 !== 0;
	}

	self.isInt = function(arg) {
		return Number(arg) === arg && arg % 1 === 0;
	}

	self.appendErrorElem = function(elem_id, msg) {
		if (!$('#error_'+elem_id).length)
			$("#"+elem_id).parent().append("<div id='error_"+elem_id+"'><span style='color:red'>"+msg+"</span><div>");
	}

	self.draw_main_group = function(group, node) {
		counter=0;
		var html = '<div class="panel panel-default">'+
	                    '<div class="panel-heading" style="background-color:#b58881;">'+
	                        '<h4 class="panel-title">'+
	                            '<a data-toggle="collapse" data-parent="#accordion" style="color: white" href="#group_'+group["group_code"]+'">'+
	                               	'<i class="fa fa-arrow-circle-down fa-fw"></i>'+group["group_name"]+
	                            '</a>'+
	                        '</h4>'+
	                    '</div>'+
	                    '<div id="group_'+group["group_code"]+'" class="panel-collapse collapse">'+
	                        '<div class="panel-body" id="pb_'+group["group_id"]+'"><div class="row" id="row_'+group["group_id"]+'"></div>'+
                    	'</div>'+
                    '</div>';
        $(node).append(html);//appended main group done

        //draw fields
    	if(group["fields"]) {
			//console.log(group.gp_display_columns);
            /*var uom="";
            group.fields.map(function (t) {
                //debugger
                uom=t.uom;
                alert("uom: "+uom);
            });*/
        	var fields = self.draw_fields(group["fields"], group['code'], group["health_param_id"],group.gp_display_columns);
        	$("#pb_"+group["group_id"]).append(fields);
        }

	}

	/**
	* Draw html element for sub group
	*
	*/
	self.draw_sub_group = function(node, p_sub_groups, font_size, css_class) {
		counter=0;
		counter++
		for(var i =0; i< p_sub_groups.length;i++) {
			var html = '<div class="row">'+
							'<div class="col-md-12" id="sb_'+p_sub_groups[i]["group_id"]+'">'+
								'<span style="font-weight: bold;font-size:'+font_size+'px;color:'+css_class+'">'+
									p_sub_groups[i]['group_name'];
            if(p_sub_groups[i]['group_code']=="PS1005"){
                html += '&nbsp;&nbsp;<a href="#" onclick="show_ante();"><img src="assets/js/pop.jpg" width="25" height="25" /></a>';
            }
            html += '</span>'+
							'</div>'+
						'</div>';
			$(node).append(html);

			if(p_sub_groups[i]["fields"]) {
				//debugger
				counter=0;
				if((p_sub_groups[i].gp_data_type)=="BMI"){
                    var fields = self.draw_fields(p_sub_groups[i]["fields"], p_sub_groups[i]['code'], p_sub_groups[i]["health_param_id"], p_sub_groups[i].gp_display_columns,p_sub_groups[i].gp_data_type);
                    $("#sb_" + p_sub_groups[i]["group_id"]).append(fields);
					var height_val,weight_val;
                    p_sub_groups[i].fields.map(function (t) {
                    	if(t.display_name=="Weight") {
							weight_val = t.value;
                        }else if(t.display_name=="Height"){
                    		height_val= t.value;
						}
					});

				}else {
					gp_data_type="";
                    var fields = self.draw_fields(p_sub_groups[i]["fields"], p_sub_groups[i]['code'], p_sub_groups[i]["health_param_id"], p_sub_groups[i].gp_display_columns,p_sub_groups[i].gp_data_type);
                    $("#sb_" + p_sub_groups[i]["group_id"]).append(fields);
                }
            }
            /*if(p_sub_groups["fields"]["display_name"]=="BMI"){
                debugger;
            }*/

			if(p_sub_groups[i]["sub_group"]) {
				//alert("drawing sub group: "+p_sub_groups[i]['group_name'])
				self.draw_sub_group("#sb_"+p_sub_groups[i]["group_id"], p_sub_groups[i]["sub_group"], SUB_SUB_GROUP_FONT_SIZE, SUB_SUB_GROUP_COLOR);
			}
		}
	}
	/**
	*
	* Draw fields
	*/
	var counter=0;
	self.draw_fields = function(fields, code, hp_id, columns, gp_data_type) {
		var html = '';
		var col_width="col-md-6";
		//var counter = 0;
		/*if(columns==1){
			col_width="col-md-12";
		}else if(columns==2){
            col_width="col-md-6";
		}else if(columns==3){
			col_width="col-md-4"
		}else if(col_width==4){
			col_width="col-md-3";
		}*/

		for(var i = 0;i < fields.length;i++) {
			counter++;
			//debugger
			//alert("counter = "+counter+"for :"+fields[i]["display_name"]);
            if(columns==1){
                col_width="col-md-12";
            }else if(columns==2){
                col_width="col-md-6";
                if((counter%2)==1){
                    html = html+'<div class="form-group row">'
                }
            }else if(columns==3){
                col_width="col-md-4"
                if((counter%3)==1){
                    html = html+'<div class="form-group row">'
                }
            }else if(columns==4){
                col_width="col-md-3";
                if((counter%4)==1){
                    html = html+'<div class="form-group row">'
                }
            }
            else if(columns==null||columns==0){
            	col_width="col-md-6";
                if((counter%2)==1){
                    html = html+'<div class="form-group row">'
                }
			}

			/*if((counter%4)==1){
				html = html+'<div class="form-group row">'
			}*/
            switch(fields[i]['type']) {
				case 'text':
					html += self.draw_textbox(fields[i], code, hp_id,col_width,gp_data_type);
					break;
				case 'checkbox':
					if(fields[i]['display_options'].length>4){
						html+=self.draw_checkbox_diff_row(fields[i], code, hp_id,gp_data_type);
					}else {
                        //html+='<div class="form-group row">';
                        html += self.draw_checkbox(fields[i], code, hp_id,col_width,gp_data_type);
                        //html+='</div>'
                    }
					break;
				case 'textarea':
					html += self.draw_textarea(fields[i], code, hp_id,col_width,gp_data_type);
					break;
				case 'dropdown':
					html += self.draw_dropdown(fields[i], code, hp_id, col_width,gp_data_type);
					break;
				case 'radiobutton':
					html += self.draw_radiobutton(fields[i], code, hp_id, col_width,gp_data_type);
					break;
				default:
					break;
			}
            /*if(counter%4==0){
                html = html+'</div>'
            }*/
/*            if(columns==1){
                col_width="col-md-12";
            }else */if(columns==2){
                if((counter%2)==0){
                    html = html+'</div>';
                }
            }else if(columns==3){
                if((counter%3)==0){
                    html = html+'</div>';
                }
            }else if(columns==4){
                if((counter%4)==0){
                    html = html+'</div>';
                }
            }else if(columns==null||columns==0){
            	//code
                if((counter%2)==0){
                    html = html+'</div>';
                }
			}
        }
        return html;
	}

	/**
	* Draw textbox
	*/
    var counter_textbox=0;
	self.draw_textbox = function(field, code, hp_id,col_width,gp_data_type) {
		var html="";
		counter_textbox++;
		if((counter_textbox%2)!=0){
		//	var html = '<div class="form-group row">';
		}
		 html = html+'<div class="'+col_width+'">'+
					'<div class="form-group">';
					var is_required = '';
					if(field["is_mandatory"] == '1') {
						is_required = "required";
					}
                    ddmmyyyy="";
                    if(field["data_type"] == 'date') {
                        ddmmyyyy = " (dd/mm/yyyy)";
                    }
					html += '<label class="control-label '+is_required+'">'+field[LABEL_FIELD]+ddmmyyyy+'</label>';
						var value = '';
						var placeholder = '';
						if(field["value"]) {
							value = field["value"];
						}
						else if(field["default_value"]){
							value = field["default_value"];
						}
						if(field["data_type"] == 'date') {
							placeholder = DEFAULT_DATE_FORMAT;
						}
						if(field["uom"]){
							var uom= field["uom"];
						}
						if(gp_data_type=="BMI"){
							if(field["display_name"]=="Weight"||field["display_name"]=="Height"){
								html += '<div class="input-group"><input class="form-control input-height params" pattern="^[0-9]+$" id="'+field["display_name"]+'" onkeyup="checkBMI();" oninput="this.value = this.value.replace(/[^0-9]/, \'\')" id="'+field["display_name"]+'" placeholder="' + placeholder + '" data-type="' + field["data_type"] + '" onblur="hpPainting.validate(\'' + field["code"] + '\')" type="text" id="' + field["code"] + '" name="param_' + field["code"] + '" value="' + value + '"/><span class="input-group-addon input-height small-font">'+uom+'</span></div>';
							}else if(field["display_name"]=="BMI"){
								html += '<div class="input-group"><input class="form-control input-height params" pattern="^[0-9]+$" id="'+field["display_name"]+'" placeholder="' + placeholder + '" data-type="' + field["data_type"] + '" onblur="hpPainting.validate(\'' + field["code"] + '\')" type="text" id="' + field["code"] + '" name="param_' + field["code"] + '" value="' + value + '"/><span class="input-group-addon input-height small-font">'+uom+'</span></div>';
							}else {
                                html += '<div class="input-group"><input class="form-control input-height params" pattern="^[0-9]+$" id="'+field["display_name"]+'" placeholder="' + placeholder + '" data-type="' + field["data_type"] + '" onblur="hpPainting.validate(\'' + field["code"] + '\')" type="text" id="' + field["code"] + '" name="param_' + field["code"] + '" value="' + value + '"/><span class="input-group-addon input-height small-font">'+uom+'</span></div>';
                            }
						}else{
							if(uom==undefined) {
                                html += '<input class="form-input input-height col-12 params" placeholder="' + placeholder + '" data-type="' + field["data_type"] + '" onblur="hpPainting.validate(\'' + field["code"] + '\')" type="text" id="' + field["code"] + '" name="param_' + field["code"] + '" value="' + value + '"/>';
                            }
                            else{
                                html += '<div class="input-group"><input class="form-control input-height params" placeholder="' + placeholder + '" data-type="' + field["data_type"] + '" onblur="hpPainting.validate(\'' + field["code"] + '\')" type="text" id="' + field["code"] + '" name="param_' + field["code"] + '" value="' + value + '"/><span class="input-group-addon input-height small-font">'+uom+'</span></div>';
                            }
                        }
					html += '</div></div>';
					if(counter_textbox%2==0){
		//				html+='</div>';
					}
		return html;
	}

	/**
	* Draw text area
	*/
	var counter_textarea=0;
	self.draw_textarea = function(field, code, hp_id,col_width) {
        var html="";
        counter_textarea++;
        if((counter_textarea%2)!=0){
		//	html = html+'<div class="form-group row">';
        }
		html = html+'<div class="'+col_width+'">'+
					'<div class="form-group">';
					var is_required = '';
					if(field["is_mandatory"] == '1') {
						var is_required = "required";
					}
					html += '<label class="control-label '+is_required+'">'+field[LABEL_FIELD]+'</label>';
						var value = '';
						if(field["value"]) {
							value = field["value"];
						}
						else if(field["default_value"]){
							value = field["default_value"];
						}
						html += '<textarea rows="'+field["max_row"]+'" class="form-control params" id="'+field["code"]+'" name="param_'+field["code"]+'">'+value+'</textarea>';
					html +='</div></div>';
        if(counter_textarea%2==0){
         //   html+='</div>';
        }
		return html;
	}

	//draw checkbox component
	var counter_checkbox=0;
	self.draw_checkbox = function(field, code, hp_id,col_width) {
        var html="";
        counter_checkbox++;
        if((counter_checkbox%2)!=0){
           // html = html+'<div class="form-group row">';
        }
        html = html+'<div class="'+col_width+'">'+
                        '<div class="form-group">';
                        var is_required = '';
                        if(field["is_mandatory"] == '1') {
                            is_required = "required";
                        }
                        var values = [];
                        if(field['value'] != '') {
                            values = field['value'].split(",");
                        } else {
                            values[0] = field['default_value'];
                        }
                        html += '<label class="control-label '+is_required+'">'+field[LABEL_FIELD]+'</label><br>';
                        html += '<div class="form-group row">';
                        for(var i =0;i < field["display_options"].length;i++) {
                            var d_value = field["display_options"][i];
                            var checked = '';
                            for(var j = 0;j < values.length;j++) {
                                //if(values[j].toLowerCase() == d_value.toLowerCase())
                                if(values[j] == d_value)
                                    checked = 'checked';
                            }
                            html += '<div class="col-md-6"><input type="checkbox" class="params" id="'+i+'" '+checked+' value="'+d_value+'" name="param_'+field["code"]+'_'+i+'"><label for="'+i+'">'+d_value+'</label></div>';
                        }
        if(counter_checkbox%2==0){
         //   html+='</div>';
        }
        return html += '</div></div></div>';
	}
    self.draw_checkbox_diff_row = function(field, code, hp_id) {
        var html="";
		if(counter%4!=0){
			//alert("counter= "+counter);
			html+='</div><div class="form-group row">';
		}
        //counter=0;
        html = html+'<div class="col-md-12">'+
            '<div class="form-group">';
        var is_required = '';
        if(field["is_mandatory"] == '1') {
            is_required = "required";
        }
        var values = [];
        if(field['value'] != '') {
            values = field['value'].split(",");
        } else {
            values[0] = field['default_value'];
        }
        html += '<label class="control-label '+is_required+'">'+field[LABEL_FIELD]+'</label><br>';
        html += '<div class="form-group row">';
        for(var i =0;i < field["display_options"].length;i++) {
            var d_value = field["display_options"][i];
            var checked = '';
            for(var j = 0;j < values.length;j++) {
                //if(values[j].toLowerCase() == d_value.toLowerCase())
                if(values[j] == d_value)
                    checked = 'checked';
            }
            html += '<div class="col-md-4"><input type="checkbox" class="params params_checkbox" id="'+i+'" '+checked+' value="'+d_value+'" name="param_'+field["code"]+'_'+i+'"><label for="'+i+'">'+d_value+'</label></div>';
        }
        if(counter_checkbox%2==0){
            //   html+='</div>';
        }
        counter=0;
        return html += '</div></div></div></div>';
    }

	//draw select dropdown component
	var counter_dropdown=0;
	self.draw_dropdown = function(field, code, hp_id, col_width) {
        var html="";
        counter_dropdown++;
        if((counter_dropdown%2)!=0){
           // html = html+'<div class="form-group row">';
        }
			html = html+'<div class="'+col_width+'">'+
					'<div class="form-group">';
						var is_required = '';
						if(field["is_mandatory"] == '1') {
							is_required = "required";
						}
						var value = (field["value"] == '') ? field['default_value'] : field['value'];
						html += '<label class="control-label '+is_required+'">'+field[LABEL_FIELD]+'</label>';
						html += '<select class="form-control params" id="'+field["code"]+'" name="param_'+field["code"]+'">';
							html += '<option value="">Select</option>';
							for(var i =0; i < field["display_options"].length;i++) {
								var dis_value = field["display_options"][i];
								var selected = '';
								if(dis_value.toLowerCase() == value.toLowerCase())
									selected = 'selected';
								html += '<option value="'+dis_value+'" '+selected+'>'+dis_value+'</option>';
							}

		html += '</select></div></div>';
        if(counter_dropdown%2==0){
         //   html+='</div>';
        }
		return html;
	}

	//draw html5 radio button component
	var counter_radio_button=0;
	self.draw_radiobutton = function(field, code, hp_id,col_width) {
        var html="";
        counter_radio_button++;
        if((counter_radio_button%2)!=0){
         //   html = html+'<div class="form-group row">';
        }
            html = html+'<div class="'+col_width+'">'+
                '<div class="form-group">';
            var is_required = '';
            if(field["is_mandatory"] == '1') {
                is_required = "required";
            }
            var value = (field["value"] == '') ? field['default_value'] : field['value'];
            html += '<label class="control-label '+is_required+'">'+field[LABEL_FIELD]+'</label>';
            html += '<div class="input-group" style="width: 100%!important;"> ';
            for(var i =0;i < field["display_options"].length;i++) {
                var d_value = field["display_options"][i];
                var checked = '';
                if(value.toLowerCase() == d_value.toLowerCase())
                    checked = 'checked';
                html += '<input type="radio" class="params params_radio"  id="'+i+'" '+checked+' value="'+d_value+'" name="param_'+field["code"]+'"><label for="'+i+'">'+d_value+'</label>&nbsp;&nbsp;&nbsp;&nbsp;';
            }
        if(counter_radio_button%2==0){
         //   html+='</div>';
        }
            return html += '</div></div></div>';
	}

	/**
	* Draw main function
	*/
	self.draw_accordion = function(parameters, node) {
		for(var i =0;i < parameters.length;i++) {
			var groups = parameters[i]["group"];
			for(var j =0;j < groups.length;j++) {
				self.draw_main_group(groups[j], node);
		    	if(groups[j]["sub_group"]) {
		            self.draw_sub_group("#pb_"+groups[j]["group_id"], groups[j]["sub_group"], SUB_GROUP_FONT_SIZE, SUB_GROUP_COLOR);
		        }
			}
		}
		//Added By Nishant
        if(apmt_status=="closed" || apmt_status =="expired"){
            //$('#accordion :input').attr('readonly', 'readonly');
            $('#accordion :input').attr('disabled', 'disabled')
            $("#save_btn").attr('readonly', 'readonly');
            $("#save_btn").attr('title', 'This Consultation is already closed');
        }
	}

	self.draw_main_layout = function(container, user, hcc_id, id, specialization) {
		//debugger
		var html = '<div id="id_hs_form">'+
		'<div class="panel-body" id="panel_body">'+
			'<div class="row">'+
	    		'<div class="col-md-6">'+
			        '<div class="form-group">'+
			            '<label class="control-label">Health Seeker ID</label>'+
			            '<input readonly type="text" id="hs_id" maxlength="50" class="col-12 input-height form-input params">'+
			        '</div>'+
	    		'</div>'+
		    	'<div class="col-md-6">'+
			        '<div class="form-group">'+
			            '<label class="control-label">Name</label>'+
			            '<input readonly type="text" id="hs_name" maxlength="50" class="col-12 input-height form-input params">'+
			        '</div>'+
		    	'</div>'+
			'</div>';
		//console.log(html);
	//	debugger
            if(type == "APPOINTMENT") {
                html += '<div class="row">'+
                    '<div class="col-md-12">'+
                        '<div class="form-group">'+
                            '<label class="control-label required">Purpose of Visit</label>'+
                            '<select required="required" name="consultation_reason" class="input-height form-input col-12 params" id="purpose_of_visit">'+
                            '<option value="">Select</option>'+
                            '</select>'+
                        '</div>'+
                    '</div>'+
                '</div>';
            }
/*
            html += '<div class="bs-example">' +
                        '<div class="panel-group" id="hs_accordion">' +
                            '<div class="panel panel-default">'+
                                '<div class="panel-heading" style="background-color:#81888C;text-transform:capitalize">'+
                                    '<h4 class="panel-title">'+
                                        '<a data-toggle="collapse" data-parent="#hs_accordion" style="color: white" href="#hs_param">'+
                                            '<i class="fa fa-arrow-circle-down fa-fw"></i>General Info'+
                                        '</a>'+
                                    '</h4>'+
                                '</div>'+
                                '<div id="hs_param" class="panel-collapse collapse">'+
                                    '<div class="panel-body">' +
            '<div class="row">'+
            '<div class="col-md-6">'+
            '<div class="form-group">'+
            '<label class="control-label">Age</label>'+
            '<input readonly type="text" id="age" maxlength="50" class="form-control">'+
            '</div>'+
            '</div>'+
            '<div class="col-md-6">'+
            '<div class="form-group">'+
            '<label class="control-label">Govt. ID</label>'+
            '<input readonly type="text" id="govt_id" maxlength="50" class="form-control">'+
            '</div>'+
            '</div>'+
            '</div>'+
        '<div class="row">'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Contact</label>'+
        '<input readonly type="text" id="mobile" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Education</label>'+
        '<input readonly type="text" id="education" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '</div>'+

        '<div class="row">'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Occupation</label>'+
        '<input readonly type="text" id="occupation" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Address</label>'+
        '<input readonly type="text" id="address1" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '</div>'+

        '<div class="row">'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">City / Town / Village</label>'+
        '<input readonly type="text" id="city" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Country</label>'+
        '<input readonly type="text" id="country_code" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '</div>'+

        '<div class="row">'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">State</label>'+
        '<input readonly type="text" id="state_code" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">District</label>'+
        '<input readonly type="text" id="district_code" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '</div>'+

        '<div class="row">'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Partner\'s Name</label>'+
        '<input readonly type="text" id="partner_name" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-3">'+
        '<div class="form-group">'+
        '<label class="control-label">Partner\'s Education</label>'+
        '<input readonly type="text" id="partner_education" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-3">'+
        '<div class="form-group">'+
        '<label class="control-label">Partner\'s Occupation</label>'+
        '<input readonly type="text" id="partner_occupation" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '</div>'+

        '<div class="row">'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Total No.of family members</label>'+
        '<input readonly type="text" id="total_family_members" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">No.of.earning Family members</label>'+
        '<input readonly type="text" id="no_of_earnings_family" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '</div>'+

        '<div class="row">'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Average Monthly Family Income</label>'+
        '<input readonly type="text" id="average_family_income_month" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
        '<div class="form-group">'+
        '<label class="control-label">Currency</label>'+
        '<input readonly type="text" id="currency" maxlength="50" class="form-control">'+
        '</div>'+
        '</div>'+
        '</div>'+
                                '</div>'+
                            '</div>';
                        '</div>'+
                        '</div>'+
                    '</div>';

*/
			html += '<div class="bs-example">'+
	    		'<div class="panel-group" id="accordion"></div>'+
			'</div>'+
		'</div>'+
		'<div class="row">'+
            '<div class="col-md-12">'+
                '<div class="param_save">'+
                    '<input required="required" onClick="hpPainting.process(\'id_hs_form\', \''+user+'\', '+hcc_id+','+id+','+specialization+')" class="btn btn-success" id="save_btn" type="button" name="save" value="Save" />&nbsp'+
                '</div>'+
            '</div>'+
         '</div>'+
         '</div>';
		$("#"+container).append(html);
	}


	self.set_health_record_value = function(health_record) {
		$("#hs_id").val(health_record["patient_id"]);
		$("#hs_name").val(health_record["patient_name"]);
		//debugger
		$("#age").val(health_record["age"]);
		$("#govt_id").val(health_record["govt_id"]);
		$("#mobile").val(health_record["mobile"]);
		$("#education").val(health_record["education"]);
		$("#occupation").val(health_record["occupation"]);
		$("#address1").val(health_record["address1"]);
		$("#city").val(health_record["city"]);
		$("#country_code").val(health_record["country_code"]);
		$("#state_code").val(health_record["state_code"]);
		$("#district_code").val(health_record["district_code"]);
		$("#partner_name").val(health_record["partner_name"]);
		$("#partner_education").val(health_record["partner_education"]);
		$("#partner_occupation").val(health_record["partner_occupation"]);
		$("#total_family_members").val(health_record["total_family_members"]);
		$("#no_of_earnings_family").val(health_record["no_of_earnings_family"]);
		$("#average_family_income_month").val(health_record["average_family_income_month"]);
		$("#currency").val(health_record["currency"]);
		var pv = health_record["purpose_of_visit"];
		var display_options = pv["display_options"];
		if(display_options) {
			for(var i =0;i < display_options.length;i++) {
				var selected = '';
				if(display_options[i].toLowerCase() == pv["value"].toLowerCase()) {
					selected = "selected";
				}
				var opt = '<option value="'+display_options[i]+'" '+selected+'>'+display_options[i]+'</option>';
				$("#purpose_of_visit").append(opt);
			}
		}
	}


	this.saveHealthParameters = function(app_id, speciality, sub_speciality, hcc_id, user, params, c_reason) {
		var da = {};
		da["id"] = app_id;
		da["speciality"] = speciality;
		da["sub_speciality"] = sub_speciality;
		da["hcc_id"] = hcc_id;
		da["user_id"] = user;
		da["params"] = params;
        da["type"] = type;
		da["consultation_reason"] = c_reason;
        da["location_id"] = locationId;
	//alert(healthSeekerId);
        da["health_seeker_id"] = healthSeekerId;

		console.debug(da);
		showLoader();
		$("#save_btn").attr("disabled", "disabled");
		$.ajax({
            //url: API_BASE_PATH+'/PostHealthParameters.php',			//Production Server
            url: API_BASE_PATH+'/PostHealthParametersMig.php',			//Migration Server
            type: 'POST',
            data: JSON.stringify(da),
            contentType: 'application/json; charset=UTF-8',
            dataType: "JSON",
           success: function(result) {
            	//alert("Success");
            	//debugger
              console.debug(result);
              $("#save_btn").removeAttr("disabled");
              if(result["success"] == 1) {
                  if(type == "APPOINTMENT") {
                      //window.history.back();
                      //location.reload();
                      $("#api-success").removeClass('hidden-xs-up');
                      $("#api-success-message").show();
                      $("#api-success-message").html("Health Parameters have been Saved Successfully !!");
                      $('#api-success-message').delay(2000).fadeOut("slow", function (evt) {
                          $("#api-success").addClass('hidden-xs-up');
                          $("#api-success-message").html("");
                      });
                  } else {
                        if(onSuccess)
                            onSuccess();
                  }
              }
           },
           error: function(error) {
           		$("#save_btn").removeAttr("disabled");
                console.debug(error);
            }
        }).then(function (res) {
			hideLoader();
			return res;
        });
	}

	/**
	* call after document.ready
	*/
	this.init = function(container, user, hcc_id, app_id, specialization, query) {
		//draw the form first
		//debugger
		self.draw_main_layout(container, user, hcc_id, app_id, specialization);
		//debugger
		$.ajax({
			//url: API_BASE_PATH+'/GetHealthParameters1.php?'+query,		//Production Server
            url: API_BASE_PATH+'/GetHealthParametersMig.php?'+query,		//Migration Server
            type: 'GET',
           success: function(result) {
            	//alert("success");
            	//debugger
              var data = JSON.parse(result);
              //debugger
              self.set_health_record_value(data["health_record"]);
              self.draw_accordion(data['parameter_list'], "#accordion");
           },
           error: function(error) {
                console.debug(error);
            }
        }).then(function () {

            var h = $('#Height').val();
            var w = $('#Weight').val();
            var b;
            if (h != "" && w != "") {
                b = w / (Math.pow(h/100, 2));
                b = b.toFixed(2);
            }
            $('#BMI').val(b);
            $('#BMI').attr("readonly", true);
			//alert($("#PDE01003").val());
            /*$("#PDE01003").keyup(function () {
                var h = $('#PDE01004').val();
                var w = $('#PDE01003').val();
                var b;
                if (h != "" && w != "") {
                    b = w / (Math.pow(h/100, 2));
                    b = b.toFixed(2);
                }
                $('#PDE01005').val(b);
                $('#PDE01005').attr("readonly", true);
            });

            $("#PDE01004").keyup(function () {
                var h = $('#PDE01004').val();
                var w = $('#PDE01003').val();
                var b;
                if (h != "" && w != "") {
                    b = w / (Math.pow(h/100, 2));
                    b = b.toFixed(2);
                }
                $('#PDE01005').val(b);
                $('#PDE01005').attr("readonly", true);
            });*/
        });
	}

    /**
     * call after document.ready
     */
    this.initVisit = function(container, user, hcc_id, visit_id, specialization, query) {
        //draw the form first
        self.draw_main_layout(container, user, hcc_id, visit_id, specialization);
        $.ajax({
            url: API_BASE_PATH+'/GetHealthParametersMig.php?'+query,
            type: 'GET',
            success: function(result) {
                var data = JSON.parse(result);
                self.set_health_record_value(data["health_record"]);
                self.draw_accordion(data['parameter_list'], "#accordion");
            },
            error: function(error) {
                console.debug(error);
            }
        });
    }

	self.buildParam = function(p_code, p_value) {
		var param = {};
		param["code"] = p_code;
		param["value"] = p_value;
		return param;
	}

    self.setLocationId = function(a_loc_id) {
        locationId = a_loc_id;
    };

    self.setHealthSeekerId = function(a_health_seker_id) {
        healthSeekerId = a_health_seker_id;
	//alert(healthSeekerId);
    };

    self.setType = function(a_type) {
        type = a_type;
    };

	this.process = function(form, user, hcc_id, app_id, specialization) {
		var params = [];
		$('#'+form+' *').filter(':input').each(function(idx, elem) {
			var name = $(elem).attr("name");
			if(name && name.match(/param/)) {
				var data_type = $(elem).attr("data-type");
	    		var type = $(elem).attr("type");
	    		var v = '';
	    		if($(elem).prop('type') == 'textarea') {
					v = $(elem).val();
	    		}
	    		else if($(elem).prop('type') == 'select-one') {
	    			v = $("select[name='"+$(elem).attr("name")+"'] option:selected").val(); 
	    		} else if($(elem).prop('type') == 'select-multiple') {

	    		} else {
	    			switch(type) {
						case 'text':
							v = $(elem).val();
							break;
						case 'checkbox':
						case 'radio':
							v = $("input[name="+$(elem).attr("name")+"]:checked"). val();
							break;
	    			}
	    		}
				if(v) {
					var param_code = name.split("_")[1];
	    			if(params.length > 1 && type != 'checkbox') {
	    				var alreadyExist = false;
	    				for(var i =0;i < params.length; i++) {
	    					if(params[i]["code"] == param_code) {
	    						alreadyExist = true;
	    						break;
	    					}
	    				}
	    				if(!alreadyExist) {
							params.push(self.buildParam(param_code, v));
	    				}
	    			} else {
	    				params.push(self.buildParam(param_code, v));
	    			}
				}
			}
		});
		var c_reason = $("select[name=consultation_reason] option:selected").val();
        console.debug(params);
		if(!hasError)
			this.saveHealthParameters(app_id, specialization, specialization, hcc_id, user, params, c_reason);
	}
	return this;
})();
