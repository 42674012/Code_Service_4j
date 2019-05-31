
var functionAttr = {
		functionId:"",
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
		$("#functionFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	functionAttr.functionId = tcCore.getParameter("functionId");
	if(functionAttr.functionId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getFunction(functionAttr.functionId);
}


function initControls(){
	
		    	tcCore.get({
		    		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=",
		    		success:function(data){
		    			$("#type").combobox("loadData",data);
		    			functionAttr.initControlCount--;
		    		}
		    	});
}

function getFunction(id){
	tcCore.get({
		url:"functionDS/getFunctionByPk.ssm?functionId="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(functionAttr.initControlCount==0){
					initFunction(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initFunction(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveFunction(){
	var data = tcCore.getFormData("functionForm");
	if(functionAttr.functionId){
		data.functionId = functionAttr.functionId;
	}
	tcCore.post({
		url:"functionDS/saveFunction.ssm",
		data:{
			function:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteFunction(){
	 top.$.messager.confirm('系统提示', '确认要删除该function信息吗', function(r){
         if (r){
             if(functionAttr.functionId){
            	 tcCore.post({
              		url:"functionDS/deleteFunctionByPk.ssm",
              		data:{
              			functionId:functionAttr.functionId
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
