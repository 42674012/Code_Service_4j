 
 
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

	<script src='js/FunctionTreeEdit.js'></script>


	<div id='functionFormPanel' title="资源信息"
		style="width: 100%; font-size: 13px;">
		<form id="functionForm" class='edit-form' method="post">
			<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
			<input type='hidden' id='parentId' name='parentId'> <input
				type='hidden' id='functionId' name='functionId'>
			<table cellspacing='10'>		            
				<tr>
					<td align='right' class='td-label'>上级 名称</td>
					<td><label id='parentName' data-ssbtype='label'></label></td>
				</tr>
				<tr>
					<td align='right' class='td-label'>描述</td>
					<td><input class="easyui-textbox" type="text"
						id='remark' data-ssbtype='text'
						name="remark" data-options="height:30,width:200,required:'required',validType:'length[1,6]'"></input></td>
				</tr>
				<tr>
					<td align='right' class='td-label'>URI</td>
					<td><input class="easyui-textbox" type="text"
						id='uri' data-ssbtype='text'
						name="uri" data-options="height:30,width:200"></input></td>
						<td id="show_msg" style="display: none"><span style="color:red">该资源已存在</span></td>
				</tr>
				              				<tr>
					<td align='right' class='td-label'>类型</td>
					<td><input class="easyui-combobox" type="text"
						id='functionType' data-ssbtype='combobox'
						name="functionType" data-options="height:30,width:200,valueField:'dictValue',textField:'dictName',panelHeight:100,editable:false"></input></td>
				</tr>
                                                                              
			</table>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveFunction()'>保存</a>
	</div>
</body>
</html>
