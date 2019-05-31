/*******************************************************************************
 * cookies 部分
 */

var tcCore = {};

tcCore.corePageHead = $("head");

/*******************************************************************************
 * 获取cookie
 */
tcCore.getCookie = function(objName) {// 获取指定名称的cookie的值

	var arrStr = document.cookie.split("; ");

	for (var i = 0; i < arrStr.length; i++) {

		var temp = arrStr[i].split("=");

		if (temp[0] == objName)
			return unescape(temp[1]);

	}

}
/*******************************************************************************
 * 增加cookie
 */
tcCore.addCookie = function(objName, objValue, objHours) { // 添加cookie

	var str = objName + "=" + escape(objValue);

	if (objHours > 0) { // 为时不设定过期时间，浏览器关闭时cookie自动消失

		var date = new Date();

		var ms = objHours * 3600 * 1000;

		date.setTime(date.getTime() + ms);

		str += "; expires=" + date.toGMTString();

	}

	document.cookie = str;

}
/*******************************************************************************
 * 设置cookie
 */
tcCore.setCookie = function(name, value)// 两个参数，一个是cookie的名子，一个是值

{

	var Days = 30; // 此 cookie 将被保存 30 天

	var exp = new Date(); // new Date("December 31, 9998");

	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();

}
/*******************************************************************************
 * 删除cookie
 */
tcCore.delCookie = function(name)// 删除cookie

{

	var exp = new Date();

	exp.setTime(exp.getTime() - 1);

	var cval = tcCore.getCookie(name);

	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();

}
/*******************************************************************************
 * 加载css
 */
tcCore.loadCss = function(cssurl, id) {
	var head = $("head");
	tcCore.corePageHead.append("<link id='" + id + "'  rel='stylesheet' href='"
			+ cssurl + "' />");

}
/*******************************************************************************
 * 加载js
 */
tcCore.loadJs = function(jsurl, id) {
	tcCore.corePageHead.append("<script id='" + id + "'   src='" + jsurl
			+ "'></script>");
}
/*******************************************************************************
 * 生成ＧＵＩＤ
 */
tcCore.guid = function() {
	var S4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
}

/*******************************************************************************
 * 
 */
tcCore.ajax = function(ajaxObj) {
	var aobj = {};
	if (ajaxObj.data != null && typeof (ajaxObj.data) == "object") {
		aobj.data = JSON.stringify(ajaxObj.data);
	}
	aobj.loadingMsg = ajaxObj.loadingMsg;
	aobj.contentType = 'application/json;charset=UTF-8';
	aobj.dataType = ajaxObj.dataType||'json';
	aobj.async = ajaxObj.async;
	aobj.type = ajaxObj.type;
	aobj.noLoading = ajaxObj.noLoading;
	aobj.timeout = 15000;
	aobj.error = function(d) {
		tcCore.hiddenLoading();
		if (typeof (ajaxObj.error) != "function") {
			tcCore.ajaxErrorFunction.call(this, d);
		} else {
			ajaxObj.error.call(this, d);
		}
	}

	aobj.success = function(d) {
		tcCore.hiddenLoading();
		if (d && d.$mcfDispacherStatus == -100) {
			// alert("需要重新登录");
			// window.location.href = context+"/love/login.jsp";
			// return;
		} else if (d && d.$mcfDispacherStatus == 101) {
			if(aobj.error){
				aobj.error.call(this, d.msg);
			}
			else{
				tcCore.ajaxErrorFunction.call(this, d.msg);
			}

			return;
		}

		if (ajaxObj.success) {
			ajaxObj.success.call(this, d);
		}

	}

	if (ajaxObj.url.indexOf(context) != 0) {
		if(aobj.dataType=="jsonp"||aobj.dataType=="JSONP"){
			aobj.url = ajaxObj.url;
		}else{
			aobj.url = context + "/" + ajaxObj.url;
		}
	} else {
		aobj.url = ajaxObj.url;
	}
	if(!aobj.noLoading){
		
		tcCore.showLoading(aobj.loadingMsg);
	}else{
		//debugger;
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
//	$("<div class=\"datagrid-mask\"></div>").css({
//		display : "block",
//		width : "100%",
//		height : $(window).height()
//	}).appendTo("body");
	
	$.messager.show({
		title:'系统提示',
		msg : "操作失败" + e,
		timeout:5000,
		showType:'slide'
	});
	
//	$.messager.alert({
//		title : '系统提示',
//		msg : "操作失败" + e,
//		style : {
//			right : '',
//			top : document.body.scrollTop + document.documentElement.scrollTop
//					+ 100,
//			bottom : ''
//		},
//		fn : function() {
//			$("body").children(".datagrid-mask").remove();
//		}
//	});
}
/*******************************************************************************
 * 显示loading
 */
tcCore.showLoading = function(msg) {
	$("<div class=\"datagrid-mask\"></div>").css({
		display : "block",
		width : "100%",
		height : $(window).height(),
		"z-index" : 9099
	}).appendTo("body");
	$("<div class=\"datagrid-mask-msg\"></div>").html((msg || "正在努力处理，请稍后"))
			.appendTo("body").css({
				display : "block",
				"z-index" : 10000,
				left : ($(document.body).outerWidth(true) - 190) / 2,
				top : ($(window).height() - 45) / 2
			});
}
/*******************************************************************************
 * 隐藏loading
 */
tcCore.hiddenLoading = function() {
	$("body").children(".datagrid-mask").remove();
	$("body").children(".datagrid-mask-msg").remove();
}
/*******************************************************************************
 * 获取表单数据
 */
tcCore.getFormData = function(id) {
	var eleList = $("#" + id).formToArray();
	var data = {};
	$(eleList).each(function(i, o) {
		if ($("#" + o.name).data("ssbtype") == "date") {
			if (o.value != null && o.value != "") {
				data[o.name] = new Date(o.value);
			}
		} else if ($("#" + o.name).data("ssbtype") == "checkbox") {

		} else if ($("#" + o.name).data("ssbtype") == "integer") {
			if (o.value !== null) {
				data[o.name] = parseInt(o.value);
			}
		} else if ($("#" + o.name).data("ssbtype") == "double") {
			if (o.value !== null) {
				data[o.name] = parseFloat(o.value);
			}
		} else if ($("#" + o.name).data("ssbtype") == "dateRange") {
			var s = o.name + "Start";
			var e = o.name + "End";
			if ($("#" + s).textbox("getValue")) {
				data[s] = new Date($("#" + s).textbox("getValue"));
			}
			if ($("#" + e).textbox("getValue")) {
				data[e] = new Date($("#" + e).textbox("getValue"));
			}
		}else if($("#" + o.name).data("ssbtype") ==  "month"){
			if (o.value&&o.value != "") {
				o.value = o.value.replace("-","");
			}
			data[o.name] = o.value;
		}else if($("#" + o.name).data("ssbtype")  =="combogrid"){
			var g = $("#" + o.name).combogrid('grid');	// get datagrid object
			var r = g.datagrid('getSelections');	
			var a = [];
			var opts = $("#" + o.name).combogrid("options");
			$(r).each(function(i,o){
				a.push(o[opts.idField]);
			});
			data[o.name] = a;
		} else {
			if (o.value == "") {
				o.value = null;
			}
			data[o.name] = o.value;
		}

		if ($("#" + o.name).data("datatype") == "integer") {
			data[o.name] = parseInt(data[o.name]);
		}
	});
	return data;
}

/*******************************************************************************
 * 窗口控制
 */
tcCore.openEasyUiWindow = function(href, param, dom, callBack, winParam) {
	var windowParam = $.extend({}, {
		width : 600,
		height : 500,
		title : "属性编辑",
		scroll : "yes"
	}, winParam);
	windowParam.minimizable = false;
	windowParam.id = tcCore.guid();
	// param.mcfWindowCallBack = callBack;
	if (!$("#" + windowParam.id).get(0)) {
		$("body").append(
				'<div id="' + windowParam.id + '" class="noscroll"></div>');
		$('#' + windowParam.id).window({
			closed : true,
			cache : false,
			modal : true,
			shadow : false,
			iconCls : "icon-form-edit",
			top : windowParam.top,
			zIndex : 10000,
			minimizable : false,
			maximizable : false,
			collapsible : false,
			title : windowParam.title,
			width : windowParam.width,
			height : windowParam.height,
			onClose : function() {
				$("#" + windowParam.id).parent().next().remove();
				$("#" + windowParam.id).parent().remove();
			}
		});
		$("<div class='window-header-fix'></div").prependTo(
				$('#' + windowParam.id).parent());
		var html = [];
		if (windowParam.buttons) {
			// html.push('<div class="easyUiWindowLayout easyui-layout"
			// data-options="fit:true">');
			// html.push('<div class="centerPart"
			// data-options="region:\'center\',border:false" style="">');
			// html.push('<iframe class="easyUiWindowHref"
			// style="width:100%;height:100%;" frameborder="0" scroll="'+
			// windowParam.scroll + '"><iframe></div>');
			// html
			// .push('<div class="southPart"
			// data-options="region:\'south\',border:false"
			// style="height:40px;text-align:right;padding:5px 0 0;">');
			// html
			// .push('<a class="easyui-linkbutton" data-options=""
			// href="javascript:void(0)" style="margin-right:10px"
			// onmousedown="javascript:tcCore.easyUiWindowOkMouseDown()">保存</a>');
			// html
			// .push('<a class="easyui-linkbutton" data-options=""
			// href="javascript:void(0)" style="margin-right:10px"
			// onmousedown="javascript:tcCore.easyUiWindowCancelMouseDown()">取消</a>');
			// html.push('</div>');
			// html.push('</div>');
			//			
			// $("#" + windowParam.id).html(html.join(""));
			// $("#" +
			// windowParam.id).find(".easyUiWindowLayout:first").layout({}).find(".southPart:first").children()
			// .linkbutton({});

		} else {
			html
					.push('<iframe class="easyUiWindowHref" style="width:100%;height:100%;" frameborder="0" scroll="'
							+ windowParam.scroll + '"></iframe>');
			$("#" + windowParam.id).html(html.join(""));
		}

		$("#" + windowParam.id).find(".easyUiWindowHref:first").attr("src",
				href);

	}
	$('#' + windowParam.id).window("center").window('open').data("opened", 1);
	if (href.indexOf("?") > 0) {
		href = href + "&dialogId=" + windowParam.id;
	} else {
		href = href + "?dialogId=" + windowParam.id;
	}
	$("#" + windowParam.id).find(".easyUiWindowHref:first").attr("src", href);

	return {
		dialogId : windowParam.id,
		param : param
	};
};

tcCore.openWindowOnTop = function(href, param, dom, callBack, winParam) {
	if (href.indexOf("/") < 0) {
		var url = window.location.href;
		var urlRoot = url.substring(0, url.lastIndexOf("/"));
		href = urlRoot + "/" + href;
	}
	var dialogObj = tcCore.getTop().tcCore.openEasyUiWindow(href, param, dom, callBack,
			winParam);
	if (!tcCore.getTop().windowObj) {
		tcCore.getTop().windowObj = {};
	}
	if (!window.topDialogMap) {
		window.topDialogCallBackMap = {};
	}
	if (!window.topDialogParamsMap) {
		window.topDialogParamsMap = {};
	}
	window.topDialogCallBackMap[dialogObj.dialogId] = callBack;
	window.topDialogParamsMap[dialogObj.dialogId] = dialogObj.param;
	tcCore.getTop().windowObj[dialogObj.dialogId] = window;
};

tcCore.getTopWindowParam = function() {
	var dialogId = tcCore.getParameter("dialogId");
	if (dialogId == null || dialogId == "") {
		return null;
	} else {
		if (dialogId.indexOf("#") > 0) {
			dialogId = dialogId.replace("#", "");
		}
		return tcCore.getTop().windowObj[dialogId].topDialogParamsMap[dialogId];
	}
};

tcCore.closeTopDialog = function(param) {
	var dialogId = tcCore.getParameter("dialogId");
	if (dialogId.indexOf("#") > 0) {
		dialogId = dialogId.replace("#", "");
	}
	// var p = JSON.parse(JSON.stringify(param));
	window.setTimeout(function() {
		tcCore.getTop().tcCore.closeEasyUiWindow(dialogId);
	}, 10);
	if (tcCore.getTop().windowObj[dialogId].topDialogCallBackMap[dialogId]) {
		tcCore.getTop().windowObj[dialogId].topDialogCallBackMap[dialogId].apply(
				window.parent, [ param ]);
	}

};

//tcCore.setTopDialogSize = function(width,height) {
//	var dialogId = tcCore.getParameter("dialogId");
//	if (dialogId.indexOf("#") > 0) {
//		dialogId = dialogId.replace("#", "");
//	}
//	// var p = JSON.parse(JSON.stringify(param));
//	//$("#" + dialogId).window('close');
//};

tcCore.closeEasyUiWindow = function(dialogId) {
	$('#' + dialogId).window('close').data("opened", 2);
};

tcCore.easyUiWindowOkMouseDown = function() {
	var iframeWindow = $("#easyUiWindowHref").get(0).contentWindow;
	var returnData = null;
	if (iframeWindow.okClick) {
		returnData = iframeWindow.okClick();
	}
	tcCore.closeEasyUiWindow();
	if (window.easyUiWindowCloseCallback) {
		window.easyUiWindowCloseCallback.call(window, returnData,
				window.easyUiWindowDom);
	}

};

tcCore.easyUiWindowCanelMouseDown = function() {
	tcCore.closeEasyUiWindow();
};

tcCore.isEasyUiWindowOpened = function() {
	return $('#easyUiWindow').data("opened") == 1;
};

/*******************************************************************************
 * 时间格式化
 */
Date.prototype.format = function(format) {
	format = format || "yyyy-MM-dd hh:mm:ss";
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format.substr(0, format.length);
};

/*******************************************************************************
 * 比较日期大小
 */
tcCore.dayBefore = function(d1, d2) {
	return (d1.format("yyyyMMdd")) < (d2.format("yyyyMMdd"));
}
/*******************************************************************************
 * 获取URL参数
 */
tcCore.getParameter = function(paras) {
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
 * 设置控件值
 */
tcCore.setControlValue = function(jdom, value, item) {
	var dcType = null;
	if (jdom.get(0)) {
		dcType = jdom.data("ssbtype");
		if (dcType && dcType != "ignore") {
			try {
				if (dcType == "autocomplete") {
					eval("tcCore.setValue_" + dcType + "(jdom,value,item)");
				} else {
					eval("tcCore.setValue_" + dcType + "(jdom,value)");
				}
			} catch (e) {
				console.error(e + jdom.attr("id") + dcType);
			}
		} else {
			jdom.val(value);
		}
	}

}
/**
 * 滑块设置
 */

tcCore.setValue_slider =function(jdom, value){
	jdom.slider("setValue",value);
}

/*******************************************************************************
 * 设置文本框值
 */
tcCore.setValue_text = function(jdom, value) {
	jdom.textbox("setValue", value);
}
tcCore.setValue_int = tcCore.setValue_text;
tcCore.setValue_double = tcCore.setValue_text;
setValue_numberbox = tcCore.setValue_text;
/*******************************************************************************
 * 设置日期控件值
 */
tcCore.setValue_date = function(jdom, value) {
	if (typeof (value) == "number") {
		jdom.datebox("setValue", new Date(value).format("yyyy-MM-dd"));
	} else {
		jdom.datebox("setValue", value);
	}

}
/*******************************************************************************
 * 设置checkbox控件值
 */
tcCore.setValue_checkbox = function(jdom, value) {
	var checkValue = jdom.data("checkvalue");
	if (checkValue) {
		if (checkValue.indexOf(",")) {
			var checkArr = checkValue.split(",");
			if (value == checkArr[0]) {
				jdom.prop("checked", true);
			} else {
				jdom.removeAttr("checked");
			}
		} else {
			if (value == checkValue) {
				jdom.prop("checked", true);
			} else {
				jdom.removeAttr("checked");
			}
		}
	}
}

/*******************************************************************************
 * 设置checkbox控件值
 */
tcCore.setValue_combobox = function(jdom, value) {
	if(value){
		jdom.combobox("select", value);
	}
}

/*******************************************************************************
 * 设置文本框值
 */
tcCore.setValue_label = function(jdom, value) {
	tcCore.setControlLabel(jdom, value);
}

tcCore.setControlLabel = function(jdom, value) {
	if (jdom.get(0)) {
		var dcType = jdom.data("ssbtype");
		if (dcType != "date") {
			jdom.html(value);
		} else {
			if (typeof (value) == "number") {
				jdom.html(new Date(value).format("yyyy-MM-dd"));
			} else {
				jdom.html(value);
			}
		}

	}
}

tcCore.setValue_autocomplete = function(jdom, value, item) {
	try {
		var id = jdom.attr("id");
		jdom.val(value);
		$("#" + id + "Show").val(item[id + "Show"]);
	} catch (e) {
		console.error(e);
	}

}

tcCore.setValue_radio = function(jdom, value, item) {
	var id = jdom.attr("id");
	$("input[name='" + id + "'][value='" + value + "']").attr("checked", true);
}

tcCore.addSelectItem = function(data,name){
	data.unshift({
		dictName:name
	});
	return data;
}

/*******************************************************************************
 * 字符串全部替换
 */
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

/*
 * tcCore.showSelect = function(href,multi,id){ //生成记录号 var record =
 * tcCore.guid(); var store = $.AMUI.store; //写入库 当前记录号
 * store.set("current_selectrecord_id", record);
 * store.set("current_selectreobj_id", id); //开启循环读取
 * 
 * 
 * 
 * //页面跳转 传递 是否多选 记录号 window.location.href = href+"?multi="+multi; }
 */
/*
 * window.showSelectFlag = window.setInterval(function(){ //debugger;
 * tcCore.getSelect(); },20);
 * 
 * tcCore.getSelect = function(href,multi,id){ //生成记录号 var store = $.AMUI.store;
 * if(store.get("selected")=="1"){ //写入库 当前记录号 var record =
 * store.get("current_selectrecord_id"); var objId =
 * store.get("current_selectreobj_id"); var dataStr = ""; if(record){ dataStr =
 * store.get(record); } //选择了值
 * 
 * var d = { data:JSON.parse(dataStr), id:objId }; if(d.id&&d.data){
 * if($("#"+d.id).get(0)){
 * $("#"+$("#"+d.id).attr("valueCtrlId")).val(d.data.value);
 * $("#"+$("#"+d.id).attr("nameCtrlId")).val(d.data.name); store.clear();
 * 
 * var showlabelArrStr = $("#"+$("#tcCoreSelectId").val()).attr("showlabelArr");
 * var showlabelArr = showlabelArrStr.split(",");
 * $(showlabelArr).each(function(i,o){ $("#"+o).children("div").remove();
 * $("#"+o).append( "<div
 * class='am-list-item-text'>"+$("#"+$("#"+o).attr("nameCtrlId")).val()+ "</div>" );
 * }); } //遍历 将需要显示的jie'di'a }
 * 
 * //window.clearInterval(window.showSelectFlag); } }
 * 
 * tcCore.dealWithSelect=function(id){ $("#"+id).children().each(function(i,o){
 * if(o.id==""||o.id==null){ o.id = id+"_"+i; } if($(this).attr("href") !=null&&
 * $(this).attr("href") !="" ){ $(this).click(function(){ var href =
 * $(this).attr("href"); var multi = $(this).attr("multi");
 * 
 * tcCore.showSelect(href,multi,this.id); }); } });
 * $("#tcCoreSelectId").val(id); return tcCore.getSelect(); }
 * 
 * 
 * 
 * tcCore.selectGoBack = function(data){ //写入当前记录号的值 if(data){ var store =
 * $.AMUI.store; var record = store.get("current_selectrecord_id");
 * store.set(record, JSON.stringify(data)); store.set("selected", "1"); }
 * window.history.back(); }
 */
/*******************************************************************************
 * 日期控件格式化
 */

function tcCoreformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
/*******************************************************************************
 * 日期控件格式化
 */
function tcCoreParser(s) {
	if (!s)
		return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}

tcCore.easyUiDateTimeBox = {};
tcCore.easyUiDateTimeBox.formatDateText = function(date) {
	return date.format("yyyy-MM-dd hh:mm:ss");
}
tcCore.resetSearch = function(){
	window.location.href = window.location.href ;
}
/*******************************************************************************
 * easyui日期控件格式化方法
 */
tcCore.easyUiDateTimeBox.parseDate = function(dateStr) {
	if (dateStr == null || dateStr == "") {
		return new Date();
	}
	var regexDT = /(\d{4})-?(\d{2})?-?(\d{2})?\s?(\d{2})?:?(\d{2})?:?(\d{2})?/g;
	var matchs = regexDT.exec(dateStr);
	var date = new Array();
	for (var i = 1; i < matchs.length; i++) {
		if (matchs[i] != undefined) {
			date[i] = matchs[i];
		} else {
			if (i <= 3) {
				date[i] = '01';
			} else {
				date[i] = '00';
			}
		}
	}
	return new Date(date[1], date[2] - 1, date[3], date[4], date[5], date[6]);
}

tcCore.getTop = function(){
	try {
		if (window.parent.location.host) {
			try{
				if(window.top.location.host){
					return window.top;
				}
			}catch(e){
				return window.parent;
			}
		} else {
			return window.parent;
		}
	} catch (e) {
		return window;
		
	}
}

tcCore.operationAllow = function(operaId){
	if(operationSet=="-1"){
		return true;
	}
	if(operationSet!=null&&operationSet.indexOf(operaId)>=0){
		return true;
	}
	return false;
}

tcCore.operationShow = function(){
	if(operationSet != null){
		var opers = operationSet.split(';');
		$(opers).each(function(i,o){
			if((o+'').indexOf("#") != -1){
				if(o&&$(o+'').get(0)){
					$(o+'').css({
						display:""
					});
				}
			}else{
				if(o&&$("#"+o).get(0)){
					$("#"+o).css({
						display:""
					});
				}
			}
		});
	}
	
}
$(document).ready(function(){
	tcCore.operationShow();
});
window.alert = function(msg,icon,fn) {
	$.messager.alert('系统提示', msg,icon,fn);
}

function setTabsTitleHeight(tabsId,height){
	if(!height){
		height = 28;
	}
	$("#"+tabsId).children(".tabs-header:first").find(".tabs").css({
		
	}).children().children(".tabs-inner").each(function(i,o){
		$(o).css({
			height:height,
			"border-bottom": "0px solid #ddd"
		});
	});
}

/**
 * 扩展树表格级联勾选方法：
 * 
 * @param {Object}
 *            container
 * @param {Object}
 *            options
 * @return {TypeName}
 */
$.extend($.fn.treegrid.methods,
		{
			/**
			 * 级联选择
			 * 
			 * @param {Object}
			 *            target
			 * @param {Object}
			 *            param param包括两个参数: id:勾选的节点ID deepCascade:是否深度级联
			 * @return {TypeName}
			 */
			cascadeCheck : function(target, param) {
				var opts = $.data(target[0], "treegrid").options;
				if (opts.singleSelect)
					return;
				var idField = opts.idField;// 这里的idField其实就是API里方法的id参数
				var status = false;// 用来标记当前节点的状态，true:勾选，false:未勾选
				var selectNodes = $(target).treegrid('getSelections');// 获取当前选中项
				for (var i = 0; i < selectNodes.length; i++) {
					if (selectNodes[i][idField] == param.id)
						status = true;
				}
				// 级联选择父节点
				selectParent(target[0], param.id, idField, status);
				selectChildren(target[0], param.id, idField, param.deepCascade,
						status);
				/**
				 * 级联选择父节点
				 * 
				 * @param {Object}
				 *            target
				 * @param {Object}
				 *            id 节点ID
				 * @param {Object}
				 *            status 节点状态，true:勾选，false:未勾选
				 * @return {TypeName}
				 */
				function selectParent(target, id, idField, status) {
					var parent = $(target).treegrid('getParent', id);
					if (parent) {
						var parentId = parent[idField];
						if (status)
							$(target).treegrid('select', parentId);
						else
							$(target).treegrid('unselect', parentId);
						selectParent(target, parentId, idField, status);
					}
				}
				/**
				 * 级联选择子节点
				 * 
				 * @param {Object}
				 *            target
				 * @param {Object}
				 *            id 节点ID
				 * @param {Object}
				 *            deepCascade 是否深度级联
				 * @param {Object}
				 *            status 节点状态，true:勾选，false:未勾选
				 * @return {TypeName}
				 */
				function selectChildren(target, id, idField, deepCascade,
						status) {
					// 深度级联时先展开节点
					if (!status && deepCascade)
						$(target).treegrid('expand', id);
					// 根据ID获取下层孩子节点
					var children = $(target).treegrid('getChildren', id);
					for (var i = 0; i < children.length; i++) {
						var childId = children[i][idField];
						if (status)
							$(target).treegrid('select', childId);
						else
							$(target).treegrid('unselect', childId);
						selectChildren(target, childId, idField, deepCascade,
								status);// 递归选择子节点
					}
				}
			}
		});