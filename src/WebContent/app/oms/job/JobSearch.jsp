 
 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>职务查询</title>
<meta name="keywords" content="index">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/JobSearch.js'></script>
	
	<!-- <div class="easyui-layout" data-options="fit:true">

	<div id='center' class='search_main' data-options="region:'center',border:false"> -->
	
	<form id="jobForm" class='search-form' method="post">
		<table cellpadding="10" style='width:100%;'>
			<tr>
				<td>
					<table id="jobTable">
						       
						<tr>
							<td align='right' class='td-label'>名称</td>
							<td><input class="easyui-textbox" type="text"id="jobName"  name="jobName" data-options="height:30"></input></td>
       				
							
							<td align='right' class='td-label'>部门</td>
							<td><input id='orgId' type='hidden' data-ssbtype='autocomplete' name='orgId' /> 
								<input id='orgIdShow' class='normal-input' style='width: 200px;'></input>
							</td>
							<td align='left' style='width:180px;'>
							<!-- <a class='moreBtn' id='moreConditionBtn'>更多↓</a> -->
							<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'data-options="iconCls:'icon-form-search-btn'"onclick='queryJob()'>查询</a>
							</td>
       
  						</tr>
						     
					<!-- 	<tr class='shouldhidden'>
						     
							
 

						<td align='right' class='td-label'>创建时间</td>
						<td><input type="hidden" id='createDate' value='1'
							data-ssbtype='dateRange' name="createDate"></input> <input
							class="easyui-datebox" type="text" id='createDateStart'
							data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
							- <input class="easyui-datebox" type="text"
							id='createDateEnd' data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
						</td>       
						     
							
       
						       
							
 

						<td align='right' class='td-label'>更新时间</td>
						<td><input type="hidden" id='lastUpdateDate' value='1'
							data-ssbtype='dateRange' name="lastUpdateDate"></input> <input
							class="easyui-datebox" type="text" id='lastUpdateDateStart'
							data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
							- <input class="easyui-datebox" type="text"
							id='lastUpdateDateEnd' data-ssbtype='date'
							data-options="formatter:tcCoreformatter,parser:tcCoreParser,width:120,height:30"></input>
						</td>  						</tr> -->
						     
						<!-- <tr class='shouldhidden'> -->
						       
							
   
					</table>
				</td>

				
			</tr>
		</table>
	</form>
	
	<div id='operbtn' class='operbtn'>
		<a href="#" class="easyui-linkbutton" onclick="addData()">新增</a> <a
			href="#" class="easyui-linkbutton" onclick="editDataBtnClick()">修改</a>
		<a href="#" class="easyui-linkbutton" onclick="deleteDataBtnClick()">删除</a>
		<a href="#" class="easyui-linkbutton" onclick="print()">打印</a>
	</div>
	<div id='jobGridDiv' style='width: 100%'>
		<table id='jobGrid'></table>
	</div>
	<div id="jobGridPager" />
	<!-- </div>
	</div> -->
</body>
</html>
