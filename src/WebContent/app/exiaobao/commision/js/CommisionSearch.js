
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initGrid();
	queryCommision();
}


function initControls(){
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#commisionGridDiv').css({
		height:window.innerHeight-$("#commisionForm").innerHeight()-$("#operbtn").innerHeight()-60
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
		  	  		return "<a title='查看' class='grid_link'  onclick=viewData(this,'"+row.employee_id+"','"+row.orgid+"')>查看</a>&nbsp;";
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
function queryCommision(){
	var param = tcCore.getFormData("commisionForm");
	var param1 =tcCore.getFormData("commisionFormMoreCondition"); 
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
	var pager = $('#commisionGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
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
/*******************************************************************************
 * 查看
 * 
 * @returns
 */
function viewData(a,id,orgid){
	// debugger;
	tcCore.openWindowOnTop("CommisionView.jsp?employeeid="+id+"&orgid="+orgid, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看佣金记录",
		width:800,
		height:600,
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("CommisionEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增佣金"
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("CommisionEdit.jsp?comid="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑Commision"
	});
}

function editDataBtnClick(){
	var data = $("#commisionGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.comid);
	}
}

/*******************************************************************************
 * 新增，编辑的回调
 */
function operaCallBack(result){
	if(result && (result.command=="save" ||  result.command=="delete")){
		sendQuery(null);
	}
}

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(a,id){
	// debugger;
	 top.$.messager.confirm('系统提示', '确认要删除该commision信息吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"commisionDS/deleteCommisionByPk.ssm",
              		data:{
              			comid:id
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
	var data = $("#commisionGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.comid);
	}
}


$(document).ready(init);
