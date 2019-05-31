<%@page import="com.xt.ssb.util.json.McfJson"%>
<%@page import="com.xt.ssb.util.Constants"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">
<title>Insert title here</title>

<%
	String context = request.getContextPath();
	String employeeType = request.getSession().getAttribute(
			Constants.session_employee_type) == null ? "0" : request
			.getSession().getAttribute(Constants.session_employee_type)
			.toString();
	Object employeeId = request.getSession().getAttribute(
			Constants.session_employee_id);
	String listStr = "";
	if (employeeId == null) {
		response.sendRedirect(request.getContextPath() + "/login.jsp");
	}
%>
<script>
var context = "<%=context%>";
var employeeType = "<%=employeeType%>";
</script>
</head>
<body>
	<%@ include file="../includeScript.jsp"%>
	<link href="css/systemSelect.css" rel="stylesheet" type="text/css" />
	<script src='js/systemSelect.js'></script>
	<div class="easyui-layout" data-options="fit:true">
		<div id='center'
			data-options="region:'center',iconCls:'icon-ok,title:false'"
			style='border-top-width: 0px;'>

			<div class='container'>
				<div>
					<div style='width: 100px; height: 58px; display: inline-block;'>
						<a class='logo'
							style='background: url("<%=context%>/app/index/css/images/logo.png") 0 10px no-repeat;'>&nbsp;</a>
					
					</div>


					<div
						style='margin-left: 50px; line-height: 58px; width: 300px; height: 58px; display: inline-block;'>
						<a class='topMenu active'>医院</a> <a class='topMenu'>渠道</a> <a
							class='topMenu'>营销</a>
					</div>
					<a style='float:right;margin-left:10px;' onclick='loginAdminOut()'>注销</a>
					<a style='float:right;margin-left:10px;' href='index.jsp'>进入管理台</a>
				</div>
				<div class='main'>
					<div id='tool' style='width:100%;height:30px;'></div>
					<div id='systemlist' styl='width:100%;height:100%;'></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
