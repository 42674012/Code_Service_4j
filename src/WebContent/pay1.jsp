<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String context = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+context+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>微信支付</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
    
     <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="<%=context%>/js/bootstrap/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>
	
	    <script language="javascript" src="<%=context%>/js/qq/jquery.js"></script>
    <script type="text/javascript" charset="UTF-8" src="<%=context%>/js/qq/jweixin-1.0.0.js"></script>
    
  </head>
  
  <body class="container" >
     <div style="text-align:center;size:100px;">
   <button type="button" class="btn btn-success save_submit" onclick="callpay()">确定支付 </button>&nbsp;&nbsp;&nbsp;&nbsp;
   <button type="button" class="btn btn-warning" onclick="back()" >返回购物 </button>
   </div>
  </body >
  <script type="text/javascript">
  	function callpay(){
		 WeixinJSBridge.invoke('getBrandWCPayRequest',{
  		 "appId" : "<%=request.getParameter("appid")%>",
  		 "timeStamp" : "<%=request.getParameter("timeStamp")%>", 
  		 "nonceStr" : "<%=request.getParameter("nonceStr")%>", 
  		 "package" : "<%=request.getParameter("package")%>",
  		 "signType" : "MD5", 
  		 "paySign" : "<%=request.getParameter("sign")%>" 
   			},function(res){
				WeixinJSBridge.log(res.err_msg);
	            if(res.err_msg == "get_brand_wcpay_request:ok"){  
	            	alert("支付成功!");
	            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
	                alert("用户取消支付!");  
	            }else{  
	                alert("支付失败!"+res.err_msg);  
	            }  
			})
		};
  	
  	    if (typeof WeixinJSBridge == "undefined"){
			   if( document.addEventListener ){
			       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			   }else if (document.attachEvent){
			       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			   }
			}else{
			   onBridgeReady();
			}
  </script>
</html>
