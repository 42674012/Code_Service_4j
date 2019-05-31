<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Ejanton医疗CRM系统</title>

<%
	String context = request.getContextPath();
%>
<link rel="shortcut icon" href="css/images/favicon.ico" />
<link rel="stylesheet" type="text/css" href="css/demo.css" />
<link rel="stylesheet" type="text/css" href="css/login.css" />


<script src="<%=context%>/js/easyui/jquery.min.js"></script>
<script>
if(window.parent){
	top.location.herf = "<%=context%>/login.jsp";
}
</script>
</head>
<body>
	您尚未有关联的医院，请联系管理员进行处理
</body>
</html>