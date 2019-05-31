

var employeeAttr = {
		employeeId:""	
	};

function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#employeeFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	employeeAttr.employeeId = tcCore.getParameter("employeeId");
	if(employeeAttr.employeeId){
		$("#cancelBtn").remove();
		getEmployee(employeeAttr.employeeId);
	}else{
		$("#deleteBtn").remove();
	}
	
}

function getEmployee(id){
	tcCore.get({
		url:"employeeDS/getEmployeeOrgViewByPk.ssm?employeeId="+encodeURI(id),
		success:function(data){
			initEmployee(data);
		}
	});
}


function initEmployee(data){
	for(var d in data){
		if(d == 'sex'){
			if(data[d] == '1'){
				tcCore.setControlLabel($("#sex"),'男');
			}else{
				tcCore.setControlLabel($("#sex"),'女');
			}
			
		}else{
			tcCore.setControlLabel($("#"+d),data[d]);
		}
		
	}
	tcCore.get({
		url:"employeeJobDS/getJobNameSet.ssm?employeeId="+encodeURI(employeeAttr.employeeId),
		success:function(data){
			tcCore.setControlLabel($("#job"),data);
		}
	});
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
