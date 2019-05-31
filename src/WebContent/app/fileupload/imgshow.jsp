 
 
  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">

</head>

<body>
    <%@ include file="../includeScript.jsp"%>
    <div  class="easyui-panel" data-options="fit:true">
    	<div id="cc" style="width:402px;height:352px">
    	
    	</div>
    </div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	var imgurl =  tcCore.getParameter("imgurl");
	if(imgurl){
		var html="<img src='"+imgurl+"' style='width:402px;height:352px' />";
		$("#cc").append(html);
	}
});
 
</script>
</html>
