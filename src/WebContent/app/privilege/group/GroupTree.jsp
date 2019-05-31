 
 
  
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
	<script src='js/GroupTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id="west" data-options="region:'west'" style="width: 250px;padding: 5px;">
			
			<ul id="groupTree" >
			</ul>

		</div>
		<div id='center' data-options="region:'center'" style="padding: 5px;padding-top:0px;">
			<div id='groupFormPanel' class='easyui-panel' title="群组信息" style="width: 100%; font-size: 13px;" data-options="iconCls:'icon-form-edit'">
				<form id="groupForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden'  id='parentId' name='parentId'>
					<!-- <input type='hidden'  id='groupId' name='groupId'> -->
					<table cellspacing='10'>

				<tr style="display:none">
					<td align='right' class='td-label'>群组id</td>
					<td><input class=" easyui-numberbox" type="text"
						id='groupId' data-ssbtype='int'
						name="groupId" data-options="height:30,width:200"></input></td>
				</tr>
				<tr>
                    <td align='right' class='td-label'>上级 名称</td>
                    <td><label id='parentName' name="parentName" data-ssbtype='label'></label></td>
                </tr>
			  
			  	<tr>
                    <td align='right' class='td-label'>名称</td>
                    <td><input class="easyui-textbox" type="text" id='name' data-ssbtype='text' name="name" data-options="height:30,width:200"></input></td>
                </tr>
			  	<tr>
			  		<td></td>
			  		<td>
				  		<div class='edit-form-btn' style='text-align:left;'>
							<a id='deleteBtn' class="easyui-linkbutton oper"
							data-options="iconCls:'icon-form-dustbin'" onclick='deleteGroup()'>删除</a>
							<a id='addBtn' class="easyui-linkbutton oper"
							style='margin-left: 10px; margin-right: 10px;'
							data-options="iconCls:'icon-form-ok'" onclick='saveGroup()'>保存</a>
						</div>
			  		</td>
			  	</tr> 
					
					</table>
				</form>
			</div>
			<div id='existGridDiv' style='width: 100%'>
				<table id='existGrid'></table>
			</div>
			<div id="existGridPager" />

		</div>
	</div>
	
<!-- <div id="existTool" style="visibility: hidden;">
	<form id="existForm" class='search-form' method="post">
	<table>
		<tr style="height: 28px;">
			<td align='left' vAlign='bottom'><a href="#"
						class="easyui-linkbutton search" style='margin-left: 30px;'
						data-options="iconCls:'icon-form-search-btn',height:25"
						onclick='addSimple()'>单个添加</a></td>
			<td align='left' vAlign='bottom'><a href="#"
						class="easyui-linkbutton search" style='margin-left: 30px;'
						data-options="iconCls:'icon-form-search-btn',height:25"
						onclick='addBatch()'>规则添加</a></td>
		</tr>
	</table>
	</form>
</div> -->
<!-- <div id="menuDiv">
	<ul class="menu">
		<li onclick="addSimple()">单个添加</li>
		<li onclick="addBatch()">规则添加</li>
	</ul>
</div> -->
</body>
</html>


