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
<script type="text/javascript">
var context="<%=context%>";
</script>
 <script type="text/javascript" src="<%=context %>/js/swfupload/swfupload.js"></script>
 <script type="text/javascript" src="<%=context %>/js/swfupload/handlers.js"></script>
 <style type="text/css">
.div1{
	border: 1px solid #ddd;width: 200px;height: 150px;
}
.divx{
	position:fixed;height: 30px;width: 200px;top:140px;background: #1F90C8;text-align: center;z-index:100;
	padding-top: 8px;color: white;font-weight: 600;cursor: pointer;
}
</style>
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>
	<script src='js/Upload.js'></script>
	<script src='js/OrgTreeEdit.js'></script>


	<div id='orgFormPanel' title="医院信息" style="width: 100%; font-size: 13px;">
		<form id="orgForm" class='edit-form' method="post">
			<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
			<!-- <input type='hidden' id='parentId' name='parentId'>  -->
			<input type='hidden' id='orgId' name='orgId'>
			<table cellspacing='10' border="0" style="width: 100%">
				<tr>
					<td align='right' class='td-label'>名称</td>
					<td  >
						<input type="hidden" id="orgId" name="orgId" data-ssbtype='text'>
						<label id='name' data-ssbtype='text'  name="name" ></label>
					</td>
					 <td rowspan="4" align="right">
					 	<div class="div1"  >
							<div id="logo"></div>
							<div  class="divx">
								<span id="orgEditLogoBtn"></span>
							</div>
						</div>
					 </td>
				</tr>
				<tr>
					<td align='right' class='td-label'>电话号</td>
					<td colspan="2">
						<input class="easyui-textbox" type="text" id='phone' data-ssbtype='textbox' 
						name="phone" data-options="height:30,width:200,required:true"></input>
					</td>
				</tr>
				<tr>
					<td align='right' class='td-label'>公众号</td>
					<td colspan="2">
						<input class="easyui-textbox" type="text" id='wxaccount' data-ssbtype='textbox' 
						name="wxaccount" data-options="height:30,width:200,required:true"></input>
					</td>
				</tr>
				<tr>
					<td align='right' class='td-label'>地址</td>
					<td colspan="2">
						<input class="easyui-textbox" type="text" id='address' data-ssbtype='textbox' 
						name="address" data-options="height:30,width:200,required:true"></input>
					</td>
				</tr>
				<tr>
					<td align='right' class='td-label'>医院简介</td>
					<td colspan="2">
						<input class="easyui-textbox" type="text" id='introduction' data-ssbtype='textbox' 
						name="introduction" data-options="width:450,multiline:true,height:230"></input>
					</td>
				</tr>
				<tr>
					<td align='right' class='td-label'>医院图片</td>
					<td colspan="2">
						<span id="orguploadButton" style="margin-left: 20px;"></span>
					 	<div id="orgnails">
							<table id="orgTable" border="0" width="530" style="display: inline; padding: 2px; margin-top: 5px;">
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<div id='orgimg'>
							
						</div>
					</td>
				</tr>
			</table>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveOrg()'>保存</a>
	</div>
</body>
</html>
