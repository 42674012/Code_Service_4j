 
 
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

	<script src='js/FunctionEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="functionForm" class='edit-form' method="post">
		<div id='functionFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="function信息" style="width: 100%; font-size: 13px;">
			<table cellspacing='10'>                   				<tr>
					<td align='right' class='td-label'>描述</td>
					<td><input class="easyui-textbox" type="text"
						id='remark' data-ssbtype='text'
						name="remark" data-options="height:30,width:200"></input></td>
				</tr>          				<tr>
					<td align='right' class='td-label'>资源标识</td>
					<td><input class="easyui-textbox" type="text"
						id='uri' data-ssbtype='text'
						name="uri" data-options="height:30,width:200"></input></td>
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
			onclick='deleteFunction()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveFunction()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
