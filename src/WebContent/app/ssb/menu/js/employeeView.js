

var employeeAttr = {
		employeeId:""	
	};

function init(){
	
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
	}else{
		$("#deleteBtn").remove();
	}
	getEmployee(employeeAttr.employeeId);
}

function getEmployee(id){
	tcCore.get({
		url:"employeeDS/getEmployeeByPk.ssm?employeeId="+encodeURI(id),
		success:function(data){
			initEmployee(data);
		}
	});
}


function initEmployee(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
