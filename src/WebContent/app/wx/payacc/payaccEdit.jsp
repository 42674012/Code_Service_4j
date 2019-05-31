<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<title>Bootstrap 101 Template</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">



<%@ include file="../../includeScript.jsp"%>

<!-- Bootstrap -->
<link rel="stylesheet"
	href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<%-- <script src="<%=context%>/js/bootstrap/jquery.min.js"></script> --%>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>





<!-- 自定义修改css -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/layoutit.css">



<script src='js/payaccEdit.js'></script>
</head>
<body style="margin: 5px">


	<div class="panel panel-primary">
		<div class="panel-heading">
			<h3 class="panel-title">微信支付交易</h3>
		</div>
		<div class="panel-body">
		
				<h4>设置自有微信支付，买家使用微信支付付款购买商品时，货款将直接进入您微信支付对应的财付通账户。</h4>
				
				<form class="form-horizontal" role="form"  id="wxAppPayForm"  method="post">
		 
		 <div class="form-group">
			<label for="accountName" class="col-sm-2 control-label">当前微信支付：
             </label> 
			<div class="col-sm-5">
			
			<label class="radio inline"> 微信支付 - 自有 修改: </label> 
		
			
			
			
			<div class="alert alert-warning alert-dismissable">
                            <p>
							注意：使用自有微信支付，货款直接入账至您的财付通账户，由财付通自动扣除每笔0.6%交易手续费。
								订单如需退款，请自行通过财务通后台手动完成退款操作，并在订单中做“标记退款”。 <a
									target="_blank" class="new-window">查看设置教程</a></p>
                </div>
			 </div>             
		 </div>
		 
		 

		 
		 
       
       <div class="form-group">
			<label for="mchId" class="col-sm-2 control-label">商户号:</label> 
			<div class="col-sm-5">
			<input type="text" class="form-control" id="mchId" name="mchId" placeholder="商户号" maxlength="10">
			<p class="help-block">请填写微信发给您的邮件中的商户号，不是您财付通的商户号</p>
			</div>
			
			
		 </div>


<!--         <div class="form-group"> -->
<!-- 			<label for="partnerKey" class="col-sm-2 control-label">PaySignKey:</label>  -->
<!-- 			<div class="col-sm-5"> -->
<!-- 			<p style="margin: 2px 0 6px;"> -->
<!-- 								2014年9月10日后申请微信支付免交保证金的商家，<br>若无PaySignKey，可免填。 -->
<!-- 							</p> -->
<!-- 			<textarea class="form-control" id="partnerKey" name="partnerKey"  cols="60" rows="5" -->
<!-- 								maxlength="128"></textarea> -->
			
<!-- 			</div> -->
<!-- 		 </div> -->


         <div class="form-group">
			<label for="paySignKey" class="col-sm-2 control-label"><em class="required">*</em>密钥:</label> 
			<div class="col-sm-5">
			<input type="text" class="form-control" id="paySignKey" name="paySignKey"  placeholder="密钥"  
								  maxlength="32">
			</div>
		 </div>



        <div class="form-group">
			<label for="payTest" class="col-sm-2 control-label" for="payTest">微信支付状态:</label> 
			<div class="col-sm-5">
			
			
			
			
			<label class="checkbox-inline">
      <input type="radio" name="payTest" id="payTest" 
         value="0" checked> 全网支付已发布
   </label>
   <label class="checkbox-inline">
      <input type="radio" name="payTest" id="payTest" 
         value="1"> 测试支付中
   </label>
			
			
			
			
			<div class="alert alert-warning alert-dismissable  js-pay-all">
                            <p>
								由于微信支付流程限制，该选项需由您进行设置。如您的微信支付已通过微信的审核并开通，请选择“全网支付已发布”状态，以保证粉丝能够在你的店铺正常使用微信支付进行交易。否则，请选择“测试支付中”；
							</p>
							
                </div>
                
                
                <div class="alert alert-warning alert-dismissable  js-pay-part  hide">
                         
							<p>
								由于微信支付流程限制，该选项需由您进行设置。如您的微信支付正处在微信审核测试中，请选择“测试支付中”的状态，以保证能通过微信审核。若已审核同通过并已开通全网支付，请选择“全网支付已发布”；
							</p>
                </div>
                
                
               
                
                
                
                
                
                
                
			 </div>             
		 </div>


   



  <div class="form-group">
			<label for="domainAuth" class="col-sm-2 control-label">微信网页授权:</label> 
			<div class="col-sm-5">
			<label class="checkbox inline"> <input name="domainAuth" value="1" type="checkbox" checked="">授权回调页面域名已设置为“xxx.xxx.com”
							</label>
			</div>
		 </div>
<div class="form-group">
			<label for="domainName" class="col-sm-2 control-label"><em class="required">*</em>服务器域名:</label> 
			<div class="col-sm-5">
			<input type="text" class="form-control" id="domainName" name="domainName"  placeholder="服务器域名">
				<p class="help-block">头部要包含http或https，，以左斜杠“/”结尾。</p>
			</div>
		 </div>
 
 <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn_primary save_submit">提 &nbsp;&nbsp;交</button>
      </div>
   </div>
		
	</form>
				
				
				
			</div>
		<!-- panel-body  end -->

	</div>
	<!-- panel  end -->


	<script>
   $(function() { 
	   init();
      $(".save_submit").click(function(){
    	 saveWXapp();
      });
   });  
</script>




















</body>
</html>
