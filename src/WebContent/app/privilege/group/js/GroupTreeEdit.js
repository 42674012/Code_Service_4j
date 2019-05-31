

var groupAttr = {
		groupId:"",
		parentId:""
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#groupFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	groupAttr.groupId = tcCore.getParameter("groupId");
	var data = tcCore.getTopWindowParam();
	if(data){
		$("#parentId").val(data.groupId);
		/*var parentName = null;
		if(data.parentName !=null && data.parentName==""){
			parentName = data.name;
		}else{
			parentName = data.name+"-"+data.parentName;
		}*/
		
		$("#parentName").html(data.name);
	}else{
		$("#parentId").val(0);
	}
	if(groupAttr.groupId != null && groupAttr.groupId != ""){
		getGroup(groupAttr.groupId);
	}
	
}

function getGroup(id){
	tcCore.get({
		url:"groupDS/getGroupByPk.ssm?groupId="+encodeURI(id),
		success:function(data){
			initGroup(data);
		}
	});
}


function initGroup(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveGroup(){
	var data = tcCore.getFormData("groupForm");
	if(data.groupId == ""){
		data.groupId = null;
	}else{
		data.groupId = groupAttr.groupId;
	}
	tcCore.post({
		url:"groupDS/saveGroup.ssm",
		data:{
			group:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteGroup(){
	 top.$.messager.confirm('系统提示', '确认要删除该群组信息吗', function(r){
         if (r){
             if(groupAttr.groupId){
            	 tcCore.post({
              		url:"groupDS/deleteGroupByPk.ssm",
              		data:{
              			groupId:groupAttr.groupId
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
