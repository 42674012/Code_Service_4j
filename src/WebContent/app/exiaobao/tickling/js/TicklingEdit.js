
var ticklingAttr = {
		ticklingid:"",
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
		$("#ticklingFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	ticklingAttr.ticklingid = tcCore.getParameter("ticklingid");
	if(ticklingAttr.ticklingid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getTickling(ticklingAttr.ticklingid);
}


function initControls(){
	
}

function getTickling(id){
	tcCore.get({
		url:"ticklingDS/getTicklingByPk.ssm?ticklingid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(ticklingAttr.initControlCount==0){
					initTickling(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initTickling(data){
	$("#employeeName").html(data.employeeName);
	$("#ticklingtxt").html(data.ticklingtxt);
	if(data.createdate){
		var dt=new Date(data.createdate).format("yyyy-MM-dd hh:mm:ss");
		$("#createdate").html(dt);
	}
}

function saveTickling(){
	var data = tcCore.getFormData("ticklingForm");
	if(data.replytxt==null||data.replytxt==""){
		alert("回复内容空值！");
		return;
	}
	if(ticklingAttr.ticklingid){
		data.ticklingid = ticklingAttr.ticklingid;
		tcCore.post({
			url:"ticklingDS/saveTickling.ssm",
			data:{
				ticklingid:ticklingAttr.ticklingid,
				replytxt:data.replytxt
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

function deleteTickling(){
	 top.$.messager.confirm('系统提示', '确认要删除该tickling信息吗', function(r){
         if (r){
             if(ticklingAttr.ticklingid){
            	 tcCore.post({
              		url:"ticklingDS/deleteTicklingByPk.ssm",
              		data:{
              			ticklingid:ticklingAttr.ticklingid
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
