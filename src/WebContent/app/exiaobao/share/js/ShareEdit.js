
var shareAttr = {
		shareid:"",
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
		$("#shareFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	shareAttr.shareid = tcCore.getParameter("shareid");
	if(shareAttr.shareid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getShare(shareAttr.shareid);
}


function initControls(){
	
}

function getShare(id){
	tcCore.get({
		url:"shareDS/getShareByPk.ssm?shareid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(shareAttr.initControlCount==0){
					initShare(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initShare(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveShare(){
	var data = tcCore.getFormData("shareForm");
	if(shareAttr.shareid){
		data.shareid = shareAttr.shareid;
	}
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
