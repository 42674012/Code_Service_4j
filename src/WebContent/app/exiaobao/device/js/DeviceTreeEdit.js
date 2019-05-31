

var deviceAttr = {
		deviceid:"",
		parentId:""
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#deviceFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	var data = tcCore.getTopWindowParam();
	if(data){
		$("#parentId").val(data.deviceid);
		var parentName = null;
		if(data.parentName!=null&&data.parentName==""){
			parentName = data.name;
		}else{
			parentName = data.name+"-"+data.parentName;
		}
		
		$("#parentName").html(parentName);
	}else{
		$("#parentId").val(0);
	}
	
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
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveDevice(){
	var data = tcCore.getFormData("deviceForm");
	if(data.deviceid == ""){
		data.deviceid = null;
	}
	
	data.parentName = $("#parentName").html();
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
