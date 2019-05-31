 
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
<script type="text/javascript" src="<%=context %>/js/swfupload/swfupload.js"></script>
 <script type="text/javascript" src="<%=context %>/js/swfupload/handlers.js"></script>
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>
	<script src='js/Upload.js'></script>
	<script src='js/GoalEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="goalForm" class='edit-form' method="post">
		<div id='goalFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="" style="width: 100%; font-size: 13px;">
			<table cellspacing='10' style="width: 100%">
				<tr >
					<td align='right' class='td-label' >推广量 </td>
					<td>
						 <input class="easyui-numberbox" id="tgnum" name="tgnum" value="0" data-options="groupSeparator:',',width:200,height:30,"></input>
					</td>
					<td align='right' class='td-label'>访问量 </td>
					<td>
						<input class="easyui-numberbox" id="fwnum" name="fwnum" value="0" data-options="groupSeparator:',',width:200,height:30,"></input>
					</td>
				</tr>
				<tr >
					<td align='right' class='td-label'>订单量 </td>
					<td>
						 <input class="easyui-numberbox" id="ddnum" name="ddnum" value="0" data-options="groupSeparator:',',width:200,height:30,"></input>
					</td>
					<td align='right' class='td-label'>成交额 </td>
					<td>
						<input class="easyui-numberbox" id="cjnum" name="cjnum" value="0" data-options="groupSeparator:',',width:200,height:30,"></input>
					</td>
				</tr>
				<tr>
					<td align='right' class='td-label'>金钱奖励</td>
					<td><input class="easyui-numberbox" type="text"
						id='jqreward' name="jqreward" data-ssbtype='text'   data-options="precision:2,height:30,width:200"></input>￥
					</td>
					<td align='right' class='td-label'>月份</td>
					<td >
						<input type="text" id='cmonth' data-ssbtype='month'
										name="cmonth" class='normal-input' style='width: 200;' readonly="readonly"></input>
					</td>
					
				</tr> 
				<tr>
					<td align='right' class='td-label'>实物奖励</td>
					<td colspan="3">
						<span id="jlButton" style="margin-left: 20px;"></span>
					 	<div id="jlnails">
							<table id="jlTable" border="0" width="530" style="display: inline; padding: 2px; margin-top: 5px;">
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td align='right' class='td-label'>奖励描述</td>
					<td colspan="3"><input class="easyui-textbox" type="text"
						id='remark' data-ssbtype='text'
						name="remark" data-options="multiline:true,height:140,width:670"></input></td>
					 
				</tr> 
				<tr>
					<td colspan="4">
						<div id='jlimg'>
							
						</div>
					</td>
				</tr>
				
				
				
				
                <tr>
                	<td colspan="4">
                		<table cellspacing='10' style="width: 100%">
                			          
							
                		</table>
                		
                	</td>
                </tr>    
			</table>
		</div>
	</form>
</div>
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																	
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='deleteBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																											dustbin'"
			onclick='deleteGoal()'>删除</a> <a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveGoal()'>保存</a>
		</div>
	</div>
</div>

</body>
</html>
