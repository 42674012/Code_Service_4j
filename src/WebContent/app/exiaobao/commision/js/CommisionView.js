

var commisionAttr = {
		comid:"",
		orgid:"",
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
		$("#commisionFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initGrid();
	commisionAttr.comid = tcCore.getParameter("employeeid");
	commisionAttr.orgid= tcCore.getParameter("orgid");
	if(commisionAttr.comid){
		$("#cancelBtn").remove();
		getCommision(commisionAttr.comid);
	}else{
		$("#deleteBtn").remove();
	}
	
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#commisionGridDiv').css({
		height:window.innerHeight-80
	});
	
	$('#commisionGrid').datagrid({
		// title:"Commision列表",
	    columns:[[
	 	    	 
		    	  	 	{field:'name',title:'用户名',width:100},
		    	  	 	{field:'phone',title:'手机号',width:100},
		    	  	 	{field:'receiving',title:'佣金',width:100,
		    	  	 		formatter:function(value,row,index){
			    	  	  		if(value){
			    	  	  			return "￥"+value;
			    	  	  		}else{
			    	  	  			return "￥0";
			    	  	  		}
			    	  	  	}
		    	  	 	},
		    	  	 	{field:'recdate',title:'时间',width:100,formatter:function(value,row,index){
		    	  	 		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd hh:mm:ss")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}}
	    	 
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
	$("#commisionGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			getCommision(commisionAttr.comid);
		},
		onChangePageSize:function(pageSize){
			getCommision(commisionAttr.comid);
		},
	});
}




function getCommision(id){
	var param={};
	// 获取分页信息
	var pager = $('#commisionGridPager').pagination("options");
	param.employeeid=id;
	param.orgid=commisionAttr.orgid;
	// 计算起始，和截至数据
	tcCore.post({
		url:"commisionDS/queryByEmpidPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#commisionGrid').datagrid("loadData",page.dataList);
			$("#commisionGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}


function initCommision(data){
	for(var d in data){
		tcCore.setControlLabel($("#"+d),data[d]);
	}
}

function cancel(){
	tcCore.closeTopDialog();
}


$(document).ready(init);
