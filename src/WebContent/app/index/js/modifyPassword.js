var passwordAttr ={
		flag:false,
		flag1:false,
		flag2:false,
}
function init(){
	getOldPassword(employeeId);
	
	initOperation();
}
function getOldPassword(employeeId){
	function getMenu() {
		tcCore.get({
			url : "employeeDS/getPassword.ssm?employeeId=" + encodeURI(employeeId),
			success : function(data) {
				// 构造顶级菜单
				passwordAttr.oldPassword = data;
			}
		});
	}
}

function saveEmployee() {
	if(passwordAttr.flag && passwordAttr.flag1 && passwordAttr.flag2){
		var data = tcCore.getFormData("employeeForm");
		tcCore.post({
			url : "employeeDS/updatePassword.ssm",
			data : {
				oldPassword : data.oldPassword,
				password : data.password
			},
			success : function(data) {
				if(data){
					$.messager.alert('提示','更新成功','info');
				}else{
					$.messager.alert('提示','更新失败','info');
				}
			}
		});
	}else{
		$.messager.alert('提示','请完善数据!','info');
		return false;
	}
	

}
/*$('#oldPassword').textbox().next('span').find('input').blur(function(){
	alert("ceshi");
});*/
/*$('#oldPassword').parent().children().blur(function(e){
	alert("ceshi");
});*/

function initOperation(){
	$("#oldPassword").parent().children("span").find("input").blur(function(){
		tcCore.post({
			url : "employeeDS/checkOldPassword.ssm",
			data : {
				oldPassword : $("#oldPassword").val(),
			},
			success : function(data) {
				if(!data){
					//$.messager.alert('提示','原密码输入错误','info');
					$('#show_msg').css('display','block');
				}else{
					$('#show_msg').css('display','none');
					passwordAttr.flag = true;
				}
			}
		});
	});
	
	$("#nowPassword").parent().children("span").find("input").blur(function(){
		var nowPassword = $('#nowPassword').val();
		if(nowPassword == '' || nowPassword == null){
			$('#show_msg1').css('display','block');
		}else{
			$('#show_msg1').css('display','none');
			passwordAttr.flag1 = true;
		}
	});
	$("#password").parent().children("span").find("input").blur(function(){
		var password = $('#password').val();
		var nowPassword = $('#nowPassword').val();
		if(nowPassword == '' || nowPassword == null){
			$.messager.alert('提示','请输入新密码!','info');
			$('#show_msg2').css('display','none');
		}else if(password != nowPassword){
			$('#show_msg2').css('display','block');
		}else{
			passwordAttr.flag2 = true;
			$('#show_msg2').css('display','none');
		}
	});
}

function cancel() {
	tcCore.closeTopDialog();
}
$(document).ready(init);