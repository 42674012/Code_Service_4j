
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Employee查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/EmployeeSearch.js'></script>


	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main'
			data-options="region:'center',border:false">
			<form id="employeeForm" class='search-form' method="post">
				<table cellpadding="10">
					<tr>
						<td>
							<table>
								<tr>
									<td align='right' class='td-label'>姓名</td>
									<td><input class="easyui-textbox" type="text" name="name"
										data-options="height:30"></input></td>
								</tr>
							</table>
						</td>
						<td align='left'><a href="#" class="easyui-linkbutton search" id="queryDataBtn"  
							style='margin-left: 30px;'
							data-options="iconCls:'icon-form-search-btn'"
							onclick='queryEmployee()'>查询</a></td>
					</tr>
				</table>
			</form>
			<div id='operbtn' class='operbtn'>
				<a href="#" id="addDataBtn"   class="easyui-linkbutton" onclick="addData()">新增</a>
				<a href="#" id="editDataBtn"   class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
				<a href="#" id="deleteDataBtn"   class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
				<a href="#" id="printDataBtn" 　 class="easyui-linkbutton" onclick="print()">打印</a>
			</div>
			<div id='employeeGridDiv' style='width: 100%'>
				<table id='employeeGrid'></table>
			</div>
			<div id="employeeGridPager" />
		</div>
	</div>
</body>
</html>
