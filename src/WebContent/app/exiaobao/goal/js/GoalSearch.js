
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initMoreConditionBtnClick();
	initGrid();
	queryGoal();
}

/*******************************************************************************
 * 初始化高级搜索条件
 * 
 * @returns
 */
function initMoreConditionBtnClick(){
	$("#moreConditionBtn").click(function(){
		if($("#goalTable").data().opened){
			$("#goalTable").children().children().each(function(i,o){
				if(i!=0){
					$(o).css("display","none");
				}
			});
			$("#goalTable").data().opened = false;
			$("#moreConditionBtn").parent().removeAttr("vAlign");
		}else{
			$("#goalTable").children().children().each(function(i,o){
				$(o).css("display","");
			});
			$("#goalTable").data().opened = true;
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
	
	$('#goalGridDiv').css({
		height:window.innerHeight-$("#goalForm").innerHeight()-$("#operbtn").innerHeight()-60
	});
	
	$('#goalGrid').datagrid({
		// title:"Goal列表",
	    columns:[[
	 	    	 
		    	  	  	{field:'tgnum',title:'推广量',width:100},

		    	  	  	{field:'fwnum',title:'访问量',width:100},

		    	  	  	{field:'ddnum',title:'订单量',width:100},

		    	  	  	{field:'cjnum',title:'成交额',width:100},

		    	  	   {field:'jqreward',title:'金钱奖励',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return "￥"+value;
		    	  	  		}else{
		    	  	  			return "￥"+0;
		    	  	  		}
		    	  	  	}},
		    	  	 	{field:'swreward',title:'实物奖励',width:100,formatter:function(value,row,index){
		    	  	 		if(value){
		    	  	 			return "是";
		    	  	 		}else{
		    	  	 			return "否";
		    	  	 		}
		    	  	 	}},

		    	  	  	{field:'cyear',title:'年份',width:100},

		    	  	  	{field:'cmonth',title:'月份',width:100},

		    	  	  	{field:'createdate',title:'创建时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},
		    	  	 	{field:'orgname',title:'所属医院',width:100},

	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='查看' class='grid_link'  onclick=viewData(this,'"+row.goalid+"')>查看</a>&nbsp;"+
		  	  		"<a title='编辑' class='grid_link' onclick=editData(this,'"+row.goalid+"')>编辑</a>&nbsp;" +
		  	  				"<a title='删除' class='grid_link'  onclick=deleteData(this,'"+row.goalid+"')>删除</a>";
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
	$("#goalGridPager").pagination({
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
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"goalDS/queryForListPage.ssm",
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
/*******************************************************************************
 * 查看
 * 
 * @returns
 */
function viewData(a,id){
	// debugger;
	tcCore.openWindowOnTop("GoalView.jsp?goalid="+id, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看目标",
		width:window.innerWidth/4 *3 ,
		height:window.innerHeight/5 *4
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("GoalEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增目标",
		height:620,
		width:820,
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("GoalEdit.jsp?goalid="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑目标",
		height:620,
		width:820,
	});
}

function editDataBtnClick(){
	var data = $("#goalGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.goalid);
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
	 top.$.messager.confirm('系统提示', '确认要删除该目标信息吗？', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"goalDS/deleteGoalByPk.ssm",
              		data:{
              			goalid:id
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
	var data = $("#goalGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.goalid);
	}
}


$(document).ready(init);
