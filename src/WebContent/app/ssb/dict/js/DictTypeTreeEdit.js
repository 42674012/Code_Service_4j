

var dictTypeAttr = {
		dictTypeId:"",
		parentId:""
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#dictTypeFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	var data = tcCore.getTopWindowParam();
	if(data){
		$("#parentId").val(data.dictTypeId);
		var parentName = null;
		if(data.parentName!=null&&data.parentName==""){
			parentName = data.name;
		}else{
			parentName = data.name+"-"+data.parentName;
		}
		
		$("#parentName").html(parentName);
	}else{
		$("#parentId").val("0");
	}
	
}

function getDictType(id){
	tcCore.get({
		url:"dictTypeDS/getDictTypeByPk.ssm?dictTypeId="+encodeURI(id),
		success:function(data){
			initDictType(data);
		}
	});
}


function initDictType(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveDictType(){
	var data = tcCore.getFormData("dictTypeForm");
	if(data.dictTypeId == ""){
		data.dictTypeId = null;
	}
	var isValid = $('#dictTypeForm').form('validate');
	if(!isValid){
		$.messager.alert('提示','请完善数据','warning');
		return false;
	}
	data.parentName = $("#parentName").html();
	tcCore.post({
		url:"dictTypeDS/saveDictType.ssm",
		data:{
			dictType:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteDictType(){
	 top.$.messager.confirm('系统提示', '确认要删除该dictType信息吗', function(r){
         if (r){
             if(dictTypeAttr.dictTypeId){
            	 tcCore.post({
              		url:"dictTypeDS/deleteDictTypeByPk.ssm",
              		data:{
              			dictTypeId:dictTypeAttr.dictTypeId
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
