
var commisionAttr = {
		comid:"",
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
		$("#commisionFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	commisionAttr.comid = tcCore.getParameter("comid");
	if(commisionAttr.comid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getCommision(commisionAttr.comid);
}


function initControls(){
	
}

function getCommision(id){
	tcCore.get({
		url:"commisionDS/getCommisionByPk.ssm?comid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(commisionAttr.initControlCount==0){
					initCommision(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initCommision(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

function saveCommision(){
	var data = tcCore.getFormData("commisionForm");
	if(commisionAttr.comid){
		data.comid = commisionAttr.comid;
	}
	tcCore.post({
		url:"commisionDS/saveCommision.ssm",
		data:{
			commision:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteCommision(){
	 top.$.messager.confirm('系统提示', '确认要删除该commision信息吗', function(r){
         if (r){
             if(commisionAttr.comid){
            	 tcCore.post({
              		url:"commisionDS/deleteCommisionByPk.ssm",
              		data:{
              			comid:commisionAttr.comid
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
