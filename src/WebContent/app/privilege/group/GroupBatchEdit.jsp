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
	<script src="js/GroupBatchEdit.js"></script>
	<!-- <div id="cc" class="easyui-layout" data-options="fit:true">
		<div id="center" class="easyui-tabs" data-options="region:'center',border:false,width:600,height:400" style="padding: 5px;">
			<div id="rule" title="规则" data-options="selected:false">
				<span><h2>此功暂未开放</h2></span>
			</div>
			<div id="SQL" title="MySQl" style="width:100%;height: 100%;">
				<div id="north" class="easyui-layout" data-options="region:'center'">
					<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a>
					<form id="groupSqlFormPanel" method="post" class='edit-form'>
						<table style="margin-top: 10px;">
							<tr>
								<td style="display: none"><input id="sqlId" name="sqlId" type="text"></td>
								<td style="display: none"><input id="groupId" type="text" name="groupId"/></td>	
							</tr>
							<tr style="width:80px;">
								<td style="text-align: right">群组:</td>
								<td><input id="name" type="text" name="name" readonly="readonly" style="border: 0px;width:300px;"></td>
							</tr>
							<tr style="margin-top: 20px;">
								<td style="vertical-align: top;text-align: right">SQL语句:</td>
								<td><input id="sqlContent" name="sqlContent" type="text" style="width:400px;height: 200px;vertical-align: top;"></td>
							</tr>
						</table>
					</form>
				</div>
				<div class='edit-form-btn dialog-btn'>
					<a id='cancelBtn' class="easyui-linkbutton oper" data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a>
					<a id='deleteBtn' class="easyui-linkbutton oper" data-options="iconCls:'icon-form-dustbin'" onclick='deleteGroupSql()'>删除</a> 
					<a id='addBtn' class="easyui-linkbutton oper" style='margin-left: 10px; margin-right: 10px;' data-options="iconCls:'icon-form-ok'" onclick='saveGroupSql()'>保存</a>
				</div>
			</div>
		</div>
	</div> -->
	<div class="easyui-layout" data-options="fit:true">
		<div id='center' class="easyui-tabs" data-options="region:'center',fit:true,border:false,palin:true">
			<div id="rule" title="规则" data-options="selected:false">
				<div id='ceshi' style="height:300px;vertical-align: middle;visibility: hidden;">
					<h1 style="color: red;text-align: center;">此功能暂未开放</h1>
				</div>
			</div>
			<div id="SQL" title="MySql" data-options="region:'center',border:false,selected:true" style="position: relative;">
				<form id="groupSqlForm" class='edit-form' method="post">
					<div id='groupSqlFormPanel' class='easyui-panel' data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'  style="width: 100%; font-size: 13px;">
						<table cellspacing='10'>
							 <tr>
								<td align='right' class='td-label'>群组名称</td>
								<td>
									<label type="text" id='name' data-ssbtype='text' name="name"></label>
									<input  type="hidden" id='sqlId' name="sqlId" ></input>
									<input  type="hidden" id='groupId'  name="groupId" ></input>
								</td>
							</tr>
							<tr>
								<td align='right' class='td-label'>sql语句</td>
								<td>
									<textarea class="textarea " type="text" id='sqlContent'  name="sqlContent" rows="17" style="width:350px;resize: none; "></textarea>
								</td>
							</tr>                                        
							<tr>
								<td align='right' class='td-label'></td>
								<td></td>
							</tr>
						</table>
					</div>
				</form>
				<div class='edit_south' data-options="region:'south',split:true,border:false" style="width: 100%;position:absolute;bottom:0;">
					<div class='edit-form-btn' style='float: right;margin-right:5px;'>
						<a id='cancelBtn' class="easyui-linkbutton oper" data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> 
						<a id='deleteBtn' class="easyui-linkbutton oper" data-options="iconCls:'icon-form-dustbin'" onclick='deleteGroupSql()'>删除</a> 
						<a id='addBtn' class="easyui-linkbutton oper" style='margin-left: 10px; margin-right: 10px;' data-options="iconCls:'icon-form-ok'" onclick='saveGroupSql()'>保存</a>
					</div>
				</div>
		</div>
	</div>
</body>
</html>