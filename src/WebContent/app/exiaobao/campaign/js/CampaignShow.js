var tcCore = {};

var goodsAttr = {
		goodsid:"",
		imgserURL:"",
		phone:"",
		price:"",
		sales:"",
		chicknum:"",
		flag:"",
		btnflag:"",
	};

//图片滚动
function ShowSwiper(){
	var swh=$("#swimg").css("height");
    $("#swiper-containerDIV").css("height",swh);
    var fdiv=($("#swimg").height()-34);
    $(".fdiv").css("top", fdiv+"px");
    
    $("#swimg").hide();
    $("#swiper-containerDIV").show();
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
}

function init(){
	setTimeout("ShowSwiper()", 1000);
	$("#goodsFormPanel").css("width",window.innerWidth);
	$(".main_visual").css("width",window.innerWidth);
	$(".ddiv").css("width",window.innerWidth-10);
	$(".tabbox").css("width",window.innerWidth);
	$(".butndiv").css("width",window.innerWidth-500);
	
	$("#lia1").addClass("thistab").show();	
	$("#goodsFormPanel").css("height",window.innerHeight);
	goodsAttr.goodsid = getparams("goodsid");
	goodsAttr.phone = getparams("phone");
	goodsAttr.btnflag=getparams("btnflag");
	
	if(goodsAttr.btnflag&&goodsAttr.btnflag!=""){
		$("#bespeakBtn").show();
	}else{
		$("#bespeakBtn").hide();
	}
	if(goodsAttr.goodsid){
		getGoods(goodsAttr.goodsid);
	}
}

function getGoods(id){
	tcCore.get({
		url:"campaignDS/getCampaignInfo.ssm?campaignid="+encodeURI(id)+"&phone="+goodsAttr.phone,
		success:function(data){
			initGoods(data);
		}
	});
}
/**
 * 立即预约
 */
function bespeak(){
	var url=context+"/app/exiaobao/bespeak/BespeakEdit.jsp?phone="+goodsAttr.phone+"&campaignid="+goodsAttr.goodsid+"&price="+goodsAttr.price;
	window.location.href=url;
}

/**
 * @param data
 */
function initGoods(data){
	for(var d in data){
		if(d==="campaign"){
			$("#goodsname").html(data[d].subject);
			$("#tab1").html(data[d].introduce);
			$("#price").html("￥"+data[d].camprice); 
			$("#zhekou").html(data[d].discount+"折");
			var zk=(data[d].discount/10).toFixed(2); 
			goodsAttr.price=(data[d].camprice*zk).toFixed(2);
			$("#discount").html("￥"+goodsAttr.price);
			if(data.flag&&(data.flag+"")==="1"){
				var brokerage=data[d].brokerage==null?"0":data[d].brokerage;
				$("#brokerage").html("￥"+brokerage);
				$("#showbrokerage").show();
			}else{
				$("#showbrokerage").hide();
			}
			if(goodsAttr.btnflag&&goodsAttr.btnflag!=""){
				$("#showbrokerage").hide();
				$("#brokerage").hide();
			}
		}else if(d==="chicknum"){
			var chicknum=data[d]==null?"0":data[d];
			$("#chicknum").html(chicknum);
		}else if(d==="xsnum"){
			var sales=data[d]==null?"0":data[d];
			$("#sales").html(sales);
		}else if(d==="filelist"){
			if(data[d]&&data[d].length>0){
				var imghtml="";
				$(data[d]).each(function(i,o){
					imghtml+="<div class='swiper-slide'><img src='"+o+"' /></div>";
				});
				$(".swiper-wrapper").html(imghtml);
			}else{
				var morStc=$("#swimg").attr("src");
				var morhtml="<div class='swiper-slide'><img src='"+morStc+"' /></div>";
				$(".swiper-wrapper").html(morhtml);
			}
		}
		
	}
}


/*******************************************************************************
 * 
 */
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
