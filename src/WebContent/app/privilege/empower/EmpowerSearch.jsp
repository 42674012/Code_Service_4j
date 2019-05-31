 
 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Empower查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/EmpowerSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">
	
	<form id="empowerForm" class='search-form' method="post">
		<table cellpadding="10" style='width:100%;'>
			<tr>
				<td>
					<table id="empowerTable" style='width:100%;' >
						    
						     
							
								<td align='right' class='td-label'>权限id</td>
							<td>
						<input class=" easyui-numberbox" type="text"
						id='empowerId' data-ssbtype='int'
						name="empowerId" data-options="height:30,width:200"></input>
								</td>
  						</tr>
						     
						<tr >
						     
							
								<td align='right' class='td-label'>群组id-autocomplete</td>
							<td>
								<input id='autocomplete' type='hidden' data-ssbtype='autocomplete' name='autocomplete' />
								<input id='autocompleteShow' class='normal-input'  style='width:200px;'></input></td>
				
								</td>
       
						     
							
								<td align='right' class='td-label'>functionId</td>
							<td>
						<input class=" easyui-numberbox" type="text"
						id='functionId' data-ssbtype='int'
						name="functionId" data-options="height:30,width:200"></input>
								</td>
       
						   
							
							<td align='right' class='td-label'>uri</td>
							<td><input class="easyui-textbox" type="text"
								id="uri"  name="uri" data-options="height:30"></input></td>
  						</tr>
						     
						<tr class='shouldhidden'>
						     
							
							<td align='right' class='td-label'>identifyName</td>
							<td><input class="easyui-textbox" type="text"
								id="identifyName"  name="identifyName" data-options="height:30"></input></td>
       
						     
							
								<td align='right' class='td-label'>operationId</td>
							<td>
						<input class=" easyui-numberbox" type="text"
						id='operationId' data-ssbtype='int'
						name="operationId" data-options="height:30,width:200"></input>
								</td>
       
						   
							
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
						     
						<tr class='shouldhidden'>
						     
							
							<td align='right' class='td-label'>排序index</td>
							<td>
						<input class=" easyui-numberbox" type="text"
						id='orderIndex' data-ssbtype='int'
						name="orderIndex" data-options="height:30,width:200"></input>
								</td>
       
						     
							
 

						<td align='right' class='td-label'>创建日期</td>
						<td><input type="hidden" id='createDate' value='1'
							data-ssbtype='dateRange' name="createDate"></input> <input
							class="easyui-datebox" type="text" id='createDateStart'
							data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
							- <input class="easyui-datebox" type="text"
							id='createDateEnd' data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
						</td>       
						     
							
  						</tr>
						     
						<tr class='shouldhidden'>
						       
							
       
						       
							
 

						<td align='right' class='td-label'>最后更新时间</td>
						<td><input type="hidden" id='lastUpdateDate' value='1'
							data-ssbtype='dateRange' name="lastUpdateDate"></input> <input
							class="easyui-datebox" type="text" id='lastUpdateDateStart'
							data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
							- <input class="easyui-datebox" type="text"
							id='lastUpdateDateEnd' data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
						</td>   
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a class='moreBtn' id='moreConditionBtn'>更多↓</a>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryEmpower()'>查询</a></td>
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
	<div id='empowerGridDiv' style='width: 100%'>
		<table id='empowerGrid'></table>
	</div>
	<div id="empowerGridPager" />
	</div>
	</div>
</body>
</html>
