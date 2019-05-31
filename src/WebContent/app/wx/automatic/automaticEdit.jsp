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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
    
     <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="<%=context%>/js/bootstrap/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>
<style type="text/css">
    
 .highlight_box .opr {
	float: right;
	padding: 7px 0px 0px 2em;
}
    
.icon.unlock {
    background: transparent url("https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/base/base_z2968da.png") no-repeat scroll 0px -496px;
    width: 48px;
    height: 48px;
    vertical-align: middle;
    display: inline-block;
}
.btn_warn {
	background-color: #F24D4D;
	background-image: linear-gradient(to bottom, #F24D4D 0px, #F24D4D 100%);
	border-color: #F24D4D;
	color: #FFF;
}

</style>
</head>
<body>
<div class="panel panel-default">
   <div class="panel-body">
           <legend contenteditable="true">自动回复</legend>
   </div>
   
   <div class="panel-footer">

<div class="media">
   <a class="pull-left" href="#">
       <span class="icon unlock"></span>
   </a>
   <span class="pull-right">
        <a href="javascript:;" class="btn btn_warn" id="btn_stop">停用</a>
      </span>
   <div class="media-body">
      <h4 class="media-heading">已开启自动回复设置</h4>
                     通过编辑内容或关键词规则，快速进行自动回复设置。如具备开发能力，可更灵活地使用该功能。查看详情<a href="javascript:;" class="detail_desc">查看详情</a> 
   </div>
</div>


  </div>
</div>

<div  style="margin: 0px 20px 0px 20px ">
<div class="btn-group" role="group">
  <button type="button" class="btn btn-default active"  href="#home" data-toggle="tab">被添加自动回复</button>
  <button type="button" class="btn btn-default" href="#ios" data-toggle="tab">消息自动回复</button>
  <button type="button" class="btn btn-default">关键词自动回复</button>
</div>

 <div class="media" style="display: inline;" >
          <span class="pull-right">
         <a href="javascript:;" class="detail_desc">公众平台如何设置被添加自动回复</a> 
          <i class="document_link"></i>
         </span>
</div>

<div id="myTabContent" class="tab-content" style="margin-top: 10px">
   <div class="tab-pane fade in active" id="home">
   <form class="form" role="form">
     <div class="form-group">
      <textarea class="form-control" rows="7"></textarea>
      </div>
      <button type="submit" class="btn btn-success save_submit_add"  data-toggle="submit">保存</button>
     <button type="button" class="btn btn_default btn_input">删除回复</button>
    </form>
    </div>
   <div class="tab-pane fade" id="ios">
        <form class="form" role="form">
     <div class="form-group">
      <textarea class="form-control" rows="7"></textarea>
      </div>
      <button type="submit" class="btn btn-success save_submit_zd"  data-toggle="submit">保   存</button>
     <button type="button" class="btn btn_default btn_input">删除回复</button>
    </form>
</div>
</div>
</div>
</body>
</html>
