var ruleVarAttr = {
		varType:{},
		dataType:{}
};
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initMoreConditionBtnClick();
	
}




/*******************************************************************************
 * 初始化高级搜索条件
 * 
 * @returns
 */
function initMoreConditionBtnClick(){
	$("#moreConditionBtn").click(function(){
		if($("#ruleVarTable").data().opened){
			$("#ruleVarTable").children().children().each(function(i,o){
				if(i!=0){
					$(o).css("display","none");
				}
			});
			$("#ruleVarTable").data().opened = false;
			$("#moreConditionBtn").parent().removeAttr("vAlign");
		}else{
			$("#ruleVarTable").children().children().each(function(i,o){
				$(o).css("display","");
			});
			$("#ruleVarTable").data().opened = true;
			$("#moreConditionBtn").parent().attr("vAlign","bottom");
		}
		
	});
	$(".shouldhidden").each(function(){
		$(this).css("display","none");
	})
}

function initControls(){
	initGrid();
	queryRuleVar();
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
	
	$('#ruleVarGridDiv').css({
		height:window.innerHeight-$("#ruleVarForm").innerHeight()-$("#operbtn").innerHeight()-58
	});
	
	$('#ruleVarGrid').datagrid({
		// title:"RuleVar列表",
	    columns:[[
	 	    	 
		    	  	 	{field:'varDesc',title:'描述',width:150},
		    	  	 	{field:'varCode',title:'名称',width:150},
		    	  	 	{field:'uiType',title:'组件类型',width:100,formatter:function(value,row,index){
				  	  			return value;
				  	  		}
		    	  	 	},
		    	  	 	{field:'varSql',title:'SQL',width:500},
		    	  	 	{field:'operation_custom',title:'操作',width:120,align:"center",formatter:function(value,row,index){
				  	  		return "<a title='查看' class='grid_link'  onclick=viewData(this,'"+row.id+"')>查看</a>&nbsp;"+
				  	  		"<a title='编辑' class='grid_link' onclick=editData(this,'"+row.id+"')>编辑</a>&nbsp;" +
				  	  				"<a title='删除' class='grid_link'  onclick=deleteData(this,'"+row.id+"')>删除</a>";
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
	$("#ruleVarGridPager").pagination({
		pageList: [30,50,100],
		pageSize:30,
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
function queryRuleVar(){
	var param = tcCore.getFormData("ruleVarForm");
	var param1 =tcCore.getFormData("ruleVarFormMoreCondition"); 
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
	var pager = $('#ruleVarGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"ruleVarDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#ruleVarGrid').datagrid("loadData",page.dataList);
			$("#ruleVarGridPager").pagination('refresh',{	
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
	tcCore.openWindowOnTop("RuleVarView.jsp?id="+id, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看变量"
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("RuleVarEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增变量"
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("RuleVarEdit.jsp?id="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑变量"
	});
}

function editDataBtnClick(){
	var data = $("#ruleVarGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.id);
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
	 top.$.messager.confirm('系统提示', '确认要删除该ruleVar信息吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"ruleVarDS/deleteRuleVarByPk.ssm",
              		data:{
              			id:id
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
	var data = $("#ruleVarGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.id);
	}
}


$(document).ready(init);
