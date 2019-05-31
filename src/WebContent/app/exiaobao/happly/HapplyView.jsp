 
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

	<script src='js/HapplyView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="happlyForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='happlyFormPanel' title="Happly信息"
						style="width: 100%; font-size: 13px;">     
						     					<tr>
						<td align='right' class='td-label'>申请人id</td>
						<td><label id='aemployeeId' data-ssbtype='text'
							name="aemployeeId"></label></td>
					</tr>
					        
						     					<tr>
						<td align='right' class='td-label'>申请人名称</td>
						<td><label id='aemployeeName' data-ssbtype='text'
							name="aemployeeName"></label></td>
					</tr>
					        
						           
						   					<tr>
						<td align='right' class='td-label'>医院名称</td>
						<td><label id='orgname' data-ssbtype='text'
							name="orgname"></label></td>
					</tr>
					        
						    
					<tr>
						<td align='right' class='td-label'>申请状态  1审批中  2审批通过</td>
						<td><label id='status' data-ssbtype='int'
							name="status"></label></td>
					</tr>
					       
						      
					<tr>
						<td align='right' class='td-label'>申请时间</td>
						<td><label id='createdate' data-ssbtype='date'
							name="createdate"></label></td>
					</tr>
					     
						     					<tr>
						<td align='right' class='td-label'>审批人id</td>
						<td><label id='semployeeId' data-ssbtype='text'
							name="semployeeId"></label></td>
					</tr>
					        
						     					<tr>
						<td align='right' class='td-label'>审批人名称</td>
						<td><label id='semployeeName' data-ssbtype='text'
							name="semployeeName"></label></td>
					</tr>
					        
						      
					<tr>
						<td align='right' class='td-label'>审批时间</td>
						<td><label id='passdate' data-ssbtype='date'
							name="passdate"></label></td>
					</tr>
					     
						   					<tr>
						<td align='right' class='td-label'>备注</td>
						<td><label id='remark' data-ssbtype='text'
							name="remark"></label></td>
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
