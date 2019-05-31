<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>商品详细</title>
<meta name="keywords" content="index">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link type="text/css" href="<%=context%>/css/swiper/swiper.min.css" rel="stylesheet"/>
<link type="text/css" href="css/style.css" rel="stylesheet"/>
<link type="text/css" href="css/goodsView.css" rel="stylesheet"/>
<script type='text/javascript'>
	var context= "<%=context%>";
</script>
<script src="<%=context%>/js/jquery/jquery.min.js"></script>
<script src="<%=context%>/js/swiper/swiper.min.js"></script>
<script src='js/CampaignShow.js'></script>

</head>

<body style="padding: 0;margin: 0;overflow:-Scroll;overflow-x:hidden;">
<img id="swimg" src="<%=context%>/app/exiaobao/org/images/nopictrue_list.jpg" border="0" style="width:100%; " />

   <div id='goodsFormPanel'  title="" style="width:100%;font-size:13px;margin:0;padding-left: 0">
   <form id="goodsForm"   method="post" >
            <div class="swiper-container" id="swiper-containerDIV"  style="display: none">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide"><img src="images/img_main_3.jpg" /></div>
		            <div class="swiper-slide"><img src="images/img_main_4.jpg" /></div>
		            <div class="swiper-slide"><img src="images/img_main_5.jpg" /></div>
		        </div>
		        <!-- Add Pagination -->
		        <div class="swiper-pagination"></div>
		        <div class="fdiv"></div>
		    </div>
            <div class="ddiv" >
            	 <table border="0" >
            	 	<tr>
            	 		<td >
            	 			<span id="goodsname" style="font-size: 18px;color: #5A5A5A;font-weight:bold;">
            	 			</span>
            	 		</td>
            	 	</tr>
            	 	<tr>
            	 		<td style="padding-top: 0px;color: #BDBDBD">
            	 			销量:<span id="sales" style="font-size: 14px;padding-left: 7px;margin-right: 50px;"></span>
            	 			推广量:<span id="chicknum"  style="font-size: 14px;padding-left: 7px;"></span>
            	 		</td>
            	 	</tr>
            	 	<tr>
            	 		<td style="padding-top: 4px;color: #BDBDBD;padding-bottom: 6px;">
            	 			<span id="discount" style="color: #F8474A;font-size: 17px;"></span>
            	 			<span id="price" style="text-decoration:line-through;color: #BDBDBD;margin-left: 6px"></span>
            	 			<span id="zhekou"  style="color: #FF8C4B;margin-left: 10px;margin-right: 40px;">7折</span>
            	 			<span id="showbrokerage">佣 金:</span><span id="brokerage" style="color: #5A5A5A;padding-left: 7px;"></span>
            	 		</td>
            	 	</tr>
            	 </table>
            </div>
            <div class="backDiv"></div>
            <div  id="tabbox" style="height: auto;width: 100%;border-top: 0px solid #ddd;margin-top: 0px;">
	            <ul class="tabs" id="tabs" style="width: 100%;text-align: center;">
	               <li class="tabsli" style="width: 10%"></li>
			       <li class="tabsli" id="lia1" style="width: 80%"><a  href="#" tab="tab1"  >活动详细</a></li>
			       <li class="tabsli" style="width: 10%"></li>
			     </ul>
			     <div class="backDiv"></div>
			    <ul class="tab_conbox">
			        <li id="tab1" class="tab_con">
			        </li>
			    </ul>
            </div>
       </form>
       <div class="butndiv">
	    	<div id="bespeakBtn" onclick="bespeak()" style="width:130px;height:30px;background-image: url(’images/lijiyuyue.png')">
	    	</div>
	    </div>
    </div>
</body>
</html>
