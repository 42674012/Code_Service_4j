 
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

	<script src='js/TicklingEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="ticklingForm" class='edit-form' method="post">
		<div id='ticklingFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="" style="width: 100%; font-size: 13px;">
			<table cellspacing='10'>       				
				<tr>
					<td align='right' class='td-label'>反馈人</td>
					<td><label id="employeeName" data-ssbtype='text'
							name="employeeName"></label></td>
				</tr>
				<tr>
					<td align='right' class='td-label'>反馈内容</td>
					<td><label id="ticklingtxt" data-ssbtype='text'
							name="ticklingtxt"></label></td>
				</tr>            				        				
				<tr>
					<td align='right' class='td-label'>反馈时间</td>
					<td><label id="createdate" data-ssbtype='date'
							name="createdate"></label></td>
				</tr>
				<tr>
					<td align='right' class='td-label'>回复内容</td>
					<td>
						<input class="easyui-textbox" type="text"
						id='replytxt' data-ssbtype='text'
						name="replytxt" data-options="multiline:true,height:100,width:300"></input>
						
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

		<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-dustbin'"
			onclick='cancel()'>取消</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveTickling()'>回复</a>
		</div>
	</div>
</div>

</body>
</html>
