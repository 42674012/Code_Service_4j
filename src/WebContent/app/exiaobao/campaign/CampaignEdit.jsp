 
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
<link href="<%=context %>/css/umeditor/umeditor.css" type="text/css" rel="stylesheet">
</head>

<body>
	<%@ include file="../../includeScript.jsp"%>
<script type="text/javascript" charset="utf-8" src="<%=context %>/js/umeditor/umeditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="<%=context %>/js/umeditor/umeditor.min.js"></script>
<script type="text/javascript" src="<%=context %>/js/umeditor/zh-cn/zh-cn.js"></script>
<script src='js/CampaignEdit.js'></script>

<div class="easyui-layout" data-options="fit:true">

		<div id='center'
			data-options="region:'center',border:false">

	<form id="campaignForm" class='edit-form' method="post">
		<div id='campaignFormPanel' class='easyui-panel'
			data-options='headerCls:"formHeaderCls",bodyCls:"formBodyCls"'
			title="" style="width: 100%; font-size: 13px;padding: 10">
			<table cellspacing='10' style="margin-top: 30px;">       				
				<tr>
					<td align='right' class='td-label'><font color=red>*</font>活动主题</td>
					<td  colspan="3"><input class="easyui-textbox" type="text"
						id='subject' data-ssbtype='text'
						name="subject" data-options="height:30,width:200"></input></td>
				</tr>
				<tr>
					<td align='right' class='td-label'><font color=red>*</font>活动价格</td>
					<td  ><input class="easyui-numberbox" type="text"
						id='camprice' data-ssbtype='int'
						name="camprice" data-options="height:30,width:200,required:true,precision:2"></input></td>
					<td align='right' class='td-label'><font color=red>*</font>折 扣 数</td>
					<td  ><input class="easyui-numberbox" type="text"
						id='discount' data-ssbtype='int' value="10"
						name="discount" data-options="min:0,max:10,height:30,width:200,required:true,precision:2"></input></td>
				</tr> 
				<tr>
					<td align='right' class='td-label'><font color=red>*</font>佣&nbsp;&nbsp;&nbsp;&nbsp;金</td>
					<td  ><input class="easyui-numberbox" type="text"
						id='brokerage' data-ssbtype='int' value="0"
						name="brokerage" data-options="height:30,width:200,required:true,precision:2"></input></td>
						
					<td align='right' class='td-label'><font color=red>*</font>活动时间</td>
					<td><input class="easyui-datebox" type="text"
						id='begintime' data-ssbtype='date'
						name="begintime"
						data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input> -
					<input class="easyui-datebox" type="text"
						id='endtime' data-ssbtype='date'
						name="endtime"
						data-options="formatter:tcCoreformatter,parser:tcCoreParser,height:30"></input></td>
				</tr>           				
				<tr>
					<td align='right' class='td-label' style="padding-top: -2px;"><font color=red>*</font>活动介绍</td>
					<td  colspan="3">
						<script id="editorinfo" name="editorinfo" type="text/plain"  style="width:740px;height:500px;">
    					</script>
						<input type="hidden" name="introduce" id="introduce" data-ssbtype='text'>
					</td>
				</tr>            				
				
				  
			</table>
		</div>
	</form>
</div>

		<div class='edit_south' data-options="region:'south',split:true,border:false">
			<div class='edit-form-btn' style='float: right;margin-right:5px;'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a>
			<a id='addBtn'
			class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveCampaign()'>保存</a>
		</div>
	</div>
</div>
<!-- 实例化编辑器 -->
	<script type="text/javascript">
	    //获得编辑框内容
	    function getContent() {
	        var arr = [];
	        arr.push(UM.getEditor('editorinfo').getContent());
	        $("#introduce").val(arr.join(""));
	    }
	    //设置编辑框内容
	    function setContent(appendinfo) {
	        UM.getEditor('editorinfo').setContent(appendinfo, false);
	    }
	</script>
</body>
</html>
