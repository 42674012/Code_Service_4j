 <%@page import="com.xt.ssb.util.Constants"%>
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	String uphone=request.getSession().getAttribute(Constants.session_employee_phone)+"";
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Goods查询</title>
<meta name="keywords" content="index">
<script type="text/javascript">
var uphone=<%=uphone%>;
</script>
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/GoodsSearch.js'></script>
	<form id="goodsForm" class='search-form' method="post">
		<table cellpadding="8">
			<tr>
				<td>
					<table>
						<tr >
							<td align='right' class='td-label'>商品名称</td>
							<td><input class="easyui-textbox" type="text"
								name="goodsname" data-options="height:30"></input></td>
								
							<td align='right' class='td-label'>创建时间</td>
							<td><input type="hidden" id='createdate' value='1'
								data-ssbtype='dateRange' name="createdate"></input> <input
								class="easyui-datebox" type="text" id='createdateStart'
								data-ssbtype='date'
								data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
								- <input class="easyui-datebox" type="text"
								id='createdateEnd' data-ssbtype='date'
								data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
	
							</td>
   
						</tr>

					</table>
				</td>

				<td align='left' vAlign='bottom'>
					<a href="#"
					class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryGoods()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'
		style='margin-top: 15px; margin-bottom: 15px;'>
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> 
		<a href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
		<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
		<a href="#" class="easyui-linkbutton" onclick="bracketUp()">上架</a>
		<a href="#" class="easyui-linkbutton" onclick="bracketDown()">下架</a>
	</div>
	<div id='goodsGridDiv' style='width: 100%'>
		<table id='goodsGrid'></table>
	</div>
	<div id="goodsGridPager" />
</body>
</html>
