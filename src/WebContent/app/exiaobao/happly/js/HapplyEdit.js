
var happlyAttr = {
		applyid:"",
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
		$("#happlyFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	happlyAttr.applyid = tcCore.getParameter("applyid");
	if(happlyAttr.applyid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getHapply(happlyAttr.applyid);
}


function initControls(){
	
}

function getHapply(id){
	tcCore.get({
		url:"happlyDS/getHapplyByPk.ssm?applyid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(happlyAttr.initControlCount==0){
					initHapply(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initHapply(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveHapply(){
	var data = tcCore.getFormData("happlyForm");
	if(happlyAttr.applyid){
		data.applyid = happlyAttr.applyid;
	}
	tcCore.post({
		url:"happlyDS/saveHapply.ssm",
		data:{
			happly:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteHapply(){
	 top.$.messager.confirm('系统提示', '确认要删除该happly信息吗', function(r){
         if (r){
             if(happlyAttr.applyid){
            	 tcCore.post({
              		url:"happlyDS/deleteHapplyByPk.ssm",
              		data:{
              			applyid:happlyAttr.applyid
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
