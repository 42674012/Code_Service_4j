

var functionAttr = {
		functionId:"",
		parentId:"",
		flag : true
	};

function init(){
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#functionFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	tcCore.get({
		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$function_type",
		success:function(data){
			data.unshift({'dictValue':'','dictName':'- - - 请选择 - - -'});
			$("#functionType").combobox("loadData",data);
			//operationAttr.initControlCount--;
		}
	});
	
	var data = tcCore.getTopWindowParam();
	if(data){
		$("#parentId").val(data.functionId);
		var parentName = null;
		parentName = data.remark;
		/*if(data.remark!=null&&data.remark==""){
			parentName = data.remark;
		}else{
			parentName = data.remark+"-"+data.parentName;//
		}*/
		$("#parentName").html(parentName);
	}else{
		$("#parentId").val(0);
	}
	checkUri();
}

function getFunction(id){
	tcCore.get({
		url:"functionDS/getFunctionByPk.ssm?functionId="+encodeURI(id),
		success:function(data){
			initFunction(data);
		}
	});
}


function initFunction(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveFunction(){
	var data = tcCore.getFormData("functionForm");
	if(data.functionId == ""){
		data.functionId = null;
	}
	var isValid = $('#functionForm').form('validate');
	if(!isValid || !functionAttr.flag){
		$.messager.alert('','请完善数据','warning');
		return false;
	}
	data.parentName = $("#parentName").html();
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
	 top.$.messager.confirm('系统提示', '确认要删除该资源信息吗', function(r){
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

function checkUri(){
	$('#uri').parent().children("span").find('input').blur(function(){
		tcCore.post({
			url : "functionDS/getFunctionByUri.ssm",
			data : {
				uri : $("#uri").val()
			},
			success : function(data) {
				if(data){
					//$.messager.alert('提示','原密码输入错误','info');
					$('#show_msg').css('display','block');
					functionAttr.flag = false;
				}else{
					$('#show_msg').css('display','none');
					functionAttr.flag = true;
				}
			}
		});
	})
}



$(document).ready(init);
