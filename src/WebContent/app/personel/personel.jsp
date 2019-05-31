<%@page import="bsh.StringUtil"%>
<%@page import="com.xt.ssb.web.SessiontimeoutFilter"%>
<%@page import="com.xt.oms.employee.bussiness.EmployeeJobDS"%>
<%@page import="com.xt.oms.employee.model.Employee"%>
<%@page import="com.xt.oms.employee.model.EmployeeJob"%>

<%@page import="com.xt.ssb.dict.bussiness.DictDS"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="com.xt.ssb.dict.facade.DictDomain"%>

<%@page import="org.springframework.context.ApplicationContext"%>
<%@page
	import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="javax.annotation.Resource"%>
<%@page import="com.xt.ssb.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>个人中心</title>
<meta name="keywords" content="index">

<style type="text/css">
table {
	font-size: 13px;
}

.no_goal {
	padding: 15px 15px;
}

.no-top-border {
	
}

a:link,a:visited {
	color: #30a7e7;
	font-size: 13px;
	text-decoration
	none;
}

</style>
</head>

<body>
	<%@ include file="../includeScript.jsp"%>

	<script src='<%=context%>/app/personel/js/personel.js'></script>
	<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',iconCls:'icon-ok,title:false'"
			style='border-top-width: 0px; padding: 10px 10px;'>
			<div id="p" class="easyui-panel" title="我的信息"
				data-options="border:false" style="width: 100%; padding: 10px;">
				<img src='style/images/male.png' style='float: left; width: 80px;'>
				<table cellpadding="2" style='display: inline-block; float: left;'>
					<tr>
						<td align='right'>姓名</td>
						<td><label id='name' data-ssbtype='text' name="name"></label></td>
						<td style='width: 100px;' align='right'><a
							onclick='onShowUpdatePWD()'
							style='cursor: pointer; color: #30a7e7;'>修改密码</a></td>
					</tr>

					<tr>
						<td align='right'>电话</td>
						<td><label id='phone' data-ssbtype='text' name="phone"></label></td>
						<td style='width: 100px;' align='right'><!--  a
							style='cursor: pointer; color: #30a7e7;'>修改手机</a--></td>
					</tr>
					<tr>
						<td align='right'>部门</td>
						<td><label id='deptIdShow' data-ssbtype='text'
							name="deptIdShow"></label></td>
						<td></td>
					</tr>
					<tr>
						<td align='right'>职务</td>
						<td><label id='jobName' data-ssbtype='text' name="jobName"></label></td>
						<td></td>
					</tr>
				</table>

				
			</div>
			<!-- 
			<div id='myGoalPanel' data-options="border:false"
				style="width: 100%; padding: 10px;">
				<div style='float: left' id='mygoal'></div>
			</div>
			 -->
			<div id='teamPanel' data-options="border:false"
				style="width: 100%; height: 600px; padding: 10px;">
				<div class="easyui-layout" data-options="border:false,fit:true">
					<div id='west' data-options="region:'west'" style="width: 250px;">
						<div id='jobTree'></div>
					</div>
					<div data-options="region:'center',border:false"
						style='padding-left: 5px;'>
						<div id='teamPanelGrid'></div>

					</div>

				</div>
			</div>




		</div>
	</div>
	</div>
	<div id="triangle-left"></div>
</body>
</html>
