 
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

	<script src='js/TicklingView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="ticklingForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='ticklingFormPanel' title="Tickling信息"
						style="width: 100%; font-size: 13px;">     
						   					<tr>
						<td align='right' class='td-label'>反馈内容</td>
						<td><label id='ticklingtxt' data-ssbtype='text'
							name="ticklingtxt"></label></td>
					</tr>
					        
						     					<tr>
						<td align='right' class='td-label'>反馈人id</td>
						<td><label id='employeeId' data-ssbtype='text'
							name="employeeId"></label></td>
					</tr>
					        
						     					<tr>
						<td align='right' class='td-label'>反馈人名称</td>
						<td><label id='employeeName' data-ssbtype='text'
							name="employeeName"></label></td>
					</tr>
					        
						      
					<tr>
						<td align='right' class='td-label'>反馈时间</td>
						<td><label id='createdate' data-ssbtype='date'
							name="createdate"></label></td>
					</tr>
					     
						   					<tr>
						<td align='right' class='td-label'>回复人id</td>
						<td><label id='replyer' data-ssbtype='text'
							name="replyer"></label></td>
					</tr>
					        
						   					<tr>
						<td align='right' class='td-label'>回复人名称</td>
						<td><label id='replyerid' data-ssbtype='text'
							name="replyerid"></label></td>
					</tr>
					        
						      
					<tr>
						<td align='right' class='td-label'>回复时间</td>
						<td><label id='replydate' data-ssbtype='date'
							name="replydate"></label></td>
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
