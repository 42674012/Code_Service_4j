

var campaignAttr = {
		campaignid:""	
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
		$("#campaignFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	campaignAttr.campaignid = tcCore.getParameter("campaignid");
	if(campaignAttr.campaignid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getCampaign(campaignAttr.campaignid);
}

function getCampaign(id){
	tcCore.get({
		url:"campaignDS/getCampaignByPk.ssm?campaignid="+encodeURI(id),
		success:function(data){
			initCampaign(data);
		}
	});
}


function initCampaign(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
