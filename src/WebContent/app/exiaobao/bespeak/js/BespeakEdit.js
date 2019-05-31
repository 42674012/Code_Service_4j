var tcCore = {};
var bespAttr={
		goodsid:"",
		phone:"",
		campaignid:"",
		price:"",
};
function init(){
	bespAttr.goodsid=getparams("goodsid");
	bespAttr.phone=getparams("phone");
	bespAttr.campaignid=getparams("campaignid");
	bespAttr.price=getparams("price");
	$("#goodsid").val(bespAttr.goodsid);
	$("#phone").val(bespAttr.phone);
	$("#campaignid").val(bespAttr.campaignid);
	$("#price").val(bespAttr.price);
}
/**
 * 验证
 * @returns {Boolean}
 */
function vlieyForm(){
	if($("#bespeakphone").val()==""){
		alert("请填写手机号 ");
		return false;
	}else{
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		if(!myreg.test($("#bespeakphone").val())) { 
		    alert('请输入有效的手机号码！'); 
		    return false; 
		} 
	}
	if($("#usrname").val()==""){
		alert("请填写姓名 ");
		return false;
	}
	return true;
}
/**
 * 提交预约信息
 */
function subform2(){
	if(!vlieyForm()){
		return false;
	}
	var bespeakphone=$("#bespeakphone").val();
	var usrname=$("#usrname").val();
	var goodsid=bespAttr.goodsid+"";
	var campaignid=bespAttr.campaignid+"";
	var phone=bespAttr.phone+"";
	var dt={
			phone:bespeakphone,
			goodsid:goodsid,
			campaignid:campaignid,
			usrname:usrname,	
	};
	tcCore.post({
		url:"bespeakDS/saveBespeakZf.ssm",
		data: {
	    	bespeak:dt,
	    	phone:phone,
	    } ,
		success:function(data){
			if(data){
				if(data.status&&data.status=="2"){
					alert("已支付成功");
					return ;
				}
				
				var goodsname="";
				var money="0";
				var orderNo=data.bespeakid;
				if(data.goodsid){
					goodsname=data.goodsname;
					var discount=data.discount
					if(discount){
						var zk=(discount/10).toFixed(2);
						money=(data.price*zk).toFixed(2);
					}else{
						var zk=1;
						money=(data.price*zk).toFixed(2);
					}
				}else if(data.campaignid){
					goodsname=data.subject;
					money=data.camprice;
					
				}
				if(goodsname!=""&&orderNo&&money&&money!="0"){
					window.location.href=context+"/userServlet?money="+money+"&body="+goodsname+"&orderNo="+orderNo;
				}
			}
		}
	});
}

/**
 * 提交预约信息
 */
function subform(){
	if(!vlieyForm()){
		return false;
	}
	var bespeakphone=$("#bespeakphone").val();
	var usrname=$("#usrname").val();
	var goodsid=bespAttr.goodsid;
	var campaignid=bespAttr.campaignid;
	var phone=bespAttr.phone;
	var dt={
			phone:bespeakphone,
			goodsid:goodsid,
			campaignid:campaignid,
			usrname:usrname,	
	};
	tcCore.post({
		url:"bespeakDS/saveBypagBespeak.ssm",
		data: {
	    	bespeak:dt,
	    	phone:phone,
	    } ,
		success:function(data){
			if(data!=0){
				alert("恭喜 预约成功！");
			}  
		}
	});
}


function getparams(paras) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {}
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
				.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof (returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
}

/*******************************************************************************
 * 
 */
tcCore.ajax = function(ajaxObj) {
	var aobj = {};
	if (ajaxObj.data != null && typeof (ajaxObj.data) == "object") {
		aobj.data = JSON.stringify(ajaxObj.data);
	}
	aobj.contentType = 'application/json;charset=UTF-8';
	aobj.dataType = 'json';
	aobj.async = ajaxObj.async;
	aobj.type = ajaxObj.type;
	aobj.noLoading = false;
	aobj.timeout = 15000;
	aobj.error = function(d) {
		if (typeof (ajaxObj.error) != "function") {
			tcCore.ajaxErrorFunction.call(this, d);
		} else {
			ajaxObj.error.call(this, d);
		}
	}

	aobj.success = function(d) {
		if (d && d.$mcfDispacherStatus == -100) {
			// alert("需要重新登录");
			// window.location.href = context+"/love/login.jsp";
			// return;
		} else if (d && d.$mcfDispacherStatus == 101) {
			tcCore.ajaxErrorFunction.call(this, d.msg);

			return;
		}

		if (ajaxObj.success) {
			ajaxObj.success.call(this, d);
		}

	}

	if (ajaxObj.url.indexOf(context) != 0) {
		aobj.url = context + "/" + ajaxObj.url;
	} else {
		aobj.url = ajaxObj.url;
	}
	$.ajax(aobj);
}
/*******************************************************************************
 * post方法
 */
tcCore.post = function(ajaxObj) {
	if (typeof (ajaxObj.data) == "object") {
		var data = {};
		for ( var p in ajaxObj.data) {
			if (typeof (ajaxObj.data[p]) == "object") {
				data[p] = JSON.stringify(ajaxObj.data[p]);
			} else {
				data[p] = ajaxObj.data[p]
			}
		}
		ajaxObj.data = data;
	}
	ajaxObj.type = 'POST';
	tcCore.ajax(ajaxObj);
}
/*******************************************************************************
 * get方法
 */
tcCore.get = function(ajaxObj) {
	var dataStr = "";
	if (typeof (ajaxObj.data) == "object") {
		for ( var d in ajaxObj.data) {
			dataStr += d + "=";
			if (typeof (ajaxObj.data[d]) == "object") {
				dataStr += encodeURI(encodeURI(JSON.stringify(ajaxObj.data[d])))
						+ "&";
			} else {
				if (ajaxObj.data[d] === undefined) {
					ajaxObj.data[d] = null;
				}

				dataStr += encodeURI(encodeURI(ajaxObj.data[d])) + "&";
			}
		}
		ajaxObj.data = dataStr;
	}
	ajaxObj.type = 'GET';
	ajaxObj.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
	tcCore.ajax(ajaxObj);

}
/*******************************************************************************
 * ajax请求异常处理
 */
tcCore.ajaxErrorFunction = function(e) {
    
}

$(document).ready(init);

$(document).ready(init);
 