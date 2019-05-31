var ogrAttr = {
	deptId : ""
};
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	ogrAttr.deptId = tcCore.getParameter("deptId");
	initExistGrid();
	initNoExistGrid();
	existSendQuery({deptId : ogrAttr.deptId});
	onExistsendQuery({deptId : ogrAttr.deptId});
}



//--------------------------------------已存在群组的人员Grid-----------------------------------------------------------------------//
/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initExistGrid(){
	/*$('#existGridDiv').css({
		height:$("#center").innerHeight()/2-90
	});*/
	$('#existGridDiv1').css({
		height:window.innerHeight/2-50//($("#center").innerHeight()/2-20)
	});
	//$('#existTool').css('visibility','visible');
	$('#existGrid1').datagrid({
		title:"人员列表",
	    columns:[[
	            {field:'employeeId',title:'编号',width:100,hidden:true},
	            {field:'deptId',title:'编号',width:100,hidden:true},
	            {field:'name',title:'名称',width:100},
	            {field:'phone',title:'手机',width:100},
    	  	 	{field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,rowData,index){
            	  return "<a title='移除' class='grid_operation_btn grid_operation_btn-delete'  onclick=deleteData('"+rowData.employeeId+"')></a>";
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
	   //toolbar: '#existTool'//getGridToolbar()
	});
	$("#existGridPager1").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			existSendQuery({deptId:ogrAttr.deptId});
		},
		onChangePageSize:function(pageSize){
			existSendQuery({deptId:ogrAttr.deptId});
		},
	});
}


/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(id){
	var dataSource = {
			employeeId : id,
			deptId : ''
	};
	 top.$.messager.confirm('系统提示', '确认要移除该人员吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"employeeDS/saveUpdateDept.ssm",
              		data:{
              			employee : dataSource
              		},
              		success:function(data){
              			operaCallBack({deptId:ogrAttr.deptId});
              		}
              	}); 
             }
         }
     });
}

/**
 * 查询
 */
/*function existquery(){
	var treedata = $("#groupTree").treegrid("getSelected");
	var param = tcCore.getFormData("existForm");
	param.deptId = treedata.deptId;
	existSendQuery(param);
}
*/
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
		url:"employeeDS/queryEmployeeExistsDept.ssm",
		data:{
			params : window.searchParam,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#existGrid1').datagrid("loadData",page.dataList);//
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
		height:window.innerHeight/2-84//$("#center").innerHeight()/2 - 80
	});
	$('#noExistTool').css('visibility','visible');
	$('#noExistGrid').datagrid({
		title:"未添加人员",
	    columns:[[
	        {field:'employeeId',title:'编号',width:100,hidden:true},
	        {field:'name',title:'名称',width:100},
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
			onExistsendQuery({deptId : ogrAttr.deptId});
		},
		onChangePageSize:function(pageSize){
			onExistsendQuery({deptId : ogrAttr.deptId});
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
			deptId : ogrAttr.deptId,
			employeeId : employeeId
	}
	tcCore.post({
		url:"employeeDS/saveUpdateDept.ssm",//--------------------
		data:{
			employee : datasource
		},
		success:function(data){
			operaCallBack(data);
		}
	});
}

/**
 * 查询
 */
/*function noExistQuery(){
	var param = tcCore.getFormData("noExistForm");
	onExistsendQuery(param);
}*/
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
		url:"employeeDS/queryEmployeeNotExistsDept.ssm",
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
		existSendQuery({deptId : data.deptId});
		onExistsendQuery({deptId : data.deptId});
	}
}
//--------------------------------------------------------------------------------------------------------------------------------//

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
/*function deleteData(id){
	 top.$.messager.confirm('系统提示', '确认要移除该病种吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"groupEmployeeDS/deleteGroupEmployeeByPk.ssm",
              		data:{
              			diseaseoforgid:id
              		},
              		success:function(data){
              			var treedata={
              					deptId : ogrAttr.deptId
              			}
              			operaCallBack(treedata);
              			existSendQuery({deptId : treedata.deptId});
            			onExistsendQuery({deptId : treedata.deptId});
              		}
              	}); 
             }
         }
     });
}*/

function cancel() {
	var data={
		deptId : ogrAttr.deptId,
		command : 'save'
	};
	tcCore.closeTopDialog({
		data:data
	});
}
$(document).ready(init);