

var empowerAttr = {
		empowerId:"",
		parentId:""
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#empowerFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	var data = tcCore.getTopWindowParam();
	if(data){
		$("#parentId").val(data.empowerId);
		var parentName = null;
		if(data.parentName!=null&&data.parentName==""){
			parentName = data.name;
		}else{
			parentName = data.name+"-"+data.parentName;
		}
		
		$("#parentName").html(parentName);
	}else{
		$("#parentId").val(0);
	}
	
}

function getEmpower(id){
	tcCore.get({
		url:"empowerDS/getEmpowerByPk.ssm?empowerId="+encodeURI(id),
		success:function(data){
			initEmpower(data);
		}
	});
}


function initEmpower(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveEmpower(){
	var data = tcCore.getFormData("empowerForm");
	if(data.empowerId == ""){
		data.empowerId = null;
	}
	
	data.parentName = $("#parentName").html();
	tcCore.post({
		url:"empowerDS/saveEmpower.ssm",
		data:{
			empower:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteEmpower(){
	 top.$.messager.confirm('系统提示', '确认要删除该empower信息吗', function(r){
         if (r){
             if(empowerAttr.empowerId){
            	 tcCore.post({
              		url:"empowerDS/deleteEmpowerByPk.ssm",
              		data:{
              			empowerId:empowerAttr.empowerId
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
