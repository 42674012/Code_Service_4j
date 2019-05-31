
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initMoreConditionBtnClick();
	initGrid();
	queryCash();
}

/*******************************************************************************
 * 初始化高级搜索条件
 * 
 * @returns
 */
function initMoreConditionBtnClick(){
	$("#moreConditionBtn").click(function(){
		if($("#cashTable").data().opened){
			$("#cashTable").children().children().each(function(i,o){
				if(i!=0){
					$(o).css("display","none");
				}
			});
			$("#cashTable").data().opened = false;
			$("#moreConditionBtn").parent().removeAttr("vAlign");
		}else{
			$("#cashTable").children().children().each(function(i,o){
				$(o).css("display","");
			});
			$("#cashTable").data().opened = true;
			$("#moreConditionBtn").parent().attr("vAlign","bottom");
		}
		
	});
	$(".shouldhidden").each(function(){
		$(this).css("display","none");
	})
}

function initControls(){
}

/*******************************************************************************
 * 隐藏高级搜索条件
 * 
 * @returns
 */
function hideMoreCondition(){
	$("#moreConditionBtn").tooltip("hide");
}


/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#cashGridDiv').css({
		height:window.innerHeight-$("#cashForm").innerHeight()-$("#operbtn").innerHeight()-60
	});
	
	$('#cashGrid').datagrid({
		// title:"Cash列表",
	    columns:[[

		    	  	 	{field:'employeeName',title:'提现人员姓名',width:100},

		    	  	 	{field:'phone',title:'提现人员手机号',width:100},

		    	  	 	{field:'tmoney',title:'提现金额',width:100},

		    	  	  	{field:'createdate',title:'提现时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd ")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},
		    	  	 	{field:'paymenter',title:'结款人',width:100},

	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='查看' class='grid_link'  onclick=viewData(this,'"+row.cashid+"')>查看</a>&nbsp;"+
		  	  		"<a title='编辑' class='grid_link' onclick=editData(this,'"+row.cashid+"')>编辑</a>&nbsp;" +
		  	  		"<a title='删除' class='grid_link' onclick=deleteData(this,'"+row.cashid+"')>删除</a>&nbsp;" ;
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
	$("#cashGridPager").pagination({
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
 * 查询
 * 
 * @returns
 */
function queryCash(){
	var param = tcCore.getFormData("cashForm");
	var param1 =tcCore.getFormData("cashFormMoreCondition"); 
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
	var pager = $('#cashGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"cashDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#cashGrid').datagrid("loadData",page.dataList);
			$("#cashGridPager").pagination('refresh',{	
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
	tcCore.openWindowOnTop("CashView.jsp?cashid="+id, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看提现记录",
		width:800,
		height:600
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("CashEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增提现记录",
		width:800,
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
	tcCore.openWindowOnTop("CashEdit.jsp?cashid="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑提现记录",
		width:800,
		height:600
	});
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
	 top.$.messager.confirm('系统提示', '提现记录可以编辑修改!!!!确认要删除该提现记录吗?', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"cashDS/deleteCashByPk.ssm",
              		data:{
              			cashid:id
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
	var data = $("#cashGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.cashid);
	}
}


$(document).ready(init);
