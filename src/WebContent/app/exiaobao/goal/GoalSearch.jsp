 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Goal查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/GoalSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main' data-options="region:'center',border:false">
	
	<form id="goalForm" class='search-form' method="post">
		<table cellpadding="10"  >
			<tr>
				<td>
					<table id="goalTable"   >
						       
						<tr >
						   	<td align='right' class='td-label'>年份</td>
							<td>
							<input class=" easyui-numberbox" type="text"
								id='cyear' data-ssbtype='int'
								name="cyear" data-options="height:30,width:200"></input>
								</td>
							
							<td align='right' class='td-label'>月份</td>
							<td>
						<input class=" easyui-numberbox" type="text"
						id='cmonth' data-ssbtype='int'
						name="cmonth" data-options="height:30,width:200"></input>
							
  						</tr>
						 
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryGoal()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> <a
			href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
		<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='goalGridDiv' style='width: 100%'>
		<table id='goalGrid'></table>
	</div>
	<div id="goalGridPager" />
	</div>
	</div>
</body>
</html>
