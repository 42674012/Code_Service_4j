 
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
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type='text/javascript'>
	var context= "<%=context%>";
</script>
<link rel="stylesheet" type="text/css" href="css/BespeakEdit.css">
<script src="<%=context%>/js/jquery/jquery.min.js"></script>
<script src='js/BespeakEdit.js'></script>

</head>

<body style="text-align: center;">
<body>
	<div class="main">
		<h2>预约</h2>
		<div class="in2">
			<input type="hidden"   id="goodsid" name="goodsid"  value="">
			 <input type="hidden"   id="campaignid" name="campaignid"  value="">
			 <input type="hidden"   id="phone" name="phone"  value="">
			 <input type="hidden"   id="price" name="price"  value="">
			 <input type="text"  name="usrname" id="usrname"   placeholder="您的姓名"  >
				<hr>
			 <input type="text" name="bespeakphone" id="bespeakphone" placeholder="手机号码" min="11" max="11" >
		</div>
		<button class="bbb1" type="button" id="yuyue" onclick="subform()">预约</button>
		<button class="bbb2" type="button" id="zhifu" onclick="subform2()">预约并支付</button>
	</div>
</body>
</html>
