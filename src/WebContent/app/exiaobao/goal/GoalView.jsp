 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">
<script type="text/javascript" src="<%=context %>/js/swfupload/swfupload.js"></script>
 <script type="text/javascript" src="<%=context %>/js/swfupload/handlers.js"></script>
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/GoalView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center'   data-options="region:'center',border:false">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west',split:true" style="width:400px">
				 	<form id="goalForm" class='view-form' method="post">
						<table cellspacing='10'>
		
							<div id='goalFormPanel' title="Goal信息"
								style="width: 100%; font-size: 13px;">     
							<tr>
								<td align='right' class='td-label'>推广量</td>
								<td><label id='tgnum' data-ssbtype='int'
									name="tgnum"></label></td>
							</tr>
								    
							<tr>
								<td align='right' class='td-label'>访问量</td>
								<td><label id='fwnum' data-ssbtype='int'
									name="fwnum"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>订单量</td>
								<td><label id='ddnum' data-ssbtype='int'
									name="ddnum"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>成交量</td>
								<td><label id='cjnum' data-ssbtype='int'
									name="cjnum"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>金钱奖励</td>
								<td><label id='jqreward' data-ssbtype='text'
									name="jqreward"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>实物奖励</td>
								<td>
									<div id="jlimg">
										
									</div>
								</td>
							</tr>
							<tr>
								<td align='right' class='td-label'>年份</td>
								<td><label id='cyear' data-ssbtype='int'
									name="cyear"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>月份</td>
								<td><label id='cmonth' data-ssbtype='int'
									name="cmonth"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>创建时间</td>
								<td><label id='createdate' data-ssbtype='date'
									name="createdate"></label></td>
							</tr>
							     
							<tr>
								<td align='right' class='td-label'>所属医院</td>
								<td><label id='orgname' data-ssbtype='text'
									name="orgname"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>奖励描述</td>
								<td><label id='remark' data-ssbtype='text'
									name="remark"></label></td>
							</tr>
							
						</table>
					</form>
				</div>
				<div data-options="region:'center'">
					<table cellpadding="10"  >
						<tr>
							<td>
								<table >
								       
									<tr >
									   	<td align='right' class='td-label'>姓名</td>
										<td>
										<input class=" easyui-textbox" type="text"
											id='name' data-ssbtype='int'
											name="name" data-options="height:30,width:200"></input>
											</td>
										
										<td align='right' class='td-label'>手机号</td>
										<td>
										<input class=" easyui-numberbox" type="text"
										id='phone' data-ssbtype='int'
										name="phone" data-options="height:30,width:200"></input>
										</td>
			  						</tr>
									 
								</table>
							</td>
			
							<td align='left' style='width:180px;'>
							<div class='edit-form-btn' style='float: right; margin-right: 5px;'>
								<a href="#" class="easyui-linkbutton search" style='margin-left:30px;'
								data-options="iconCls:'icon-form-search-btn'"
								onclick='queryGoal()'>查询</a>
								</div>
							</td>
						</tr>
					</table>
					<div id='goalGridDiv' style='width: 100%'>
						<table id='goalGrid'></table>
					</div>
					<div id="goalGridPager" />
					</div>
				</div>
			</div>
		</div>

		<div id="operbtn" data-options="region:'south',split:true,border:false"
			style="height: 40px;">
			<div class='edit-form-btn' style='float: right; margin-right: 5px;'>
				<a class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>关闭</a>
			</div>
		</div>
	</div>
</body>
</html>
