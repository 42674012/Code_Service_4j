

var deviceAttr = {
		deviceid:""	
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
		$("#deviceFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	deviceAttr.deviceid = tcCore.getParameter("deviceid");
	if(deviceAttr.deviceid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getDevice(deviceAttr.deviceid);
}

function getDevice(id){
	tcCore.get({
		url:"deviceDS/getDeviceByPk.ssm?deviceid="+encodeURI(id),
		success:function(data){
			initDevice(data);
		}
	});
}


function initDevice(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
