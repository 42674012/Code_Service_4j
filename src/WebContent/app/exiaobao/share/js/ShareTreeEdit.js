

var shareAttr = {
		shareid:"",
		parentId:""
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#shareFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	var data = tcCore.getTopWindowParam();
	if(data){
		$("#parentId").val(data.shareid);
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

function getShare(id){
	tcCore.get({
		url:"shareDS/getShareByPk.ssm?shareid="+encodeURI(id),
		success:function(data){
			initShare(data);
		}
	});
}


function initShare(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveShare(){
	var data = tcCore.getFormData("shareForm");
	if(data.shareid == ""){
		data.shareid = null;
	}
	
	data.parentName = $("#parentName").html();
	tcCore.post({
		url:"shareDS/saveShare.ssm",
		data:{
			share:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteShare(){
	 top.$.messager.confirm('系统提示', '确认要删除该share信息吗', function(r){
         if (r){
             if(shareAttr.shareid){
            	 tcCore.post({
              		url:"shareDS/deleteShareByPk.ssm",
              		data:{
              			shareid:shareAttr.shareid
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
