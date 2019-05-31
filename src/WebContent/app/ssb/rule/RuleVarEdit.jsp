
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
<style type="text/css">
  .border {
    border: 1px solid #ddd;
  }
  #code{
  
  }
</style>
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>
	<link href="<%=context%>/js/codemirror/codemirror.css" rel="stylesheet" type="text/css" />
	<script src='<%=context%>/js/codemirror/codemirror.js'></script>

	<script src='js/RuleVarEdit.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="ruleVarForm" class='edit-form' method="post">
				<table cellspacing='10'>
					<tr>
						<td align='right' class='td-label'>描述</td>
						<td><input class="easyui-textbox" type="text" id='varDesc'
							data-ssbtype='text' name="varDesc"
							data-options="height:30,width:200"></input></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>名称</td>
						<td><input class="easyui-textbox" type="text" id='varCode'
							data-ssbtype='text' name="varCode"
							data-options="height:30,width:200"></input></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>控件类型</td>
						<td>
							
							<input id="uiType" class="easyui-combobox" name="uiType"
    								data-options="valueField:'id',textField:'text',height:30,width:200">
						</td>
					</tr>
					
					
					<tr>
						<td align='right' class='td-label'>类型</td>
						<td><input id='dataType' name="dataType" type="radio" data-ssbtype='radio' value="1" checked="checked"/>sql
							<input id='dataType' name="dataType"  type="radio" data-ssbtype='radio' value="2"/>数字
						</td>
					</tr>

					<tr>
						<td align='right' vAlign='top' class='td-label'>计算SQL</td>
						<td>

							<div class="border">
								<textarea id="code" rows="10333" columns="100" name="code"></textarea>
							</div>
						</td>
					</tr>
					<tr>
						<td align='right' class='td-label'></td>
						<td><input type='checkbox' onchange='test()'>测试条件
							<div id='dd'></div></td>
					</tr>
				</table>
			</form>

		</div>

		<div class='edit_south'
			data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;'>
				<a id='cancelBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
					id='deleteBtn' class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-dustbin'"
					onclick='deleteRuleVar()'>删除</a> <a id='addBtn'
					class="easyui-linkbutton oper"
					style='margin-left: 10px; margin-right: 10px;'
					data-options="iconCls:'icon-form-ok'" onclick='saveRuleVar()'>保存</a>
			</div>
		</div>
	</div>

</body>
</html>
