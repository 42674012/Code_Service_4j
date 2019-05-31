
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>KpiResult查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/KpiResultSearch.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main'
			data-options="region:'center',border:false">

			<form id="kpiResultForm" class='search-form' method="post">
				<table cellpadding="10">
					<tr>
						<td>
							<table id="kpiResultTable">

								<tr>
									<td align='right' class='td-label'>人员</td>
									<td><input id='employeeId' type='hidden'
										data-ssbtype='autocomplete' name='employeeId' /> <input
										id='employeeIdShow' class='normal-input' style='width: 200px;'></input>
									</td>

									<td align='right' class='td-label'>部门</td>
									<td><input id='orgId' type='hidden'
										data-ssbtype='autocomplete' name='orgId' /> <input
										id='orgIdShow' class='normal-input' style='width: 200px;'></input>
									</td>

									<td align='right' class='td-label'>职务</td>
									<td><input class=" easyui-numberbox" type="text"
										id='jobId' data-ssbtype='combogrid' name="jobId"
										data-options="height:30,width:200"></input></td>

								</tr>

								<tr>
									<td align='right' class='td-label'>月份</td>
									<td><input type="text" id='cmonth' data-ssbtype='month'
										name="cmonth" class='normal-input' style='width: 200px;'></input></td>
									<td align='right' class='td-label'>状态</td>

									<td colspan='3'><input type='radio' name='status' value=0
										style='width: 15px; height: 15px;' checked=checked />未发放 <input
										type='radio' name='status' value=1
										style='width: 15px; height: 15px;'>已发放</input></td>
								</tr>
							</table>
						</td>

						<td align='left' style='width: 180px;' vAlign='bottom'><a
							href="#" class="easyui-linkbutton search" style='float: left'
							data-options="iconCls:'icon-form-search-btn'"
							onclick='window.refresh()'>重置</a> <a href="#"
							class="easyui-linkbutton search"
							style='float: left; margin-left: 10px;'
							data-options="iconCls:'icon-form-search-btn'"
							onclick='queryKpiResult()'>查询</a></td>
					</tr>
				</table>
			</form>
			<div id='kpiResultGridDiv' style='width: 100%'>
				<table id='kpiResultGrid'></table>
			</div>
			<div id="kpiResultGridPager" />
		</div>
	</div>
</body>
</html>
