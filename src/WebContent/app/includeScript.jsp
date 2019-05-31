<%@page import="java.util.HashMap"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="com.xt.privilege.empower.bussiness.EmpowerDS"%>
<%@page import="com.xt.ssb.util.Constants"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<% 
	//Long employeeIde = Long.parseLong(request.getSession().getAttribute(Constants.session_employee_id)+"");
	String operationSet = request.getAttribute("operations")==null?"-1":request.getAttribute("operations").toString();
	
	//String uri = //获取当前页的url
			//截取app 后面的 发到后台 获取操作资源的 identityName   print
%>
<html>
<head>

</head>
<body>
	
	<script type='text/javascript'>
		var context= "<%=context%>";
		var operationSet = "<%=operationSet%>";
		
	</script>
	<link rel="stylesheet" type="text/css"
		href="<%=context%>/js/easyui/themes/metro/easyui.css">
	<link rel="stylesheet" type="text/css"
		href="<%=context%>/js/easyui/themes/icon.css">
				<link rel="stylesheet" type="text/css"
		href="<%=context%>/js/scroll/jquery.mCustomScrollbar.min.css">
		<link rel="stylesheet" type="text/css"
		href="<%=context%>/css/style.css">
		
		<link rel="stylesheet" type="text/css"
		href="<%=context%>/js/jquery-autocomplete/jquery.autocomplete.css">
		<link rel="stylesheet" type="text/css"
		href="<%=context%>/js/controls/controls.css">


	<script src="<%=context%>/js/easyui/jquery.min.js"></script>
	<script src="<%=context%>/js/form.js"></script>
	<script src="<%=context%>/js/easyui/jquery.easyui.min.js"></script>
	<script src="<%=context%>/js/easyui/easyui-lang-zh_CN.js"></script> 
	
	<script src="<%=context%>/js/controls/controls.js"></script>
	
	<script src="<%=context%>/js/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
	
	<script src="<%=context%>/js/core/core.js"></script>
	
	<script src="<%=context%>/js/jquery-autocomplete/browser.js"></script>
	<script src="<%=context%>/js/jquery-autocomplete/lib/jquery.ajaxQueue.js"></script>
	<script src="<%=context%>/js/jquery-autocomplete/jquery.autocomplete.min.js"></script>
	
	




<!-- 
	<link href='<%=context%>/js/fullcalendar/fullcalendar.min.css' rel='stylesheet' />
	<link href='<%=context%>/js/fullcalendar/fullcalendar.print.css' rel='stylesheet' media='print' />
	<script src='<%=context%>/js/fullcalendar/lib/moment.min.js'></script>
	<script src='<%=context%>/js/fullcalendar/fullcalendar.js'></script>
	<script src='<%=context%>/js/fullcalendar/lang-all.js'></script>
	
	<link href='<%=context%>/js/jquery-ui-auto/jquery-ui.theme.min.css' rel='stylesheet' />
	<script src='<%=context%>/js/jquery-ui-auto/jquery-ui.min.js'></script>
	
	 -->
</body>
</html>
