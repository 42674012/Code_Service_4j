 
 
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

	<script src='js/EmpowerTreeEdit.js'></script>


	<div id='empowerFormPanel' title="Empower信息"
		style="width: 100%; font-size: 13px;">
		<form id="empowerForm" class='edit-form' method="post">
			<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
			<input type='hidden' id='parentId' name='parentId'> <input
				type='hidden' id='empowerId' name='empowerId'>
			<table cellspacing='10'>
				          				<tr>
					<td align='right' class='td-label'>权限id</td>
					<td><input class=" easyui-numberbox" type="text"
						id='empowerId' data-ssbtype='int'
						name="empowerId" data-options="height:30,width:200"></input></td>
				</tr>
              				<tr>
					<td align='right' class='td-label'>群组id-autocomplete</td>
					<td><input class=" easyui-numberbox" type="text"
						id='groupId' data-ssbtype='int'
						name="groupId" data-options="height:30,width:200"></input></td>
				</tr>
              				<tr>
					<td align='right' class='td-label'>functionId</td>
					<td><input class=" easyui-numberbox" type="text"
						id='functionId' data-ssbtype='int'
						name="functionId" data-options="height:30,width:200"></input></td>
				</tr>
          				<tr>
					<td align='right' class='td-label'>uri</td>
					<td><input class="easyui-textbox" type="text"
						id='uri' data-ssbtype='text'
						name="uri" data-options="height:30,width:200"></input></td>
				</tr>
				              				<tr>
					<td align='right' class='td-label'>identifyName</td>
					<td><input class="easyui-textbox" type="text"
						id='identifyName' data-ssbtype='text'
						name="identifyName" data-options="height:30,width:200"></input></td>
				</tr>
				                				<tr>
					<td align='right' class='td-label'>operationId</td>
					<td><input class=" easyui-numberbox" type="text"
						id='operationId' data-ssbtype='int'
						name="operationId" data-options="height:30,width:200"></input></td>
				</tr>
            				<tr>
					<td align='right' class='td-label'>类型-combobox</td>
					<td><input class=" easyui-numberbox" type="text"
						id='type' data-ssbtype='int'
						name="type" data-options="height:30,width:200"></input></td>
				</tr>
                                                                              
			</table>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveEmpower()'>保存</a>
	</div>
</body>
</html>
