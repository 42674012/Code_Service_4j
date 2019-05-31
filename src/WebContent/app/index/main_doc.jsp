<%@page import="com.xt.ssb.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	String employeeName = request.getSession()
			.getAttribute(Constants.session_employee_name).toString();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">

<style type="text/css">
.tiltediv {
	padding-left: 10px;
	padding-top: 15px;
	margin-top: 10px;
	margin-left: 2px;
	margin-bottom: 10px;
	float: left;
	width: 100%;
	border: 1px solid #D3D3D3;
	font-weight: bold;
	color: white;
	height: 30px;
}

.tiltediv a {
	float: right;
	margin-right: 20px;
}
</style>
<script type="text/javascript">
	
</script>
</head>

<body>
	<%@ include file="../includeScript.jsp"%>
	<script src='<%=context%>/js/highcharts/highcharts.js'></script>
	<script src='<%=context%>/app/index/js/main_doc.js'></script>
	<div class="easyui-layout" data-options="fit:true">

		<div id='center' data-options="region:'north',iconCls:'icon-ok,title:false',border:false" style='border-top-width: 0px;'>

			<table style='width:98%;'>
				<tr>
					<td style='width: 24%'><div id="intention" class="tiltediv"
							style="background-color: #F4A460">意向客户:</div></td>
					<td style='width: 24%'>
						<div id="bespoke" class="tiltediv"
							style="background-color: #20B2AA">预约客户:</div>
					</td>
					<td style='width: 24%'>
						<div id="examine" class="tiltediv"
							style="background-color: #483D8B">到诊客户:</div>
					</td>
					<td style='width: 24%'>
						<div id="loss" class="tiltediv" style="background-color: #008B8B">流失客户:</div>
					</td>
				</tr>
			</table>
		</div>

		<div id="south" data-options="region:'center',iconCls:'icon-ok,title:false'" style='border-top-width: 0px;'>
			<table style="width: 100%">

				<tr>
					<td width="100%" colspan="2">
						<div id="p1" class="easyui-panel" title="意向、预约、到诊、流失走势图"
							style="width: 100%; height: 350px; padding: 10px;">
							<img src="<%=context%>/app/index/js/testzx.png"
								style="height: 280px; width: 100%">
						</div>
					</td>
				</tr>
				<tr>
					<td width="50%">
						<div id="p2" class="easyui-panel" title="今日预计到诊"
							style="width: 100%; height: 350px;">
							<div id="examinelists" style="display: block;"></div>
						</div>
					</td>
					<td width="50%">
						<div id="p4" class="easyui-panel" title="本月目标"
							style="width: 100%; height: 350px;">
							<div id="callback" style="display: block;"></div>
						</div>
					</td>
				</tr>
			</table>

		</div>
	</div>
</body>
</html>
