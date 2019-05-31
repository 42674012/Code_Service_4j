 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Cash查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/CashSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main' data-options="region:'center',border:false">
	
	<form id="cashForm" class='search-form' method="post">
		<table cellpadding="10" >
			<tr>
				<td>
					<table id="cashTable" >
						       
						<tr >
							<td align='right' class='td-label'>人员姓名</td>
							<td><input class="easyui-textbox" type="text"
								id="employeeName"  name="employeeName" data-options="height:30"></input>
								
							</td>
							<td align='right' class='td-label'>&nbsp;</td>
							<td align='right' class='td-label' style="width:90px;">人员手机号</td>
							<td><input class="easyui-textbox" type="text"
								id="phone"  name="phone" data-options="height:30"></input></td>
  						</tr>
  						
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryCash()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> 
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='cashGridDiv' style='width: 100%'>
		<table id='cashGrid'></table>
	</div>
	<div id="cashGridPager" />
	</div>
	</div>
</body>
</html>
