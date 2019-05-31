<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>





<!DOCTYPE html>
<html>
<head>
   <title>Bootstrap 实例 - 自定义缩略图</title>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">


 <%@ include file="../../includeScript.jsp" %>
    
<!-- Bootstrap -->
<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/bootstrap.min.css">
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<%-- <script src="<%=context%>/js/bootstrap/jquery.min.js"></script> --%>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<%=context%>/js/bootstrap/bootstrap.min.js"></script>








</head>
<body>
   <nav class="navbar navbar-default">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
					aria-expanded="false">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">素材管理</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#">消息管理 <span
							class="sr-only">(current)</span></a></li>
					<li>
					<li><a href="<%=context%>/app/wx/news/wx_news.jsp" id="image" data-target="exampleModal">图片管理</a></li>
					<li><a href="<%=context%>/app/wx/news/news.jsp" data-target="exampleModal">图文管理</a></li>
					<li><a href="#" id="voice" data-target="exampleModal">语音管理</a></li>
					<li><a href="#" id="video" data-target="exampleModal">视频管理</a></li>
					<li><a href="#" id="file" data-target="exampleModal">链接管理</a></li>
				</ul>




				<form class="navbar-form navbar-left" role="search">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="请输入要搜索的关键字">
					</div>
					<button type="submit" class="btn btn-default">搜索</button>
				</form>


				<form class="navbar-form navbar-right" role="search">
					<div class="form-group">
						<!-- 表示一个成功的或积极的动作 -->
						<button type="button" class="btn btn_primary">添加素材</button>
					</div>
					<!-- 信息警告消息的上下文按钮 -->
					<button type="button" class="btn btn-info">设置</button>
				</form>


			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>





<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe id="NoPermissioniframe" class="embed-responsive-item" src="<%=context%>/app/wx/news/news.jsp"></iframe>
</div>

<!-- 4:3 aspect ratio -->
<!-- <div class="embed-responsive embed-responsive-4by3"> -->
<%--   <iframe class="embed-responsive-item" src="<%=context%>/app/wx/news/news.jsp"></iframe> --%>
<!-- </div> -->




<script type="text/javascript">

$(function(){
    $('[data-target="exampleModal"]').click(function(){
         $("#NoPermissioniframe").attr("src", this.href);
    });
});
</script>








</body>
</html>			