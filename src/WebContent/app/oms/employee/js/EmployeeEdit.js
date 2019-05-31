
var employeeAttr = {
	employeeId : "",
	initControlCount : 0,
	oldPhone : '',
	flag : true
};

function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId = tcCore.getParameter("dialogId");
	if (!dialogId) {
		// 判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#employeeFormPanel").panel({
			iconCls : "icon-form-edit"
		});
	}
	initControls();
	employeeAttr.employeeId = tcCore.getParameter("employeeId");
	if (employeeAttr.employeeId) {
		$("#cancelBtn").remove();
		$(".passwordNew").css("display", "none");
		getEmployee(employeeAttr.employeeId);
	} else {
		$("#vip").parent().parent().hide();
		$("#initPasswordBtn").hide();
		$("#deleteBtn").remove();
		$(".passwordEdit").css("display", "none");
	}
	
	checkPhone();
}

function initControls() {
	 
}

function getEmployee(id) {
	tcCore.get({
		url : "employeeDS/getEmployeeOrgViewByPk.ssm?employeeId="
				+ encodeURI(id),
		success : function(data) {
			var flag = window.setInterval(function() {
				if (employeeAttr.initControlCount == 0) {
					initEmployee(data);
				}
				window.clearInterval(flag);
			}, 50);
		}
	});
}
 
function initEmployee(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d],data);
		employeeAttr.oldPhone = data.phone;
	}
}

function saveEmployee() {
	var data = tcCore.getFormData("employeeForm");
	if (employeeAttr.employeeId) {
		data.employeeId = employeeAttr.employeeId;
	}
	var isValid = $('#employeeForm').form('validate');
	if (!isValid || !employeeAttr.flag) {
		$.messager.alert('提示', '请完善数据', 'info');
		return false;
	}
	data.status = "1";
	tcCore.post({
		url : "employeeDS/saveEmployeeNei.ssm",
		data : {
			employee : data
		},
		success : function(data) {
			tcCore.closeTopDialog({
				data : data,
				command : "save"
			});
		}
	});

}

function deleteEmployee() {
	top.$.messager.confirm('系统提示', '确认要删除该人员信息吗', function(r) {
		if (r) {
			if (employeeAttr.employeeId) {
				tcCore.post({
					url : "employeeDS/deleteEmployeeByPk.ssm",
					data : {
						employeeId : employeeAttr.employeeId
					},
					success : function(data) {
						tcCore.closeTopDialog({
							data : data,
							command : "save"
						});
					}
				});
			}
		}
	});

}

function cancel() {
	tcCore.closeTopDialog();
}

//判断号码是否重复
function checkPhone() {
	$('#phone').parent().children('span').find('input').blur(function() {
		tcCore.post({
			url : "employeeDS/checkPhone.ssm",
			data : {
				phone : $('#phone').val()
			},
			success : function(data) {
				if (data == false || (data == true && (employeeAttr.oldPhone == $('#phone').val()))) {
					$('#show_msg').css('display','block');
					$('#show_msg').css('color','#00AA00');
					$('#show_msg').html("号码可用，并是登录账号!");
					employeeAttr.flag = true;
				} else {
					$('#show_msg').css('display','block');
					$('#show_msg').html("该号码已经存在!");
					//$('#show_msg').css('display','block');
					employeeAttr.flag = false;
				}
			}
		});
	});
}

function updatePasswordDefault() {
	tcCore.post({
		url : "employeeDS/updatePasswordDefault.ssm",
		data : {
			employeeId : employeeAttr.employeeId
		},
		success : function(data) {
			if (!data) {
				$('#show_msg').css('display', 'none');
			} else {
				$('#show_msg').css('display', 'block');
			}
		}
	});
}

$(document).ready(init);

$.extend($.fn.textbox.defaults.rules,{
    //验证中文  
    CHS: {
        validator: function (value) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: "只能输入汉字."
    },
    //身份证号码验证 
    idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
  //联系电话(手机/电话皆可)验证 
    mobileTelephone: {
        validator: function (value) {
            var cmccMobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var tel = /^\d{3,4}?\d{7,8}$/;
            return tel.test(value) || (value.length == 11 && cmccMobile.test(value));
        },
        message: "请正确填写您的联系电话"
    }
});
