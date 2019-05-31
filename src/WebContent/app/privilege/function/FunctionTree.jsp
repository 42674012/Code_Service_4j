 
 
  
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
	<script src='js/FunctionTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id='west' data-options="region:'west',border:false" style="width: 350px;padding: 5px;">
			
			<ul id="functionTree" >
			</ul>

		</div>
		<div id="center" data-options="region:'center',border:false" style="padding: 5px;">
			<div id='functionFormPanel' class='easyui-panel' title="功能信息"
				style="width: 100%; font-size: 13px;" data-options="iconCls:'icon-form-edit'">
				<form id="functionForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden'  id='parentId' name='parentId'>
					<input type='hidden'  id='functionId' name='functionId'>
				<table cellspacing='10'>
			  	<tr>
                    <td align='right' class='td-label'>描述</td>
                    <td><input class="easyui-textbox" type="text" id='remark' data-ssbtype='text' name="remark" data-options="height:30,width:200,required:'required',validType:'length[1,6]'"></input></td>
                </tr>
			  	<tr>
                    <td align='right' class='td-label'>URI</td>
                    <td><input class="easyui-textbox" type="text" id='uri' data-ssbtype='text' name="uri" data-options="height:30,width:200"></input></td>
                </tr>
			  	 <tr>
                    <td align='right' class='td-label'>类型</td>
                    <td><input class=" easyui-combobox" type="text" id='functionType'  data-ssbtype='combobox' name="functionType" data-options="height:30,width:200,valueField:'dictValue',textField:'dictName',panelHeight:100,editable:false"></input></td>
                </tr>
			  	<tr>
			  		<td></td>
			  		<td>
				  		<div class='edit-form-btn' style='text-align:left;'>
							<a id='deleteBtn' class="easyui-linkbutton oper"
							data-options="iconCls:'icon-form-dustbin'" onclick='deleteFunction()'>删除</a>
							<a id='addBtn' class="easyui-linkbutton oper"
							style='margin-left: 10px; margin-right: 10px;'
							data-options="iconCls:'icon-form-ok'" onclick='saveFunction()'>保存</a>
						</div>
			  		</td>
			  	</tr> 
					
					</table>
				</form>
			</div>
			<div id='functionGridDiv' style='width: 100%;margin-top:5px;'>
				<table id='functionGrid'></table>
			</div>
			<div id="functionGridPager" />
		</div>
	</div>

</body>
</html>
