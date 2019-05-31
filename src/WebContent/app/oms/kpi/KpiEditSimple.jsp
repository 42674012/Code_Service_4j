

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

	<script src='js/KpiEditSimple.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="kpiForm" class='edit-form' method="post">
				<table cellspacing='10'>
					<tr>
						<td align='left' class='td-label' style='width: 60px;'>指标:</td>
						<td align='left'><input id='varId' class="easyui-combobox"
							name="varId" data-ssbtype='combobox'
							data-options="height:30,width:300,valueField:'id',textField:'varDesc',panelHeight:300">
						</td>
					</tr>
					<tr>
						<td align='left' class='td-label' style='width: 60px;'></td>
						<td align='left'><input type='checkbox' id='isKpi'/>作为考核指标</td>
					</tr>
				</table>
			</form>

			<form>
				<table id='kpiGradeGrid'></table>
			</form>

		</div>

		<div class='edit_south'
			data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right; margin-right: 5px;'>
				<a id='cancelBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
					id='deleteBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-dustbin'" onclick='deleteKpi()'>删除</a>
				<a id='addBtn' class="easyui-linkbutton oper"
					style='margin-left: 10px; margin-right: 10px;'
					data-options="iconCls:'icon-form-ok'" onclick='saveKpi()'>保存</a>
			</div>
		</div>
	</div>

</body>
</html>
