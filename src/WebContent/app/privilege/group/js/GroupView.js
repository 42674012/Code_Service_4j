

var groupAttr = {
		groupId:""	
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
	
	groupAttr.groupId = tcCore.getParameter("groupId");
	if(groupAttr.groupId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getGroup(groupAttr.groupId);
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
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
