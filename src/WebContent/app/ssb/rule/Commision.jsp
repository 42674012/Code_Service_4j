 
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
	<script src='js/Commision.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">
			<form id="goalForm" class='search-form' method="post">
				<div id='goalFormPanel' class='easyui-panel'
					data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
					title="" style="width: 100%; font-size: 13px;">
						<table id="" cellspacing='2' style='width: 100%;padding-left: 100px;font-weight: bold;font-size: 1.1em'>
							<tr>
								<td>
									计算公式：场内*变量+(1-变量)*场外=总佣金;&nbsp;&nbsp;&nbsp;
									场内佣金=总佣金*变量;&nbsp;&nbsp;&nbsp;
									场外佣金=总佣金*(1-变量);
									<br/>场外佣金平均值=1/3=33;
									<br/>分享后产生消费场外人员=场外佣金*(场外佣金平均值+递减值);
									<br/>分享后产生消费场外人员父一级=场外佣金*场外佣金平均值;
									<br/>分享后产生消费场外人员父二级=场外佣金*(场外佣金平均值-递减值);
								</td>
							</tr>
							<tr>
								<td>
									<span style="font-size: 1pt;color: red">注:填框内为百分比 取值0~100范围内的</span>
									<br/>
									变量=<input type="text" id="bianliang" class="easyui-numberbox" style="width:70px"  value="" data-options="min:0,max:100,precision:0">
									&nbsp;&nbsp;递减值=<input id="dijianzhi" type="text" class="easyui-numberbox" style="width:70px"  value="" data-options="min:0,max:100,precision:0">
									<a href="#"
										class="easyui-linkbutton search" style='margin-left:30px;'
										data-options="iconCls:'icon-form-search-btn'"
										onclick='queding()'>确定</a>
								</td>
							</tr>
						</table>
						<table id="showvarCode" cellspacing='10' style='width: 100%'>
						</table>
				</div>
			</form>
		</div>
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			<div class='edit_south' data-options="region:'south',split:true,border:false">
		<div class='edit-form-btn' style='float: right;margin-right:5px;'>
			<a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveGoal()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
