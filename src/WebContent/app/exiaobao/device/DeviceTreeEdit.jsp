 
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

	<script src='js/DeviceTreeEdit.js'></script>


	<div id='deviceFormPanel' title="Device信息"
		style="width: 100%; font-size: 13px;">
		<form id="deviceForm" class='edit-form' method="post">
			<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
			<input type='hidden' id='parentId' name='parentId'> <input
				type='hidden' id='deviceid' name='deviceid'>
			<table cellspacing='10'>
				         				<tr>
					<td align='right' class='td-label'>百度userid</td>
					<td><input class="easyui-textbox" type="text"
						id='userid' data-ssbtype='text'
						name="userid" data-options="height:30,width:200"></input></td>
				</tr>
				            				<tr>
					<td align='right' class='td-label'>百度通道id</td>
					<td><input class="easyui-textbox" type="text"
						id='channelid' data-ssbtype='text'
						name="channelid" data-options="height:30,width:200"></input></td>
				</tr>
				               				<tr>
					<td align='right' class='td-label'>创建时间</td>
					<td><input class="easyui-datebox" type="text"
						id='createdate' data-ssbtype='date'
						name="createdate"
						data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
				</tr>
				                       				<tr>
					<td align='right' class='td-label'>用户编号</td>
					<td><input class="easyui-textbox" type="text"
						id='employeeId' data-ssbtype='text'
						name="employeeId" data-options="height:30,width:200"></input></td>
				</tr>
				      
			</table>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveDevice()'>保存</a>
	</div>
</body>
</html>
