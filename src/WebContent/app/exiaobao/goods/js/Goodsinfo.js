
function init(){
	var w = $("#demo1").width();//容器宽度 
	$("#demo1 img").each(function(){//如果有很多图片，我们可以使用each()遍历 
		var img_w = $(this).width();//图片宽度 
		var img_h = $(this).height();//图片高度 
		if(img_w>w){//如果图片宽度超出容器宽度--要撑破了 
			var height = (w*img_h)/img_w; //高度等比缩放 
			$(this).css({"width":w-5,"height":height});//设置缩放后的宽度和高度 
		} 
	}); 
	
	var goodsid=getparams("goodsid");
	
}

/**
 * 获得url参数
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
 * ajax请求异常处理
 */
tcCore.ajaxErrorFunction = function(e) {
    
}












$(document).ready(init);