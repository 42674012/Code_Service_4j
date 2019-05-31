<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">

<link href="css/style.css" rel="stylesheet" type="text/css">
<%@ include file="../../includeScript.jsp"%>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
</head>
<body>

<style type="text/css">
/* ie6 png */
.mypng img {
azimuth: expression( this.pngSet?this.pngSet=true:(this.nodeName == "IMG" && this.src.toLowerCase().indexOf('.png')>-1?(this.runtimeStyle.backgroundImage = "none", this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingMethod='image')", this.src = "transparent.gif"):(this.origBg = this.origBg? this.origBg :this.currentStyle.backgroundImage.toString().replace('url("', '').replace('")', ''), this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.origBg + "', sizingMethod='crop')", this.runtimeStyle.backgroundImage = "none")), this.pngSet=true);
}
</style>
<script  >
function ImgZoom(){   
	var max_w=window.innerWidth;   
	var max_h=window.innerHeight;   
	var m1=max_w/max_h;   
	var html = '';   
	$(".proListShow").html(html);   
	$(".proListShow").each(function(i){   
	var proImg = new Image();   
	var image = $(this);   
	//alert(this.src);   
	proImg.onload = function(){   
		var m2 = proImg.width/proImg.height;   
		if(m2 > m1){   
			image.width(max_w);   
		}else{   
			image.height(max_h);   
		}   
	}   
		proImg.src = this.src;  
	});   
}  
function init(){
	var dat=tcCore.getTopWindowParam();
	if(dat) {
		$(dat.imgattr).each(function(i,o){
			var html="";
			if(i==0){
				html="<li id='focusIndex1' style=''>"; 
				html+="<div class='focusL'><a href='#'><img class='proListShow' src='http://"+dat.imgurl+o+"' /></a></div>";
				html+="<div class='focusR'> </div>";
				html+="</li>"
			}else{
				html="<li id='focusIndex"+(i+1)+"' >"; 
				html+="<div class='focusL'><a href='#'><img class='proListShow' src='http://"+dat.imgurl+o+"' /></a></div>";
				html+="<div class='focusR'> </div>";
				html+="</li>"
			}
			$(".mypng").append(html);
		});
	}
	
	$("#focusBar").css("height",window.innerHeight);
	$(".focusL").css("height",window.innerHeight);
	$('#btnR').click();
	ImgZoom();
}

$(document).ready(init);

</script>
<div id="focusBar"> 
	<a href="javascript:void(0)" class="arrL" onclick="prePage()">&nbsp;</a>
	<a href="javascript:void(0)" id="btnR" class="arrR" onclick="nextPage()">&nbsp;</a>
	<ul class="mypng">
		   
	</ul>
</div>

<script type="text/javascript" src="js/script.js"></script>
<div style="text-align:center;clear:both;">
</div>

</body>
</html>