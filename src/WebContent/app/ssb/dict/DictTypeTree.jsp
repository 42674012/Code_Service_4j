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
	<script src='<%=context%>/js/easyui/plugin/treegrid-dnd.js'></script>
	<script src='js/DictTypeTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id='west' data-options="region:'west',border:false" style="width: 250px; padding: 5px;">

			<ul id="dictTypeTree">
			</ul>

		</div>
		<div id='center' data-options="region:'center',border:false" style="padding: 5px;">
			<div id='dictTypeFormPanel' class='easyui-panel' title="字典类型信息"
				style="width: 100%; font-size: 13px;"
				data-options="iconCls:'icon-form-edit'">
				<form id="dictTypeForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden' id='parentId' name='parentId'> <input
						type='hidden' id='dictTypeId' name='dictTypeId'>
					<table cellspacing='20'>
						<tr>
							<td align='right' class='td-label'>名称</td>
							<td><input class="easyui-textbox" type="text" id='name'
								data-ssbtype='text' name="name"
								data-options="height:30,width:200,required:'required',validType:'length[1,6]'"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>编码</td>
							<td><input class="easyui-textbox" type="text" id='code'
								data-ssbtype='text' name="code"
								data-options="height:30,width:200"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>扩展字段</td>
							<td><input class="easyui-textbox" type="text" id='expand'
								data-ssbtype='text' name="expand"
								data-options="height:30,width:200"></input></td>
						</tr>
						<tr>
							<td></td>
							<td>
								<div class='edit-form-btn' style='text-align: left;'>
									<a id='deleteBtn' class="easyui-linkbutton oper"
										data-options="iconCls:'icon-form-dustbin'"
										onclick='deleteDictType()'>删除</a> <a id='addBtn'
										class="easyui-linkbutton oper"
										style='margin-left: 10px; margin-right: 10px;'
										data-options="iconCls:'icon-form-ok'" onclick='saveDictType()'>保存</a>
								</div>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div id='dictGridDiv' style='width: 100%;margin-top:5px;'>
				<table id='dictGrid'></table>
			</div>
			<div id="dictGridPager" />


		</div>
	</div>

</body>
</html>
