var goodsSearchAtrr={
		imgserURL:"",	
};
function init(){
	initfileUrl();
}
/**
 * 获得文件服务访问基础路径
 */
function initfileUrl(){
	//获得附件服务器的url
	tcCore.get({
		url:"fileOptions/getUrl.ssm",
		success:function(data){
			goodsSearchAtrr.imgserURL=data;
			initGrid();
			queryGoods();
		}
	});
}
/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#goodsGridDiv').css({
		height:window.innerHeight-$("#goodsForm").innerHeight()-$("#operbtn").innerHeight()-30-20-30
	});
	
	$('#goodsGrid').datagrid({
		// title:"Goods列表",
	    columns:[[
					{field:'smallimg',title:'图像',width:70,align:'center',
							formatter:function(value,row,index){
								var img="<img id='"+value+"' src='http://"+goodsSearchAtrr.imgserURL+value+"' style='width: 68px;height: 52px;'/>";
								return "<a href='javascript:;' title='查看' class='grid_opreat_a' onclick=viewData(this,\""+row.goodsid+"\")>"+img+"</a>";
							}
						},
	    	  	 	{field:'goodsname',title:'商品',width:100,align:'center',
			  	  		formatter:function(value,row,index){
			  	  			return "<a href='javascript:;' title='查看' class='grid_opreat_a' onclick=viewData(this,\""+row.goodsid+"\")>"+value+"</a>";
			  	  		}
	    	  	 	},
	    	  	 	{field:'orgname',title:'医院',width:100,align:'center'},
	    	  	  	{field:'price',title:'价格',width:100,align:'center'},
	    	  	  	{field:'brokerage',title:'佣金',width:100,align:'center'},
	    	  	  	{field:'discount',title:'折扣',width:100,align:'center'},
	    	  	 	{field:'status',title:'上架/下架',width:100,align:'center',formatter:function(value,row,index){
	    	  	 		if(value&&value+""==="1"){//上架
	    	  	 			return "上架";
	    	  	 		}else if(value&&value+""==="2"){//下架
	    	  	 			return "下架";
	    	  	 		}
	    	  	 	}},
	    	  	 	{field:'createname',title:'创建人',width:100,align:'center'},
	    	  	  	{field:'createdate',title:'创建时间',width:100,align:'center',formatter:function(value,row,index){
	    	  	  		if(value){
	    	  	  			return new Date(value).format("yyyy-MM-dd hh:mm:ss")
	    	  	  		}
	    	  	  		return value;
	    	  	  	}},
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
	$("#goodsGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			sendQuery();
		},
		onChangePageSize:function(pageSize){
			sendQuery();
		},
	});
	
}

/*******************************************************************************
 * 获取datagrid的工具栏
 * 
 * @returns
 */
function getGridToolbar(){
	return [{
		iconCls: 'icon-grid-add',
		text:"新增",
		handler: function(){
			// 获取当前行
			addData();
		}
	},'-',{
		iconCls: 'icon-grid-edit',
		text:"编辑",
		handler: function(){
			editDataBtnClick();
		}
	},'-',{
		iconCls: 'icon-dustbin',
		text:"删除",
		handler: function(){
			deleteDataBtnClick();
		}
	}];
}

/*******************************************************************************
 * 查询
 * 
 * @returns
 */
function queryGoods(){
	var param = tcCore.getFormData("goodsForm");
	var param1 =tcCore.getFormData("goodsFormMoreCondition"); 
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
	var pager = $('#goodsGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
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
/*******************************************************************************
 * 查看
 * 
 * @returns
 */
function viewData(a,id){
	// debugger;
	tcCore.openWindowOnTop("GoodsView.jsp?goodsid="+id+"&phone="+uphone+"&flag=1", null, a, function(result){
		// 关闭窗口的回调
	}, {
		title : "查看商品",
		width:820,
		height:window.innerHeight,
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("GoodsEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	},  {
		title : "新增商品记录",
		width:900,
		height:600
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("GoodsEdit.jsp?goodsid="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title : "编辑商品记录",
		width:900,
		height:600
	});
}

function editDataBtnClick(){
	var data = $("#goodsGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.goodsid);
	}
}

/*******************************************************************************
 * 新增，编辑的回调
 */
function operaCallBack(result){
	if(result && (result.command=="save" ||  result.command=="delete")){
		queryGoods();
	}
}

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(a,id){
	// debugger;
	 top.$.messager.confirm('系统提示', '确认要删除该商品信息吗？', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"goodsDS/deleteGoodsByPk.ssm",
              		data:{
              			goodsid:id
              		},
              		success:function(data){
              			sendQuery();
              		}
              	}); 
             }
         }
     });
}

function deleteDataBtnClick(){
	var data = $("#goodsGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.goodsid);
	}
}
/**
 * 上架
 */
function bracketUp(){
	var data = $("#goodsGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		tcCore.post({
      		url:"goodsDS/bracketUpDown.ssm",
      		data:{
      			goodsid:data.goodsid,
      			status:"1",
      		},
      		success:function(data){
      			if(data&&data+""==="1"){
      				queryGoods()
      			}else{
      				alert("上架失败！");
      			}
      		}
      	}); 
	}
}
/**
 * 下架
 */
function bracketDown(){
	var data = $("#goodsGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		tcCore.post({
      		url:"goodsDS/bracketUpDown.ssm",
      		data:{
      			goodsid:data.goodsid,
      			status:"2",
      		},
      		success:function(data){
      			if(data&&data+""==="1"){
      				queryGoods()
      			}else{
      				alert("下架失败！");
      			}
      		}
      	}); 
	}
}


$(document).ready(init);
