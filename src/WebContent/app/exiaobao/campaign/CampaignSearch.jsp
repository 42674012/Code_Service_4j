 <%@page import="com.xt.ssb.util.Constants"%>
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	String uphone=request.getSession().getAttribute(Constants.session_employee_phone)+"";
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Campaign查询</title>
<meta name="keywords" content="index">
<script type="text/javascript">
var uphone=<%=uphone%>;
</script>
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/CampaignSearch.js'></script>
	<div class="easyui-layout" data-options="fit:true">
	<div id='center' class='search_main' data-options="region:'center',border:false">
	<form id="campaignForm" class='search-form' method="post">
		<table cellpadding="10"  >
			<tr>
				<td>
					<table id="campaignTable"  >
						<tr >
							<td align='right' class='td-label'>活动相关</td>
							<td><input class="easyui-textbox" type="text"
								id="subject"  name="subject" data-options="height:30"></input></td>
							
							<td align='right' class='td-label'>活动时间</td>
							<td><input type="hidden" id='begintime' value='1'
								data-ssbtype='dateRange' name="begintime"></input> <input
								class="easyui-datebox" type="text" id='begintimeStart'
								data-ssbtype='date'
								data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
								- <input class="easyui-datebox" type="text"
								id='begintimeEnd' data-ssbtype='date'
								data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
							</td>  						 
						</tr>
						 
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryCampaign()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> <a
			href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
		<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='campaignGridDiv' style='width: 100%'>
		<table id='campaignGrid'></table>
	</div>
	<div id="campaignGridPager" />
	</div>
	</div>
</body>
</html>
