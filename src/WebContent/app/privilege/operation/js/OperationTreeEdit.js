

var operationAttr = {
		operationId:"",
		parentId:""
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#operationFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	var data = tcCore.getTopWindowParam();
	if(data){
		$("#parentId").val(data.operationId);
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

function getOperation(id){
	tcCore.get({
		url:"operationDS/getOperationByPk.ssm?operationId="+encodeURI(id),
		success:function(data){
			initOperation(data);
		}
	});
}


function initOperation(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveOperation(){
	var data = tcCore.getFormData("operationForm");
	if(data.operationId == ""){
		data.operationId = null;
	}
	
	data.parentName = $("#parentName").html();
	tcCore.post({
		url:"operationDS/saveOperation.ssm",
		data:{
			operation:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteOperation(){
	 top.$.messager.confirm('系统提示', '确认要删除该operation信息吗', function(r){
         if (r){
             if(operationAttr.operationId){
            	 tcCore.post({
              		url:"operationDS/deleteOperationByPk.ssm",
              		data:{
              			operationId:operationAttr.operationId
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
