

var bespeakAttr = {
		bespeakid:""	
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
		$("#bespeakFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	bespeakAttr.bespeakid = tcCore.getParameter("bespeakid");
	if(bespeakAttr.bespeakid){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getBespeak(bespeakAttr.bespeakid);
}

function getBespeak(id){
	tcCore.get({
		url:"bespeakDS/getBespeakByPk.ssm?bespeakid="+encodeURI(id),
		success:function(data){
			initBespeak(data);
		}
	});
}


function initBespeak(data){
	for(var d in data){
		if(d==="price"){
			var zk=(data.discount/10).toFixed(2); 
			$("#nowprice").numberbox("setValue",(data[d]*zk).toFixed(2));
			$("#price").html(data[d]);
		}else{
			tcCore.setControlLabel($("#"+d),data[d]);
		}
		
	}
}
/**
 * 支付
 */
function saveBespeak(){
	var nowprice=$("#nowprice").numberbox("getValue");
	if(nowprice ==""){
		alert("支付价格不能为空");
		return ;
	}
	tcCore.post({
		url:"bespeakDS/saveNowBespeak.ssm",
		data:{
			bespeakid:bespeakAttr.bespeakid,
			nowprice:nowprice,
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
}


function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
