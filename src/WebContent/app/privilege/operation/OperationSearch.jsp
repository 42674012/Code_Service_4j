 
 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Operation查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/OperationSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">
	
	<form id="operationForm" class='search-form' method="post">
		<table cellpadding="10" style='width:100%;'>
			<tr>
				<td>
					<table id="operationTable" style='width:100%;' >
						       
						<tr >
						     
							
								<td align='right' class='td-label'>资源id</td>
							<td>
						<input class=" easyui-numberbox" type="text"
						id='functionId' data-ssbtype='int'
						name="functionId" data-options="height:30,width:200"></input>
								</td>
       
						   
							
							<td align='right' class='td-label'>名称</td>
							<td><input class="easyui-textbox" type="text"
								id="name"  name="name" data-options="height:30"></input></td>
       
						   
							
							<td align='right' class='td-label'>类型-combobox</td>
							<td>
								<input id='type'
								class="easyui-combobox"
								name="type"
								data-ssbtype='combobox'
								data-options="height:30,width:200,valueField:'dictValue',textField:'dictName',panelHeight:100">
								</td>
								</td>
  						</tr>
						 
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a class='moreBtn' id='moreConditionBtn'>更多↓</a>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryOperation()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'
		style='margin-top: 15px; margin-bottom: 15px;'>
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> <a
			href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
		<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='operationGridDiv' style='width: 100%'>
		<table id='operationGrid'></table>
	</div>
	<div id="operationGridPager" />
	</div>
	</div>
</body>
</html>
