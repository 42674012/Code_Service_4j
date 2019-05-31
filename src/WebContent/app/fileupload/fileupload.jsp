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
	<%@ include file="../includeScript.jsp"%>
	<script src='js/fileupload.js'></script>

<div class="easyui-layout" data-options="fit:true">
<div id='center' data-options="region:'center',border:false" style="padding-top: 30px;padding-left: 40px;">
	<form id="ff" action="<%=context %>/fileupload" method="post" enctype="multipart/form-data">
		<table style="width: 100%">
			<tr>
	             <td>文件:</td>
	             <td><input id="file" name="file" class="f1 easyui-filebox" style="width: 220px"></input></td>
	         </tr>
	    </table>
	</form>	
</div>
	<div data-options="region:'south',split:true,border:false" style="height:40px;">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		 <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='upload()'>上传</a>
		</div>
	</div>
</div>
</body>
</html>