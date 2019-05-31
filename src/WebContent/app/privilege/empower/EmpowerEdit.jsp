 
 
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

	<script src='js/EmpowerEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="empowerForm" class='edit-form' method="post">
		<div id='empowerFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="empower信息" style="width: 100%; font-size: 13px;">
			<table cellspacing='10'>        				<tr>
					<td align='right' class='td-label'>权限id</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='empowerId' data-ssbtype='int'
						name="empowerId" data-options="height:30,width:200"></input>
						</td>
				</tr>
				            				<tr>
					<td align='right' class='td-label'>群组id-autocomplete</td>
					<td>
								<input id='groupId' type='hidden' data-ssbtype='autocomplete' name='autocomplete' />
								<input id='groupIdShow' class='normal-input'  style='width:200px;'></input></td>
</td>
				</tr>
				            				<tr>
					<td align='right' class='td-label'>functionId</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='functionId' data-ssbtype='int'
						name="functionId" data-options="height:30,width:200"></input>
						</td>
				</tr>
				         				<tr>
					<td align='right' class='td-label'>uri</td>
					<td><input class="easyui-textbox" type="text"
						id='uri' data-ssbtype='text'
						name="uri" data-options="height:30,width:200"></input></td>
				</tr>            				<tr>
					<td align='right' class='td-label'>identifyName</td>
					<td><input class="easyui-textbox" type="text"
						id='identifyName' data-ssbtype='text'
						name="identifyName" data-options="height:30,width:200"></input></td>
				</tr>             				<tr>
					<td align='right' class='td-label'>operationId</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='operationId' data-ssbtype='int'
						name="operationId" data-options="height:30,width:200"></input>
						</td>
				</tr>
				          
				<tr>
					<td align='right' class='td-label'>类型-combobox
					</td>
					<td>
								<input id='type'
								class="easyui-combobox"
								name="type"
								data-ssbtype='combobox'
								data-options="height:30,width:200,valueField:'dictValue',textField:'dictName',panelHeight:100">
							
					</td>
				</tr>
            
				<tr>
					<td align='right' class='td-label'>排序index
					</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='orderIndex' data-ssbtype='int'
						name="orderIndex" data-options="height:30,width:200"></input>
					</td>
				</tr>
                                                        
				<tr>
					<td align='right' class='td-label'></td>
					<td></td>
				</tr>
			</table>
		</div>
	</form>
</div>

		<div data-options="region:'south',split:true,border:false" style="height:40px;">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-dustbin'"
			onclick='deleteEmpower()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveEmpower()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
