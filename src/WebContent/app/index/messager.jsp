<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	//String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+context+"/";
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>提示</title>
<meta name="keywords" content="index">

<style type="text/css">
</style>
<script type="text/javascript">
	var basePath = '<%=basePath%>';
	var context = '<%=context%>';
</script>
</head>

<body>
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'center'" style='border-top-width:0px;'>
			<div id="main" class="easyui-tabs" data-options="fit:true,border:false,tabHeight:30,width:200">
				<p align="center" style="font-size: 26px;color: red;">系统提示</p>
				<p align="center" style="font-size: 16px;">您当前没有权限访问，请联系管理员！</p>
			</div>
		</div>
	</div>
<div id="triangle-left"></div>
</body>
</html>
