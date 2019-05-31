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
		orgid:"",
	};

function showClick(id,tabcon){
	$("#tab1").hide();
	$("#tab2").hide();
	$("#lia1").removeClass("thistab");
	$("#lia2").removeClass("thistab");
	$("#"+id).addClass("thistab").show();
	$("#"+tabcon).show();
}
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
	showClick("lia1","tab1");
	$("#goodsFormPanel").css("width",window.innerWidth);
	$(".main_visual").css("width",window.innerWidth);
	$(".ddiv").css("width",window.innerWidth-10);
	$(".tabbox").css("width",window.innerWidth);
	
		
	$("#goodsFormPanel").css("height",window.innerHeight);
	goodsAttr.goodsid = getparams("goodsid");
	goodsAttr.phone = getparams("phone");
	goodsAttr.orgid = getparams("orgid");
	goodsAttr.sales = getparams("sales");
	goodsAttr.chicknum = getparams("chicknum");
	goodsAttr.flag = getparams("flag");
	goodsAttr.btnflag = getparams("btnflag");
	if(goodsAttr.sales){
		$("#sales").html(goodsAttr.sales);
	}
	if(goodsAttr.chicknum){
		$("#chicknum").html(goodsAttr.chicknum);
	}
//	goodsAttr.phone="186824417975";
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
		url:"goodsDS/getGoodsByPk.ssm?goodsid="+encodeURI(id)+"&phone="+goodsAttr.phone,
		success:function(data){
			initGoods(data);
		}
	});
}
/**
 * 立即预约
 */
function bespeak(){
	var url=context+"/app/exiaobao/bespeak/BespeakEdit.jsp?phone="+goodsAttr.phone+"&goodsid="+goodsAttr.goodsid+"&price="+goodsAttr.price;
	window.location.href=url;
}
/**
 * 返回医院商品页
 */
function backOrg(){
	var url=context+"/app/exiaobao/org/OrgView.jsp?orgid="+goodsAttr.orgid+"&phone="+goodsAttr.phone+"&flag="+goodsAttr.flag+"&btnflag=1";
	window.location.href=url;
}
/**
 * @param data
 */
function initGoods(data){
//	$("#btna").html("");
//	$("#imgli").html("");
	for(var d in data){
		if(d==="goodsinfo"){
			$("#tab1").html(data[d]);
		}else if(d==="detail"){
			if(data[d]&&data[d]!=""){
				$("#daltable").html(data[d]);
			}
			$("#daltable").trigger("create");
			$("#daltable").find("img").parent('td').remove();
		}else if(d==="discount"){
			$("#zhekou").html(data[d]+"折");
			var zk=(data[d]/10).toFixed(2); 
			goodsAttr.price=data.price*zk;
			$("#discount").html("￥"+(data.price*zk).toFixed(2));
		}else if(d==="brokerage"){
			if(goodsAttr.flag&&goodsAttr.flag==="1"){
				var brokerage=data[d]==null?"0":data[d];
				$("#brokerage").html("￥"+brokerage);
				$("#showbrokerage").show();
			}else{
				$("#showbrokerage").hide();
			}
			if(goodsAttr.btnflag&&goodsAttr.btnflag!=""){
				$("#showbrokerage").hide();
				$("#brokerage").hide();
			}
		}else if(d==="price"){
			$("#price").html("￥"+data[d]);
		}else if(d==="goodsname"){
			$("#goodsname").html(data[d]);
		}else if(d==="address"){
			$("#address").html("医院地址："+data[d]);
		}else if(d==="sales"){
			var sales=data[d]==null?"0":data[d];
			$("#sales").html(sales);
		}else if(d==="filelist"){
			if(data[d]&&data[d].length>0){
				var imghtml="";
				$(data[d]).each(function(i,o){
					imghtml+="<div class='swiper-slide'><img src='"+o.fileId+"' /></div>";
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
