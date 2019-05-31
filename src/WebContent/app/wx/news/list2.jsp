<%@page import="java.util.Locale"%>
<%@page import="java.util.Formatter"%>
<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>


<%@page import="com.foxinmy.weixin4j.exception.WeixinException"%>
<%@page import="com.foxinmy.weixin4j.model.MediaRecord"%>
<%@page import="com.foxinmy.weixin4j.type.MediaType"%>
<%@page import="com.foxinmy.weixin4j.model.MediaItem"%>
<%@page import="com.foxinmy.weixin4j.model.Pageable"%>
<%@page import="com.foxinmy.weixin4j.mp.WeixinProxy"%>

<%@page import="java.util.ArrayList"%>
<%@page import="com.foxinmy.weixin4j.tuple.MpArticle"%>
<%@page import="java.util.List"%>


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
    
<!-- bootstrap-table -->   
<link rel="stylesheet" href="<%=context%>/js/bootstrap/bootstrap-table/css/bootstrap-table.css">
<link rel="stylesheet" href="<%=context%>/js/bootstrap/bootstrap-table/css/bootstrap-editable.css"> 

<link rel="stylesheet" href="<%=context%>/js/bootstrap/css/layoutit.css">

<script src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/imagesLoaded.js'></script>
<script type="text/javascript" src="http://libs.useso.com/js/masonry/3.1.5/masonry.pkgd.min.js"></script>


<script src='js/list.js'></script>
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
					<li><a href="#">图片管理</a></li>
					<li><a href="#">图文管理</a></li>
					<li><a href="#">语音管理</a></li>
					<li><a href="#">视频管理</a></li>
					<li><a href="#">链接管理</a></li>
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
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>








<%
			Pageable pageable = new Pageable(1, 20);
			MediaRecord mediaRecord;
			List<MediaItem> items=new ArrayList<MediaItem>();
			try {
				mediaRecord = new  WeixinProxy().listMaterialMedia(MediaType.news,pageable);
				items=mediaRecord.getItems();
				%>
				
<p style="margin-left: 10px">图文消息(共<%=mediaRecord.getItemCount()%>个)<p>
<div class="row masonry-container" style="margin: 10px">
				<%
				for (MediaItem mediaItem : items) {
					List<MpArticle> articles=mediaItem.getArticles();
					Calendar cal = Calendar.getInstance();
					cal.setTimeInMillis(Long.parseLong(mediaItem.getUpdateTime()));
					Formatter ft=new Formatter(Locale.CHINA);
					String  date=ft.format("%1$tY年%1$tm月%1$td日%1$tA，%1$tT %1$tp", cal).toString();
					%>
   <div class="col-md-3 col-sm-6 item">
      <div class="thumbnail shadow">
      <span>
     <%=ft%>
     </span>
         <img src="http://www.runoob.com/try/bootstrap/layoutit/img/people.jpg"  alt="通用的占位符缩略图">
      <div class="caption">
         <%
         int i=0;
		for (MpArticle mpArticle : articles) {
		i++;
		%>
		<% if(i>1){%>
		<ul class="media-list">
   <li class="media">
      <a class="pull-right" href="#">
         <img class="media-object" src="http://www.runoob.com/wp-content/uploads/2014/06/64.jpg" 
         alt="通用的占位符图像">
      </a>
      <div class="media-body">
         <h4 class="media-heading"> </h4>
  <p><strong><%=mpArticle.getTitle() %></strong><p>
      </div>
   </li>
</ul>
		<%}else{
			%>
			<p><strong><%=mpArticle.getTitle() %></strong><p>
		<p><%=mpArticle.getDigest() %><p>
			
			<%
		}
		}
	%>
         <p>
           <div class="btn-group btn-group-justified" role="group" aria-label="...">
              <div class="btn-group" role="group">
      <!-- 第一个修改按钮 -->
                    <button id="update_<%=mediaItem.getMediaId()%>"   value="update_<%=mediaItem.getMediaId()%>"  type="button" class="btn btn-default" data-toggle="popover"  data-container="body"  data-placement="bottom" >  
                     <span class="glyphicon glyphicon-pencil"></span>
                    </button>  
              </div>
              <div class="btn-group" role="group">
                     <button id="del_<%=mediaItem.getMediaId()%>"   value="del_<%=mediaItem.getMediaId()%>"  type="button"  class="btn btn-default" data-toggle="popover"  data-container="body"  data-placement="bottom" >  
                     <span class="glyphicon glyphicon-trash"></span>
                    </button>  
           </div>
       </div>
      </div>
   </div>
    </div>
   <%
		 }
				
			} catch (WeixinException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			%>
</div>
<!-- 行结束 -->


       <script type="text/javascript">  
            $(document).ready(function () {  
            	//自定义popover显示的内容  
               $('[data-toggle="popover"]').popover({   
                    html : true,  
                    title: function() {  
                      return "";//$("#popover-head").html();  
                    },  
                    content: function() {  
                    	var id=this.id;
                      return "<p><strong>确定删除此素材？</strong> <p><button type='button' class='btn btn_primary'  value="+id+" onclick='del("+id+")' >确定</button><button type='button' value="+id+" onclick='cancel("+id+")' class='btn btn-default'>取消</button><p>";
                    }  
                });  
            });  
       </script>


<script type="text/javascript">
	/* Demo Scripts for Making Twitter Bootstrap 3 Tab Play Nicely With The Masonry Library
* on SitePoint by Maria Antonietta Perna
*/

//Initialize Masonry inside Bootstrap 3 Tab component 

(function($) {

    var $container = $('.masonry-container');
    $container.imagesLoaded( function () {
        $container.masonry({
            columnWidth: '.item',
            itemSelector: '.item'
        });
    });
    
    //Reinitialize masonry inside each panel after the relative tab link is clicked - 
    $('a[data-toggle=tab]').each(function () {
        var $this = $(this);

        $this.on('click', function () {
        
            $container.imagesLoaded( function () {
                $container.masonry({
                    columnWidth: '.item',
                    itemSelector: '.item'
                });
            });

        }); //end shown
    });  //end each
    
})(jQuery);
</script>




</body>
</html>			