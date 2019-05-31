


<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	String jobroleId =request.getParameter("jobId");
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>KpiGoal查询</title>
<meta name="keywords" content="index">
<style>
.datagrid-header {
	height: 15px;
}

.datagrid-header-row {
	height: 15px;
}


</style>
</head>
<script>
	var jobroleId = '<%=jobroleId%>';
</script>
<body>
	<%@ include file="../../includeScript.jsp"%>
	<link href="<%=context %>/app/ejanton/kpigoal/css/KpiGoalShow.css" rel="stylesheet"
		type="text/css" />
	<script src='js/KpiGoalShow.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main'
			data-options="region:'center',border:false">
			<div id='operbtn' class='operbtn'>
			
				<a style="font-size: 18px;color:blue;margin-right: 5px; cursor:pointer;" onclick="subMonth()"><</a>
										<input id='month' name='month' value="" class='normal-input' style="text-align: center;" readonly="readonly" data-options="editable:false"/>
										
										<a style="font-size: 18px;color:blue;margin-left: 5px; cursor:pointer;" onclick="addMonth()">></a>
										<span class="td-label" style="margin-left: 20px;">职务</span><input class="easyui-combobox" id="jobId" name="jobId"  style="width:200px;height: 30px;"/>
										<a href="#" class="easyui-linkbutton" onclick="editData()">编辑</a>
				<a href="#" class="easyui-linkbutton" onclick="saveData()">保存</a>
				<!-- <a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除data-options="textField:'jobroleName',valueField:'code',panelHeight:80,editable:false"</a>
				<a href="#" class="easyui-linkbutton" onclick="print()">打印</a> -->
				<div style="width:80%;text-align:center;display: inline-block;position: absolute;">
					<td></td>
				</div>
			</div>
			<div id='kpiGoalGridDiv' style='width: 100%'>
				<table id='kpiGoalGrid'></table>
			</div>
			<!-- <div id="kpiGoalGridPager" /> -->
		</div>
	</div>
</body>
</html>
