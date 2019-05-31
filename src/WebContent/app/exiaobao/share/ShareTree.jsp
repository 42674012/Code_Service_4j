 
  
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
	<script src='js/ShareTree.js'></script>
	<div id="cc" class="easyui-layout" data-options="fit:true">
		<div data-options="region:'west'" style="width: 250px;padding: 5px;">
			
			<ul id="shareTree" >
			</ul>

		</div>
		<div data-options="region:'center'" style="padding: 5px;">
			<div id='shareFormPanel' class='easyui-panel' title="Share信息"
				style="width: 100%; font-size: 13px;" data-options="iconCls:'icon-form-edit'">
				<form id="shareForm" class='edit-form' method="post">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden'  id='parentId' name='parentId'>
					<input type='hidden'  id='shareid' name='shareid'>
					<table cellspacing='10'>
				
			  
			  	<tr>
                    <td align='right' class='td-label'>分享人id</td>
                    <td><input class="easyui-textbox" type="text" id='employeeId' data-ssbtype='text' name="employeeId" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>分享人名称</td>
                    <td><input class="easyui-textbox" type="text" id='employeeName' data-ssbtype='text' name="employeeName" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  
			  
			       <tr>
                    <td align='right' class='td-label' >分享时间</td>
                    <td><input class="easyui-datebox" type="text" id='createdate' data-ssbtype='date' name="createdate" data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
                </tr>
			  
			  
			  
			  
				<tr>
					<td align='right' class='td-label'>分享商品id</td>
					<td><input class=" easyui-numberbox" type="text"
						id='goodsid' data-ssbtype='int'
						name="goodsid" data-options="height:30,width:200"></input></td>
				</tr>
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>分享商品名称</td>
                    <td><input class="easyui-textbox" type="text" id='goodsname' data-ssbtype='text' name="goodsname" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>分享位置</td>
                    <td><input class="easyui-textbox" type="text" id='sharesite' data-ssbtype='text' name="sharesite" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  	<tr>
                    <td align='right' class='td-label'>分享url</td>
                    <td><input class="easyui-textbox" type="text" id='shareurl' data-ssbtype='text' name="shareurl" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  
			  
			  
			  
			  
			  	 <tr>
                    <td align='right' class='td-label'>点击量</td>
                    <td><input class=" easyui-numberbox" type="text" id='chicknum'  data-ssbtype='int' name="chicknum" data-options="height:30,width:200"></input></td>
                </tr>
			  
			  	 
			  	 
			  	<tr>
			  		<td></td>
			  		<td>
				  		<div class='edit-form-btn' style='text-align:left;'>
							<a id='deleteBtn' class="easyui-linkbutton oper"
							data-options="iconCls:'icon-form-dustbin'" onclick='deleteShare()'>删除</a>
							<a id='addBtn' class="easyui-linkbutton oper"
							style='margin-left: 10px; margin-right: 10px;'
							data-options="iconCls:'icon-form-ok'" onclick='saveShare()'>保存</a>
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
