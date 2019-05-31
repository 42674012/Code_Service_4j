
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	//initMoreConditionBtnClick();
	initGrid();
	queryJob();
}

/*******************************************************************************
 * 初始化高级搜索条件
 * 
 * @returns
 */
/*function initMoreConditionBtnClick(){
	$("#moreConditionBtn").click(function(){
		if($("#jobTable").data().opened){
			$("#jobTable").children().children().each(function(i,o){
				if(i!=0){
					$(o).css("display","none");
				}
			});
			$("#jobTable").data().opened = false;
			$("#moreConditionBtn").parent().removeAttr("vAlign");
		}else{
			$("#jobTable").children().children().each(function(i,o){
				$(o).css("display","");
			});
			$("#jobTable").data().opened = true;
			$("#moreConditionBtn").parent().attr("vAlign","bottom");
		}
		
	});
	$(".shouldhidden").each(function(){
		$(this).css("display","none");
	})
}*/

function initControls(){
	$("#orgIdShow").autocomplete('orgDS/queryAutoComplete.ssm', {
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
			$("#orgId").val(null);
			return item.name;
		},
		formatMatch : function(item) {
		}
	}).result(function(e, item) {
		$("#orgIdShow").val(item.name);
		$("#orgId").val(item.orgId);
	});
	    	/*tcCore.get({
	    		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=",
	    		success:function(data){
	    			$("#jobType").combobox("loadData",data);
	    		}
	    	});*/
}

/*******************************************************************************
 * 隐藏高级搜索条件
 * 
 * @returns
 */
/*function hideMoreCondition(){
	$("#moreConditionBtn").tooltip("hide");
}*/


/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#jobGridDiv').css({
		height:window.innerHeight-$("#jobForm").innerHeight()-$("#operbtn").innerHeight()-58
	});
	
	$('#jobGrid').datagrid({
		// title:"Job列表",
	    columns:[[
	              {field:'jobId',title:'职务id',hidden:true},
	              {field:'jobName',title:'名称',width:100},
	              {field:'orgIdShow',title:'部门',width:100},
		    	  {field:'lastUpdateDate',title:'时间',width:100,formatter:function(value,row,index){
	    	  	  		if(value){
	    	  	  			return new Date(value).format("yyyy-MM-dd")
	    	  	  		}
	    	  	  		return value;
		    	  }},
		    	  {field:'lastUpdateBy',title:'创建人',width:100},

		    	  /*{field:'lastUpdateDate',title:'更新时间',width:100,formatter:function(value,row,index){
	    	  	  		if(value){
	    	  	  			return new Date(value).format("yyyy-MM-dd")
	    	  	  		}
	    	  	  		return value;
		    	  }},
		    	  {field:'lastUpdateBy',title:'更新人',width:100},*/

	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='查看' class='grid_link'  onclick=viewData(this,'"+row.jobId+"')>查看</a>&nbsp;"+
		  	  		"<a title='编辑' class='grid_link' onclick=editData(this,'"+row.jobId+"')>编辑</a>&nbsp;" +
		  	  				"<a title='删除' class='grid_link'  onclick=deleteData(this,'"+row.jobId+"')>删除</a>";
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
	$("#jobGridPager").pagination({
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
function queryJob(){
	var param = tcCore.getFormData("jobForm");
	//var param1 =tcCore.getFormData("jobFormMoreCondition"); 
	var p = {};
	copyProerty(p,param);
	//copyProerty(p,param1);
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
	var pager = $('#jobGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"jobViewDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#jobGrid').datagrid("loadData",page.dataList);
			$("#jobGridPager").pagination('refresh',{	
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
	tcCore.openWindowOnTop("JobView.jsp?jobId="+id, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看职务"
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("JobEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增职务"
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("JobEdit.jsp?jobId="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑职务"
	});
}

function editDataBtnClick(){
	var data = $("#jobGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.jobId);
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
	 top.$.messager.confirm('系统提示', '确认要删除该职务吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"jobDS/deleteJobByPk.ssm",
              		data:{
              			jobId:id
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
	var data = $("#jobGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.jobId);
	}
}


$(document).ready(init);
