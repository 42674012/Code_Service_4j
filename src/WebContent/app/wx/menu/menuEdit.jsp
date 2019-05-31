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



<%@ include file="../../includeScript.jsp"%>
	
	<!-- Bootstrap -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<%-- <script src="<%=context%>/js/bootstrap/jquery.min.js"></script> --%>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>


</head>
<body>
	
	
	<script src='js/menuEdit.js'></script>


	<div id='menuFormPanel' title="Menu信息" style="width: 100%; font-size: 13px;">
		<form id="menuForm"  class='form-horizontal edit-form' method="post">
		
		<input type="hidden" class="form-control" id='type'  name="type"  value="2">
		
		
			<div class="form-group">
     	         <label for="accountType" class="col-sm-2 control-label">菜单名称:</label> 
     	        <div class="col-sm-6">
                    <input type="text" class="form-control" name="name" id="name" placeholder="菜单名称">
                   <p class="help-block">字数不超过8个汉字或16个字母</p>
                  </div>
             </div>
					
			
			
			<div class="form-group">
     	         <label for="accountType" class="col-sm-2 control-label">菜单内容:</label> 
     	            <div class="col-sm-6">
               
                   <label  class="radio-inline">
                           <input type="radio" name="optionsRadios" id="optionsRadios1"  value="1" checked>发送消息 </label>
                           <label  class="radio-inline">
                          <input type="radio" name="optionsRadios" id="optionsRadios2"  value="2">跳转网页</label>
                    </div>
             </div>
			
			
			
			
					<div class="form-group">
		     	      <div class="col-sm-12">
		               <div  id="urltr" style="height: 200px">
		               			<span class="help-block">订阅者点击该子菜单会跳到以下链接</span>
						       <div class="form-group" >
									<label for="accountToken" class="col-sm-2 control-label">页面地址:</label> 
									<div class="col-sm-4">
									<input type="text" class="form-control" id='url'  name="url" >
								    </div>
								</div>
		               </div>
				       <div id="xxtr" style="height: 200px">
						        <ul id="myTab" class="nav nav-tabs">
						         <li class="active"><a href="#home" data-toggle="tab"> 图文消息</a></li>
						         <li><a href="#ios" data-toggle="tab">文字</a></li>
						         <li><a href="#ios" data-toggle="tab">图片</a></li>
						         <li><a href="#ios" data-toggle="tab">卡券</a></li>
						         <li><a href="#ios" data-toggle="tab">语音</a></li>
						         <li><a href="#ios" data-toggle="tab">视频</a></li>
						       </ul>
				       </div>    
		              </div>
		             </div>
		</form>
	</div>
	<div class='edit-form-btn dialog-btn'>
		<a id='cancelBtn' class="easyui-linkbutton oper"
			data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a> <a
			id='addBtn' class="easyui-linkbutton oper"
			style='margin-left: 10px; margin-right: 10px;'
			data-options="iconCls:'icon-form-ok'" onclick='saveMenu()'>保存</a>
	</div>
	
	<script>
   $(function() { 
      $("#optionsRadios1").click(function(){
    	  $("#urltr").hide();
    	  $("#xxtr").show(); 
      });
      $("#optionsRadios2").click(function(){
    	  $("#urltr").show(); 
          $("#xxtr").hide();
       });
      $("#xxtr").show(); 
      $("#urltr").hide();
   });  
</script>
</body>
</html>
