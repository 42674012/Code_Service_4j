<%@page import="java.io.File"%>
<%@page import="com.foxinmy.weixin4j.model.MediaDownloadResult"%>
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

<style type="text/css">


.appmsg {
	color: #666;
}
.appmsg_list .tj_item {
	font-size: 14px;
	text-align: left;
}
.appmsg_info {
	font-size: 13px;
	line-height: 20px;
	padding-bottom: 10px;
}
.appmsg_content {
	padding: 0px 14px;
	position: relative;
}

.appmsg_item .appmsg_thumb {
	float: right;
	width: 78px;
	height: 78px;
	margin-left: 14px;
}


.appmsg_thumb_wrp {
	height: 160px;
	overflow: hidden;
}


.multi .appmsg_title {
	font-size: 14px;
	padding-top: 0px;
}
.cover_appmsg_item .appmsg_title {
	position: absolute;
	bottom: 0px;
	left: 0px;
	right: 0px;
	background: rgba(0, 0, 0, 0.6) none repeat scroll 0% 0% !important;
}
.appmsg_item .appmsg_title {
	line-height: 24px;
	max-height: 48px;
	overflow: hidden;
	margin-top: 14px;
}

.appmsg_title {
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	padding-top: 10px;
	line-height: 28px;
	max-height: 56px;
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-all;
}
.appmsg_title {
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	padding-top: 10px;
	line-height: 28px;
	max-height: 56px;
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-all;
}

.appmsg_desc {
	padding: 5px 0px 10px;
	word-wrap: break-word;
	word-break: break-all;
}

.appmsg_col {
	text-align: left;
	font-size: 14px;
	letter-spacing: normal;
}

.appmsg_title a {
	display: block;
	color: #222;
}
a {
	color: #459AE9;
	text-decoration: none;
}
input, textarea, button, a {
	outline: 0px none;
}
</style>
<script src='js/list.js'></script>
</head>
<body>


       <%
       
       try {
			Pageable pageable = new Pageable(1, 20);
			MediaRecord mediaRecord;
				mediaRecord = new  WeixinProxy().listMaterialMedia(MediaType.news,pageable);
				%>
				
<p style="margin-left: 10px">图文消息(共<%=mediaRecord.getItemCount()%>个)<p>

<div class="row masonry-container" style="margin-left: 10px;margin-right: 10px">
			  
			  
			  	<%
			  	
				for (MediaItem mediaItem : mediaRecord.getItems()) {
					List<MpArticle> articles=mediaItem.getArticles();
			         MpArticle mpArticle=articles.get(0);
			         
			            MediaDownloadResult mediaDownloadResult = new WeixinProxy().downloadMedia(mpArticle.getThumb_media_id(), false);
				        System.out.println(mediaDownloadResult);
						File file =  new WeixinProxy().downloadMediaFile(mpArticle.getThumb_media_id(), true);
			         
					
			     %>
					
					
					
					
    <div class="col-md-3 col-sm-6 item">
                      
           <div class="thumbnail shadow appmsg_content">
                 <%if(articles.size()==1)
	                    {
        	            %>
        	            <h4 class="appmsg_title js_title"><a  class="btn" onclick="NoPermissionModal('<%=mpArticle.getUrl() %>')"><strong><%=mpArticle.getTitle() %></strong></a></h4>
        	            <% 
                    	}%>
                    	<div class="appmsg_info">
                <em class="appmsg_date">星期三 17:23</em>
            </div>
                <img src="<%=context%>/tmp/weixin4j/media/<%=mediaDownloadResult.getFileName() %>"  height="160px" width="267.067px" alt="通用的占位符缩略图">
           <div class="caption">
      
	
	                       <%if(articles.size()>1)
	                       {
	                    	   
	                    	   for(int i=1; i<articles.size();i++)
	                    	   {
	                    		     MpArticle mpArticle2 = articles.get(i);
	                    		     MediaDownloadResult mediaDownloadResult2 = new WeixinProxy().downloadMedia(mpArticle2.getThumb_media_id(), false);
	       				            System.out.println(mediaDownloadResult2);
	       						    File file2 =  new WeixinProxy().downloadMediaFile(mpArticle2.getThumb_media_id(), true);
	                    		   
	                        %>
								   <ul class="media-list">
							           <li class="media  appmsg_item">
							           <a class="pull-right " href="#">   
							           <img class="media-object appmsg_thumb" src="<%=context%>/tmp/weixin4j/media/<%=mediaDownloadResult2.getFileName() %>" 
							           alt="通用的占位符图像">
							            </a>
							           <div class="media-body">
							           <h4 class="media-heading"> </h4>
							           <h4 class="appmsg_title js_title"><a  class="btn" onclick="NoPermissionModal('<%=mpArticle2.getUrl() %>')"><%=mpArticle2.getTitle() %></a></h4>
							           </div>
							           </li>
							         </ul>
					         
					         <% 
	                    	      }
	                    	   
	                    	   }
	                    	   %>
	
         
                     <%if(articles.size()==1)
	                    {
        	            %>
        	             <p><p>
        	             <p class="appmsg_desc"><%=mpArticle.getDigest() %></p>
        	            <% 
                    	}%>
         
         
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
             </div>  <!-- btn-group btn-group-justified -->
          </div><!-- caption -->
       </div>  <!-- thumbnail -->
    </div><!-- item -->
    
    
    <% }//%>
			
</div><!-- row -->

 <%
		 
				
} catch (WeixinException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
}
			
%>	























<div  class="modal fade NoPermissionModal" id="NoPermissionModal">
    <div class="modal-dialog" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
               
                <h4 class="modal-title" id="NoPermissionModalLabel">系统消息</h4>
            </div>
            <div class="modal-body">
                <iframe id="NoPermissioniframe_test" width="100%" height="50%" frameborder="0"></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default " data-dismiss="modal">    关  闭    </button>
            </div>
        </div>
    </div>
</div>








<script type="text/javascript">
function NoPermissionModal(value){
        var frameSrc =value;
        $("#NoPermissioniframe_test").attr("src", frameSrc);
        $('#NoPermissionModal').modal({ show: true, backdrop: 'static' });
}

</script>




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