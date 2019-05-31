

var functionAttr = {
		functionId:""	
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
	
	functionAttr.functionId = tcCore.getParameter("functionId");
	if(functionAttr.functionId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getFunction(functionAttr.functionId);
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
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
