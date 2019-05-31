

var cashAttr = {
		cashid:""	
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
		$("#cashFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	cashAttr.cashid = tcCore.getParameter("cashid");
	if(cashAttr.cashid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getCash(cashAttr.cashid);
}

function getCash(id){
	tcCore.get({
		url:"cashDS/getCashByPk.ssm?cashid="+encodeURI(id),
		success:function(data){
			initCash(data);
		}
	});
}


function initCash(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
