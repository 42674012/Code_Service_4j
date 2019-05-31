<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap 101 Template</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
    
     <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="<%=context%>/js/bootstrap/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>
    

    <script src='js/masssendmbEdit.js'></script>
  </head>






</head>
<body style="margin: 10px">



<div class="btn-group" role="group">
  <button type="button" class="btn btn-default active"  href="#home" data-toggle="tab"> 新建群发消息</button>
  <button type="button" class="btn btn-default" href="#ios" data-toggle="tab">已发送</button>
</div>

<div id="myTabContent" class="tab-content" style="margin: 10px 0px 0px 0px">
   <div class="tab-pane fade in active" id="home">
   
   <form class="form" role="form">
     <div class="form-group">
      <label for="name">被添加自动回复</label>
      <textarea class="form-control" rows="5" id="txt_control"></textarea>
      </div>
      <button type="button" class="btn btn-success save_submit"  data-toggle="tooltip" data-placement="right" title="你本月还能群发 4 条消息">群  发</button>
    </form>
    </div>
     
    
    
    
   <div class="tab-pane fade" id="ios">
        <table class="table">
   <thead>
      <tr>
         <th>消息类型</th>
         <th>发送设置</th>
         <th>发送状态</th>
      </tr>
   </thead>
   <tbody>
       <tr>
         <td> 
    <div class="container-fluid" id="LG">
	<div class="row-fluid">
		<div class="span12">
			<img alt="140x140" src="http://www.runoob.com/try/bootstrap/layoutit/img/a.jpg" />
		</div>
	</div>
    </div>
     </td>
         <td>Bangalore</td>
         <td>已删除</td>
      </tr>
      <tr>
         <td> <div class="container-fluid" id="LG">
	<div class="row-fluid">
		<div class="span12">
			<img alt="140x140" src="http://www.runoob.com/try/bootstrap/layoutit/img/a.jpg" />
		</div>
	</div>
    </div>
    </td>
         <td>Mumbai</td>
         <td>已删除</td>
      </tr>
      <tr>
         <td><div class="container-fluid" id="LG">
	<div class="row-fluid">
		<div class="span12">
			<img alt="140x140" src="http://www.runoob.com/try/bootstrap/layoutit/img/a.jpg" />
		</div>
	</div>
    </div></td>
         <td>Pune</td>
         <td>已删除</td>
      </tr>
   </tbody>
</table>
   </div>
</div>
<!-- <button type="button" class="btn btn-default">Default</button> -->

<!-- <button type="button" class="btn btn-primary">Primary</button> -->

<!-- <button type="button" class="btn btn-success">Success</button> -->

<!-- <button type="button" class="btn btn-info">Info</button> -->

<!-- <button type="button" class="btn btn-warning">Warning</button> -->

<!-- <button type="button" class="btn btn-danger">Danger</button> -->

<!-- <button type="button" class="btn btn-link">链接</button> -->

<script>
   $(function() { 
      $(".save_submit").click(function(){
    	
    	  sendMasssendpage();
      });
      
      $(function () { $('.save_submit').tooltip('show');});      
      $('.save_submit').on('hidden.bs.tooltip', function () {
    	  // 执行一些动作...
    	  $('.save_submit').tooltip('show');
    	})
   });  
</script>
</body>
</html>
