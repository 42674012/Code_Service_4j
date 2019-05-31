 
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
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>

	<script src='js/BespeakView.js'></script>

	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'center',border:false">

			<form id="bespeakForm" class='view-form' method="post">
				<table cellspacing='10'>

					<div id='bespeakFormPanel' title="Bespeak信息"
						style="width: 100%; font-size: 13px;"> 
					<tr>
						<td align='right' class='td-label'>支付价格</td>
						<td>
							<input class=" easyui-numberbox" type="text"
								id='nowprice' data-ssbtype='int'
								name="nowprice" data-options="height:30,width:200,required:true,precision:2"></input>
						</td>
					</tr>    
					<tr>
						<td align='right' class='td-label'>预约电话</td>
						<td><label id='phone' data-ssbtype='text'
							name="phone"></label></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>预约姓名</td>
						<td><label id='usrname' data-ssbtype='text'
							name="usrname"></label></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>商品名称</td>
						<td><label id='goodsname' data-ssbtype='text'
							name="goodsname"></label></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>商品价格</td>
						<td><label id='price' data-ssbtype='int'
							name="price"></label></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>商品折扣</td>
						<td><label id='discount' data-ssbtype='int'
							name="discount"></label></td>
					</tr>
					 <tr>
						<td align='right' class='td-label'>规格明细</td>
						<td><label id='detail' data-ssbtype='text'
							name="detail"></label></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>活动主题</td>
						<td><label id='subject' data-ssbtype='text'
							name="subject"></label></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>活动价格</td>
						<td><label id='camprice' data-ssbtype='text'
							name="camprice"></label></td>
					</tr>      
					<tr>
						<td align='right' class='td-label'>活动开始时间</td>
						<td><label id='begintime' data-ssbtype='date'
							name="begintime"></label></td>
					</tr>
					<tr>
						<td align='right' class='td-label'>活动结束时间</td>
						<td><label id='endtime' data-ssbtype='date'
							name="endtime"></label></td>
					</tr>
					      
				</table>
		</div>
		</form>

		<div data-options="region:'south',split:true,border:false"
			style="height: 40px;">
			<div class='edit-form-btn' style='float: right; margin-right: 5px;'>
				<a class="easyui-linkbutton oper"
					data-options="iconCls:'icon-form-undo'" onclick='cancel()'>关闭</a>
				<a id='addBtn' class="easyui-linkbutton oper" 
				style='margin-left:10px;margin-right:10px;' 
				data-options="iconCls:'icon-form-ok'" onclick='saveBespeak()'>支付</a>
			</div>
		</div>
	</div>
</body>
</html>
