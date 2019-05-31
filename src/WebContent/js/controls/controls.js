;(function($){
	$.fn.extend({
		address:function(options){
			// get this select id
			var id= this.attr("id");
			// init  flag
			var init_flag = false;
			options = $.extend({},$.fn.address.defaults,options);
			if(!init_flag){
				init_flag = initContainer(options);
			}else{
				createTabs(id,url,options);
			}
			if(init_flag) {
				// 初始化事件函数
				bind_function();
			}else{
				options = $.extend({},$.fn.address.defaults,options);
				setTimeout(initContainer(options),30);
				bind_function();
			}
			//初始化事件
			function bind_function() {
				var t = options.tabsTitle.split(",");
				var _warp = options.tabsClassWarp;
				
				$("."+_warp).click(function(event) {
					event.stopPropagation();
				});
				$("#"+id).focus().click(function(event) {
					event.stopPropagation();//阻止事件冒泡
					$("."+_warp).show();
					var input = $(this);
					var w = input.width();
					var offset = input.offset();
					$("."+options.tabsClassWarp).attr("style","top:"+offset.top+input.height()+6+";z-index:999999;position:absolute;display:block;");
					$(".easyui-tabs").show();
				});
				$(document.body).click(function(e) {
					if($(e.target).attr("id") != id && $(e.target).attr("class") != options.tabsClassWarp) {
						$("."+_warp).hide();
					}
				});
				$("div[title="+t[0]+"]").css("border","1px solid blue");
				
				$("a[data-pro='pro-text']").click(function(event){
					event.stopPropagation();//阻止事件冒泡
					var code = $(this).attr("attr-id");
					var name = $(this).attr("title");
					$("#"+id).val(name);
					createTabs(options.url,code,'pro');
				});
			}
			
			function createTabs(url,code,type) {
				$.ajax({
					url:url,
					data:{code:code},
					dataType:'json',
					success:function(data) {
						if(data.length >0) {
							var index = 1;
							var a = "";
							var t_c = "";
							if("pro"==type) {
								t_c = "ct-text";
							}else{
								t_c = "ar-text";
							}
							$.each(data,function(k,v){
								var s = v.name;
								if(index>0&& index%5==0) {
									a+='<a title="'+v.name+'" attr-id="'+v.code+'" data-pro="'+t_c+'" href="javascript:void(0);">'+s+'</a></br>';
								}else{
									a+='<a title="'+v.name+'" attr-id="'+v.code+'" data-pro="'+t_c+'" href="javascript:void(0);" >'+s+'</a>';
								}
							});
							if("pro"==type) {
								$(".easyui-tabs").tabs('select',1);
							}else if("ct" == type){
								$(".easyui-tabs").tabs('select',2);
							}
							var tab = $(".easyui-tabs").tabs('getSelected');
							$(".easyui-tabs").tabs('update',{
								tab:tab,
								options:{
									content:a
								}
							});
							if("pro"==type) {
								$("a[data-pro='ct-text']").click(function(event){
									event.stopPropagation();//阻止事件冒泡
									//province a click
									var code = $(this).attr("attr-id");
									var name = $(this).attr("title");
									var _1 = $("#"+id).val();
									var _l = _1.split("/");
									if(_l.length>1) {
										$("#"+id).val(_l[0]+"/"+name);
									}else{
										$("#"+id).val(_1+"/"+name);
									}
									createTabs(options.url,code,'ct');
								});
							}else if("ct" == type){
								$("a[data-pro='ar-text']").click(function(event){
									event.stopPropagation();//阻止事件冒泡
									//province a click
									var code = $(this).attr("attr-id");
									var name = $(this).attr("title");
									var _1 = $("#"+id).val();
									var _l = _1.split("/");
									if(_l.length>2) {
										$("#"+id).val(_l[0]+"/"+_l[1]+"/"+name);
									}else{
										$("#"+id).val(_1+"/"+name);
									}
									$("."+options.tabsClassWarp).hide();
								});
							}
						}else{
							console.error("options.length undefined");
						}
					}
				});				
			}
			function initContainer(options){
				
				var t_N = options.tabsTitle;
				if(null == t_N || "" == t_N) {
					t_N = "省份,城市,地区";
				}
				t_N = t_N.split(",");
				var t = "";
				for(var i =1,j=t_N.length;i<j;i++) {
					t+="<div title='"+t_N[i]+"'><dl><dd></dd></dl></div>";
				}
				var pro = '<div title="'+t_N[0]+'">'
				+'<dl class="fn-clear">'
			        +'<dt>A-G</dt>'
			          +'<dd>'
					  +'<a title="安徽" attr-id="340000" data-pro="pro-text" href="javascript:;">安徽</a>'
					  +'<a title="北京" attr-id="110000" data-pro="pro-text" href="javascript:;">北京</a>'
					  +'<a title="重庆" attr-id="500000" data-pro="pro-text" href="javascript:;">重庆</a>'
					  +'<a title="福建" attr-id="350000" data-pro="pro-text" href="javascript:;">福建</a>'
					  +'<a title="甘肃" attr-id="620000" data-pro="pro-text" href="javascript:;">甘肃</a>'
					  +'<a title="广东" attr-id="440000" data-pro="pro-text" href="javascript:;">广东</a>'
					  +'<a title="广西" attr-id="450000" data-pro="pro-text" href="javascript:;">广西</a>'
					  +'<a title="贵州" attr-id="520000" data-pro="pro-text" href="javascript:;">贵州</a>'
					  +'</dd>'
		            +'</dl>'
				+'<dl class="fn-clear"><dt>H-K</dt><dd><a title="海南" attr-id="460000" data-pro="pro-text" href="javascript:;">海南</a><a title="河北" attr-id="130000" data-pro="pro-text" href="javascript:;" data-spm-anchor-id="0.0.0.0">河北</a><a title="黑龙江" attr-id="230000" data-pro="pro-text" href="javascript:;">黑龙江</a><a title="河南" attr-id="410000" data-pro="pro-text" href="javascript:;">河南</a><a title="湖北" attr-id="420000" data-pro="pro-text" href="javascript:;">湖北</a><a title="湖南" attr-id="430000" data-pro="pro-text" href="javascript:;">湖南</a><a title="江苏" attr-id="320000" data-pro="pro-text" href="javascript:;">江苏</a><a title="江西" attr-id="360000" data-pro="pro-text" href="javascript:;">江西</a><a title="吉林" attr-id="220000" data-pro="pro-text" href="javascript:;">吉林</a></dd>'
		        +'</dl>'
				+'<dl class="fn-clear"><dt>L-T</dt><dd><a title="辽宁" attr-id="210000" data-pro="pro-text" href="javascript:;">辽宁</a><a title="内蒙古" attr-id="150000" data-pro="pro-text" href="javascript:;">内蒙古</a><a title="宁夏" attr-id="640000" data-pro="pro-text" href="javascript:;">宁夏</a><a title="青海" attr-id="630000" data-pro="pro-text" href="javascript:;">青海</a><a title="山东" attr-id="370000" data-pro="pro-text" href="javascript:;">山东</a><a title="上海" attr-id="310000" data-pro="pro-text" href="javascript:;">上海</a><a title="山西" attr-id="140000" data-pro="pro-text" href="javascript:;">山西</a><a title="陕西" attr-id="610000" data-pro="pro-text" href="javascript:;">陕西</a><a title="四川" attr-id="510000" data-pro="pro-text" href="javascript:;">四川</a></dd>'
		        +'</dl>'
				+'<dl class="fn-clear"><dt>T-Z</dt><dd><a title="天津" attr-id="120000" data-pro="pro-text" href="javascript:;">天津</a><a title="新疆" attr-id="650000" data-pro="pro-text" href="javascript:;">新疆</a><a title="西藏" attr-id="540000" data-pro="pro-text" href="javascript:;">西藏</a><a title="云南" attr-id="530000" data-pro="pro-text" href="javascript:;">云南</a><a title="浙江" attr-id="330000" data-pro="pro-text" href="javascript:;">浙江</a></dd>'
	            +'</dl>'
				+'</div>';
				var tab = "<div class='easyui-tabs my-area' >"+pro+t+"</div>";
				var warp = "<div class='"+options.tabsClassWarp+"'>"+tab+"</div>";
				var input = $("#"+id);
				//alert(input.width());
				var $input_w = input.width();
				var $i_h = input.height();
				input.attr("readonly","readonly");
				var isp = $("#"+id).parent();
				var offset = input.offset();
				$(isp).append(warp);
				var h = offset.top+$i_h+6;
				$("."+options.tabsClassWarp).css('left',offset.left+input.width()-$input_w+'px').css('top',h+'px').css('z-index','999999').css('position','absolute').css('display','none');
				var width = options.width;
				$(".easyui-tabs").tabs({
					border:true,width:width
				});
				return true;
			}
		}
	});
	$.fn.address.defaults = {
		width:300,
		height:300,
		addressClass:"easyui-tabs",
		url:"",
		tabsTitle:"省份,城市,地区",
		tabsClassWarp:"city-selete-warp"
	};
	    $.fn.extend({
	        AddTopScrollBar: function () {
	            this.each(function () {
	                var instance = this;
	                var scrollDiv = $("<div style='height:17px; overflow:scroll;'></div>");
	                scrollDiv.width($(this).width());
	                scrollDiv.html("<div style='width:0px;padding:" + this.scrollWidth / 2 + "px;'></div>")
	                $(this).scroll(function () { scrollDiv.get(0).scrollLeft = instance.scrollLeft; });
	                scrollDiv.scroll(function () { instance.scrollLeft = scrollDiv.get(0).scrollLeft; });
	                scrollDiv.insertBefore($(this));
	                scrollDiv.get(0).scrollLeft = instance.scrollLeft;
	                $(this).resize(
	                    function () {
	                        scrollDiv.width($(instance).width());
	                        scrollDiv.html("<div style='width:0px;padding:" + instance.scrollWidth / 2 + "px;'></div>");
	                    }
	                )
	            })
	        }
	    });
	
})(jQuery);

; (function($) {
	$.simpleCanleder = function(box, options){
		var _canlederBox = "#SimpleCanleder_Year_Month";
		var _title_ul_li = ".title li";
		box = $(box);
		var box_height = parseFloat( box.height());
		var box_width = parseFloat( box.width());
		var boxOffset = box.offset();

		var canlederBox = null;
		box.click(function(){
			canlederBox = $(_canlederBox);
			if($(canlederBox).size() > 0){
				$(canlederBox).show();
			}else{
				_buildCanlederBox();
				$("body").append(canlederBox);

                $(document).click(function(e){
                    var pointX = e.pageX;
                    var pointY = e.pageY;
                    var $box  = canlederBox.data("box");

                    var isCanlederBox = $(e.target).parents(_canlederBox);

                    if(canlederBox.is(":visible") && $box && e.target != $box[0] && isCanlederBox.size() <= 0){
                        var offset = canlederBox.offset();
                        var top  = offset.top - 4;
                        var left  = offset.left - 4;
                        var height = top + parseFloat(canlederBox.outerHeight()) +  4;
                        var width = left + parseFloat(canlederBox.outerWidth()) + 4;
                        if(pointX > left && pointY > top &&
                                pointX < width && pointY < height){

                        }else{
                            canlederBox.hide();
                        }
                    }
                });
			}

			
			canlederBox.css({"top" : boxOffset.top + box_height + 6, "left": boxOffset.left});
			canlederBox.data("box", box); 

			_init();
		
		}); 


		

		function _init(){
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			if(box.val()){
				year = box.val().split("-")[0] * 1;
				month = box.val().split("-")[1] * 1;
			}

			canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(year));
			canlederBox.find(".body li").each(function(){
				if($(this).text() == month){
					$(this).addClass("cur");
				}else{
					$(this).removeClass("cur");
				};
			});
		}

		function _buildCanlederBox(){
			canlederBox = $("<div/>");
			canlederBox.attr("id", "SimpleCanleder_Year_Month"); 
			
			_buildTitle(canlederBox);
			_buildBody(canlederBox);
			canlederBox.append($("<div/>").addClass("clear"));
			_buildBottom(canlederBox);
			
		};
		
		 
		function _buildTitle(canlederBox){
			var $title =  $("<div/>").addClass("title").append("<ul/>").appendTo(canlederBox);
			var $title_ul = $title.find("ul");
			for(var i = 0; i < 3; i++){
				var $li = $("<li/>").append( $("<div/>").addClass("inner") );
				
				$li.hover(function(){
					$(this).addClass("over");	
				}, function(){
					$(this).removeClass("over");
				});

				$title_ul.append($li);
			}
			var $title_ul_li = $title_ul.find("li");

			$title_ul_li.eq(0).click(function(){
				var year = $select.val();	//$select 在_getSelect()有定义
				canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(--year));
			}).find("div.inner").text(" < ");

			$title_ul_li.eq(1).addClass("middle").click(function(){
				
			})
			.find("div.inner").addClass("paddingTop").html(_getSelect());

			$title_ul_li.eq(2).click(function(){
				var year = $select.val();	//$select 在_getSelect()有定义
				canlederBox.find(_title_ul_li).eq(1).find("div.inner").html(_getSelect(++year));
			}).find("div.inner").text(" > ");
		};

		function _buildBody(canlederBox){
			var $body =  $("<div/>").addClass("body").append("<ul/>").appendTo(canlederBox);
			var $body_ul = $body.find("ul");
			for(var i = 0; i < 12; i++){
				var $inner = $("<div/>").addClass("inner").text(i+1);
				var $li = $("<li/>").append($inner).click(function(){
					var year = canlederBox.find(_title_ul_li).eq(1).find("select").val();
					var month = $(this).find("div.inner").text() * 1;
					month = month < 10 ? "0" + month : month;
					canlederBox.data("box").val(year  +"-"+ month);
					canlederBox.hide();
				});
				$li.hover(function(){
					$(this).addClass("over");	
				}, function(){
					$(this).removeClass("over");
				});

				$body_ul.append($li);
			}
		};

		function _buildBottom(canlederBox){
			var $button_clear = $("<button/>").addClass("clear").click(function(){
				canlederBox.data("box").val("");
				canlederBox.hide();
			}).text("清空");
			var $bottom = $("<div/>").addClass("bottom").append($button_clear);
			canlederBox.append($bottom);
			
		};
		
		var $select = null;
		function _getSelect(year){
			if(!year){
				year = new Date().getFullYear();
			}
			
			$select = $("<select/>");
			for(var i = 10; i >=0; i--){
				$select.append($("<option/>").text(year - i ));
			}
			for(var i = 1; i <= 10; i++){
				$select.append($("<option/>").text(year + i ));
			}
			$select.find("option").each(function(){
				if($(this).text() == year){
					$(this).attr("selected", "selected");
				}
			});
			return $select;
		};

		 

	};

    $.fn.extend({
        simpleCanleder: function(options) {
            options = $.extend({},options);
            this.each(function() {
				new $.simpleCanleder(this, options);
			});
			return this;
        }
    });
    
    $.fn.extend({
    	jxSlider:function(options,data) {
    		var slider = $(this);
    		if(options=="setValue") {
        		setValue(data);
        	}else if(options == "setTargValue") {
        		setTargValue(data);
        	}else if(options =="setAlrValue") {
        		setAlrValue(data);
        	}else{
        		options = $.extend({},$.fn.jxSlider.defaults,options);
        		$.fn.sliderCache = $.extend({},$.fn.sliderCache,options);
        		if(!options.init) {
        			initSlider(options);
        		}
        	}
    		
    		function initSlider(options) {
    			var offset = slider.offset();
    			var top = offset.top;
    			var left = offset.left;
    			paserHtml(options);
    		}
    		function setValue(data) {
    			var cache = $.fn.sliderCache;
    			var sil = $(".slider").length;
    			var d = data.length;
    			if(data.length!=sil) {
    				console.error("this length is 'exceed'");
    				return;
    			}
    			var width = cache.width;
    			var height = cache.height;
    			$.each(data,function(i,o) {
    				var sld = $(".slider")[i].children[0];//selection
    				var x = o.split("%")[0]/100;
    				x = parseFloat(x);
    				var l =0;
    				if(x>=1) {
    					x=0.94;
    					l = parseFloat(height/width);
    				}
    				var lx = width*x;
    				var w = (width*x)+height;
    				if(w>width) {
    					w=width;
    				}
    				$(sld).css("width",w);
    				var handler = $(".slider")[i].children[1];//handler
    				$(handler).css("left",(x*100-l)+"%");
    			});	
    		}
    		function setTargValue(data) {
    			var cache = $.fn.sliderCache;
    			var sil = $(".targ").length;
    			var d = data.length;
    			if(data.length!=sil) {
    				console.error("this length is 'exceed'");
    				return;
    			}
    			var width = cache.width;
    			var height = cache.height;
    			var arrWid = new Array();
    			$.each(data,function(i,o) {
    				var t = $(".targ")[i];
    				$(t).html(o);
    				arrWid.push(o.length);
    			});	
    			var max = arrWid[0];
    			for(var i=1;i<arrWid.length;i++){ 
    				  if(max<arrWid[i])
    					  max=arrWid[i];
    			}
    			$(".targ").css("width",(max*5)*d+"px");
    			
    		}
    		function setAlrValue(data) {
    			var cache = $.fn.sliderCache;
    			var sil = $(".already").length;
    			var d = data.length;
    			if(data.length!=sil) {
    				console.error("this length is 'exceed'");
    				return;
    			}
    			$.each(data,function(i,o) {
    				var t = $(".already")[i];
    				$(t).html(o);
    			});	
    		}
    		function paserHtml(options) {
    			var title = options.title;
    			var targ  = options.targ;
    			var l = title.length;
    			var d = "";
    			var d_e ="";
//    			var d = "<div class='slider-pannel'>";
//    			var d_e ="</div>";
    			var l_s = "";
    			for(var i = 0;i<l;i++) {
    				if(title&&targ) {
    					var sld = sliderDiv(title[i],targ[i]);
    					if(i==0) {
    						l_s +=d+sld;
    					}else{
    						l_s+=sld;
    					}
    				}else if(title) {
    					var sld = sliderDiv(title[i],targ[i]);
    					if(i==0) {
    						l_s +=d+sld;
    					}else{
    						l_s+=sld;
    					}
    				}else{
    					slider.append(div);
    				}
    			}
    			l_s+=d_e;
    			slider.append(l_s);
    			var width = options.width;
    			$(".slider").css("height",options.height+"px").css("width",options.width+"px");
    			$(".slider-hander").css("width",options.height+0+"px").css("height",options.height+0+"px").css("left","0").css("top",-options.height-0+"px");
    			var w = (width*0.8)+options.height;
    			$(".slider-selection").css("background-color","#BABABA").css("width","0px").css("height",options.height);
    			$(".slider-f-f").css("height",options.height+"px").css("line-height",options.height+"px");
    			$(".slider_left-title").css("margin-right","3px");
    			
    			var titleWidth = $(".slider_left-title").width();
    			var targWidth = $(".targ").width();
    			var alrWidth = $(".already").width();
    			var sliderWidth = $(".slider").width();
    			var px = titleWidth+targWidth+alrWidth+sliderWidth;
    			$(".slider-f").css("width",px+10+"px");
    			$(slider).parent().css("width",px+12+"px");
    			$(".slider-pannel").css("width",titleWidth+targWidth+alrWidth+sliderWidth+5+"px");
    		}
    		function sliderDiv(title,target,_alr) {
    			var sld = "<div class='slider-f slider-x'>" +
				"<div class='slider_left-title slider-f-f'>"+title+"</div>" +
				"<div class='slider slider-f-f'>" +
					"<div class='slider-selection'></div>" +
					"<div class='slider-hander'></div>" +
				"</div>" +
				"<div class='slider_right-text slider-f-f targ'>"+target+"</div>";
    				sld+="<label class='slider_right-text slider-f-f already'></label>";
    			
    			sld+="</div>";
				
    			return sld;
    		}
    		
    	}
    });
    $.fn.jxSlider.defaults = { 
    	width:200,
    	height:14,
    	init:false,
    	sliders:1,
    	maxValue:1000,
    	title:null,
    	targ:"0/1000"
    };
    $.fn.sliderCache = {
    		
    };
    
    $.extend({
    	ms_DatePicker: function (options) {
    	            var defaults = {
    	                YearSelector: "#sel_year",
    	                MonthSelector: "#sel_month",
    	                DaySelector: "#sel_day",
    	                FirstText: "--",
    	                FirstValue: 0
    	            };
    	            var opts = $.extend({}, defaults, options);
    	            var $YearSelector = $(opts.YearSelector);
    	            var $MonthSelector = $(opts.MonthSelector);
    	            var $DaySelector = $(opts.DaySelector);
    	            var FirstText = opts.FirstText;
    	            var FirstValue = opts.FirstValue;

    	            // 初始化
    	            var str = "<option value=\"" + FirstValue + "\">" + FirstText + "</option>";
    	            $YearSelector.html(str);
    	            $MonthSelector.html(str);
    	            $DaySelector.html(str);

    	            // 年份列表
    	            var yearNow = new Date().getFullYear();
    				var yearSel = $YearSelector.attr("rel");
    	            for (var i = yearNow; i >= 1900; i--) {
    					var sed = yearSel==i?"selected":"";
    					var yearStr = "<option value=\"" + i + "\" " + sed+">" + i + "</option>";
    	                $YearSelector.append(yearStr);
    	            }

    	            // 月份列表
    				var monthSel = $MonthSelector.attr("rel");
    	            for (var i = 1; i <= 12; i++) {
    					var sed = monthSel==i?"selected":"";
    	                var monthStr = "<option value=\"" + i + "\" "+sed+">" + i + "</option>";
    	                $MonthSelector.append(monthStr);
    	            }

    	            // 日列表(仅当选择了年月)
    	            function BuildDay() {
    	                if ($YearSelector.val() == 0 || $MonthSelector.val() == 0) {
    	                    // 未选择年份或者月份
    	                    $DaySelector.html(str);
    	                } else {
    	                    $DaySelector.html(str);
    	                    var year = parseInt($YearSelector.val());
    	                    var month = parseInt($MonthSelector.val());
    	                    var dayCount = 0;
    	                    switch (month) {
    	                        case 1:
    	                        case 3:
    	                        case 5:
    	                        case 7:
    	                        case 8:
    	                        case 10:
    	                        case 12:
    	                            dayCount = 31;
    	                            break;
    	                        case 4:
    	                        case 6:
    	                        case 9:
    	                        case 11:
    	                            dayCount = 30;
    	                            break;
    	                        case 2:
    	                            dayCount = 28;
    	                            if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
    	                                dayCount = 29;
    	                            }
    	                            break;
    	                        default:
    	                            break;
    	                    }
    						
    						var daySel = $DaySelector.attr("rel");
    	                    for (var i = 1; i <= dayCount; i++) {
    							var sed = daySel==i?"selected":"";
    							var dayStr = "<option value=\"" + i + "\" "+sed+">" + i + "</option>";
    	                        $DaySelector.append(dayStr);
    	                    }
    	                }
    	            }
    	            $MonthSelector.change(function () {
    	                BuildDay();
    	            });
    	            $YearSelector.change(function () {
    	                BuildDay();
    	            });
    				if($DaySelector.attr("rel")!=""){
    					BuildDay();
    				}
    	        } // End ms_DatePicker
    	});  
    
    
    
})(jQuery);

//获得本月的开端日期 
function getMonthStartDate(){ 
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; // 
var monthStartDate = new Date(nowYear, nowMonth, 1); 
return formatDate(monthStartDate); 
} 


//获得本月的停止日期 
function getMonthEndDate(){ 
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; // 
var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth)); 
return formatDate(monthEndDate); 
}
//格局化日期：yyyy-MM-dd 
function formatDate(date) { 
var myyear = date.getFullYear(); 
var mymonth = date.getMonth()+1; 
var myweekday = date.getDate(); 

if(mymonth < 10){ 
mymonth = "0" + mymonth; 
} 
if(myweekday < 10){ 
myweekday = "0" + myweekday; 
} 
return (myyear+"-"+mymonth + "-" + myweekday); 
} 
//获得某月的天数 
function getMonthDays(myMonth){ 
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; // 
var monthStartDate = new Date(nowYear, myMonth, 1); 
var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
return days; 
}
function getDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	var d = dd.getDate(); 
	return y+"-"+m+"-"+d; 
	} 