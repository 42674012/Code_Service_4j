 
 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Rule查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/RuleSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main' data-options="region:'center',border:false">
	
	<form id="ruleForm" class='search-form' method="post">
		<table cellpadding="10" >
			<tr>
				<td>
					<table id="ruleTable">
						       
						<tr >
						     
							
							<td align='right' class='td-label'>规则名称</td>
							<td><input class="easyui-textbox" type="text"
								id="ruleName"  name="ruleName" data-options="height:30"></input></td>
       
						   
							
							<td align='right' class='td-label'>公式</td>
							<td><input class="easyui-textbox" type="text"
								id="formula"  name="formula" data-options="height:30"></input></td>
   
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryRule()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> <a
			href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
		<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='ruleGridDiv' style='width: 100%'>
		<table id='ruleGrid'></table>
	</div>
	<div id="ruleGridPager" />
	</div>
	</div>
</body>
</html>
