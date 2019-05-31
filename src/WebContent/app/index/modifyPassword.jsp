<%@page import="com.xt.ssb.util.Constants"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	Long employeeId =Long.parseLong(request.getSession().getAttribute(Constants.session_employee_id).toString());
	
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title></title>
<meta name="keywords" content="index">
<script>
	var employeeId = '<%=employeeId%>';
</script>
</head>

<body>
	<%@ include file="../includeScript.jsp"%>
	<script src='<%=context %>/app/index/js/modifyPassword.js'></script>
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">


			<div id='employeeFormPanel' title="信息"
				style="width: 100%; font-size: 13px;">
				<form id="employeeForm" class='edit-form' method="post">
					<table cellspacing='10'>
						<tr style="display: none">
							<td>
								<input name="employeeId" type="text"/>
							</td>
						</tr>
						<tr>
							<td align='right' class='td-label'><font color='red'>*</font>原始密码</td>
							<td><input id='oldPassword' class="easyui-textbox" type="password" 
								data-ssbtype='text' name="oldPassword"
								data-options="required:'required',height:30,width:200" /></td>
								<td><div id="show_msg" style="color: red; display: none">原密码输入错误!</div></td>
						</tr>
						<tr>
							<td align='right' class='td-label'><font color='red'>*</font>新密码</td>
							<td><input class="easyui-textbox" type="password"  id='nowPassword'
								data-ssbtype='text' name="nowPassword"
								data-options="height:30,width:200,required:'required'"></input>
							</td><td><div id="show_msg1" style="color: red; display: none">新密码不能为空!</div></td>
						</tr>
						<tr>
							<td align='right' class='td-label'><font color='red'>*</font>确认密码</td>
							<td><input type="password" class="easyui-textbox"
								type="text" title='初始密码123456' id='password' data-ssbtype='text'
								name="password"  
								data-options="height:30,width:200,required:'required'"></input>
							</td><td><div id="show_msg2" style="color: red; display: none">两次密码不一样!</div></td>
						</tr>

					</table>
				</form>
			</div>
		</div>
		<div data-options="region:'south',split:true,border:false"
			style="height: 40px;">
			<div class='edit-form-btn' style='float: right; margin-right: 5px;'>

				<a id='cancelBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a>
				<a id='addBtn' class="easyui-linkbutton oper"
					style='margin-left: 10px; margin-right: 10px;'
					data-options="iconCls:'icon-form-ok'" onclick='saveEmployee()'>保存</a>
			</div>
		</div>
	</div>

</body>
</html>
