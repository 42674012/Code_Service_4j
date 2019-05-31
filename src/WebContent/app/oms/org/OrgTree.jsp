<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.xt.ssb.util.Constants"%>
<%
	String context = request.getContextPath();
	String uphone=request.getSession().getAttribute(Constants.session_employee_phone)+"";
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">

<title></title>
<meta name="keywords" content="index">
<script type="text/javascript">
var uphone=<%=uphone%>;
</script>
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>
	<script src='<%=context%>/js/easyui/plugin/treegrid-dnd.js'></script>
	<script src='js/OrgTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id='west' data-options="region:'west',border:false"
			style="width: 300px; padding: 5px;">

			<ul id="orgTree">
			</ul>

		</div>
		<div id='center' data-options="region:'center',border:false" style="padding: 5px;">
			<div id='orgFormPanel' class='easyui-panel' title="机构信息"
				style="width: 100%; font-size: 13px;"
				data-options="iconCls:'icon-form-edit',region:'north'">
				<form id="orgForm" class='edit-form' method="post">
					<input type='hidden' id='orgId' name='orgId'>
					<table cellspacing='8'>
						<tr>
							<td align='right' class='td-label'>医院名称:</td>
							<td><label type="text" id='name' name="name"
								data-options="height:30,width:200"></label></td>
								
							<td align='right' class='td-label'>电话号: </td>
							<td><label type="text" id='phone' name="phone"
								data-options="height:30,width:200"></label></td>
							
						</tr>
						<tr>
							<td align='right' class='td-label'>公&nbsp;众&nbsp;号:</td>
							<td><label id='wxaccount' name="wxaccount" type="text"
								data-options="height:30,width:200"></label></td>
							
							<td align='right' class='td-label'>地&nbsp;&nbsp;址:</td>
							<td><label id='address' name="address" type="text"
								data-options="height:30,width:200"></label></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>医院简介:</td>
							<td colspan="3">
								<label id='introduction' name="introduction" type="text"
								data-options=""></label>
							</td>
						</tr>
						<tr>
							<td align='right' class='td-label'>医院图片</td>
							<td colspan="3">
								<div id='orgimg'>
							
								</div>		
							</td>	
						</tr>
				  		<tr>
					  		<td colspan="4">
						  		<div class='edit-form-btn' style='text-align:center;'>
									<a id='deleteBtn' class="easyui-linkbutton oper"
									data-options="iconCls:'icon-form-ok'" onclick='editOrg()'>编辑</a>
									
									<a href="#" class="easyui-linkbutton oper" style='margin-left:30px;'
										data-options="iconCls:'icon-form-search-btn'"
										onclick='queryOrg()'>查看</a>
								</div>
					  		</td>
						</tr>
					</table>
				</form>
			</div>
			<!-- 
			<div id='employeeGridDiv' style='width: 100%;'>
				<table id='employeeGrid'></table>
			</div>
			<div id="employeeGridPager" /></div>
			 -->
	</div>

</body>
</html>
