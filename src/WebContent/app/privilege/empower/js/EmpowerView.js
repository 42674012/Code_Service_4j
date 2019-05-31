

var empowerAttr = {
		empowerId:""	
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
		$("#empowerFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	empowerAttr.empowerId = tcCore.getParameter("empowerId");
	if(empowerAttr.empowerId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getEmpower(empowerAttr.empowerId);
}

function getEmpower(id){
	tcCore.get({
		url:"empowerDS/getEmpowerByPk.ssm?empowerId="+encodeURI(id),
		success:function(data){
			initEmpower(data);
		}
	});
}


function initEmpower(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
