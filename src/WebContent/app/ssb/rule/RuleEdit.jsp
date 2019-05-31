 
 
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
<link href="<%=context%>/js/codemirror/codemirror.css"
		rel="stylesheet" type="text/css" />
	<script src='<%=context%>/js/codemirror/codemirror.js'></script>
	<script src='js/RuleEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="ruleForm" class='edit-form' method="post">
		
			<table cellspacing='10'>         				<tr>
					<td align='right' class='td-label'>描述</td>
					<td><input class="easyui-textbox" type="text"
						id='ruleName' data-ssbtype='text'
						name="ruleName" data-options="height:30,width:400"></input></td>
				</tr>          				<tr>
					<td align='right' class='td-label' vAlign='top'>公式</td>
					<td><input  type="text"
						id='formula' 
						name="formula" data-options="multiline:true,height:500,width:400"></input></td>
				</tr>     
				<tr>
					<td align='right' class='td-label'></td>
					<td></td>
				</tr>
			</table>
		
	</form>
</div>

		<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a>
			<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='caculteTest()'>测试</a> 
			 <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-dustbin'"
			onclick='deleteRule()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveRule()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
