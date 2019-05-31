 
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

	<script src='js/CashEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="cashForm" class='edit-form' method="post">
		<div id='cashFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="" style="width: 100%; font-size: 13px;">
			<table cellspacing='10'> 
				<tr>
					<td align='right' class='td-label'><font color=red>*</font>提现人员</td>
					<td><input class="easyui-combobox" type="text" id="employeeId"
								name="employeeId" data-options="required:true,height:30,width:200,valueField:'employeeId',textField:'employeeName',onSelect:function(rec){empClick(rec)}"></td>
				</tr>          				
				<tr>
					<td align='right' class='td-label'><font color=red>*</font>提现账户</td>
					<td><input class="easyui-textbox" type="text"
						id='bankAccount' data-ssbtype='text'
						name="bankAccount" data-options="height:30,width:200,required:true,"></input></td>
				</tr>
				<tr>
					<td align='right' class='td-label'><font color=red>*</font>结款金额</td>
					<td><input class="easyui-numberbox" type="text"
						id='tmoney' data-ssbtype='text'
						name="tmoney" data-options="height:30,width:200,precision:2,required:true,"></input>￥</td>
				</tr>             				
				<tr>
					<td align='right' class='td-label'>提现时间</td>
					<td><input class="easyui-datebox" type="text"
						id='createdate' data-ssbtype='date'
						name="createdate"
						data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
				</tr>
				<tr>
					<td align='right' class='td-label'></td>
					<td></td>
				</tr>
			</table>
		</div>
	</form>
</div>

		<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-dustbin'"
			onclick='deleteCash()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveCash()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
