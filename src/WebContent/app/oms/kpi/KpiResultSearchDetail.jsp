
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

	<script src='js/KpiResultSearchDetail.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main'
			data-options="region:'center',border:false">
			<div id='kpiResultGridDiv' style='width: 100%'>
				<table id='kpiResultGrid'></table>
			</div>
			<div id="kpiResultGridPager" />
		</div>
		<div class='edit_south'
			data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right; margin-right: 5px;'>
				<a id='cancelBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> 
			</div>
		</div>
	</div>
</body>
</html>
