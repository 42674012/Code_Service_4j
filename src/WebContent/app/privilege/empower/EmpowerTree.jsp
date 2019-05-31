


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
	<script src='<%=context%>/js/easyui/plugin/treegrid-dnd.js'></script>
	<script src='js/EmpowerTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<form id="empowerForm" class='edit-form' method="post">
			<div data-options="region:'north',border:false"
				style="width: 100%; padding: 5px; height: 50px;">
				<table>
					<tr style="padding-left: 20px;">
						<td align='right' class='td-label'>群组或个人</td>
						<td><input type="text" id='groupId'
							data-ssbtype='autocomplete' name="groupId" style="display: none" />
							<input class="normal-input" id="groupIdShow"
							style="width: 200px;" /></td>
						<td>
							<div class='edit-form-btn' style='text-align: left;'>
								<a id='addBtn' class="easyui-linkbutton oper"
									style='margin-left: 10px; margin-right: 10px;'
									data-options="iconCls:'icon-form-ok'" onclick='saveEmpower()'>授权</a>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div id='center' data-options="region:'center',border:false">
				<ul id="empowerTree"></ul>
			</div>

		</form>
	</div>
</body>
</html>
