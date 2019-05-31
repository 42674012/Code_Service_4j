 <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title></title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>
	<script src="js/GroupSimpleEdit.js"></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id="center" data-options="region:'center',border:false" style="padding: 5px;">
			<div data-options="region:'north'">
				<div id='existGridDiv1' style='width: 100%'>
					<table id='existGrid1'></table>
				</div>
				<div id="existGridPager1" />
			</div>
			<div data-options="region:'south'">
				<div id='noExistGridDiv' style='width:100%;margin-top: 10px;'>
					<table id='noExistGrid'></table>
				</div>
				<div id="noExistGridPager" />
			</div>
		</div>
		<div data-options="region:'south',split:true,border:false" style="height:40px;">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>返回</a>
		</div>
	</div>
	</div>
</body>
</html>