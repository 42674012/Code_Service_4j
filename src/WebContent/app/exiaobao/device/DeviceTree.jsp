 
  
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
	<%@ include file="../../includeScript.jsp"%>
	<script src='<%=context %>/js/easyui/plugin/treegrid-dnd.js'></script>
	<script src='js/DeviceTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div data-options="region:'west'" style="width: 250px;padding: 5px;">
			
			<ul id="deviceTree" >
			</ul>

		</div>
		<div data-options="region:'center'" style="padding: 5px;">
			<div id='deviceFormPanel' class='easyui-panel' title="Device信息"
				style="width: 100%; font-size: 13px;" data-options="iconCls:'icon-form-edit'">
				<form id="deviceForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden'  id='parentId' name='parentId'>
					<input type='hidden'  id='deviceid' name='deviceid'>
					<table cellspacing='10'>
				
			  
			  	<tr>
                    <td align='right' class='td-label'>百度userid</td>
                    <td><input class="easyui-textbox" type="text" id='userid' data-ssbtype='text' name="userid" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>百度通道id</td>
                    <td><input class="easyui-textbox" type="text" id='channelid' data-ssbtype='text' name="channelid" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  
			  
			       <tr>
                    <td align='right' class='td-label' >创建时间</td>
                    <td><input class="easyui-datebox" type="text" id='createdate' data-ssbtype='date' name="createdate" data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
                </tr>
			  
			  
			  
			  
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>用户编号</td>
                    <td><input class="easyui-textbox" type="text" id='employeeId' data-ssbtype='text' name="employeeId" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  	 
			  	 
			  	<tr>
			  		<td></td>
			  		<td>
				  		<div class='edit-form-btn' style='text-align:left;'>
							<a id='deleteBtn' class="easyui-linkbutton oper"
							data-options="iconCls:'icon-form-dustbin'" onclick='deleteDevice()'>删除</a>
							<a id='addBtn' class="easyui-linkbutton oper"
							style='margin-left: 10px; margin-right: 10px;'
							data-options="iconCls:'icon-form-ok'" onclick='saveDevice()'>保存</a>
						</div>
			  		</td>
			  	</tr> 
					
					</table>
				</form>
			</div>
			


		</div>
	</div>

</body>
</html>
