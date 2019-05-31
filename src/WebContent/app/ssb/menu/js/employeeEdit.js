

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
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveEmployee(){
	var data = tcCore.getFormData("employeeForm");
	if(employeeAttr.employeeId){
		data.employeeId = employeeAttr.employeeId;
	}
	tcCore.post({
		url:"employeeDS/saveEmployee.ssm",
		data:{
			employee:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteEmployee(){
	 top.$.messager.confirm('系统提示', '确认要删除该employee信息吗', function(r){
         if (r){
             if(employeeAttr.employeeId){
            	 tcCore.post({
              		url:"employeeDS/deleteEmployeeByPk.ssm",
              		data:{
              			employeeId:employeeAttr.employeeId
              		},
              		success:function(data){
              			tcCore.closeTopDialog({
              				data:data,
              				command:"save"
              			});
              		}
              	}); 
             }
         }
     });
	
}

function cancel(){
	tcCore.closeTopDialog();
}




$(document).ready(init);
