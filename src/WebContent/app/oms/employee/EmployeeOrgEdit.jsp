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
<%@ include file="../../includeScript.jsp" %>

<script src='js/EmployeeOrgEdit.js'></script>

	
	   
	   <form id="employeeForm" class='view-form' method="post">
            <table cellspacing='20'>
               
               
               
			  
			  	<tr>
                    <td align='right' class='td-label'>姓名</td>
                    <td><label id='name' data-ssbtype='text' name="name" ></label></td>
                </tr>
			  
			  
			       <tr>
                    <td align='right' class='td-label' >生日</td>
                    <td><label id='birthday' data-ssbtype='date' name="birthday" ></label></td>
                </tr>
			  
			  
			  	 <tr>
                    <td align='right' class='td-label'>性别-combobox</td>
                    <td><label id='sex' data-ssbtype='int'  name="sex"></label></td>
                </tr>
			  
			  	<tr>
                    <td align='right' class='td-label'>邮箱</td>
                    <td><label id='email' data-ssbtype='text' name="email" ></label></td>
                </tr>
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>电话号码</td>
                    <td><label id='phone' data-ssbtype='text' name="phone" ></label></td>
                </tr>		
			  
			  	<tr>
                    <td align='right' class='td-label'>身份证号</td>
                    <td><label id='cardId' data-ssbtype='text' name="cardId" ></label></td>
                </tr>
			  
            </table>
        </form>
	    </div>
	     <div class='edit-form-btn dialog-btn'>
        	<a class="easyui-linkbutton oper"  data-options="iconCls:'icon-form-undo'" onclick='cancel()'>关闭</a>
        	</div>
</body>
</html>
