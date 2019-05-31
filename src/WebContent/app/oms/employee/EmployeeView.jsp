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

	<script src='js/EmployeeView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false,iconCls:'icon-ok'">
			<form id="employeeForm" class='view-form' method="post">
				<div id='employeeFormPanel' title="Employee信息"
					style="width: 100%; font-size: 13px;">
					<table cellspacing='20'>
						<tr>
							<td align='right' class='td-label'>姓名</td>
							<td><label id='name' data-ssbtype='text' name="name"/></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>手机</td>
							<td><label id='phone'data-ssbtype='text' name="phone" ></label></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>身份证号</td>
							<td><label id='cardId' data-ssbtype='text' name="cardId"></label></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>性别</td>
							<td><label id='sex' name="sex" data-ssbtype='text'>
							</td>
						</tr>
						<tr>
							<td align='right' class='td-label'>银行账户</td>
							<td><label id='bankAccount' data-ssbtype='text' name="bankAccount"></label></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>生日</td>
							<td><label id='birthday' data-ssbtype='text' name="birthday"></label></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>邮箱</td>
							<td><label id='email' data-ssbtype='text' name="email"></label></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>部门</td>
							<td><label id='deptIdShow' data-ssbtype="text" ></label>
								</td>
						</tr>
						<tr>
							<td align='right' class='td-label'>职务</td>
							<td>
							 	<label id="job" name="job" data-ssbtype="text"/>
							</td>
						</tr>
						<tr>
							<td align='right' class='td-label'></td>
							<td></td>
						</tr>
					</table>
				</div>
			</form>

		</div>


		<div data-options="region:'south',split:true" style="height: 32px;">
			<div class='edit-form-btn dialog-btn'>
				<a class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>关闭</a>
			</div>
		</div>
	</div>




</body>
</html>
