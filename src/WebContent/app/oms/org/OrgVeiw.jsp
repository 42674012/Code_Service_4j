<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.xt.ssb.util.Constants"%>
<%
	String context = request.getContextPath();
	String uphone=request.getSession().getAttribute(Constants.session_employee_phone)+"";
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">

<title></title>
<meta name="keywords" content="index">
<script type="text/javascript">
var uphone="<%=uphone%>";
var context="<%=context%>";
</script>
<style type="text/css">
.div1{
	float: left;border: 1px solid #ddd;width: 200px;height: 150px;margin-left: 20px;margin-top: 20px;
}
.div2{
	float: left;width: 600px;padding: 0;padding-left: 20px;margin-top: 20px;
}
.divx{
	position:fixed;height: 30px;width: 200px;top:190px;background: #1F90C8;text-align: center;z-index:100;
	padding-top: 8px;color: white;font-weight: 600;cursor: pointer;
}
</style>
<%@ include file="../../includeScript.jsp"%>
 <script type="text/javascript" src="<%=context %>/js/swfupload/swfupload.js"></script>
 <script type="text/javascript" src="<%=context %>/js/swfupload/handlers.js"></script>
<script src='js/OrgVeiw.js'></script>
</head>
<body>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div id='center' data-options="region:'center',border:false" style="padding: 5px;">
			<div id='orgFormPanel' class='easyui-panel' title="医院信息"
				style="width: 100%; font-size: 13px;"
				data-options="iconCls:'icon-form-edit',region:'north'">
				<form id="orgForm" class='edit-form' method="post">
					<div class="div1"  >
						<div id="logo"></div>
						<div  class="divx">
							<span id="orgLogoBtn"></span>
						</div>
					</div>
					<div class="div2">
						<table cellspacing='0' style="width: 100%;border: 0;padding: 0">
							<tr>
								<td align='right' class='td-label' >医院名称:</td>
								<td><label type="text" id='name' name="name"
									data-options="height:30,width:200"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>电话号: </td>
								<td><label type="text" id='phone' name="phone"
									data-options="height:30,width:200"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label'>公&nbsp;众&nbsp;号:</td>
								<td><label id='wxaccount' name="wxaccount" type="text"
									data-options="height:30,width:200"></label></td>
							</tr>
							<tr>	
								<td align='right' class='td-label'>地&nbsp;&nbsp;址:</td>
								<td><label id='address' name="address" type="text"
									data-options="height:30,width:200"></label></td>
							</tr>
							<tr>
								<td align='right' class='td-label' valign="top">医院简介:</td>
								<td >
									<div id='introduction' name="introduction" style="width:500px;"></div>
								</td>
							</tr>
						</table>
					</div>
				</form>
				<div style="width: 800px;padding-top: 180px;padding-left: 20px;">
					<div id='orgimg' style="padding-top: 50px;">
						
					</div>		
				</div>
				<div style="width: 800px;padding-top: 40px;padding-left: 20px;padding-bottom: 20px;">
					<div class='edit-form-btn' style='text-align:center;'>
						<a id='deleteBtn' class="easyui-linkbutton oper"
						data-options="iconCls:'icon-form-ok'" onclick='editOrg()'>编辑</a>
						
						<a href="#" class="easyui-linkbutton oper" style='margin-left:30px;'
							data-options="iconCls:'icon-form-search-btn'"
							onclick='queryOrg()'>查看</a>
					</div>	
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		function initSwfUpload() {
			new SWFUpload({
				upload_url: context+"/fileupload",
				post_params: {"name" : "test"},
				// File Upload Settings
				file_size_limit : "2 MB",	// 1000MB
				file_types : "*.gif;*.png;*.jpg;*.jpeg",
				file_types_description : " ",
				file_upload_limit : "1",
				file_queue_error_handler : fileQueueError,
				file_dialog_complete_handler : fileDialogComplete,//选择好文件后提交
				file_queued_handler : fileQueued,
				upload_progress_handler : uploadProgress,
				upload_error_handler : uploadError,
				upload_success_handler : uploadSuccess,
				upload_complete_handler : uploadComplete,
				// Button Settings
				button_placeholder_id : "orgLogoBtn",
				button_width: 200,
				button_height: 18,
				button_text : '<span class="button"  >上传Logo</span>',
				button_text_style : '.button { font-size: 12pt;margin-left:55px; } .buttonSmall { font-size: 14pt; }',
				button_text_top_padding: 0,
				button_text_left_padding: 18,
				button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
				button_cursor: SWFUpload.CURSOR.HAND,
				// Flash Settings
				flash_url : context+"/js/swfupload/swfupload.swf",
				debug: false  //是否显示调试窗口
			});
		};
	</script>
</body>