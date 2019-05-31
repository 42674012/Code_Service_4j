

var operationAttr = {
		operationId:""	
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
	
	operationAttr.operationId = tcCore.getParameter("operationId");
	if(operationAttr.operationId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getOperation(operationAttr.operationId);
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
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
