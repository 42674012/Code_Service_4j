function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	if (employeeType == "1") {
		// 构造系统创建页面
		$("#tool").html("<a class='create_link' onclick='createHospital()'>创建医院</a>");
	}
	createSystemList();
}

function createSystemList(){
	// 获取系统连接
	tcCore.post({
		url : "orgDS/getAppNodeByCurrentEmployee.ssm",
		success : function(data) {
			var html = [];
			$(data).each(
					function(i, o) {
						if(o.orgIcon){
							
						}else{
							if(o.orgType=="1001"){
								//美容院
								html.push("<div class='hospital hospital-beautysalon'><a href=", o.indexUrl, ">",
										o.name, "</a></div>");
							}else{
								html.push("<div class='hospital hospital-normal'><a href=", o.indexUrl, ">",
										o.name, "</a></div>");
							}
							
						}
						
					});
			$("#systemlist").html(html.join(""));
		}
	});
}

function createHospital() {
	tcCore.openWindowOnTop(context+"/app/oms/org/OrgEditForMember.jsp", null, null, function(result) {
		// 关闭窗口的回调
		createSystemList();
	}, {
		title : "新增医院"
	});
}

/**
 * 退出系统
 */
function loginAdminOut() {
	$.messager.confirm("提示", "确认要退出系统吗？", function(opt) {
		if (opt) {
			window.location = context+"/login.jsp";
		}
	});
}

$(document).ready(init);