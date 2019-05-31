

var goalAttr = {
		goalid:"",
		goalvo:{},
		imgserURL:""
	};

function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#goalFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	goalAttr.goalid = tcCore.getParameter("goalid");
	if(goalAttr.goalid){
		$("#cancelBtn").remove();
		initfileUrl(goalAttr.goalid);
	}else{
		$("#deleteBtn").remove();
	}
	
}

/**
 * 获得文件服务访问基础路径
 */
function initfileUrl(id){
	//获得附件服务器的url
	tcCore.get({
		url:"fileOptions/getUrl.ssm",
		success:function(data){
			goalAttr.imgserURL=data;
			getGoal(id);
		}
	});
}

function getGoal(id){
	tcCore.get({
		url:"goalDS/getGoalByPk.ssm?goalid="+encodeURI(id),
		success:function(data){
			initGoal(data);
		}
	});
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#goalGridDiv').css({
		height:window.innerHeight-140
	});
	
	$('#goalGrid').datagrid({
		// title:"Goal列表",
	    columns:[[
	 	    	 
	              {field:'name',title:'姓名',width:100},
              		{field:'phone',title:'手机号',width:100},
              		{field:'dcnum',title:'推广量',width:100,formatter:function(value,row,index){
              				
	              			if(goalAttr.goalvo){
	              				var shw=(((value/goalAttr.goalvo.tgnum)>=1?1:(value/goalAttr.goalvo.tgnum))*100);
	              				if(shw>=100){
	              					return "100%";
	              				}else{
	              					return (shw.toFixed(2))+"%";
	              				}
	              			}
		    	  	  		return value;
		    	  	  	}},

		    	  	  	{field:'dsnum',title:'访问量',width:100,formatter:function(value,row,index){
              				
	              			if(goalAttr.goalvo){
	              				var shw=(((value/goalAttr.goalvo.fwnum)>=1?1:(value/goalAttr.goalvo.fwnum))*100);
	              				if(shw>=100){
	              					return "100%";
	              				}else{
	              					return (shw.toFixed(2))+"%";
	              				}
	              				
	              			}
		    	  	  		return value;
		    	  	  	}},

		    	  	  	{field:'ncnum',title:'订单量',width:100,formatter:function(value,row,index){
              				
	              			if(goalAttr.goalvo){
	              				var shw=(((value/goalAttr.goalvo.ddnum)>=1?1:(value/goalAttr.goalvo.ddnum))*100);
	              				if(shw>=100){
	              					return "100%";
	              				}else{
	              					return (shw.toFixed(2))+"%";
	              				}
	              			}
		    	  	  		return value;
		    	  	  	}},
		    	  	  	{field:'nsnum',title:'成交额',width:100,formatter:function(value,row,index){
              				
	              			if(goalAttr.goalvo){
	              				var shw=(((value/goalAttr.goalvo.cjnum)>=1?1:(value/goalAttr.goalvo.cjnum))*100);
	              				if(shw>=100){
	              					return "100%";
	              				}else{
	              					return (shw.toFixed(2))+"%";
	              				}
	              			}
		    	  	  		return value;
		    	  	  	}},

		    	  	  	{field:'bdate',title:'日期',width:100}
	    ]],
	    fit:true,
	    width:"100%",
	    headerCls:"gridHeaderCls",
	    iconCls:"icon-grid",
	    striped:true,
	    singleSelect:true,
	    rownumbers:true,
	    fitColumns:true,
	    // pagination:true,
	    checkOnSelect:true
	    // toolbar: getGridToolbar()
	});
	$("#goalGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			queryGoal();
		},
		onChangePageSize:function(pageSize){
			queryGoal();
		},
	});
}
/*******************************************************************************
 * 查询
 * 
 * @returns
 */
function queryGoal(){
	var param = tcCore.getFormData("goalForm");
	var param1 =tcCore.getFormData("goalFormMoreCondition"); 
	var p = {};
	copyProerty(p,param);
	copyProerty(p,param1);
	sendQuery(p);
}

function copyProerty(p,p1){
	for(var a in p1){
		p[a] = p1[a];
	}
	return p;
}
/*******************************************************************************
 * 发送查询请求
 * 
 * @returns
 */
function sendQuery(param){
	// 获取分页信息
	var pager = $('#goalGridPager').pagination("options");
	if(goalAttr.goalvo){
		param.cmonth=goalAttr.goalvo.cyear+"-"+goalAttr.goalvo.cmonth;
		param.orgid=goalAttr.goalvo.orgid;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"goalDS/webquerytj.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#goalGrid').datagrid("loadData",page.dataList);
			$("#goalGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}


function initGoal(data){
	for(var d in data){
		if(d==='swreward'){
			//获得附件列表
			tcCore.get({
				url : "fileDS/queryFileListBy.ssm?modelname=icms_goal&modelid="+ data.goalid,
				success : function(datas) {
					if (datas) {
						$(datas).each(function(i, o) {
							if(o.atttype === "goalshowimg"){
								var html="";
								html="<input type='hidden' name='swrewardfileId' id='"+o.fileId+"' value='"+o.fileId+"' readonly='readonly'>";
								html+="<a href='#' onclick='showimg(\""+goalAttr.imgserURL+"\",\"swrewardfileId\",\""+o.fileId+"\")' style='margin: 5px'>";
								html+="<img id='consimg"+o.fileId+"' src='http://"+goalAttr.imgserURL+o.fileId+"' style='width: 128px;height: 96px;'/>";
								html+="</a>";
								$("#jlimg").append(html);
							}
							 
						});
					}
				}
			});
		}else{
			tcCore.setControlLabel($("#"+d),data[d]);
		}
	}
	goalAttr.goalvo=data;
	initGrid();
	queryGoal();
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
