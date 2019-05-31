 
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

	<script src='js/DeviceView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="deviceForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='deviceFormPanel' title="Device信息"
						style="width: 100%; font-size: 13px;">     
						   					<tr>
						<td align='right' class='td-label'>百度userid</td>
						<td><label id='userid' data-ssbtype='text'
							name="userid"></label></td>
					</tr>
					        
						   					<tr>
						<td align='right' class='td-label'>百度通道id</td>
						<td><label id='channelid' data-ssbtype='text'
							name="channelid"></label></td>
					</tr>
					        
						      
					<tr>
						<td align='right' class='td-label'>创建时间</td>
						<td><label id='createdate' data-ssbtype='date'
							name="createdate"></label></td>
					</tr>
					     
						           
						     					<tr>
						<td align='right' class='td-label'>用户编号</td>
						<td><label id='employeeId' data-ssbtype='text'
							name="employeeId"></label></td>
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
