 
 
 
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

	<script src='js/DictTypeTreeEdit.js'></script>


	<div id='dictTypeFormPanel' title="DictType信息"
		style="width: 100%; font-size: 13px;">
		<form id="dictTypeForm" class='edit-form' method="post">
			<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
			<input type='hidden' id='parentId' name='parentId'> <input
				type='hidden' id='dictTypeId' name='dictTypeId'>
			<table cellspacing='20'>
				            				<tr>
					<td align='right' class='td-label'>上级 名称</td>
					<td><label id='parentName' data-ssbtype='label'></label></td>
				</tr>
				            				<tr>
					<td align='right' class='td-label'>名称</td>
					<td><input class="easyui-textbox" type="text"
						id='name' data-ssbtype='text'
						name="name" data-options="height:30,width:200,required:'required',validType:'length[1,6]'"></input></td>
				</tr>
				             				<tr>
					<td align='right' class='td-label'>编码</td>
					<td><input class="easyui-textbox" type="text"
						id='code' data-ssbtype='text'
						name="code" data-options="height:30,width:200"></input></td>
				</tr>
				             				<tr>
					<td align='right' class='td-label'>扩展字段</td>
					<td><input class="easyui-textbox" type="text"
						id='expand' data-ssbtype='text'
						name="expand" data-options="height:30,width:200"></input></td>
				</tr>
				                                                                                                     
			</table>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveDictType()'>保存</a>
	</div>
</body>
</html>
