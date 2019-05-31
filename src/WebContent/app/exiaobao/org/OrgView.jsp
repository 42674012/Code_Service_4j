<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
	String btnflag = request.getParameter("btnflag")==null?"":request.getParameter("btnflag");
%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>医院信息</title>
<meta name="keywords" content="index">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link type="text/css" href="css/Org.css" rel="stylesheet"/>
<link type="text/css" href="<%=context%>/css/swiper/swiper.min.css" rel="stylesheet"/>
<script type='text/javascript'>
	var context= "<%=context%>";
	var btnflag="<%=btnflag%>";
</script>
<script src="<%=context%>/js/jquery/jquery.min.js"></script>
<script src="<%=context%>/js/swiper/swiper.min.js"></script>
<script src='js/OrgView.js'></script>

</head>

<body style="padding: 0;margin: 0;overflow:-Scroll;overflow-x:hidden;">
<img id="swimg" src="<%=context%>/app/exiaobao/org/images/nopictrue_list.jpg" border="0" style="width:100%; " />

   <div id='orgFormPanel'  title="" style="width:100%;font-size:13px;margin:0;padding-left: 0">
   <form id="orgForm"   method="post" >
            <div class="swiper-container" id="swiper-containerDIV"  style="display: none">
		        <div class="swiper-wrapper">
		             
		        </div>
		        <!-- Add Pagination -->
		        <div class="swiper-pagination"></div>
		        <div class="fdiv"></div>
		    </div>
            <div class="ddiv" >
            	 <table border="0"  style="width: 100%">
            	 	<tr>
            	 		<td colspan="3" style="padding-top: 3px;">
            	 			<table border="0"  style="width: 100%">
		        				<tr>
		        					<td style="width: 30%">
		        						<img  class="orgSmallimg" src="<%=context%>/app/exiaobao/org/images/nopictrue_user.gif"  />
		        					</td>
		        					<td style="padding-left: 15px;padding-right: 10px;">
		        						<ul >
		        							<li id="orgname" style="padding-bottom: 5px;font-size: 15px;">
		        							</li>
		        							<li style="color: #BDBDBD;" id="address">
		        							</li>
		        							<li style="color: #BDBDBD;" id="orgphone">
		        							</li>
		        						</ul>
		        					</td>
		        				</tr>
		        			</table> 
            	 		</td>
            	 	</tr>
            	 	<tr style="text-align: center;">
            	 		<td style="padding-top: 5px;padding-bottom: 10px;">
            	 			<span style="color: #bbbbbb;">商品：</span><span id="goodsNum"></span>
            	 		</td>
            	 		<td style="padding-top: 5px;padding-bottom: 10px;">
            	 			<span style="color: #bbbbbb;">销量：</span><span id="xsNum"></span> 
            	 		</td>
            	 		<td style="padding-top: 5px;padding-bottom: 10px;">
            	 			<span style="color: #bbbbbb;">推广：</span><span id="tgNum"></span> 
            	 		</td>
            	 	</tr>
            	 </table>
            </div>
            <div class="backDiv" style="border-bottom: 0"></div>
            <div class="searchDiv">
            	<div style="border: 0;padding: 0;margin: 0">
            		<input type="text" class="keyword" value="搜索医院商品">
            	</div>
            	<div class="searchBtn"></div>
            </div>
            <div class="backDiv" style="border-top: 0;height: 5px;"></div>
            
            <div  id="tabbox" style="height: auto;width: 100%;border-top: 0px solid #ddd;margin-top: 0px;">
	            <ul class="tabs" id="tabs" style="width: 100%;text-align: center;">
	               <li class="tabsli" style="width: 2%"></li>
			       <li class="tabsli" id="lia1" style="width: 32%"><a  href="#" tab="tab1"  onclick="showClick('lia1','tab1')">商品列表</a></li>
			       <li class="tabsli" id="lia2" style="width: 32%"><a  href="#" tab="tab2"  onclick="showClick('lia2','tab2')">活动资讯</a></li>
			       <li class="tabsli" id="lia3" style="width: 32%"><a  href="#" tab="tab2"  onclick="showClick('lia3','tab3')">医院简介</a></li>
			       <li class="tabsli" style="width: 2%"></li>
			     </ul>
			     <div class="backDiv" ></div>
			    <ul class="tab_conbox">
			        <li id="tab1" class="tab_con" style="padding: 0;margin: 0">
			        	<div>
			        		<table class="sortTb">
			        			<tr style="">
			            	 		<td  onclick="sjSort()" style="width: 33%">
			            	 			售价<span id="shoujaUp" style="display: none;">▲</span><span id="shoujaDown" style="display: none;">▼</span>
			            	 		</td>
			            	 		<td onclick="xlSort()" style="width: 33%">
			            	 			销量<span id="xialiangUp" style="display: none;">▲</span><span id="xialiangDown" style="display: none;">▼</span> 
			            	 		</td>
			            	 		<td onclick="fwSort()"> 
			            	 			访问<span id="fangwenUp" style="display: none;">▲</span><span id="fangwenDown" style="display: none;">▼</span>
			            	 		</td>
			            	 	</tr>
			        		</table>
			        	</div>
			        	<ul id="showList" style="border: 0;line-height: 90px;">
			        		 
			        	</ul>
			        	<div class="jiazaiged" onclick="loadMore()">
			        		加载更多
			        	</div>
			        </li>
			        <li id="tab2" class="tab_con"  style="padding-left:2px;padding-right:2px;margin: 0">
			        	 
			        </li>
			         <li id="tab3" class="tab_con" style="padding: 0;margin: 0">
			         	<div style="padding: 10px;padding-top: 5px;">
			         		<span style="color:#BDBDBD ">医院简介：</span>
			         		<p id="introduction" style="padding: 0;margin: 0;text-indent:25px"></p>
			         	</div>
			         	<div class="backDiv"></div>
			         	<div style="padding-top: 5px;padding-bottom: 5px;padding-left: 10px;">
			         		<span style="color:#BDBDBD ">地址：</span><span id="tabaddress"></span>
			         	</div>
			         	<div class="backDiv"></div>
			         	<div style="padding-bottom: 40px;color:#BDBDBD;padding-left: 10px; " >
			         		<span style='color:#BDBDBD'>联系电话：</span><span id="tabphone"></span>
			         	</div>
			        </li>
			    </ul>
            </div>
       </form>
    </div>
</body>
</html>
