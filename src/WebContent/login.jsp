<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>医小宝系统</title>

<%
	String context = request.getContextPath();
%>
<link rel="shortcut icon" href="css/images/favicon.ico" />

<link rel="stylesheet" type="text/css"
	href="<%=context%>/js/easyui/themes/metro/easyui.css">
<link rel="stylesheet" type="text/css" href="css/login.css" />
<script type="text/javascript">
	var operationSet="";
</script>
<script src="<%=context%>/js/easyui/jquery.min.js"></script>
<script src="<%=context%>/js/easyui/jquery.easyui.min.js"></script>
<script src="<%=context%>/js/core/core.js"></script>

<script>


if(top.indexAttr&&top.indexAttr.top){
	var browser = navigator.userAgent;
	if(browser.indexOf("Chrome")!= -1 || browser.indexOf("Firefox") != -1){
		top.window.location ="<%=context%>/login.jsp";
	}
	else{
		top.window.location = "<%=context%>/login.jsp";
	}
}

	$(document).ready(function() {
		var user = tcCore.getCookie("user");
		var password = tcCore.getCookie("password");
		if(user){
			$("#username").val(user);
		}
		if(password){
			$("#password").val(password);
		}
		var a = tcCore.getParameter("validatefaild");
		if (a == 1) {
			alert("用户名或者密码错误");
		}

		$("#loginCheck").click(function() {
			if (!$(this).hasClass("login_check_checked")) {
				$(this).addClass("login_check_checked");
			} else {
				$(this).removeClass("login_check_checked");
			}
		});
		
		$("#loginCheck")
	});
</script>
</head>
<body>
	<div class='login_header'>
		<div class='center_div'>
			<img class='welcome_login' src='css/images/welcome_login.png'>
		</div>
	</div>
	<div class='login_body'>
		<div class='center_div'>
			<img class='earth' src='css/images/earth_merge.png'>
			<form autocomplete="off" class='login_form' method="post"
				action="<%=context%>/login">
				<p></p>
				<p style='margin-top: 95px;'>
					<input
						style='padding-left: 10px; width: 245px; height: 35px; background-color: #FFF; border-width: 0px;'
						id="username" name="username" required="required" type="text"
						placeholder="手机号" />
				</p>
				<p>
					<input
						style='padding-left: 10px; margin-top: 5px; width: 245px; height: 35px; background-color: #FFF; border-width: 0px;'
						id="password" name="pwd" required="required" type="password"
						placeholder="密码" />
				</p>
				<p style='margin-top: 5px; text-align: left;'>
					<a id='loginCheck' class='login_check'>记住密码</a> 
					<!--  a
						class='login_forget_password'>忘记密码</a-->
				</p>
				<p style='margin-top: 5px; height: 45px;'>
					<input class='login_btn' type="submit" value="" />
				</p>
				<p style='margin-top: 10px;'>
					<!--  a class='login_register'></a-->
				</p>
			</form>
		</div>
	</div>
	<div class='login_footer'>
		<div class='center_div'>
			<a class='footer_link'>关于我们</a> <a class='footer_link'>服务条款</a> <a
				class='footer_link'>客服中心</a> <a class='footer_link'>联系我们</a> <a
				class='footer_link'>帮助中心</a> <a class='footer_link'>深圳医建通网络科技有限公司</a>
		</div>
	</div>


</body>
</html>