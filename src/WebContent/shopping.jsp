<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String context = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title>公众号支付测试网页</title>
        
            <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
    
     <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="<%=context%>/js/bootstrap/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>
    
    

    </head>
    <body class="container">
        
   <form action="${ctx}/eLove/wXUserServlet" method="post" role="form">
   <div class="form-group">
    <label  for="name">商家订单号:</label><input id="orderNo"  name="orderNo" type="text"  class="form-control" value="test_orderNo" />
    <label for="name">商品名称:</label><input id="describe" name="describe" type="text"  class="form-control" value="test_describe" />
    <label for="name">商品金额:</label><input id="money"  name="money" type="text"  class="form-control" value="0.01" />
    <label for="name">备注: </label><input id="attach" name="attach"  type="text"   class="form-control"value="test_attach" />
   </div>

  			<div style="text-align:center;size:100px;">
  			<input type="submit" class="btn btn-success save_submit" value="确定购买" >
  			</div>
  </form>
    </body>
</html>