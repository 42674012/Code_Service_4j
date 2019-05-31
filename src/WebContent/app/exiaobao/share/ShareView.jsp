 
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

	<script src='js/ShareView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="shareForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='shareFormPanel' title="Share信息"
						style="width: 100%; font-size: 13px;">     
						     					<tr>
						<td align='right' class='td-label'>分享人id</td>
						<td><label id='employeeId' data-ssbtype='text'
							name="employeeId"></label></td>
					</tr>
					        
						     					<tr>
						<td align='right' class='td-label'>分享人名称</td>
						<td><label id='employeeName' data-ssbtype='text'
							name="employeeName"></label></td>
					</tr>
					        
						      
					<tr>
						<td align='right' class='td-label'>分享时间</td>
						<td><label id='createdate' data-ssbtype='date'
							name="createdate"></label></td>
					</tr>
					     
						           
						   					<tr>
						<td align='right' class='td-label'>分享商品名称</td>
						<td><label id='goodsname' data-ssbtype='text'
							name="goodsname"></label></td>
					</tr>
					        
						   					<tr>
						<td align='right' class='td-label'>分享位置</td>
						<td><label id='sharesite' data-ssbtype='text'
							name="sharesite"></label></td>
					</tr>
					        
						   					<tr>
						<td align='right' class='td-label'>分享url</td>
						<td><label id='shareurl' data-ssbtype='text'
							name="shareurl"></label></td>
					</tr>
					        
						    
					<tr>
						<td align='right' class='td-label'>点击量</td>
						<td><label id='chicknum' data-ssbtype='int'
							name="chicknum"></label></td>
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
