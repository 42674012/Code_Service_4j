<%@page import="com.xt.ssb.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
	String employeeName = request.getSession()
			.getAttribute(Constants.session_employee_name).toString();
	Long employeeId = (Long)request.getSession().getAttribute(Constants.session_employee_id);
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">
<script type="text/javascript">
var context = '<%=context%>';
var _id = '<%=employeeId%>';
</script>
</head>

<body>
	<%@ include file="../includeScript.jsp"%>
	<script src='<%=context%>/js/highcharts/highcharts.js'></script>
	<script src='<%=context%>/app/index/js/main_zx.js'></script>
	<script src='<%=context%>/js/controls/jquery.circliful.min.js'></script>
	<link href="<%=context%>/app/index/css/main_doc_ass.css" rel="stylesheet"
		type="text/css" />
	<!-- <div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north',border:true,fit:true">
			<div id="all_targetDiv">
				<div id="mySlider" style="margin-top: 10px"></div>
			</div>
		</div>
		<div data-options="region:'center',border:true,fit:true"></div>
		<div data-options="region:'east',border:true,fit:true"></div>
		<div data-options="region:'sourth',border:true,fit:true"></div>
	
	</div> -->
	<div class="t top">
		<table style="width: 100%">
			<tr>
				<td width="40%">
					<!--  td width="400" --> <!-- div id="all_targetDiv" -->
					<label style="margin-left: 5px;"><font size="+1">本月目标完成情况</font></label>
					<div id="mySlider" style="margin-top: 20px"></div> <!--/div -->
				</td>
				<!-- <td width="200">
					<div id="my_targetDiv">
						<span> 我的挂号: </span> <span>我的接诊: </span> <span> 我的复诊: </span> <span>
							我的业绩: </span> <span> 我的单体开发: </span>
					</div>
				</td> -->
				<td align='left'>
					<div id="rangeDiv">
						<div class="c" id="receptionRate" data-dimension="150"
							data-text="0%" data-info="" data-width="10"
							data-fontsize="14" data-percent="0" data-fgcolor="#61a9dc"
							data-bgcolor="#eee" data-fill="#ddd"></div>

						<div class="c" id="reReception" data-dimension="150"
							data-text="0%" data-info="" data-width="10"
							data-fontsize="14" data-percent="0" data-fgcolor="#61a9dc"
							data-bgcolor="#eee" data-fill="#ddd"></div>

						<div class="c" id="notDiagnosis" data-dimension="150"
							data-text="" data-info="" data-width="10"
							data-fontsize="14" data-percent="0" data-fgcolor="#61a9dc"
							data-bgcolor="#eee" data-fill="#ddd"></div>
					</div>
				</td>
			</tr>
		</table>


	</div>
	<div class="t center" style="background-color: #FFF">
		<table id="top_tb" style='width: 100%;'>
			<tr>
				<td id="adviceDivBtn" style='width: 18%' align="right">
					<div id="adviceDiv" class="tiltediv"
					style="width: 200px;
						   background: url('<%=context%>/css/images/advice.png') center no-repeat;">
						<!-- <font size="+1">咨询预约</font> -->
					</div>
				</td>
				<td id="appointmentDivBtn" align="left">
					<div id="appointmentDiv" class="tiltediv"
						style="width: 200px;
						 background: url('<%=context%>/css/images/appointment_search.png') center no-repeat;">
					</div>
				</td>
				<!-- <td style='width: 25%' align="right">
					<div id="checkhomeDiv" class="tiltediv"
						style="background-color: #483D8B; width: 200px">
						<font size="+1">到院登记</font>
					</div>
				</td>
				<td style='width: 25%' align="right">
					<div id="complaintDiv" class="tiltediv"
						style="background-color: #008B8B; width: 200px">
						<font size="+1">患者投诉</font>
					</div>
				</td> -->
			</tr>
		</table>
	</div>
	<div class="t bottom"style="background-color: #FFF">
		<table>
			<tr>
				<td valign="top">
					<div id="tt" class="" data-options="border:false">
						<div title="今日待回访" data-options="selected:true,tabWidth:100"
							style="padding-bottom: 20px">
							<table id='callbackGrid'></table>
						</div>
						<div title="今日预计到诊" data-options="selected:false,tabWidth:100"
							style="padding-bottom: 20px">
							<table id='willcomeGrid'></table>
						</div>
						<div title="今日新增意向" data-options="selected:false,tabWidth:100"
							style="padding-bottom: 20px">
							<table id='adviceGrid'></table>
						</div>
						<div title="今日新增预约" data-options="selected:false,tabWidth:100"
							style="padding-bottom: 20px">
							<table id='appointmentGrid'></table>
						</div>
					</div>
				</td>
				<td width="200" align="center"style="background-color: #FFF">
					<div id="todayCount">
						<div class="easyui-tabs" id="tCount" data-options="border:false"
							style="width: 260px; margin: 0px auto 0px auto; height: 184px;">
							<div title="今日汇总" data-options="selected:true,tabWidth:100">
								<table style="width: 100%;border:solid 1px #eee;" cellpadding="3" cellspaceing="0">
								<tr>
									<td width="50%">今日待回访数:</td>
									<td width="50%" align="left"><label id="today_wait"></label></td>
								</tr>
								<tr>
									<td>今日已回访数:</td>
									<td align="left"><label id="today_finish_wait"></label></td>
								</tr>
								<tr>
									<td>今日预计到诊人数:</td>
									<td align="left"><label id="today_willcome"></label></td>
								</tr>
								<tr>
									<td>今日实际到诊人数:</td>
									<td align="left"><label id="today_already_come"></label></td>
								</tr>
								<tr>
									<td>今日新增咨询人数:</td>
									<td align="left"><label id="today_new_advicer"></label></td>
								</tr>
								<tr>
									<td>今日新增预约人数:</td>
									<td align="left"><label id="today_new_appointmentor"></label></td>
								</tr>
							</table>
							</div>
						</div>
						<div class="easyui-tabs" id="yCount" data-options="border:false"
							style="width: 260px; margin: 0px auto 0px auto; height: 136px;">
							<div title="昨日汇总" data-options="selected:true,tabWidth:100">
								<table style="width: 100%;border:solid 1px #eee;" cellpadding="3" cellspaceing="0">
								<!-- <tr>
									<td width="50%">昨日待回访数:</td>
									<td width="50%" align="left"><label id="y_wait"></label></td>
								</tr> -->
								<tr>
									<td width="50%">昨日已回访数:</td>
									<td width="50%" align="left"><label id="y_finish_wait"></label></td>
								</tr>
								<!-- <tr>
									<td>昨日预计到诊人数:</td>
									<td align="left"><label id="y_willcome"></label></td>
								</tr> -->
								<tr>
									<td>昨日实际到诊人数:</td>
									<td align="left"><label id="y_already_come"></label></td>
								</tr>
								<tr>
									<td>昨日新增咨询人数:</td>
									<td align="left"><label id="y_new_advicer"></label></td>
								</tr>
								<tr>
									<td>昨日新增预约人数:</td>
									<td align="left"><label id="y_new_appointmentor"></label></td>
								</tr>
							</table>
							</div>
						</div>
						<div class="easyui-tabs" id="mCount" data-options="border:false"
							style="width: 260px; margin: 0px auto 0px auto; height: 140px;">
							<div title="本月汇总" data-options="selected:true,tabWidth:100">
								<table style="width: 100%;border:solid 1px #eee;" cellpadding="3" cellspaceing="0">
								<tr>
									<td width="50%">本月已回访数:</td>
									<td width="50%" align="left"><label id="m_finish_wait"></label></td>
								</tr>
								<!-- <tr>
									<td>本月预计到诊人数:</td>
									<td align="left"><label id="m_willcome"></label></td>
								</tr> -->
								<tr>
									<td>本月实际到诊人数:</td>
									<td align="left"><label id="m_already_come"></label></td>
								</tr>
								<tr>
									<td>本月新增咨询人数:</td>
									<td align="left"><label id="m_new_advicer"></label></td>
								</tr>
								<tr>
									<td>本月新增预约人数:</td>
									<td align="left"><label id="m_new_appointmentor"></label></td>
								</tr>
							</table>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</table>


	</div>


</body>
</html>
