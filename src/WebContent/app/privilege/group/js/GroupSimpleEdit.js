var groupAttr = {
	groupId : ""
};
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	groupAttr.groupId = tcCore.getParameter("groupId");
	initExistGrid();
	initNoExistGrid();
	existSendQuery({groupId:groupAttr.groupId});
	onExistsendQuery();
}



//--------------------------------------已存在群组的人员Grid-----------------------------------------------------------------------//
/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initExistGrid(){
	$('#existGridDiv1').css({
		height:$("#center").innerHeight()/2-80
	});
	$('#existGridDiv1').css({
		height:window.innerHeight/2-50//($("#center").innerHeight()/2-20)
	});
	//$('#existTool').css('visibility','visible');
	$('#existGrid1').datagrid({
		title:"群组成员",
	    columns:[[
	            {field:'geId',title:'编号',width:100,hidden:true},
	            {field:'groupId',title:'编号',width:100,hidden:true},
	            {field:'name',title:'姓名',width:100},
	            {field:'phone',title:'手机号',width:100},
    	  	 	{field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,rowData,index){
            	  return "<a title='移除' class='grid_operation_btn grid_operation_btn-delete'  onclick=deleteData('"+rowData.geId+"')></a>";
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
	    checkOnSelect:true,
	   toolbar: '#existTool'//getGridToolbar()
	});
	$("#existGridPager1").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			existSendQuery();
		},
		onChangePageSize:function(pageSize){
			existSendQuery();
		},
	});
}


/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(id){
	var treedata = $("#groupTree").treegrid("getSelected");
	 top.$.messager.confirm('系统提示', '确认要移除该人员吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"groupEmployeeDS/deleteGroupEmployeeByPk.ssm",
              		data:{
              			geId:id
              		},
              		success:function(data){
              			operaCallBack(treedata);
              			/*existSendQuery({groupId : treedata.groupId});
            			onExistsendQuery({groupId : treedata.groupId});*/
              		}
              	}); 
             }
         }
     });
}

/**
 * 查询
 */
function existquery(){
	var treedata = $("#groupTree").treegrid("getSelected");
	var param = tcCore.getFormData("existForm");
	param.groupId = treedata.groupId;
	existSendQuery(param);
}

/*******************************************************************************
 * 发送分页查询请求
 * 
 * @returns
 */
function existSendQuery(param){
	// 获取分页信息
	var pager = $('#existGridPager1').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"employeeGroupVDS/queryForListPage.ssm",
		data:{
			params:window.searchParam,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#existGrid1').datagrid("loadData",page.dataList);
			$("#existGridPager1").pagination('refresh',{	
				total:page.total
			});
		}
	});
}

//--------------------------------------------------------------------------------------------------------------------------------//

//--------------------------------------未存在群组的人员Grid-----------------------------------------------------------------------//
/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initNoExistGrid(){
	$('#noExistGridDiv').css({
		height:window.innerHeight/2-80//$("#center").innerHeight()/2 - 80
	});
	$('#noExistTool').css('visibility','visible');
	$('#noExistGrid').datagrid({
		title:"未添加的人员",
	    columns:[[
	        {field:'employeeId',title:'编号',width:100,hidden:true},
	        {field:'name',title:'姓名',width:100},
			//{field:'cardId',title:'身份证',width:100},
	        {field:'phone',title:'手机号',width:100},
			{field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,rowData,index){
				return "<a title='添加' class='grid_operation_btn icon-grid-add' onclick=addData('"+rowData.employeeId+"')></a>"
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
	    checkOnSelect:true,
	    //toolbar: '#noExistTool'
	});
	$("#noExistGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			onExistsendQuery();
		},
		onChangePageSize:function(pageSize){
			onExistsendQuery();
		},
	});
}


/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(employeeId){
	var datasource ={
			groupId : groupAttr.groupId,
			employeeId : employeeId,
	}
	tcCore.post({
		url:"groupEmployeeDS/saveGroupEmployee.ssm",
		data:{
			groupEmployee : datasource
		},
		success:function(data){
			operaCallBack(data);
		}
	});
}

/**
 * 查询
 */
function noExistQuery(){
	var param = tcCore.getFormData("noExistForm");
	onExistsendQuery(param);
}
/*******************************************************************************
 * 发送分页查询请求
 * 
 * @returns
 */
function onExistsendQuery(param){
	// 获取分页信息
	var pager = $('#noExistGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"groupEmployeeDS/queryEmployeeForGroup.ssm",
		data:{
			params:window.searchParam,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#noExistGrid').datagrid("loadData",page.dataList);
			$("#noExistGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}

/**
 * 回调
 * @param result
 */
function operaCallBack(data){
	if(data){
		existSendQuery({groupId : data.groupId});
		onExistsendQuery({groupId : data.groupId});
	}
}
//--------------------------------------------------------------------------------------------------------------------------------//

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(id){
	 top.$.messager.confirm('系统提示', '确认要移除该人员吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"groupEmployeeDS/deleteGroupEmployeeByPk.ssm",
              		data:{
              			geId:id
              		},
              		success:function(data){
              			var treedata={
              					groupId : groupAttr.groupId
              			}
              			operaCallBack(treedata);
              			/*existSendQuery({groupId : treedata.groupId});
            			onExistsendQuery({groupId : treedata.groupId});*/
              		}
              	}); 
             }
         }
     });
}

function cancel() {
	var data={
		groupId : groupAttr.groupId
	};
	tcCore.closeTopDialog({
		data:data
	});
}
$(document).ready(init);