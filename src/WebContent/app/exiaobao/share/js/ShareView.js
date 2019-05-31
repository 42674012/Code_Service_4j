

var shareAttr = {
		shareid:""	
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
	
	shareAttr.shareid = tcCore.getParameter("shareid");
	if(shareAttr.shareid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getShare(shareAttr.shareid);
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
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
