var ogrAttr = {
	orgId : ""
};
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	ogrAttr.orgId = tcCore.getParameter("orgId");
	initExistGrid();
	initNoExistGrid();
	existSendQuery({orgid : ogrAttr.orgId});
	onExistsendQuery({orgid : ogrAttr.orgId});
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
	$('#existGridDiv').css({
		height:window.innerHeight/2-50//($("#center").innerHeight()/2-20)
	});
	//$('#existTool').css('visibility','visible');
	$('#existGrid').datagrid({
		title:"病种列表",
	    columns:[[
	            {field:'diseaseoforgid',title:'编号',width:100,hidden:true},
	            {field:'orgid',title:'编号',width:100,hidden:true},
	            {field:'disease_name',title:'名称',width:100},
    	  	 	{field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,rowData,index){
            	  return "<a title='移除' class='grid_operation_btn grid_operation_btn-delete'  onclick=deleteData('"+rowData.diseaseoforgid+"')></a>";
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
	$("#existGridPager").pagination({
		pageList: [10,50,100],
		beforePageText:"第",
		afterPageText:"/{pages}页",
		displayMsg:"当前显示 &nbsp;<font color='#3a87ad'>{from}</font>&nbsp;到&nbsp;<font color='#3a87ad'>{to}</font>&nbsp;/&nbsp;(<font color='#3a87ad'>{total}</font>)笔记录",
		showRefresh:false,
		layout:['first','prev','manual','next','last','list'],
		onSelectPage:function(pageNumber, pageSize){
			existSendQuery({orgid:ogrAttr.orgId});
		},
		onChangePageSize:function(pageSize){
			existSendQuery({orgid:ogrAttr.orgId});
		},
	});
}


/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(id){
	 top.$.messager.confirm('系统提示', '确认要移除该病种吗', function(r){
        if (r){
            if(id){
           	 tcCore.post({
             		url:"diseaseOrgDS/deleteDiseaseOrgByPk.ssm",
             		data:{
             			diseaseoforgid:id
             		},
             		success:function(data){
             			operaCallBack({orgid : ogrAttr.orgId});
             			/*existSendQuery({orgId : treedata.orgId});
           			onExistsendQuery({orgId : treedata.orgId});*/
             		}
             	}); 
            }
        }
    });
}

/*******************************************************************************
 * 发送分页查询请求
 * 
 * @returns
 */
function existSendQuery(param){
	// 获取分页信息
	var pager = $('#existGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"diseaseOrgDS/getDiseaseOrgPage.ssm",
		data:{
			params : window.searchParam,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#existGrid').datagrid("loadData",page.dataList);//
			$("#existGridPager").pagination('refresh',{	
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
		title:"未添加的病种",
	    columns:[[
	        {field:'diseaseId',title:'编号',width:100,hidden:true},
	        {field:'diseaseName',title:'名称',width:100},
			//{field:'cardId',title:'身份证',width:100},
	        //{field:'phone',title:'手机号',width:100},
			{field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,rowData,index){
				return "<a title='添加' class='grid_operation_btn icon-grid-add' onclick=addData('"+rowData.diseaseId+"')></a>"
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
			onExistsendQuery({orgid : ogrAttr.orgId});
		},
		onChangePageSize:function(pageSize){
			onExistsendQuery({orgid : ogrAttr.orgId});
		},
	});
}


/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(diseaseId){
	var datasource ={
			orgid : ogrAttr.orgId,
			diseaseid : diseaseId
	}
	tcCore.post({
		url:"diseaseOrgDS/saveDiseaseOrg.ssm",
		data:{
			diseaseOrg : datasource
		},
		success:function(data){
			operaCallBack(data);
		}
	});
}

/**
 * 查询
 */
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
		url:"diseaseDS/queryForDiseaseOrg.ssm",
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
		existSendQuery({orgid : data.orgid});
		onExistsendQuery({orgid : data.orgid});
	}
}
//--------------------------------------------------------------------------------------------------------------------------------//



function cancel() {
	var data={
		orgid : ogrAttr.orgId,
		command : 'save'
	};
	tcCore.closeTopDialog({
		data:data
	});
}
$(document).ready(init);