
var deviceAttr = {
		deviceid:"",
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
		$("#deviceFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	deviceAttr.deviceid = tcCore.getParameter("deviceid");
	if(deviceAttr.deviceid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getDevice(deviceAttr.deviceid);
}


function initControls(){
	
}

function getDevice(id){
	tcCore.get({
		url:"deviceDS/getDeviceByPk.ssm?deviceid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(deviceAttr.initControlCount==0){
					initDevice(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initDevice(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveDevice(){
	var data = tcCore.getFormData("deviceForm");
	if(deviceAttr.deviceid){
		data.deviceid = deviceAttr.deviceid;
	}
	tcCore.post({
		url:"deviceDS/saveDevice.ssm",
		data:{
			device:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteDevice(){
	 top.$.messager.confirm('系统提示', '确认要删除该device信息吗', function(r){
         if (r){
             if(deviceAttr.deviceid){
            	 tcCore.post({
              		url:"deviceDS/deleteDeviceByPk.ssm",
              		data:{
              			deviceid:deviceAttr.deviceid
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
