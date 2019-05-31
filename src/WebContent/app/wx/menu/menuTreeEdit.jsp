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
	<script src='<%=context %>/js/easyui/plugin/treegrid-dnd.js'></script>


<link rel="stylesheet" type="text/css" href="<%=context %>/css/wxmenu.css">

<!-- Bootstrap -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<%-- <script src="<%=context%>/js/bootstrap/jquery.min.js"></script> --%>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>


<!-- 自定义修改css -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/layoutit.css">

</head>

<body>
	
	
	<script src='js/menuTreeEdit.js'></script>







	

	<div id="cc" class="easyui-layout" data-options="fit:true">
	   
		<div id='west' data-options="region:'west',border:false"
			style="width: 400px; padding: 5px;">
			<ul id="menuTree">
			</ul>
		</div>
		<div data-options="region:'center',border:false" style="padding: 5px;">
			<div id='menuFormPanel' class='easyui-panel' title="菜单信息"
				style="width: 100%; height: 500px; font-size: 13px;"
				data-options="iconCls:'icon-form-edit'">
				
				
				<form id="menuForm" class='form-horizontal edit-form' method="post"  role="form">
					<input type='hidden' value='0' id='orderIndex' name='orderIndex'>
					<input type='hidden' id='parentId' name='parentId'> 
					<input type='hidden' id='menuId' name='menuId'>
					
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
                           <input type="radio" name="optionsRadios" id="optionsRadios1"  value="option1" checked>发送消息 </label>
                           <label  class="radio-inline">
                          <input type="radio" name="optionsRadios" id="optionsRadios2"  value="option2">跳转网页</label>
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
			
			
			
			
			
			
			<div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        
        <a id='deleteBtn' type="button" class="btn btn_primary save_submit" onclick='deleteMenu()'>删除</a> <a id='addBtn' class="btn btn-primary save_submit"" onclick='saveMenu()'>保存</a>
      </div>
   </div>
			
			
			
			
					
					
				</form>
			</div>
		</div>
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
