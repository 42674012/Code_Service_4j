 
 
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

	<script src='js/JobEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="jobForm" class='edit-form' method="post">
		<div id='jobFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="职务信息" style="width: 100%; font-size: 13px;">
			<table cellspacing='10'>
				<tr>
					<td align='right' class='td-label'>名称</td>
					<td><input class="easyui-textbox" type="text"
						id='jobName' data-ssbtype='text'
						name="jobName" data-options="height:30,width:200"></input></td>
				</tr>
				<!-- <tr>
					<td align='right' class='td-label'>部门</td>
					<td>
						<input id="orgId" type='hidden' data-ssbtype='autocomplete' name='orgId' />
						<input id='orgIdShow' class='normal-input' style='width:200px;'>
					</td>
				</tr> -->
				<tr>
					<td align='right' class='td-label'>部门</td>
					<td><input id='orgId' type='hidden' data-ssbtype='autocomplete' name='orgId' /> 
						<input id='orgIdShow' class='normal-input' style='width: 200px;'></input>
					</td>
				</tr>
				            
				<!-- <tr>
					<td align='right' class='td-label'>职务类型
					</td>
					<td>
								<input id='jobType'
								class="easyui-combobox"
								name="jobType"
								data-ssbtype='combobox'
								data-options="height:30,width:200,valueField:'dictValue',textField:'dictName',panelHeight:100">
							
					</td>
				</tr> -->
                                                        
				<tr>
					<td align='right' class='td-label'></td>
					<td></td>
				</tr>
			</table>
		</div>
	</form>
</div>

		<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-dustbin'"
			onclick='deleteJob()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveJob()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
