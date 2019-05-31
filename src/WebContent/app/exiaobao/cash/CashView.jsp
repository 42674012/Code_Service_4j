 
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

	<script src='js/CashView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="cashForm" class='view-form' method="post">
				<table cellspacing='10' style="width: 100%">

					<div id='cashFormPanel' title=""
						style="width: 100%; font-size: 13px;">     
					        
					<tr>
						<td align='right' class='td-label' style="width: 140px;">提现人员姓名</td>
						<td><label id='employeeName' data-ssbtype='text'
							name="employeeName"></label></td>
					</tr>
					        
					<tr>
						<td align='right' class='td-label'>提现人员手机号</td>
						<td><label id='phone' data-ssbtype='text'
							name="phone"></label></td>
					</tr>
					        
					<tr>
						<td align='right' class='td-label'>提现账户</td>
						<td><label id='bankAccount' data-ssbtype='text'
							name="bankAccount"></label></td>
					</tr>
					
					 <tr>
						<td align='right' class='td-label'>结账金额</td>
						<td><label id='tmoney' data-ssbtype='text'
							name="tmoney"></label></td>
					</tr>       
						      
					<tr>
						<td align='right' class='td-label'>提现时间</td>
						<td><label id='createdate' data-ssbtype='date'
							name="createdate"></label></td>
					</tr>
					     
					<tr>
						<td align='right' class='td-label'>结款人</td>
						<td><label id='paymenter' data-ssbtype='text'
							name="paymenter"></label></td>
					</tr>
					        
						   					<tr>
						<td align='right' class='td-label'>所属医院</td>
						<td><label id='orgname' data-ssbtype='text'
							name="orgname"></label></td>
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
