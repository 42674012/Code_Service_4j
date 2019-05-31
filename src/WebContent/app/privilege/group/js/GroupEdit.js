
var groupAttr = {
		groupId:"",
		initControlCount:0
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
		$("#groupFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	groupAttr.groupId = tcCore.getParameter("groupId");
	if(groupAttr.groupId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getGroup(groupAttr.groupId);
}


function initControls(){
	
}

function getGroup(id){
	tcCore.get({
		url:"groupDS/getGroupByPk.ssm?groupId="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(groupAttr.initControlCount==0){
					initGroup(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initGroup(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveGroup(){
	var data = tcCore.getFormData("groupForm");
	if(groupAttr.groupId){
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
	 top.$.messager.confirm('系统提示', '确认要删除该group信息吗', function(r){
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
