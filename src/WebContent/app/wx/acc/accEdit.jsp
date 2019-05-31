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


  
 <%@ include file="../../includeScript.jsp" %>
    
<!-- Bootstrap -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<%-- <script src="<%=context%>/js/bootstrap/jquery.min.js"></script> --%>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>
    
<!-- bootstrap-table -->   
<link rel="stylesheet" href="<%=context%>/js/bootstrap/bootstrap-table/css/bootstrap-table.css">
<link rel="stylesheet" href="<%=context%>/js/bootstrap/bootstrap-table/css/bootstrap-editable.css"> 

<!-- 自定义修改css -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/layoutit.css">





<script src='js/accEdit.js'></script>
</head>
<body style="margin: 5px">

<!--          <div class="alert alert-warning"> -->
<!-- 			<a href="#" data-dismiss="alert"> </a> <strong></strong> -->
<!-- 			微信开放平台为“公众号接入第三方服务”推出了全新的授权、绑定流程 <br> 之前手动绑定的方式之后可能会关停，请您尽快重新授权： -->
<!-- 			<br> <br> -->
<!-- 			<button type="button" class="btn btn-success save_submit">立即授权 -->
<!-- 			</button> -->
<!-- 		</div> -->
		
  <div class="panel panel-primary">
  <div class="panel-heading">
      <h3 class="panel-title">微信基本信息配置</h3>
   </div>
  <div class="panel-body"   >
  
  
	<form class="form-horizontal" role="form"  id="wxappForm"  method="post">
	
	     <div class="form-group">
			<label for="accountName" class="col-sm-2 control-label">公众帐号名称:</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountName" name="accountName" placeholder="公众帐号名称">
			</div>
<!-- 			<div class="alert alert-danger col-sm-4">必填：请填写公众帐号名称</div> -->
		 </div>
     
     
      <div class="form-group" >
			<label for="accountURL" class="col-sm-2 control-label">URL(服务器地址):</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountURL" name="accountURL"  placeholder="URL(服务器地址)" >
			
		    </div>
		</div>
     
        <div class="form-group" >
			<label for="accountToken" class="col-sm-2 control-label">公众帐号TOKEN(令牌):</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountToken" name="accountToken"  placeholder="公众帐号TOKEN(令牌)"  >
			
		    </div>
		</div>
		
		
			<div class="form-group">
			<label for="accountNumber" class="col-sm-2 control-label">公众微信号:</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountNumber" name="accountNumber" placeholder="公众微信号">
			</div>
			
		</div>
		
		
		
		<div class="form-group">
			<label for="oldAccountId" class="col-sm-2 control-label">原始ID:</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="oldAccountId" name="oldAccountId" placeholder="原始ID">
			</div>
<!-- 			 <div class="alert alert-danger col-sm-4">必填：请填写微信公众账号原始ID</div>  -->
		</div>
		
				
		<div class="form-group">
     	      <label for="accountType" class="col-sm-2 control-label">公众号类型:</label> 
     	      <div class="col-sm-6">
                <select class="form-control" id="accountType" name="accountType">
                 <option value="">请选择</option>
                 <option value="1">订阅号</option>
                 <option value="2">服务号</option>
                 <option value="3">企业号</option>
                </select>
              </div>
         </div>	
				
				
		<div class="form-group">
			<label for="accountEmail" class="col-sm-2 control-label">电子邮箱:</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountEmail" name="accountEmail" placeholder="电子邮箱">
			</div>
		</div>
				
				
			<div class="form-group">
			<label for="accountDesc" class="col-sm-2 control-label">公众帐号描述:</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountDesc" name="accountDesc" placeholder="公众帐号描述">
			</div>
		</div>
	
	
	
		<div class="form-group">
			<label for="accountAppId" class="col-sm-2 control-label">AppID(应用ID):</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountAppId" name="accountAppId" placeholder="请输入AppID(应用ID)">
		   </div>
<!-- 		    <div class="alert alert-danger col-sm-4">必填：请填写公众帐号APPID</div>  -->
		</div>
		<div class="form-group">
			<label for="accountAppSecret" class="col-sm-2 control-label">AppSecret(应用密钥):</label> 
			<div class="col-sm-6">
			<input type="text" class="form-control" id="accountAppSecret" name="accountAppSecret" placeholder="请输入AppSecret(应用密钥)">
			</div>
<!-- 			 <div class="alert alert-danger col-sm-4">必填：请填写公众帐号APPSECRET</div> -->
		</div>
        
        <div class="form-group">
     	      <label for="accountState" class="col-sm-2 control-label">有效状态:</label> 
     	      <div class="col-sm-6">
                <select class="form-control" id="accountState" name="accountState">
                 <option value="">请选择</option>
                 <option value="1">有效</option>
                 <option value="2">无效</option>
                </select>
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
