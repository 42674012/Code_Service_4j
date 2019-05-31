

var ticklingAttr = {
		ticklingid:""	
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
	
	ticklingAttr.ticklingid = tcCore.getParameter("ticklingid");
	if(ticklingAttr.ticklingid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getTickling(ticklingAttr.ticklingid);
}

function getTickling(id){
	tcCore.get({
		url:"ticklingDS/getTicklingByPk.ssm?ticklingid="+encodeURI(id),
		success:function(data){
			initTickling(data);
		}
	});
}


function initTickling(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
