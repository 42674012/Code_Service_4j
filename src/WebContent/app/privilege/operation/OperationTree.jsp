 
 
  
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
	<script src='<%=context %>/js/easyui/plugin/treegrid-dnd.js'></script>
	<script src='js/OperationTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div data-options="region:'west'" style="width: 250px;padding: 5px;">
			
			<ul id="operationTree" >
			</ul>

		</div>
		<div data-options="region:'center'" style="padding: 5px;">
			<div id='operationFormPanel' class='easyui-panel' title="Operation信息"
				style="width: 100%; font-size: 13px;" data-options="iconCls:'icon-form-edit'">
				<form id="operationForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden'  id='parentId' name='parentId'>
					<input type='hidden'  id='operationId' name='operationId'>
					<table cellspacing='10'>
				
			  
			  
			  
				<tr>
					<td align='right' class='td-label'>资源id</td>
					<td><input class=" easyui-numberbox" type="text"
						id='functionId' data-ssbtype='int'
						name="functionId" data-options="height:30,width:200"></input></td>
				</tr>
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>名称</td>
                    <td><input class="easyui-textbox" type="text" id='name' data-ssbtype='text' name="name" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  
			  
			  	 <tr>
                    <td align='right' class='td-label'>类型-combobox</td>
                    <td><input class=" easyui-numberbox" type="text" id='type'  data-ssbtype='int' name="type" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  	 
			  	 
			  	<tr>
			  		<td></td>
			  		<td>
				  		<div class='edit-form-btn' style='text-align:left;'>
							<a id='deleteBtn' class="easyui-linkbutton oper"
							data-options="iconCls:'icon-form-dustbin'" onclick='deleteOperation()'>删除</a>
							<a id='addBtn' class="easyui-linkbutton oper"
							style='margin-left: 10px; margin-right: 10px;'
							data-options="iconCls:'icon-form-ok'" onclick='saveOperation()'>保存</a>
						</div>
			  		</td>
			  	</tr> 
					
					</table>
				</form>
			</div>
			


		</div>
	</div>

</body>
</html>
