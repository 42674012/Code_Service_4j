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

	<script src='js/menuEdit.js'></script>


	<div id='menuFormPanel' title="Menu信息"
		style="width: 100%; font-size: 13px;">
		<form id="menuForm" class='edit-form' method="post">
			<table cellspacing='20'>




				<tr>
					<td align='right' class='td-label'>名称</td>
					<td><input class="easyui-textbox" type="text" id='name'
						data-ssbtype='text' name="name" data-options="height:30,required:'required',validType:'length[1,6]'"></input></td>
				</tr>
				<tr>
					<td align='right' class='td-label'>父菜单名称</td>
					<td><label id='parentName'></label></td>
				</tr>

				<tr>
					<td align='right' class='td-label'>描述</td>
					<td><input class="easyui-textbox" type="text" id='rembo'
						data-ssbtype='text' name="rembo" data-options="height:30"></input></td>
				</tr>


				<tr>
					<td align='right' class='td-label'>地址</td>
					<td><input class="easyui-textbox" type="text" id='url'
						data-ssbtype='text' name="url" data-options="height:30"></input></td>
				</tr>
				<tr>
					<td align='right' class='td-label'>图标</td>
					<td><input class="easyui-textbox" type="text"
						id='icon' data-ssbtype='text' name="icon"
						data-options="height:30"></input></td>
				</tr>


				<tr>
					<td align='right' class='td-label'>是否显示</td>
					<td><input type='checkbox' data-ssbtype='checkbox'
						id="visiable" name="visiable" checkValue="1,0" checked='true' />
					</td>
				</tr>

			</table>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveMenu()'>保存</a>
	</div>
</body>
</html>
