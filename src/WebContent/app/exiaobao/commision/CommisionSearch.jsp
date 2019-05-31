 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>佣金查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/CommisionSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main' data-options="region:'center',border:false">
	
	<form id="commisionForm" class='search-form' method="post">
		<table cellpadding="10"  >
			<tr>
				<td>
					<table id="commisionTable" >
						       
						<tr >
							<td align='right' class='td-label'>用户名</td>
							<td><input class="easyui-textbox" type="text"
								id="name"  name="name" data-options="height:30"></input></td>
							
							<td align='right' class='td-label'>场内场外</td>
							<td>
								<input type="radio" name="vip" id="vip1" value='0' checked="checked"> 全部
								<input type="radio" name="vip" id="vip2" value='2'>场内
								<input type="radio" name="vip" id="vip3" value='3'>场外
							</td>
       					</tr>
						 
					</table>
				</td>

				<td align='left' style='width:180px;'>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryCommision()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<!-- 
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> <a
			href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
		 -->
		<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='commisionGridDiv' style='width: 100%'>
		<table id='commisionGrid'></table>
	</div>
	<div id="commisionGridPager" />
	</div>
	</div>
</body>
</html>
