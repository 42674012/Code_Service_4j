 
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

	<script src='js/ShareEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="shareForm" class='edit-form' method="post">
		<div id='shareFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="share信息" style="width: 100%; font-size: 13px;">
			<table cellspacing='10'>         				<tr>
					<td align='right' class='td-label'>分享人id</td>
					<td><input class="easyui-textbox" type="text"
						id='employeeId' data-ssbtype='text'
						name="employeeId" data-options="height:30,width:200"></input></td>
				</tr>            				<tr>
					<td align='right' class='td-label'>分享人名称</td>
					<td><input class="easyui-textbox" type="text"
						id='employeeName' data-ssbtype='text'
						name="employeeName" data-options="height:30,width:200"></input></td>
				</tr>            				<tr>
					<td align='right' class='td-label'>分享时间</td>
					<td><input class="easyui-datebox" type="text"
						id='createdate' data-ssbtype='date'
						name="createdate"
						data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
				</tr>
				         				<tr>
					<td align='right' class='td-label'>分享商品id</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='goodsid' data-ssbtype='int'
						name="goodsid" data-options="height:30,width:200"></input>
						</td>
				</tr>
				         				<tr>
					<td align='right' class='td-label'>分享商品名称</td>
					<td><input class="easyui-textbox" type="text"
						id='goodsname' data-ssbtype='text'
						name="goodsname" data-options="height:30,width:200"></input></td>
				</tr>          				<tr>
					<td align='right' class='td-label'>分享位置</td>
					<td><input class="easyui-textbox" type="text"
						id='sharesite' data-ssbtype='text'
						name="sharesite" data-options="height:30,width:200"></input></td>
				</tr>          				<tr>
					<td align='right' class='td-label'>分享url</td>
					<td><input class="easyui-textbox" type="text"
						id='shareurl' data-ssbtype='text'
						name="shareurl" data-options="height:30,width:200"></input></td>
				</tr>           
				<tr>
					<td align='right' class='td-label'>点击量
					</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='chicknum' data-ssbtype='int'
						name="chicknum" data-options="height:30,width:200"></input>
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

		<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-dustbin'"
			onclick='deleteShare()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveShare()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
