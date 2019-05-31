 
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

	<script src='js/CampaignView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="campaignForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='campaignFormPanel' title="Campaign信息"
						style="width: 100%; font-size: 13px;">     
						   					<tr>
						<td align='right' class='td-label'>活动主题</td>
						<td><label id='subject' data-ssbtype='text'
							name="subject"></label></td>
					</tr>
						      
					<tr>
						<td align='right' class='td-label'>活动开始时间</td>
						<td><label id='begintime' data-ssbtype='date'
							name="begintime"></label></td>
					</tr>
					     
						      
					<tr>
						<td align='right' class='td-label'>活动结束时间</td>
						<td><label id='endtime' data-ssbtype='date'
							name="endtime"></label></td>
					</tr>
					     
						   					<tr>
						<td align='right' class='td-label'>创建人</td>
						<td><label id='createname' data-ssbtype='text'
							name="createname"></label></td>
					</tr>
					        
						           
					<tr>
						<td align='right' class='td-label'>医院名称</td>
						<td><label id='orgname' data-ssbtype='text'
							name="orgname"></label></td>
					</tr>
					        
						      
					<tr>
						<td align='right' class='td-label'>创建时间</td>
						<td><label id='createdate' data-ssbtype='date'
							name="createdate"></label></td>
					</tr>
					
					<tr>
						<td align='right' class='td-label'>
						活动介绍:
						</td>
						<td><label id='introduce' data-ssbtype='text'
											name="introduce"></label></td>
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
