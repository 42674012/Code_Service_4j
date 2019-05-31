<%@page import="com.xt.ssb.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	String employeeName = request.getSession()
			.getAttribute(Constants.session_employee_name).toString();
	Long employeeId = (Long)request.getSession().getAttribute(Constants.session_employee_id);
	String uphone=request.getSession().getAttribute(Constants.session_employee_phone)+"";
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">
<script type="text/javascript">
var _id = "<%=employeeId%>";
var uphone=<%=uphone%>;
</script>
</head>

<body>
	<%@ include file="../includeScript.jsp"%>
	<script src='<%=context%>/js/highcharts/highcharts.js'></script>
	<script src='<%=context%>/app/index/js/main.js'></script>
		<script src='<%=context%>/js/controls/jquery.circliful.min.js'></script>
	<link href="<%=context%>/app/index/css/main_doc_ass.css" rel="stylesheet" type="text/css" />
	<div class="easyui-layout" data-options="fit:true">
		<div id='center' data-options="region:'center',iconCls:'icon-ok,title:false'" style='border-top-width: 0px;'>
			 <table cellpadding="10"  style="width: 90%;">
				<tr id="center_tr">
					<td >
						<div id="spfb" class="tiltediv"
							style="width: 200px;background: url('<%=context%>/css/images/spfb.png') center no-repeat;">
						</div>
						<div id="hdfb" class="tiltediv"
							style="width: 200px;background: url('<%=context%>/css/images/hdfb.png') center no-repeat;">
						</div>
						<div id="yydy" class="tiltediv"
							style="width: 200px;background: url('<%=context%>/css/images/yydy.png') center no-repeat;">
						</div>
						<div id="yhtx" class="tiltediv"
							style="width: 200px;background: url('<%=context%>/css/images/yhtx.png') center no-repeat;">
						</div>
					</td>
					<td rowspan="2" valign="top">
						<div style="width: 420px;height: 300px;border: 0px solid red;">
							<div id="danjuChart">
							</div>
						</div>
						<div style="width: 430px;height: 330px;border: 0px solid red;margin-top: 5px;">
							<div id="yjChart" ></div>
						</div>
					</td>
				</tr>
				<tr>
					<td  style="padding-left: 20px;">
						<div id='tt' class="easyui-tabs"   data-options="border:false">
							<div title="商品列表" style="padding:5px">
								<div id='goodsGridDiv' style='width: 100%'>
									<table id='goodsGrid'></table>
								</div>
								<div id="goodsGridPager" ></div>
							</div>
							<div title="活动列表" style="padding:5px">
								<div id='campaignGridDiv' style='width: 100%'>
									<table id='campaignGrid'></table>
								</div>
								<div id="campaignGridPager" ></div>
							</div>
							<div title="申请审批" style="padding:5px">
								<div id='happlyGridDiv' style='width: 100%'>
									<table id='happlyGrid'></table>
								</div>
								<div id="happlyGridPager" ></div>
							</div>
							<div title="佣金列表" style="padding:5px">
								<div id='commisionGridDiv' style='width: 100%'>
									<table id='commisionGrid'></table>
								</div>
								<div id="commisionGridPager" ></div>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>
