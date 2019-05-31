 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Tickling查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/TicklingSearch.js'></script>
	
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' class='search_main' data-options="region:'center',border:false">
	
	<form id="ticklingForm" class='search-form' method="post">
		<table cellpadding="10"  >
			<tr>
				<td>
					<table id="ticklingTable"  >
						       
						<tr >
							<td align='right' class='td-label'>回复时间</td>
							<td><input type="hidden" id='replydate' value='1'
								data-ssbtype='dateRange' name="replydate"></input> <input
								class="easyui-datebox" type="text" id='replydateStart'
								data-ssbtype='date'
								data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
								- <input class="easyui-datebox" type="text"
								id='replydateEnd' data-ssbtype='date'
								data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
							</td>       
							
							<td align='right' class='td-label'>反馈时间</td>
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
					onclick='queryTickling()'>查询</a></td>
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<a href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">回复</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='ticklingGridDiv' style='width: 100%'>
		<table id='ticklingGrid'></table>
	</div>
	<div id="ticklingGridPager" />
	</div>
	</div>
</body>
</html>
