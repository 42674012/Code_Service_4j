 
 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/OperationView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="operationForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='operationFormPanel' title="Operation信息"
						style="width: 100%; font-size: 13px;">     
						             
						   					<tr>
						<td align='right' class='td-label'>名称</td>
						<td><label id='name' data-ssbtype='text'
							name="name"></label></td>
					</tr>
					        
						    
					<tr>
						<td align='right' class='td-label'>类型-combobox</td>
						<td><label id='type' data-ssbtype='int'
							name="type"></label></td>
					</tr>
					     
				</table>
		</div>
		</form>

		<div data-options="region:'south',split:true,border:false"
			style="height: 40px;">
			<div class='edit-form-btn' style='float: right; margin-right: 5px;'>
				<a class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>关闭</a>
			</div>
		</div>
	</div>
</body>
</html>
