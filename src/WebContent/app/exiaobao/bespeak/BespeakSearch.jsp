 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bespeak查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/BespeakSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main' data-options="region:'center',border:false">
	
	<form id="bespeakForm" class='search-form' method="post">
		<table cellpadding="10"  >
			<tr>
				<td>
					<table id="bespeakTable"   >
						       
						<tr >
							<td align='right' class='td-label'>预约电话</td>
							<td><input class="easyui-textbox" type="text"
								id="phone"  name="phone" data-options="height:30"></input></td>
							
							<td align='right' class='td-label'>预约姓名</td>
							<td><input class="easyui-textbox" type="text"
								id="usrname"  name="usrname" data-options="height:30"></input></td>
								
   						</tr>
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryBespeak()'>查询</a></td>
			</tr>
		</table>
	</form>
	<div id='bespeakGridDiv' style='width: 100%'>
		<table id='bespeakGrid'></table>
	</div>
	<div id="bespeakGridPager" />
	</div>
	</div>
</body>
</html>
