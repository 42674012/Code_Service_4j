


<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	Long jobroleId =Long.parseLong(request.getParameter("jobroleId"));
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>KpiGoal查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>
	<script type="text/javascript">
		var jobroleId = '<%=jobroleId%>';
	</script>
	<script src='js/KpiGoalSearch.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main'
			data-options="region:'center',border:false">
			<form id="kpiGoalForm" class='search-form' method="post">
				<table cellpadding="10">
					<tr>
						<td>
							<table id="kpiGoalTable">
								<tr>
									<td align='right' class='td-label'>姓名</td>
									<td><input id='kpiObjId' type='hidden'
										data-ssbtype='autocomplete' name='kpiObjId' /> <input
										id='kpiObjIdShow' class='normal-input' style='width: 200px;'></input></td>

									</td>
									<td align='right' class='td-label'>月份</td>
									<td><input id='month' name='month' value="" class='normal-input'/></td>
								</tr>
							</table>
						</td>
						<td align='left' style='width: 180px;'><a href="#"
							class="easyui-linkbutton search" style='margin-left: 10px;'
							data-options="iconCls:'icon-form-search-btn'"
							onclick='queryKpiGoal()'>查询</a></td>
					</tr>
				</table>
			</form>

			<div id='operbtn' class='operbtn'>
				<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> <a
					href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
				<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
				<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
			</div>
			<div id='kpiGoalGridDiv' style='width: 100%'>
				<table id='kpiGoalGrid'></table>
			</div>
			<div id="kpiGoalGridPager" />
		</div>
	</div>
</body>
</html>
