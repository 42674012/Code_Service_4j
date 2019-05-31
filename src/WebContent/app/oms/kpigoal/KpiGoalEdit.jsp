 
 
 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title></title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/KpiGoalEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="kpiGoalForm" class='edit-form' method="post">
			<table cellspacing='10'>            
              	<tr>
					<td align='right' class='td-label'>姓名</td>
					<td>
					<input id='kpiObjId' type='hidden' data-ssbtype='autocomplete' name='kpiObjId' />
								<input id='kpiObjIdShow' class='normal-input'  style='width:200px;'></input></td>
						
						</td>
				</tr>
				<tr>
					<td align='right' class='td-label'>月份</td>
						<td><input id='month' name='month' value="" class='normal-input' style='width:200px;'/>
						</td>
				</tr>
			</table>
	</form>
	<table id='kpiGoalGrid'></table>
		<!-- <a href="#" class="easyui-linkbutton" onclick="addItem()">新增指标</a> -->
</div>

		<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-dustbin'"
			onclick='deleteKpiGoal()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveKpiGoal()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
