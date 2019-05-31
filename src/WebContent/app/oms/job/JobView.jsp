 
 
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

	<script src='js/JobView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="jobForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='jobFormPanel' title="职务信息"
						style="width: 100%; font-size: 13px;">     
					<tr>
						<td align='right' class='td-label'>名称</td>
						<td><label id='jobName' data-ssbtype='text'
							name="jobName"></label></td>
					</tr>
					        
					<tr>
						<td align='right' class='td-label'>部门</td>
						<td><!-- <input id='orgId' type='hidden' data-ssbtype='autocomplete' name='orgId' />  -->
							<label id='orgIdShow' data-ssbtype='text' name='orgIdShow'></input>
						</td>
					</tr>	             
						      
					<!-- <tr>
						<td align='right' class='td-label'>职务类型-combobox</td>
						<td><label id='jobType' data-ssbtype='int'
							name="jobType"></label></td>
					</tr> -->
					       
						        
					<!-- <tr>
						<td align='right' class='td-label'>创建时间</td>
						<td><label id='createDate' data-ssbtype='date'
							name="createDate"></label></td>
					</tr>
					     
						     					<tr>
						<td align='right' class='td-label'>创建人</td>
						<td><label id='createBy' data-ssbtype='text'
							name="createBy"></label></td>
					</tr> -->
					        
						          
					<tr>
						<td align='right' class='td-label'>更新时间</td>
						<td><label id='lastUpdateDate' data-ssbtype='date'
							name="lastUpdateDate"></label></td>
					</tr>
					     
					<tr>
						<td align='right' class='td-label'>更新人</td>
						<td><label id='lastUpdateBy' data-ssbtype='text'
							name="lastUpdateBy"></label></td>
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
