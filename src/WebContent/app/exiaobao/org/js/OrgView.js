var tcCore = {};

var orgAttr = {
		orgid:"",
		phone:"",
		xlsort:"",
		sjsort:"",
		fwsort:"",
		size:20,
		start:0
	};

function showClick(id,tabcon){
	orgAttr.size=20;
	orgAttr.start=0;
	$("#tab1").hide();
	$("#tab2").hide();
	$("#tab3").hide();
	$("#lia1").removeClass("thistab");
	$("#lia2").removeClass("thistab");
	$("#lia3").removeClass("thistab");
	$("#"+id).addClass("thistab").show();
	$("#"+tabcon).show("2000");
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
	$("#orgFormPanel").css("width",window.innerWidth);
	$(".ddiv").css("width",window.innerWidth-10);
	$(".tabbox").css("width",window.innerWidth);
	$(".butndiv").css("width",window.innerWidth-500);
	$("#orgFormPanel").css("height",window.innerHeight-56);
	
	orgAttr.orgid = getparams("orgid");
	orgAttr.phone = getparams("phone");
//	orgAttr.orgid="672279945988276224";
//	orgAttr.phone="789";
	if(orgAttr.orgid&&orgAttr.phone){
		queryTQ(orgAttr.orgid,orgAttr.phone,"");
	}
	$(".keyword").click(function() {
		if($(this).val()=="搜索医院商品"){
			$(this).val("");
			$(this).css("color","#5A5A5A");
		}
	});
	$(".searchBtn").click(function() {
		if($(".keyword").val()!="搜索医院商品"){
			var keyword=$(".keyword").val();
			if(orgAttr.orgid&&orgAttr.phone){
				queryTQ(orgAttr.orgid,orgAttr.phone,keyword);
			} 
		}
	});
}
/**
 * 条件处理
 * @param id
 * @param phone
 * @param keyword
 */
function queryTQ(id,phone,keyword){
	var mp={
		orgid:id,
		phone:phone,
		keyword:keyword
	};
	getOrg(mp,orgAttr.size,orgAttr.start);
}
/**
 * 查询
 * @param mp
 * @param size
 * @param start
 */
function getOrg(mp,size,start){
	tcCore.post({
		url:"goodsDS/queryForappgoods.ssm",
		data:{
			params:mp,
			size:size,
			start:start,
		},
		success:function(data){
			initGoods(data);
		}
	});
}
/**
 * 售价排序
 */
function sjSort(){
	if(orgAttr.sjsort==""){
		orgAttr.sjsort="shoujaUp";
		$("#shoujaUp").show();
		$("#shoujaDown").hide();
	}else if(orgAttr.sjsort=="shoujaUp"){
		orgAttr.sjsort="shoujaDown";
		$("#shoujaUp").hide();
		$("#shoujaDown").show();
	}else if(orgAttr.sjsort=="shoujaDown"){
		orgAttr.sjsort="";
		$("#shoujaUp").hide();
		$("#shoujaDown").hide();
	}
	queryTQ(orgAttr.orgid,orgAttr.phone,"");
}
/**
 * 销量排序
 */
function xlSort(){
	if(orgAttr.xlsort==""){
		orgAttr.xlsort="xialiangUp";
		$("#xialiangUp").show();
		$("#xialiangDown").hide();
	}else if(orgAttr.xlsort=="xialiangUp"){
		orgAttr.xlsort="xialiangDown";
		$("#xialiangUp").hide();
		$("#xialiangDown").show();
	}else if(orgAttr.xlsort=="xialiangDown"){
		orgAttr.xlsort="";
		$("#xialiangUp").hide();
		$("#xialiangDown").hide();
	}
	queryTQ(orgAttr.orgid,orgAttr.phone,"");
}
/**
 * 访问排序
 */
function fwSort(){
	if(orgAttr.fwsort==""){
		orgAttr.fwsort="fangwenUp";
		$("#fangwenUp").show();
		$("#fangwenDown").hide();
	}else if(orgAttr.fwsort=="fangwenUp"){
		orgAttr.fwsort="fangwenDown";
		$("#fangwenUp").hide();
		$("#fangwenDown").show();
	}else if(orgAttr.fwsort=="fangwenDown"){
		orgAttr.fwsort="";
		$("#fangwenUp").hide();
		$("#fangwenDown").hide();
	}
	queryTQ(orgAttr.orgid,orgAttr.phone,"");
}
/**
 * 数据排序
 * @param dat
 */
function listSort(dat){
	if(orgAttr.sjsort&&orgAttr.sjsort!=""){
		if(orgAttr.sjsort==="shoujaUp"){
			dat=dat.sort(function(a,b){
		        return b.price-a.price});
		}else if(orgAttr.sjsort==="shoujaDown"){
			dat=dat.sort(function(a,b){
		        return a.price-b.price});
		}
	}
	if(orgAttr.xlsort&&orgAttr.xlsort!=""){
		if(orgAttr.xlsort==="xialiangUp"){
			dat=dat.sort(function(a,b){
		        return b.sales-a.sales});
		}else if(orgAttr.xlsort==="xialiangDown"){
			dat=dat.sort(function(a,b){
		        return a.sales-b.sales});
		}
	}
	if(orgAttr.fwsort&&orgAttr.fwsort!=""){
		if(orgAttr.fwsort==="fangwenUp"){
			dat=dat.sort(function(a,b){
		        return b.chicknum-a.chicknum});
		}else if(orgAttr.fwsort==="fangwenDown"){
			dat=dat.sort(function(a,b){
		        return a.chicknum-b.chicknum});
		}
	}
	return dat;
}

/**
 * @param data
 */
var goodsList={};
function initGoods(data){
	$("#showList").html("");
	$("#tab2").html("");
	goodsList={};
	for(var d in data){
		if(d=="org"){
			$("#orgname").html(data[d].name);
			$("#address").html("地址："+data[d].address);
			$("#orgphone").html("电话："+data[d].phone);
			
			$("#introduction").html(data[d].introduction);
			$("#tabaddress").html(data[d].address);
			$("#tabphone").html("<a href='tel:"+data[d].phone+"'>"+data[d].phone+"</a>");
			if(data[d].smallimg){
				$(".orgSmallimg").attr("src",data[d].smallimg);
			}
		}else if(d=="goodsNum"){//商品数量
			$("#goodsNum").html(data[d]);
		}else if(d=="tgNum"){//推广量
			$("#tgNum").html(data[d]);
		}else if(d=="xsNum"){//销售量
			$("#xsNum").html(data[d]);
		}else if(d=="goodslist"){//商品列表
			if(data[d]&&data[d].length>0){
				var listdate=listSort(data[d]);
				$(listdate).each(function(i,o){
					$("#showList").append(creategshtml(o,data.flag));
				});
				goodsList=listdate;
			}else{
				$(".jiazaiged").hide();
			}
		}else if(d=="camList"){//活动列表
			if(data[d]&&data[d].length>0){
				$(data[d]).each(function(i,o){
					$("#tab2").append(createcmhtml(o,data.flag));
				});
				var morehtml="<div class='jiazaiged2' onclick='loadCmMore()'>加载更多</div>";
				$("#tab2").append(morehtml);
			}
		}else if(d=="orgfilelist"){//医院图片
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
	//商品详细
	$(".showListli").click(function() {
		var goodsid=this.id;
		var val=$(this).find(".tableli2").attr('id');
		var sales=val.split(",")[0];
		var chicknum=val.split(",")[1];
		var flag=val.split(",")[2];
		if(orgAttr.phone&&goodsid){
			if(btnflag&&btnflag!=""){
				location.href=context+"/app/exiaobao/goods/GoodsView.jsp" +
				"?goodsid="+goodsid+"&phone="+orgAttr.phone+"&orgid="+orgAttr.orgid+"&sales="+sales+"&chicknum="+chicknum+"&flag="+flag+"&btnflag=1";
			}else{
				location.href=context+"/app/exiaobao/goods/GoodsView.jsp" +
				"?goodsid="+goodsid+"&phone="+orgAttr.phone+"&orgid="+orgAttr.orgid+"&sales="+sales+"&chicknum="+chicknum+"&flag="+flag;
			}
			
		}
	});
	//活动详细
	$(".tab2imgdiv").click(function() {
		var campaignid=this.id;
		if(orgAttr.phone&&campaignid){
			if(btnflag&&btnflag!=""){
				location.href=context+"/app/exiaobao/campaign/CampaignShow.jsp" +
				"?goodsid="+campaignid+"&phone="+orgAttr.phone+"&orgid="+orgAttr.orgid+"&btnflag=1";
			}else{
				location.href=context+"/app/exiaobao/campaign/CampaignShow.jsp" +
				"?goodsid="+campaignid+"&phone="+orgAttr.phone+"&orgid="+orgAttr.orgid;
			}
			
		}
	});
}
/**
 * 判断图片是否存在
 * @param imgurl
 * @returns {Boolean}
 */
function CheckImgExists(imgurl) {  
    var ImgObj = new Image(); //判断图片是否存在  
    ImgObj.src = imgurl;  
    //没有图片，则返回-1  
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
        return true; 
    } else {  
        return false;
    }  
}

/**
 * 生成商品列表
 * @param obj
 */
function creategshtml(obj,flag){
	var goodshtml="";
	if(obj){
		var sales=obj.sales==null?"0":obj.sales;
		var chicknum=obj.chicknum==null?"0":obj.chicknum;
		
		goodshtml+="<li class='showListli' id='"+obj.goodsid+"' >";
		goodshtml+="<table><tr><td style='width: 30%'>";
		if(obj.smallimg){
			goodshtml+=" <img   src='"+obj.smallimg+"'  class='tableimg' /> ";
		}else{
			goodshtml+=" <img   src='"+context+"/app/exiaobao/org/images/nopictrue_list.jpg'  class='tableimg' /> ";
		}
		goodshtml+="</td><td style='padding-left: 15px;'>";
		goodshtml+="<ul ><li class='tableli1' >";
		goodshtml+=obj.goodsname;
		goodshtml+="</li><li class='tableli2' id='"+sales+","+chicknum+","+flag+"'>";
		
		goodshtml+="<span>销量："+sales+"</span> <span style='margin-left: 25px;'>访问："+chicknum+"</span>";
		goodshtml+="</li><li class='tableli3' >";
		var price=obj.price==null?"0":obj.price;
		if(obj.discount){
			var zk=(obj.discount/10).toFixed(2); 
			var shiji=(price*zk).toFixed(2);
			goodshtml+="<span class='jiage'>￥"+shiji+"</span>";
		}else{
			goodshtml+="<span class='jiage'>￥"+price+"</span>";
		}
		goodshtml+="<span class='yuanjia'>￥"+price+"</span>";
		if((flag==1||flag==="1")&&btnflag!="1"){
			var brokerage=obj.brokerage==null?"0":obj.brokerage;
			goodshtml+="<span class='yongjin'>佣金：</span>￥"+brokerage;
		}
		goodshtml+="</li></ul></td></tr></table></li>";
		goodshtml+="";
	}
	return goodshtml;
}
/**
 * 生成活动列表
 * @param obj
 * @param flag
 * @param fileurl
 */
function createcmhtml(obj,flag){
	var cmhtml="";
	if(obj){
		cmhtml+="<div class='tab2imgdiv' id='"+obj.campaignid+"'>";
		if(obj.smallimg){
			cmhtml+="<img  src='"+obj.smallimg+"' />";
		}else{
			cmhtml+="<img  src='"+context+"/app/exiaobao/org/images/nopictrue_list.jpg' />";
		}
		cmhtml+="</div><div class='tab2textdiv'><br/><span>"+obj.subject+"</span><br/>";
		
		var camprice=obj.camprice==null?"0":obj.camprice;
		if(obj.discount){
			var zk=(obj.discount/10).toFixed(2); 
			var shiji=(camprice*zk).toFixed(2);
			cmhtml+="<span class='jiage'>￥"+shiji+"</span>";
		}else{
			cmhtml+="<span class='jiage'>￥"+camprice+"</span>";
		}
		cmhtml+="<span class='yuanjia'>￥"+camprice+"</span>";
		if((flag==1||flag==="1")&&btnflag!="1"){
			var brokerage=obj.brokerage==null?"0":obj.brokerage;
			cmhtml+="<span class='yongjin'>佣金：</span>￥"+brokerage;
		}
		cmhtml+="<br/>";
		cmhtml+="<span style='color: #bbbbbb;'>销量："+obj.sales+"</span>";
		cmhtml+="</div>";
		cmhtml+="";
	}
	return cmhtml;
}
/**
 * 商品 加载更多
 */
function loadMore(){
	orgAttr.start=orgAttr.start+1;
	var pagestart=(orgAttr.start*orgAttr.size);
	var keyword="";
	if($(".keyword").val()!="搜索医院商品"){
		var keyword=$(".keyword").val();
	}
	var mp={
			orgid:orgAttr.orgid,
			phone:orgAttr.phone,
			keyword:keyword
		};
	tcCore.post({
		url:"goodsDS/loadMoreGoods.ssm",
		data:{
			params:mp,
			size:orgAttr.size,
			start:pagestart,
		},
		success:function(data){
			 if(data){
				 if(data.goodslist&&data.goodslist.length>0){
					var listdate=listSort(data.goodslist);
					$(listdate).each(function(i,o){
						$("#showList").append(creategshtml(o,data.flag));
					});
				}else{
					alert("没有更多数据！");
				}
			 }
		}
	});
}
/**
 * 活动加载更多
 */
function loadCmMore(){
	orgAttr.start=orgAttr.start+1;
	var pagestart=(orgAttr.start*orgAttr.size);
	var keyword="";
	var mp={
			orgid:orgAttr.orgid,
			phone:orgAttr.phone,
			keyword:keyword
		};
	tcCore.post({
		url:"goodsDS/loadMoreCampaign.ssm",
		data:{
			params:mp,
			size:orgAttr.size,
			start:pagestart,
		},
		success:function(data){
			 if(data){
				 if(data.camlist&&data.camlist.length>0){
					 $("#tab2").html("");
					 $(data.camlist).each(function(i,o){
						$("#tab2").append(createcmhtml(o,data.flag));
					});
					var morehtml="<div class='jiazaiged2' onclick='loadCmMore()'>加载更多</div>";
					$("#tab2").append(morehtml);
				}else{
					alert("没有更多数据！");
				}
			 }
		}
	});
}
/**
 * 
 * @param paras
 * @returns
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
