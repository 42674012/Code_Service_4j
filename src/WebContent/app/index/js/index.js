var indexAttr = {
	menuData : [],
	tabsMap : [],
	menuDataMap : {},
	contextMenuTitle : "",
	map : {},
	url : '',
	top : true
};

function init() {
	$("#west").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	getFunction();
}

//医院切换
function changOrgid(obj){
	var reporgid=obj.value;
	if(reporgid){
		window.location.href=context+"/app/index/index.jsp?reporgid="+reporgid;
	}
	
}

function initMainPage(job) {
//	if (job == '医生' || job == '医助') {
//		// indexAttr.url = 'main_doc.jsp';
//		indexAttr.url = 'main_doc_ass.jsp';
//		return indexAttr.url;
//	}/*
//		 * else if(job == '咨询客服'){ indexAttr.url = 'main_zx.jsp'; return
//		 * indexAttr.url; }
//		 */else {
//		// indexAttr.url = 'main.jsp';
//		indexAttr.url = 'main_zx.jsp';
//		return indexAttr.url;
//	}
	indexAttr.url = 'main.jsp';
//	indexAttr.url = 'main_zx.jsp';
//	indexAttr.url = 'main_doc_ass.jsp';
}

function initMain() {
	index_tabs = $('#main')
			.tabs(
					{
						fit : true,
						border : false,
						onClose:function(title,index){
							window.setTimeout(function(){
								setTabsTitleHeight("main");
							},600);
						},
						onSelect:function(){
							setTabsTitleHeight("main");
						},
						tools : [ {
							iconCls : 'main_refresh',
							handler : function() {
								var href = index_tabs.tabs('getSelected')
										.panel('options').href;
								if (href) {/* 说明tab是以href方式引入的目标页面 */
									var index = index_tabs.tabs('getTabIndex',
											index_tabs.tabs('getSelected'));
									index_tabs.tabs('getTab', index).panel(
											'refresh');
								} else {/* 说明tab是以content方式引入的目标页面 */
									var panel = index_tabs.tabs('getSelected')
											.panel('panel');
									var frame = panel.find('iframe');
									try {
										if (frame.length > 0) {
											for (var i = 0; i < frame.length; i++) {
												frame[i].contentWindow.document
														.write('');
												frame[i].contentWindow.close();
												frame[i].src = frame[i].src;
											}
											if (navigator.userAgent
													.indexOf("MSIE") > 0) {// IE特有回收内存方法
												try {
													CollectGarbage();
												} catch (e) {
												}
											}
										}
									} catch (e) {
									}
								}
							}
						} ]
					});
	$("#main").tabs("add",{
						title : "首页",
						selected : true,
						content : "<iframe src="
								+ indexAttr.url
								+ "  height='100%' width='100%' frameborder=0 '></iframe>"
					});
	// ---------------------------------------
	$("#main").children(".tabs-header:first").find(".tabs").attr("id",
			"mainTabs");
	
	
	
	$("#mainTabs").on("contextmenu", "li", function(e) {
		indexAttr.contextMenuTitle = e.currentTarget.innerText;
		e.preventDefault();
		if (indexAttr.contextMenuTitle != "首页") {
			$('#tabsMenu').menu('show', {
				left : e.pageX,
				top : e.pageY
			});
		}
	});
}

function getMenu() {
	tcCore.get({
		url : "menuDS/getMenuTree1.ssm",
		success : function(data) {
			// 构造顶级菜单
			createTopMenu(data);
		}
	});
}
function getFunction() {
	tcCore.get({
		url : "empowerDS/getFunctionIdSet.ssm",
		success : function(data) {
			indexAttr.map = data;
			initMainPage();
			var employeeId = "";
			initMain();
			getMenu();
		}
	});
}

function isPrivilege(menuId) {
	return true;
	/*if(indexAttr.map){
		return indexAttr.map[menuId];
	}
	return null;*/
}

function createTopMenu(data) {
	var selected = false;
	indexAttr.menuData = data;
	var html = [];
	$(data).each(function(i, o) {
		if (isPrivilege(o.menuId)) {
			html.push('<li class="item item-vip">');
			html.push('<a id=', o.menuId, '  class="main-nav ">');
			// html.push('<a id=',o.menuId,' class="main-nav '+ o.icon +'">');
			html.push('<img src="' + o.icon + '" class="item-png"/><br>');
			html.push(o.name);

			html.push('</a>');
			html.push('</li>');
			createSubMenu(o.menuId, o.children);
		}
		// $('#menuAccordion').accordion({
		// animate:false,
		// border:false,
		// fit:true,
		// onSelect:function(title,index){
		// var menu = indexAttr.menuData[index];
		// createSubMenu(menu.menuId,menu.children);
		// }
		// });
		// if(i==0){
		// selected = true;
		// }else{
		// selected = false;
		// }
		// $('#menuAccordion').accordion('add', {
		// title : o.name,
		// content : "<div id='"+o.menuId+"'></div>",
		// selected : selected
		// });
	});

	$("#nav").html(html.join(""));

	$("#nav .main-nav").hover(function() {
		$(".sub-nav-wrap").fadeOut("fast");
		$("#sub_" + this.id).css({
			top : $(this).offset().top,
			left : 95
		}).fadeIn("fast");

		$("#triangle-left").css({
			top : ($(this).offset().top - 6 + $(this).outerWidth() / 2),
			left : 84
		}).fadeIn("fast");

	}, function() {
		// $("#sub_"+this.id).css("display","none");
		// $("#triangle-left").css("display","none");
	});

	$(".sub-nav-wrap").hover(function() {

	}, function() {
		$(this).fadeOut("fast");
		$("#triangle-left").fadeOut("fast");
	});
}

function createSubMenu(id, data) {
	var html = [];
	html.push('<div id=sub_', id, ' class="sub-nav-wrap">');
	if (data && data[0].children && data[0].children.length > 0) {
		$(data) .each( function(i, o) {
			if(isPrivilege(o.menuId)){
				if (i == (data.length - 1)) {
					html
							.push('<div class="nav-item nav-item-last">');//
				} else {
					html.push('<div class="nav-item">');
				}

				html
						.push(
								'<h3 style="font-size:13px;color:#53b7ec;padding:5px 0px;">',
								o.name, '</h3>');
				if (o.children && o.children.length > 0) {
					html
							.push(getSubMenuUl('sub_' + id,
									o.children));
				}
				html.push('</div>');
			}
			
		});
	} else {
		html.push(getSubMenuUl('sub_' + id, data));
	}
	html.push(" </div>");
	$("body").append(html.join(""));
	// if($("#"+id).data().treegrid){
	// return;
	// }
	// $("#"+id).treegrid({
	// idField : 'menuId',
	// collapsible : true,
	// border:false,
	// treeField : 'name',
	// fitColumns : true,
	// iconCls : "icon-grid",
	// headerCls : "gridHeaderCls",
	// showHeader : false,
	// lines:true,
	// columns : [ [ {
	// title : '名称',
	// field : 'name',
	// width : 180
	// } ] ],
	// data:data,
	// onClickRow:function(row){
	// //打开地址
	// var url = row.url;
	// if(url!=null&&url!=""){
	// if(url.indexOf("http://")<0){
	// if(url.indexOf("/")==0){
	// url = context+url;
	// }else{
	// url = context+"/"+url;
	// }
	// }
	// }else{
	// url = "about:blank;";
	// }
	//			
	// var isBlank = row.isBlank;
	// if(isBlank==0){
	// if($("#main").tabs("exists",row.name)){
	// $("#main").tabs("select",row.name);
	// }else{
	//					
	// indexAttr.tabsMap[row.name] = row.name;
	// $("#main").tabs("add",{
	// title: row.name,
	// selected: true,
	// closable:true,
	// content:"<iframe src='"+url+"' height='100%' width='100%' frameborder=0
	// '></iframe>"
	// });
	// }
	// }else{
	// window.open(url);
	// }
	// }
	// });
}

function getSubMenuUl(subMenuId, data) {
	var html = [];

	html.push('<ul class="sub-nav">');
	$(data)
			.each(
					function(i, o) {
						if (isPrivilege(o.menuId)) {
							html.push('<li id="', o.menuId, '" subMenuId="',
									subMenuId, '" onclick="openMenu(this)">');
							html
									.push(
											'<a tabtxt="" tabid="vip-onlineStoreMap" rel="pageTab"   data-right="" >',
											o.name, '</a>');

							indexAttr.menuDataMap[o.menuId] = o;

							html.push('</li>');
						}
					});
	html.push('</ul>');
	return html.join("");
}

function openMenu(a,row) {
	if(!row){
		$("#" + $(a).attr("subMenuId")).hide();
		var row = indexAttr.menuDataMap[$(a).attr("id")];
	}
	
	
	var url = row.url;
	if (url != null && url != "") {
		if (url.indexOf("http://") < 0) {
			if (url.indexOf("/") == 0) {
				url = context + url;
			} else {
				url = context + "/" + url;
			}
		}
	} else {
		url = "about:blank;";
	}

	var isBlank = row.isBlank;
	if (isBlank == 0) {
		if ($("#main").tabs("exists", row.name)) {
			$("#main").tabs("select", row.name);
		} else {

			indexAttr.tabsMap[row.name] = row.name;
			$("#main")
					.tabs(
							"add",
							{
								title : row.name,
								selected : true,
								closable : true,
								content : "<iframe src='"
										+ url
										+ "'  height='100%' width='100%' frameborder=0 '></iframe>"
							});
		}
	} else {
		window.open(url);
	}
}

/*******************************************************************************
 * 关闭所有标签页
 */
function closeAllTabs() {
	for ( var title in indexAttr.tabsMap) {
		$("#main").tabs("close", title);
	}
}

/*******************************************************************************
 * 关闭当前标签页
 */
function closeSelectTabs() {
	$("#main").tabs("close", indexAttr.contextMenuTitle);
}

/*******************************************************************************
 * 关闭其他标签页
 */
function closeOtherTabs() {
	for ( var title in indexAttr.tabsMap) {
		if (title != indexAttr.contextMenuTitle) {
			$("#main").tabs("close", title);
		}
	}
}

/**
 * 退出系统
 */
function loginAdminOut() {
	$.messager.confirm("系统提示", "确认要退出系统吗？", function(opt) {
		if (opt) {
			window.location = context + "/logout";
		}

	});
}

/**
 * 修改密码
 */
function openPersonCenter() {
	openMenu(null,{
		url:"/app/personel/personel.jsp",
		isBlank:0,
		name:"个人中心"
	});
}

$(document).ready(init);

document.onkeyup = function(e) {
	var code = jQuery.getKeyNum(e);
	if (e.ctrlKey && code == 66) {
		tcCore.openWindowOnTop(context+"/lock.jsp", null, null, function(
				result) {
			// 关闭窗口的回调
		}, {
			title : "屏幕锁定",
			width : 800,
			height : 500
		});
	}
}

jQuery.getKeyNum = function(e) {
	var keynum;
	if (window.event) { // IE
		keynum = event.keyCode;
	} else if (e.which) { // Netscape/Firefox/Opera
		keynum = e.which;
	}
	return keynum;
}
