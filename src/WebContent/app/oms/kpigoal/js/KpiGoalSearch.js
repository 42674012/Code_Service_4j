var kpiGoalAttr={
	headList : {},
	bodysList : {}
};
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	tcCore.post({
  		url:"kpiGoalDS/setDataGrid.ssm",
  		success:function(data){
  			kpiGoalAttr.headList = data.headList;
  			kpiGoalAttr.bodysList = data.bodysList;
  			initGrid();
  		}
  	}); 
	initControls();
	
	queryKpiGoal();
	
	
}

function initControls(){
	$("#kpiObjIdShow").autocomplete('employeeDS/queryAutoComplete.ssm', {
		dataType : "json",
		parse : function(data) {
			return $.map(data, function(item) {
				return {
					data : item,
					name : item.name
				}
			});
		},
		matchContains : true,
		max : 1000,
		cacheLength : 1,
		formatItem : function(item) {
			return item.name;
		},
		formatMatch : function(item) {
		}
	}).result(function(e, item) {
		$("#kpiObjIdShow").val(item.name);
		$("#kpiObjId").val(item.employeeId);
	});
	
	$("#month").simpleCanleder();  
}


/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	$('#kpiGoalGridDiv').css({
		height:window.innerHeight-$("#kpiGoalForm").innerHeight()-$("#operbtn").innerHeight()-58
	});
	
	$('#kpiGoalGrid').datagrid({
		// title:"KpiGoal列表",
	   /* columns:[[
		    	  	  	{field:'kpiObjIdShow',title:'机构名称',width:100},
		    	  	  {field:'month',title:'月份',width:100},
	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='查看' class='grid_link'  onclick=viewData(this,'"+row.id+"')>查看</a>&nbsp;"+
		  	  		"<a title='编辑' class='grid_link' onclick=editData(this,'"+row.id+"',"+index+")>编辑</a>&nbsp;" +
		  	  				"<a title='删除' class='grid_link'  onclick=deleteData(this,'"+row.id+"')>删除</a>";
		  	  	}}
	    ]],*/
		columns:[kpiGoalAttr.headList,kpiGoalAttr.bodysList],
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
	$("#kpiGoalGridPager").pagination({
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
function queryKpiGoal(){
	var param = tcCore.getFormData("kpiGoalForm");
	var param1 =tcCore.getFormData("kpiGoalFormMoreCondition"); 
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
	/*var pager = $('#kpiGoalGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}*/
	// 计算起始，和截至数据
	tcCore.post({
		url:"goalViewDS/queryForQuota.ssm",
		/*data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},*/
		success:function(data){
			// dataList total
			$('#kpiGoalGrid').datagrid("loadData",data);
			/*$("#kpiGoalGridPager").pagination('refresh',{	
				total:page.total
			});*/
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
	tcCore.openWindowOnTop("KpiGoalView.jsp?id="+id, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看经营目标"
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("KpiGoalEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增经营目标"
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id,index){
	//获取当前选中行
	// 打开编辑窗口
	
	$('#kpiGoalGrid').datagrid("selectRow",index);
	var data = $('#kpiGoalGrid').datagrid("getSelected");
	tcCore.openWindowOnTop("KpiGoalEdit.jsp?id="+id, data, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑经营目标"
	});
}

function editDataBtnClick(){
	var data = $("#kpiGoalGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.kpiGoalId);
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
	 top.$.messager.confirm('系统提示', '确认要删除该kpiGoal信息吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"kpiGoalDS/deleteKpiGoalByPk.ssm",
              		data:{
              			kpiGoalId:id
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
	var data = $("#kpiGoalGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.kpiGoalId);
	}
}


$(document).ready(init);
