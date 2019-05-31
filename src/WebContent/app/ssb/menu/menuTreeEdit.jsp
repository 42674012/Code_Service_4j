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
	<script src='js/menuTreeEdit.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id='west' data-options="region:'west',border:false" style="width: 250px; padding: 5px;">

			<ul id="menuTree">
			</ul>

		</div>
		<div data-options="region:'center',border:false" style="padding: 5px;">
			<div id='menuFormPanel' class='easyui-panel' title="菜单信息"
				style="width: 100%; font-size: 13px;"
				data-options="iconCls:'icon-form-edit'">
				<form id="menuForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden' id='parentId' name='parentId'> <input
						type='hidden' id='menuId' name='menuId'>
					<table cellspacing='20'>
						<tr>
							<td align='right' class='td-label'>名称</td>
							<td><input class="easyui-textbox" type="text" id='name'
								data-ssbtype='text' name="name" data-options="height:30,required:'required',validType:'length[1,6]'"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>描述</td>
							<td><input class="easyui-textbox" type="text" id='rembo'
								data-ssbtype='text' name="rembo" data-options="height:30"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>URI</td>
							<td><input class="easyui-textbox" type="text" id='url'
								data-ssbtype='text' name="url" data-options="height:30"></input></td>
						</tr>
						<tr>
							<td align='right' class='td-label'>图标</td>
							<td><input class="easyui-textbox" type="text"
								id='icon' data-ssbtype='text' name="icon"
								data-options="height:30"></input></td>
						</tr>


						<tr>
							<td align='right' class='td-label'>显示</td>
							<td><input type='checkbox' data-ssbtype='checkbox'
								id="visiable" name="visiable" data-checkvalue="1,0"
								checked='true' /></td>
						</tr>

						<tr>
							<td align='right' class='td-label'>新窗口打开</td>
							<td><input type='checkbox' data-ssbtype='checkbox'
								id="isBlank" name="isBlank" data-checkvalue="1,0" checked='true' />
							</td>
						</tr>

						<tr>
							<td></td>
							<td>
								<div class='edit-form-btn' style='text-align: left;'>
									<a id='deleteBtn' class="easyui-linkbutton oper"
										data-options="iconCls:'icon-form-dustbin'"
										onclick='deleteMenu()'>删除</a> <a id='addBtn'
										class="easyui-linkbutton oper"
										style='margin-left: 10px; margin-right: 10px;'
										data-options="iconCls:'icon-form-ok'" onclick='saveMenu()'>保存</a>
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
