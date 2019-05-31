var goodsAttr={
	imgserURL:"",	
};
var campaignAttr = {
		campaignid:"",
		initControlCount:1,
		orgAttr:{},
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
	initControls();
	campaignAttr.campaignid = tcCore.getParameter("campaignid");
	getCampaign(campaignAttr.campaignid);
}


function initControls(){
	initfileUrl();
}
/**
 * 获得文件服务访问基础路径
 */
function initfileUrl(){
	//获得附件服务器的url
	tcCore.get({
		url:"fileOptions/getUrl.ssm",
		success:function(data){
			goodsAttr.imgserURL=data;
			UM.getEditor('editorinfo');
			campaignAttr.initControlCount--; 
		}
	});
}
 

function getCampaign(id){
	tcCore.get({
		url:"campaignDS/getCampaignByPk.ssm?campaignid="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(campaignAttr.initControlCount==0){
					initCampaign(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initCampaign(data){
	for(var d in data){
		if(d==="introduce"){
			setContent(data[d]);
		}else if (d==="orgid"){
			$("#orgid").combobox("setValue", data[d]);
		}else{
			tcCore.setControlValue($("#"+d),data[d],data);
		}
	}
}
/**
 * 验证表单
 */
function validateForm(data){
	var msg="";
	if(data.subject===""||data.subject==null){
		msg+="活动主题不能为空 !  \n ";
	}
	if(data.begintime===""||data.begintime==null){
		msg+="活动开始时间不能为空!  \n";
	}
	if(data.endtime===""||data.endtime==null){
		msg+="活动结束时间不能为空 ! \n";
	}
	if(data.introduce===""||data.introduce==null){
		msg+="活动介绍不能空 ! \n";
	}
	if(data.camprice===""||data.camprice==null){
		msg+="价格不能空 ! \n";
	}
	if(data.discount===""||data.discount==null){
		msg+="折扣数不能空 ! \n";
	}
	if(data.brokerage===""||data.brokerage==null){
		msg+="佣金不能空 ! \n";
	}
	return msg;
}
/**
 * 保存
 * @returns
 */
function saveCampaign(){
	getContent();
	var data = tcCore.getFormData("campaignForm");
	var msg=validateForm(data);
	if(msg!=""){
		alert(msg);
		return ;
	}
	if(campaignAttr.campaignid){
		data.campaignid = campaignAttr.campaignid;
	}
	tcCore.post({
		url:"campaignDS/saveCampaign.ssm",
		data:{
			campaign:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteCampaign(){
	 top.$.messager.confirm('系统提示', '确认要删除该campaign信息吗', function(r){
         if (r){
             if(campaignAttr.campaignid){
            	 tcCore.post({
              		url:"campaignDS/deleteCampaignByPk.ssm",
              		data:{
              			campaignid:campaignAttr.campaignid
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
