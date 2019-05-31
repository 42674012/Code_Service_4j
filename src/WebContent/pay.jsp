<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>
<%
         String path = request.getContextPath();
         String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

		String appId = request.getParameter("appid");
		String timeStamp = request.getParameter("timeStamp");
		String nonceStr = request.getParameter("nonceStr");
		String packageValue = request.getParameter("package");
		String paySign = request.getParameter("sign");


		
       //网页授权后获取传递的参数
		String attach = request.getParameter("attach"); 	
		String orderNo = request.getParameter("orderNo"); 
		String money = request.getParameter("money");
		String describe = request.getParameter("describe");//商品名称(备注)
		
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
     <form   role="form">
      <h3>订单信息</h3>
     <div class="form-group">
    <label  for="name">订单流水号:</label> <label for="name"><%=orderNo%></label>
    </div>
    <div class="form-group">
    <label for="name">商品名称:</label> <label for="name"><%=describe%></label>
    </div>
    <div class="form-group">
    <label for="name">商品金额:</label> <label for="name"><%=money%></label>
   </div>
    <div class="form-group">
     <label for="name">备注:</label> <label for="name"><%=attach%></label>
     </div>
   <div style="text-align:center;size:100px;">
   <button type="button" class="btn btn-success save_submit" onclick="callpay()">确定支付 </button>&nbsp;&nbsp;&nbsp;&nbsp;
   <button type="button" class="btn btn-warning" onclick="back()" >返回购物 </button>
   </div>
</form>
  </body >
  <script type="text/javascript">
  	function callpay(){
		 WeixinJSBridge.invoke('getBrandWCPayRequest',{
  		 "appId" : "<%=appId%>",
  		 "timeStamp" : "<%=timeStamp%>", 
  		 "nonceStr" : "<%=nonceStr%>", 
  		 "package" : "<%=packageValue%>",
  		 "signType" : "MD5", 
  		 "paySign" : "<%=paySign%>" 
   			},function(res){
				WeixinJSBridge.log(res.err_msg);
	            if(res.err_msg == "get_brand_wcpay_request:ok"){  
	                window.location.href="<%=context%>/success.jsp"; 
	            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
	                alert("用户取消支付!");  
	            }else{  
	               alert("支付失败!");  
	            }  
			})
		}
	function back(){
		 window.location.href="<%=context%>/shopping.jsp"; 
		}
  </script>
  
</html>
