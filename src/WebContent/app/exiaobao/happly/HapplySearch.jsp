 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Happly查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/HapplySearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main' data-options="region:'center',border:false">
	
	<form id="happlyForm" class='search-form' method="post">
		<table cellpadding="10"  >
			<tr>
				<td>
					<table id="happlyTable"   >
						       
						<tr >
							
							<td align='right' class='td-label'>申请人</td>
							<td><input class="easyui-textbox" type="text"
								id="aemployeeName"  name="aemployeeName" data-options="height:30"></input></td>
							<td align='right' class='td-label'>申请状态</td>
							<td>
								<input class=" easyui-numberbox" type="text"
								id='status' data-ssbtype='int'
								name="status" data-options="height:30,width:200"></input>
							</td>
							<td align='right' class='td-label'>申请时间</td>
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

				<td align='left' style='width:180px;'>
					<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
					data-options="iconCls:'icon-form-search-btn'"
					onclick='queryHapply()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<a href="#" class="easyui-linkbutton" onclick="bttapprove()">审批</a> 
		<a href="#" class="easyui-linkbutton" onclick="bttrefuse()">拒绝</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='happlyGridDiv' style='width: 100%'>
		<table id='happlyGrid'></table>
	</div>
	<div id="happlyGridPager" />
	</div>
	</div>
</body>
</html>
