var mainAtrr={
	mainwidth:980,
};
tcCore.loadJs(context+"/app/index/js/main_center.js");
function init(){
	initChart();
	mainAtrr.mainwidth=window.innerWidth/2+240;
	$('#tt').tabs({
	    border:false,
	    width:mainAtrr.mainwidth+"px",
	    onSelect:function(title){
			if(title=='商品列表'){
				initgoods();
			}else if(title=='活动列表'){
				initcampaign();
			}else if(title=='申请审批'){
				inithapply();
			}else if(title=='佣金列表'){
				initcommision();
			}
	    }
	});
	$('#tt').tabs("select",2);
	//商品发布
	$("#spfb").click(function(){
		$('#tt').tabs('select','商品列表');
		addGoods();
	});
	//活动发布
	$("#hdfb").click(function(){
		$('#tt').tabs('select','活动列表');
		addCampaign();
	});
	//预约到院
	$("#yydy").click(function(){
		// debugger;
		tcCore.openWindowOnTop(context+"/app/exiaobao/bespeak/BespeakSearch.jsp", null, null, function(result){
			// 关闭窗口的回调
		}, {
			title : "预约到院",
			width:1000,
			height:window.innerHeight,
		}); 
	});
	//用户提现
	$("#yhtx").click(function(){
		// debugger;
		tcCore.openWindowOnTop(context+"/app/exiaobao/cash/CashSearch.jsp", null, null, function(result){
			// 关闭窗口的回调
		}, {
			title : "用户提现",
			width:1000,
			height:window.innerHeight,
		}); 
	});
}
/**
 * -------------------------------------商品-----------------------
 */
function initgoods(){
	$('#goodsGridDiv').css({
		height:window.innerHeight-205,
	});
	$('#goodsGrid').datagrid({
		// title:"Goods列表",
	    columns:[[
	    	  	 	{field:'goodsname',title:'商品',width:100,align:'center',
			  	  		formatter:function(value,row,index){
			  	  			return "<a href='javascript:;' title='查看' class='grid_opreat_a' onclick=viewData(this,\""+row.goodsid+"\")>"+value+"</a>";
			  	  		}
	    	  	 	},
	    	  	 	{field:'orgname',title:'医院',width:100,align:'center'},
	    	  	  	{field:'price',title:'价格',width:100,align:'center'},
	    	  	  	{field:'brokerage',title:'佣金',width:100,align:'center'},
	    	  	  	{field:'discount',title:'折扣',width:100,align:'center'},
	    	  	 	{field:'createname',title:'创建人',width:100,align:'center'},
	    	  	  	{field:'createdate',title:'创建时间',width:100,align:'center',formatter:function(value,row,index){
	    	  	  		if(value){
	    	  	  			return new Date(value).format("yyyy-MM-dd hh:mm:ss")
	    	  	  		}
	    	  	  		return value;
	    	  	  	}},
	    ]],
	    fit:true,
	    width:mainAtrr.mainwidth,
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
	$("#goodsGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			queryGoods();
		},
		onChangePageSize:function(pageSize){
			queryGoods();
		},
	});
	queryGoods();
}
/**
 * 商品查询
 */
function queryGoods(){
	var param = {};
	// 获取分页信息
	var pager = $('#goodsGridPager').pagination("options");
	// 计算起始，和截至数据
	tcCore.post({
		url:"goodsDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#goodsGrid').datagrid("loadData",page.dataList);
			$("#goodsGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}
/***
 * 商品查看
 * @returns
 */
function viewData(a,id){
	// debugger;
	tcCore.openWindowOnTop(context+"/app/exiaobao/goods/GoodsView.jsp?goodsid="+id+"&phone="+uphone+"&flag=1", null, a, function(result){
		// 关闭窗口的回调
	}, {
		title : "查看商品",
		width:820,
		height:window.innerHeight,
	});
}
//商品新增
function addGoods(){
	tcCore.openWindowOnTop(context+"/app/exiaobao/goods/GoodsEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		goodsCallBack(result);
	},  {
		title : "新增商品记录",
		width:900,
		height:600
	});
}
function goodsCallBack(result){
	if(result && (result.command=="save" ||  result.command=="delete")){
		queryGoods();
	}
}
/**
 * -------------------------------------活动-----------------------
 */
function initcampaign(){
	$('#campaignGridDiv').css({
		height:window.innerHeight-205
	});
	
	$('#campaignGrid').datagrid({
		// title:"Campaign列表",
	    columns:[[
	 	    	 
		    	  	 	{field:'subject',title:'活动主题',width:100,formatter:function(value,row,index){
		    	  	 		return "<a title='查看' class='grid_link'  onclick=viewDataCampaign(this,'"+row.campaignid+"')>"+value+"</a>&nbsp;"
		    	  	 	}},
		    	  	  	{field:'begintime',title:'活动开始时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},
		    	  	  	{field:'endtime',title:'活动结束时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},
		    	  	 	{field:'createname',title:'创建人',width:100},

		    	  	 	{field:'orgname',title:'医院名称',width:100},
	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return  "<a title='编辑' class='grid_link' onclick=editDataCampaign(this,'"+row.campaignid+"')>编辑</a>&nbsp;" +
		  	  				"<a title='删除' class='grid_link'  onclick=deleteDataCampaign(this,'"+row.campaignid+"')>删除</a>";
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
	$("#campaignGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			queryCampaign();
		},
		onChangePageSize:function(pageSize){
			queryCampaign();
		},
	});
	queryCampaign();
}
/**
 * 查询活动
 * @returns
 */
function queryCampaign(){
	// 获取分页信息
	var pager = $('#campaignGridPager').pagination("options");
	var param = {};
	// 计算起始，和截至数据
	tcCore.post({
		url:"campaignDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#campaignGrid').datagrid("loadData",page.dataList);
			$("#campaignGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}
function addCampaign(){
	tcCore.openWindowOnTop(context+"/app/exiaobao/campaign/CampaignEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		campaignCallBack(result);
	}, {
		title : "新增活动",
		width:900,
		height:600
	});
}
function viewDataCampaign(a,id){
	// debugger;
	tcCore.openWindowOnTop(context+"/app/exiaobao/campaign/CampaignShow.jsp?goodsid="+id+"&phone="+uphone, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看活动",
		width:820,
		height:window.innerHeight,
	});
}
function editDataCampaign(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop(context+"/app/exiaobao/campaign/CampaignEdit.jsp?campaignid="+id, null, a, function(result){
		// 关闭窗口的回调
		campaignCallBack(result);
	}, {
		title:"编辑活动",
		width:900,
		height:600
	});
}
function deleteDataCampaign(a,id){
	// debugger;
	 top.$.messager.confirm('系统提示', '确认要删除该活动信息吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"campaignDS/deleteCampaignByPk.ssm",
              		data:{
              			campaignid:id
              		},
              		success:function(data){
              			queryCampaign();
              		}
              	}); 
             }
         }
     });
}
function campaignCallBack(result){
	if(result && (result.command=="save" ||  result.command=="delete")){
		queryCampaign();
	}
}
/**
 * ----------------------------------------审批-----------------------------
 */
function inithapply(){
	$('#happlyGridDiv').css({
		height:window.innerHeight-205
	});
	
	$('#happlyGrid').datagrid({
		// title:"Happly列表",
	    columns:[[
		    	  	 	{field:'aemployeeName',title:'申请人名称',width:100},
		    	  	 	{field:'phone',title:'申请人电话',width:100},
		    	  	 	{field:'status',title:'申请状态',width:100,formatter:function(value,row,index){
		    	  	  		if(value==1){
		    	  	  			return "审批中";
		    	  	  		}
		    	  	  		if(value==3){
		    	  	  		return "已拒绝";
		    	  	  		}
		    	  	  		return "审批通过";
		    	  	  	}},
		    	  	  	{field:'createdate',title:'申请时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd hh:mm:ss")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},

		    	  	 	{field:'orgname',title:'医院名称',width:100},

	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='查看' class='grid_link'  onclick=approve(this,'"+row.applyid+"')>审批</a>&nbsp;&nbsp;&nbsp;"+
		  	  		"<a title='编辑' class='grid_link' onclick=refuse(this,'"+row.applyid+"')>拒绝</a>" ;
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
	$("#happlyGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			queryHapply();
		},
		onChangePageSize:function(pageSize){
			queryHapply();
		},
	});
	queryHapply();
}
function queryHapply(){
	// 获取分页信息
	var pager = $('#happlyGridPager').pagination("options");
	var param={
		status:1	
	};
	// 计算起始，和截至数据
	tcCore.post({
		url:"happlyDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#happlyGrid').datagrid("loadData",page.dataList);
			$("#happlyGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}
function approve(a,id){
	var applyid=[];
	applyid.push(id);
	var status=2;
	// 计算起始，和截至数据
	tcCore.post({
		url:"happlyDS/updateHapply.ssm",
		data:{
			applyid:applyid,
			status:status,
			remark:""
		},
		success:function(page){
			 if(page){
				 alert("审批成功");
				 happlyCallBack();
			 }
		}
	});
}
function refuse(a,id){
	var applyid=[];
	applyid.push(id);
	var status=3;
	$.messager.prompt('提示', '请输入拒绝原因', function(r){
		if (r){
			var remark=r;
			// 计算起始，和截至数据
			tcCore.post({
				url:"happlyDS/updateHapply.ssm",
				data:{
					applyid:applyid,
					status:status,
					remark:remark
				},
				success:function(page){
					 if(page){
						 alert("操作成功");
						 happlyCallBack();
					 }
				}
			});
		}
	});
}
function happlyCallBack(){
	queryHapply()
}
/**
 * ----------------------------------------佣金-----------------------------
 */
function initcommision(){
	$('#commisionGridDiv').css({
		height:window.innerHeight-205
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
		    	  	  	{field:'vip',title:'场内/场外',width:100,formatter:function(value,row,index){
		    	  	  		if(value === "3"){
		    	  	  			return "场外";
		    	  	  		}else{
		    	  	  			return "场内";
		    	  	  		}
		    	  	  	}},
	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='查看' class='grid_link'  onclick=viewDataCommision(this,'"+row.employee_id+"','"+row.orgid+"')>查看</a>&nbsp;";
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
			queryCommision();
		},
		onChangePageSize:function(pageSize){
			queryCommision();
		},
	});
	queryCommision();
}
function queryCommision(){
	// 获取分页信息
	var pager = $('#commisionGridPager').pagination("options");
	var param={};
	// 计算起始，和截至数据
	tcCore.post({
		url:"commisionDS/queryBySqlPage.ssm",
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
function viewDataCommision(a,id,orgid){
	// debugger;
	tcCore.openWindowOnTop(context+"/app/exiaobao/commision/CommisionView.jsp?employeeid="+id+"&orgid="+orgid, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看佣金记录",
		width:800,
		height:600,
	});
}



$(document).ready(init);