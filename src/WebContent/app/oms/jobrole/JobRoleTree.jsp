 
 
  
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
	<script src='js/JobRoleTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id='west' data-options="region:'west',border:false" style="width: 350px;padding: 5px;">
			
			<ul id="jobRoleTree" >
			</ul>

		</div>
		<div id='center' data-options="region:'center',border:false" style="padding: 5px;">
			<div id='jobRoleFormPanel' class='easyui-panel' title="职务信息"
				style="width: 100%; font-size: 13px;" data-options="iconCls:'icon-form-edit'">
				<form id="jobRoleForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden'  id='parentId' name='parentId'>
					<input type='hidden'  id='jobroleId' name='jobroleId'>
					<table cellspacing='10'>

			  
			  	<tr>
                    <td align='right' class='td-label'>名称</td>
                    <td><input class="easyui-textbox" type="text" id='jobroleName' data-ssbtype='text' name="jobroleName" data-options="height:30,width:200,required:'required',validType:'length[1,6]'"></input></td>
                </tr>
			  
				<tr>
					<td align='right' class='td-label'>部门</td>
					<td>
						<input id='orgId' type='hidden' data-ssbtype='autocomplete' name='orgId' /> 
						<input id='orgIdShow' name='orgIdShow' class='normal-input' style='width: 198px;'></input>
					</td>
				</tr>
				<!--  tr>
					<td align='right' class='td-label'>指标</td>
					<td>
						<input class="easyui-combogrid" id="quota" name="quota" required="required" style="width: 200px;height: 30px;" data-ssbtype="text">
					</td>
				</tr-->
			  
			  
			  
			  
			  	 <tr style="display: none">
                    <td align='right' class='td-label'>职务类型</td>
                    <td><input class=" easyui-numberbox" type="text" id='jobroleType'  data-ssbtype='int' name="jobroleType" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  	<tr style="display: none">
                    <td align='right' class='td-label'>职务编码</td>
                    <td><input class="easyui-textbox" type="text" id='code' data-ssbtype='text' name="code" data-options="height:30,width:200"></input></td>
                </tr>

			  	<tr style="display: none">
                    <td align='right' class='td-label'>父级名称</td>
                    <td><label id='parentName'  data-ssbtype='label'></label></td>
                </tr>
			  	 
			  	<tr>
			  		<td></td>
			  		<td>
				  		<div class='edit-form-btn' style='text-align:left;'>
							<a id='deleteBtn' class="easyui-linkbutton oper"
							data-options="iconCls:'icon-form-dustbin'" onclick='deleteJobRole()'>删除</a>
							<a id='addBtn' class="easyui-linkbutton oper"
							style='margin-left: 10px; margin-right: 10px;'
							data-options="iconCls:'icon-form-ok'" onclick='saveJobRole()'>保存</a>
						</div>
			  		</td>
			  	</tr> 
					
					</table>
				</form>
			</div>
			<table id='kpiGradeGrid'></table>
		</div>
	</div>

</body>
</html>
