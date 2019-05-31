

var happlyAttr = {
		applyid:""	
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
	
	happlyAttr.applyid = tcCore.getParameter("applyid");
	if(happlyAttr.applyid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getHapply(happlyAttr.applyid);
}

function getHapply(id){
	tcCore.get({
		url:"happlyDS/getHapplyByPk.ssm?applyid="+encodeURI(id),
		success:function(data){
			initHapply(data);
		}
	});
}


function initHapply(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
