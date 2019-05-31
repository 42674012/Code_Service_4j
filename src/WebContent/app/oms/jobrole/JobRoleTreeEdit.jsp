 
 
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

	<script src='js/JobRoleTreeEdit.js'></script>


	<div id='jobRoleFormPanel' title="JobRole信息"
		style="width: 100%; font-size: 13px;">
		<form id="jobRoleForm" class='edit-form' method="post">
			<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
			<input type='hidden' id='parentId' name='parentId'> <input
				type='hidden' id='jobroleId' name='jobroleId'>
			<table cellspacing='10'>
				 <tr>
					<td align='right' class='td-label'>名称</td>
					<td>
						<input class="easyui-textbox" type="text" id='jobroleName' data-ssbtype='text' name="jobroleName" data-options="height:30,width:200,required:'required',validType:'length[1,6]'"></input>
					</td>
				 </tr>
				 <tr>
					<td align='right' class='td-label'>部门</td>
					<td>
						<input id='orgId' type='hidden' data-ssbtype='autocomplete' name='orgId' /> 
						<input id='orgIdShow' name="orgIdShow" class='normal-input' style='width: 198px;' data-options="panelHeight:60"></input>
					</td>
				</tr>
				 <!--  --tr>
					<td align='right' class='td-label'>指标</td>
					<td>
						<input id='quota' class="easyui-combogrid"  data-ssbtype='text' name='quota' required="required" style="width: 200px;height: 30px;" /> 
					</td>
				</tr-->
              	<tr style="display: none">
					<td align='right' class='td-label'>职务类型</td>
					<td>
						<input class=" easyui-numberbox" type="text" id='jobroleType' data-ssbtype='int' name="jobroleType" data-options="height:30,width:200"></input>
					</td>
				</tr>
          		<tr style="display: none">
					<td align='right' class='td-label'>职务编码</td>
					<td>
						<input  type="text" id='code' data-ssbtype='text' name="code" data-options="height:30,width:200"></input>
					</td>
				</tr>
				               
				<tr style="display: none">
					<td align='right' class='td-label'>上级名称</td>
					<td><label id='parentName' name ="parentName" data-ssbtype='label'></label></td>
				</tr>
				                                                                                             
			</table>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveJobRole()'>保存</a>
	</div>
</body>
</html>
