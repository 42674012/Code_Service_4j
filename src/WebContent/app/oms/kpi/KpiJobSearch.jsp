
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>KpiResult查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/KpiJobSearch.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main'
			data-options="region:'center',border:false">
			<table id='kpiJobGrid'></table>
		</div>
	</div>
</body>
</html>
