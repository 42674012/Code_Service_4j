<%@page import="bsh.StringUtil"%>
<%@page import="com.xt.ssb.web.SessiontimeoutFilter"%>
<%@page import="com.xt.oms.employee.bussiness.EmployeeJobDS"%>
<%@page import="com.xt.oms.employee.model.Employee"%>
<%@page import="com.xt.oms.employee.model.EmployeeJob"%>

<%@page import="com.xt.oms.org.model.Org" %>
<%@page import="java.util.List" %>
<%@page import="org.apache.commons.lang3.StringUtils" %>
<%@page import="com.xt.ssb.dict.facade.DictDomain" %>
 
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="javax.annotation.Resource"%>
<%@page import="com.xt.ssb.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	ApplicationContext ac1 = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getSession().getServletContext());
	EmployeeJobDS employeeJobDS = (EmployeeJobDS) ac1.getBean("employeeJobDS");
	List  orglist=(List)request.getSession().getAttribute(Constants.session_org_id);
	String context = request.getContextPath();
	String employeeName = request.getSession().getAttribute(Constants.session_employee_name).toString();
	String reporgid=request.getParameter("reporgid")==null?"":request.getParameter("reporgid")+"";
	 
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">

<style type="text/css">
</style>

</head>

<body>
	<%@ include file="../includeScript.jsp"%>
	<link href="<%=context %>/app/index/css/index.css" rel="stylesheet"
		type="text/css" />
	<script src='<%=context %>/app/index/js/index.js'></script>
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north',border:false,height:65" class='north_header'>
			<a style='background:url("<%=context%>/app/index/css/images/logo.png") 0 10px no-repeat;color:#28a5e6;padding-left:50px;display:inline-block;width:300px;height:60px;line-height:58px;font-size:20px; font-family:"黑体";margin-left:15px;'></a>
			<div style="float: right; height: 100%;font-size: 16px;">
				<% 
					if(orglist!=null&&orglist.size()==1){
						Org org	=(Org)orglist.get(0);
						String orgname=org.getName();
						String orgId=org.getOrgId()+"";
						request.getSession().setAttribute(Constants.session_now_org, org);
				%>
					<a class='navigation_label '><%=orgname %></a>
				<% 		
					}else if(orglist!=null&&orglist.size()>0){
				%>
						医院: <select id="orgselect" onchange="changOrgid(this)">
				<%	
					for(int i=0;i<orglist.size();i++){
						Org org2=(Org)orglist.get(i);
						String orgname2=org2.getName();
						String orgId2=org2.getOrgId()+"";
						if(reporgid!=null&&!"".equals(reporgid)){
							if(orgId2.equals(reporgid)){
								request.getSession().setAttribute(Constants.session_now_org, org2);
								%>
									<option value="<%=orgId2 %>" selected="selected"><%=orgname2 %></option>
								<% 
							}else{
								%>
									<option value="<%=orgId2 %>" ><%=orgname2 %></option>
								<%
							}
						}else{
							if(i==0){
								request.getSession().setAttribute(Constants.session_now_org, org2);
								%>
									<option value="<%=orgId2 %>" selected="selected"><%=orgname2 %></option>
								<% 		
							}else{
								%>
									<option value="<%=orgId2 %>" ><%=orgname2 %></option>
								<% 
							}
						}
						
					}
				%>
						</select>
				<%		
					}
				%>
				<a class='navigation_label '><%=employeeName %></a>
				<a class='navigation_label link' onclick="openPersonCenter()">个人中心</a>
				<a class='navigation_label link'>帮助</a>
				<a class='navigation_label link' onclick='loginAdminOut()'>退出</a>
			</div>
		</div>
		<div id='west' data-options="region:'west',split:false,border:false" style="width: 95px;background-color:#28a5e6;">

			<!--div id="menuAccordion" style="width: 300px; height: 200px;"></div-->
			<ul id="nav">
		    	
		    </ul>

		</div>
		<div data-options="region:'center',iconCls:'icon-ok,title:false'" style='border-top-width:0px;'>
			
			<div id="main" class="easyui-tabs"
				data-options="fit:true,border:false,tabHeight:30,tabWidth:100"></div>
		</div>
	</div>
	<div id="tabsMenu" class="easyui-menu"  style="width: 150px;">
		<div onclick="closeSelectTabs()">关闭标签页</div>
		<div onclick="closeOtherTabs()">关闭其他标签页</div>
		<div onclick="closeAllTabs()">关闭所有标签页</div>
	</div>
	
	 <div id="mainMenu"  class="easyui-menu"  style="width: 150px;">
		<div onclick="closeOtherTabs()">关闭其他标签页</div>
    </div>
	
	
<div id="triangle-left"></div>
</body>
</html>
