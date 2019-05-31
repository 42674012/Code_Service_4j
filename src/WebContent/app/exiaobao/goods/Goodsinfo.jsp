<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
	String operationSet = request.getAttribute("operations")==null?"-1":request.getAttribute("operations").toString();
%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>首页</title>
<meta name="keywords" content="index">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type='text/javascript'>
	var context= "<%=context%>";
	var operationSet="<%=operationSet%>";
</script>
<link rel="stylesheet" href="<%=context%>/js/jqueryMoblie/jquery.mobile-1.4.5.css">
<script src="<%=context%>/js/jquery/jquery.min.js"></script>
<script src="<%=context%>/js/jqueryMoblie/jquery.mobile-1.4.5.min.js"></script>
<script src='js/Goodsinfo.js'></script>
</head>

<body>
	<div data-role="page" data-theme="a">
		<div data-role="content">
			<div id="demo1"> 
				<img src="http://pic2.ooopic.com/01/03/51/25b1OOOPIC19.jpg" alt="图片"> 
			</div> 
			<div class="ui-grid-a">
				<div class="ui-block-a" style="border: 1px solid black;border-right: 0px;">
			       <span>关爱价：￥100</span>
			     </div>
			     <div class="ui-block-b" style="border: 1px solid black;">
			       <span>佣金比例：20%</span>
			     </div>			
			</div>
			<div class="ui-grid-a" > 
				<div class="ui-block-a" style="border: 1px solid black;border-top: 0px;border-right: 0px; ">
			       <span>原价：￥100</span>
			     </div>
			     <div class="ui-block-b" style="border: 1px solid black;border-top: 0px; ">
			       <span>佣金：￥20</span>
			     </div>			
			</div>
			<div class="ui-grid-b" style="margin-top: 10px;">
		     <div class="ui-block-a"  ><span>地点: 深圳市</span></div>
		     <div class="ui-block-b"  style="text-align: center;"><span>销量: Text</span></div>
		     <div class="ui-block-c"  style="text-align: right;"><span>有78购买</span></div>
		   </div>
			<div data-role="collapsible-set">
		      <div data-role="collapsible" data-collapsed="false">
		        <h3>项目详细</h3>
		  	    <p></p>
		      </div>
		      <div data-role="collapsible">
		        <h3>规格明细</h3>
		        <p>我是可折叠的内容。</p>
		      </div>
		      <div data-role="collapsible">
		        <h3>分享说明</h3>
		        <p>我是可折叠的内容。</p>
		      </div>
	  	</div>
 	</div>
</body>
</html>
