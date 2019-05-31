<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<title>系统配置</title>
	<%@ include file="../../includeScript.jsp"%>
<script type="text/javascript">
function onSubmitInsertAjax() {
	$('#insertForm').form('submit', {
		url : '${ctx}admin/weixin/replysubscribe/insert',
		success : function(data) {
			var data = eval('(' + data + ')');
			if (data.success) {
				showBottomRightMSG(data.msg);				
			} else {
				showCenterMSG(data.msg);
			}
		}
	});
}	
</script>
</head>
<body>
  <div id="userPanel" class="easyui-panel" title="当前位置：微信管理->关注时回复" style="padding: 1px; background: #fafafa;" data-options="border:false,closable:false,collapsible:false,minimizable:false,maximizable:false,fit:true">
  <%@ include file="insertContent.jsp"%>
  </div>
</body>
</html>