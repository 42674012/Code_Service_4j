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
<%@ include file="../../includeScript.jsp" %>

<script src='js/DictEdit.js'></script>

	
	    <div id='dictFormPanel'  title="Dict信息" style="width:100%;font-size:13px;">
	   <form id="dictForm" class='edit-form' method="post">
            <input type=hidden id="dictTypeId" name="dictTypeId"/>
            <table cellspacing='20'>
			  	<tr>
                    <td align='right' class='td-label'>键</td>
                    <td><input class="easyui-textbox" type="text" id='dictKey' data-ssbtype='text' name="dictKey" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>值</td>
                    <td><input class="easyui-textbox" type="text" id='dictValue' data-ssbtype='text' name="dictValue" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>描述</td>
                    <td><input class="easyui-textbox" type="text" id='dictName' data-ssbtype='text' name="dictName" data-options="height:30,width:200"></input></td>
                </tr>
            </table>
        </form>
	    </div>
	     <div class='edit-form-btn dialog-btn'>
        	<a id='cancelBtn' class="easyui-linkbutton oper"  data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a>
			<a id='deleteBtn' class="easyui-linkbutton oper"  data-options="iconCls:'icon-form-dustbin'" onclick='deleteDict()'>删除</a>
			<a id='addBtn' class="easyui-linkbutton oper" style='margin-left:10px;margin-right:10px;' data-options="iconCls:'icon-form-ok'" onclick='saveDict()'>保存</a>
        	</div>
</body>
</html>
