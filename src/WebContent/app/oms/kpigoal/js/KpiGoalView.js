

var kpiGoalAttr = {
		kpiGoalId:""	
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
		$("#kpiGoalFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	kpiGoalAttr.kpiGoalId = tcCore.getParameter("kpiGoalId");
	if(kpiGoalAttr.kpiGoalId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getKpiGoal(kpiGoalAttr.kpiGoalId);
}

function getKpiGoal(id){
	tcCore.get({
		url:"kpiGoalDS/getKpiGoalByPk.ssm?kpiGoalId="+encodeURI(id),
		success:function(data){
			initKpiGoal(data);
		}
	});
}


function initKpiGoal(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
