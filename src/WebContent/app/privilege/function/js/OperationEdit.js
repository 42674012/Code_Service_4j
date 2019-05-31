
var operationAttr = {
		operationId:"",
		functionId : "",
		initControlCount:1
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
		$("#operationFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	operationAttr.operationId = tcCore.getParameter("operationId");
	if(operationAttr.operationId){
		$("#cancelBtn").remove();
	}else{
		operationAttr.functionId = tcCore.getParameter("functionId");
		$("#deleteBtn").remove();
	}
	if(operationAttr.operationId != ""){
		getOperation(operationAttr.operationId);
	}else{
		getOperation(0);
	}
	
}


function initControls(){
	
		    	tcCore.get({
		    		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$operation_type",
		    		success:function(data){
		    			$("#operationType").combobox("loadData",data);
		    			operationAttr.initControlCount--;
		    		}
		    	});
}

function getOperation(id){
	tcCore.get({
		url:"operationDS/getOperationByPk.ssm?operationId="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				initOperation(data);
				/*if(operationAttr.initControlCount==0){
					
				}*/
				window.clearInterval(flag);
			},50);
		}
	});
}


function initOperation(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveOperation(){
	var data = tcCore.getFormData("operationForm");
	if(operationAttr.operationId){
		data.operationId = operationAttr.operationId;
	}else{
		data.functionId = operationAttr.functionId;
	}
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
	 top.$.messager.confirm('系统提示', '确认要删除该信息吗', function(r){
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
