 
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

	<script src='js/HapplyEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="happlyForm" class='edit-form' method="post">
		<div id='happlyFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="happly信息" style="width: 100%; font-size: 13px;">
			<table cellspacing='10'>         				<tr>
					<td align='right' class='td-label'>申请人id</td>
					<td><input class="easyui-textbox" type="text"
						id='aemployeeId' data-ssbtype='text'
						name="aemployeeId" data-options="height:30,width:200"></input></td>
				</tr>            				<tr>
					<td align='right' class='td-label'>申请人名称</td>
					<td><input class="easyui-textbox" type="text"
						id='aemployeeName' data-ssbtype='text'
						name="aemployeeName" data-options="height:30,width:200"></input></td>
				</tr>           				<tr>
					<td align='right' class='td-label'>申请医院id</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='orgid' data-ssbtype='int'
						name="orgid" data-options="height:30,width:200"></input>
						</td>
				</tr>
				         				<tr>
					<td align='right' class='td-label'>医院名称</td>
					<td><input class="easyui-textbox" type="text"
						id='orgname' data-ssbtype='text'
						name="orgname" data-options="height:30,width:200"></input></td>
				</tr>           
				<tr>
					<td align='right' class='td-label'>申请状态  1审批中  2审批通过
					</td>
					<td>
						<input class=" easyui-numberbox" type="text"
						id='status' data-ssbtype='int'
						name="status" data-options="height:30,width:200"></input>
					</td>
				</tr>
           				<tr>
					<td align='right' class='td-label'>申请时间</td>
					<td><input class="easyui-datebox" type="text"
						id='createdate' data-ssbtype='date'
						name="createdate"
						data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
				</tr>
				          				<tr>
					<td align='right' class='td-label'>审批人id</td>
					<td><input class="easyui-textbox" type="text"
						id='semployeeId' data-ssbtype='text'
						name="semployeeId" data-options="height:30,width:200"></input></td>
				</tr>            				<tr>
					<td align='right' class='td-label'>审批人名称</td>
					<td><input class="easyui-textbox" type="text"
						id='semployeeName' data-ssbtype='text'
						name="semployeeName" data-options="height:30,width:200"></input></td>
				</tr>            				<tr>
					<td align='right' class='td-label'>审批时间</td>
					<td><input class="easyui-datebox" type="text"
						id='passdate' data-ssbtype='date'
						name="passdate"
						data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
				</tr>
				        				<tr>
					<td align='right' class='td-label'>备注</td>
					<td><input class="easyui-textbox" type="text"
						id='remark' data-ssbtype='text'
						name="remark" data-options="height:30,width:200"></input></td>
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
			onclick='deleteHapply()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveHapply()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
