

var jobAttr = {
		jobId:""	
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
		$("#jobFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	jobAttr.jobId = tcCore.getParameter("jobId");
	if(jobAttr.jobId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getJob(jobAttr.jobId);
}

function getJob(id){
	tcCore.get({
		url:"jobViewDS/getJobViewByPk.ssm?jobId="+encodeURI(id),
		success:function(data){
			initJob(data);
		}
	});
}


function initJob(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
