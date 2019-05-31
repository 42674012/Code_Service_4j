
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initMoreConditionBtnClick();
	initGrid();
	queryGroup();
}

/*******************************************************************************
 * 初始化高级搜索条件
 * 
 * @returns
 */
function initMoreConditionBtnClick(){
	$("#moreConditionBtn").click(function(){
		if($("#groupTable").data().opened){
			$("#groupTable").children().children().each(function(i,o){
				if(i!=0){
					$(o).css("display","none");
				}
			});
			$("#groupTable").data().opened = false;
			$("#moreConditionBtn").parent().removeAttr("vAlign");
		}else{
			$("#groupTable").children().children().each(function(i,o){
				$(o).css("display","");
			});
			$("#groupTable").data().opened = true;
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
	
	$('#groupGridDiv').css({
		height:window.innerHeight-$("#groupForm").innerHeight()-$("#operbtn").innerHeight()-30-20-30
	});
	
	$('#groupGrid').datagrid({
		// title:"Group列表",
	    columns:[[
	 	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
			  	  		return "<a title='查看' class='grid_operation_btn grid_operation_btn-view'  onclick=viewData(this,'"+row.groupId+"')></a>&nbsp;"+
			  	  		"<a title='编辑' class='grid_operation_btn grid_operation_btn-edit' onclick=editData(this,'"+row.groupId+"')></a>&nbsp;" +
			  	  				"<a title='删除' class='grid_operation_btn grid_operation_btn-delete'  onclick=deleteData(this,'"+row.groupId+"')></a>";
			  	  	}},
		    	  	 	{field:'name',title:'名称',width:100}
,
		    	  	  	{field:'orderIndex',title:'排序index',width:100}
,
		    	  	  	{field:'createDate',title:'创建日期',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},
		    	  	 	{field:'createBy',title:'创建人',width:100}
,
		    	  	 	{field:'lastUpdateBy',title:'最后更新人',width:100}
,
		    	  	  	{field:'lastUpdateDate',title:'最后更新时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd")
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
	$("#groupGridPager").pagination({
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
function queryGroup(){
	var param = tcCore.getFormData("groupForm");
	var param1 =tcCore.getFormData("groupFormMoreCondition"); 
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
	var pager = $('#groupGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"groupDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#groupGrid').datagrid("loadData",page.dataList);
			$("#groupGridPager").pagination('refresh',{	
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
	tcCore.openWindowOnTop("GroupView.jsp?groupId="+id, null, a, function(result){
		// 关闭窗口的回调
	}, {
		title:"查看Group"
	});
}
/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	tcCore.openWindowOnTop("GroupEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增Group"
	});
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("GroupEdit.jsp?groupId="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑Group"
	});
}

function editDataBtnClick(){
	var data = $("#groupGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.groupId);
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
	 top.$.messager.confirm('系统提示', '确认要删除该group信息吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"groupDS/deleteGroupByPk.ssm",
              		data:{
              			groupId:id
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
	var data = $("#groupGrid").datagrid("getSelected");
	if(data == null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.groupId);
	}
}


$(document).ready(init);
