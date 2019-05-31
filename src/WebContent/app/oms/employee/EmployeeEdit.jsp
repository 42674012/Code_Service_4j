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
	<script type="text/javascript" src='js/EmployeeEdit.js'></script>
	<script type="text/javascript" src='../../../js/formCheck.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">


			<div id='employeeFormPanel' title="会员信息"
				style="width: 100%; font-size: 13px;">
				<form id="employeeForm" class='edit-form' method="post">
					<table cellspacing='10'>
						<tr>
							<td align='right' class='td-label'><font color='red'>*</font>姓名</td>
							<td><input id='name' class="easyui-textbox" type="text"
								data-ssbtype='text' name="name"
								data-options="required:'required',height:30,width:300" /></td>
						</tr>
						<tr>
							<td align='right' class='td-label'><font color='red'>*</font>手机</td>
							<td><input class="easyui-textbox" type="text" id='phone'
								data-ssbtype='text' name="phone"
								data-options="height:30,width:300,required:'required'"></input></td>
								<td style="width: 150px;"><div id="show_msg" style="color:red;display: none"></div></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>身份证号</td>
							<td><input class="easyui-textbox" type="text" id='cardId'
								data-ssbtype='text' name="cardId"
								data-options="height:30,width:300,validType:'idcard'"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>性别</td>
							<td><input type='hidden' id='sex' data-ssbtype='radio'>
								<input type='radio' name='sex' checked='true' value='1'>男 
								<input type='radio' name='sex'  value='0'>女
							</td>
						</tr>
						<tr>
							<td align='right' class='td-label'>银行账户</td>
							<td><input class="easyui-numberbox" type="text" id='bankAccount'
								data-ssbtype='text' name="bankAccount"
								data-options="height:30,width:300"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>生日</td>
							<td><input class="easyui-datebox" type="text" id='birthday'
								data-ssbtype='date' name="birthday"
								data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>邮箱</td>
							<td><input class="easyui-textbox" type="text" id='email'
								data-ssbtype='text' name="email"
								data-options="height:30,width:300,validType:'email'"></input></td>
						</tr>
						<tr >
							<td align='right' class='td-label'>密码</td>
							<td><input style='display:none' type="password" 
								type="text" title='初始密码123456' id='password'
								name="password" value='123456'
								data-options="height:30,width:200,required:'required'"></input>
								<a class='passwordNew'>初始密码123456</a>
								<a class='passwordEdit' style='color:blue;cursor:pointer;' id='initPasswordBtn' onclick='updatePasswordDefault()'>恢复初始密码</a>
							</td>
						</tr>

						<tr>
							<td align='right' class='td-label'></td>
							<td></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
		<div data-options="region:'south',split:true,border:false"
			style="height: 40px;">
			<div class='edit-form-btn' style='float: right; margin-right: 5px;'>

				<a id='cancelBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
					id='deleteBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-dustbin'"
					onclick='deleteEmployee()'>删除</a> <a id='addBtn'
					class="easyui-linkbutton oper"
					style='margin-left: 10px; margin-right: 10px;'
					data-options="iconCls:'icon-form-ok'" onclick='saveEmployee()'>保存</a>
			</div>
		</div>
	</div>

</body>
</html>
