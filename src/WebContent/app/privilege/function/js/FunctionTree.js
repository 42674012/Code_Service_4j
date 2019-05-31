
var functionAttr = {
	functionId : ""
};

function init() {
	$("#west").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	
	initFunctionTree();
	getFunction(0);
	initControl();
	initGrid();
}

function initControl(){
	tcCore.get({
		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$function_type",
		success:function(data){
			data.unshift({'dictValue':'','dictName':'- - - 请选择 - - -'});
			$("#functionType").combobox("loadData",data);
			
		}
	});
}

function getFunction(parentId,async) {
	tcCore.get({
		async:async,
		url : "functionDS/getFunctionTree.ssm?noDisable=0",
		success : function(data) {
			if(functionAttr.expendId==null||functionAttr.expendId=="" || parentId == 0){
				$("#functionTree").treegrid("loadData", data);
			}else{
				$("#functionTree").treegrid("append", {
					parent : functionAttr.expendId, 
					data : data
				});
			}
		}
	});
//一次性加载所有
//	tcCore.get({
//		url : "functionDS/getFunctionTree.ssm?noDisable=0",
//		success : function(data) {
//			$("#functionTree").treegrid("loadData", data);
//		}
//	});
}

function initFunctionTree() {
	$("#functionTree").treegrid({
		title : "功能列表",
		toolbar : getToolbar(),
		idField : 'functionId',
		collapsible : true,
		treeField : 'remark',
		fitColumns : true,
		iconCls : "icon-grid",
		headerCls : "gridHeaderCls",
		showHeader : false,
		columns : [ [ {
			title : '名称',
			field : 'remark',
			width : 180
		} ] ],
		onClickRow:function(row){
			//设置控件值
			for(var d in row){
				tcCore.setControlValue($("#"+d),row[d]);
			}
			sendQuery({
				functionId:row.functionId
			});
		},
		//一次性加载所有的时候该方法屏蔽
		/*onBeforeExpand:function(row){
			functionAttr.expendId = row.functionId;
			if(!row.opened){
				row.opened = true;
				getFunction(functionAttr.expendId,false);
			}
			
		},*/
		onLoadSuccess: function(row){
            $(this).treegrid('enableDnd', row?row.id:null);
        }
	});
}

function getToolbar() {
	return [ {
		iconCls : 'icon-grid-add',
		text : "新增子级",
		handler : function() {
			addSub();
		}
	}, '-', {
		iconCls : 'icon-grid-edit',
		text : "新增同级",
		handler : function() {
			addSameLevel();
		}
	}, '-', {
	iconCls : 'icon-grid-add',
	text : "导入菜单",
	handler : function() {
		importMenu();
	}
} ];
}

/*******************************************************************************
 * 添加子集
 */
function addSub() {
	// 获取当前选中
	var data = $("#functionTree").treegrid("getSelected");
	if(!data){
		$.messager.alert('提示','请先选择一个资源!','warning');
		return false;
	}
	tcCore.openWindowOnTop("FunctionTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#functionTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.functionId;
		}
		//如果父节点已经打开过，附加数据,再打开
		$("#functionTree").treegrid("append", {
			parent : parentId, 
			data : [ result.data ]
		});
		$("#functionTree").treegrid("expand", parentId);
	}, null);
}

/*******************************************************************************
 * 添加同级
 */
function addSameLevel(){
	// 获取当前选中
	var data = tcCore.getSelectParent("functionTree");
	tcCore.openWindowOnTop("FunctionTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("functionTree");
		
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			 parentId = data1.functionId;
		}
		$("#functionTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
	}, null);
}


tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#functionTree").treegrid("getParent",data.functionId);
	}
	return data;
}

function initFunction(data) {
	$('#functionForm input').val('');
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存菜单
 */
function saveFunction(){
	var sdata = $("#functionTree").treegrid("getSelected");
	if(!sdata){
		alert("请先选择一个菜单节点");
		return;
	}
	
	var isValid = $('#functionForm').form('validate');
	if(!isValid){
		$.messager.alert('提示','请完善数据','warning');
		return false;
	}
	
	var data = tcCore.getFormData("functionForm");

	tcCore.post({
		url:"functionDS/saveFunction.ssm",
		data:{
			function:data
		},
		success:function(data){
			data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#functionTree').treegrid('update',{
				id: data.functionId,
				row: data
			});
			sendQuery({functionId : data.functionId});
		}
	});
	
}

//导入菜单
function importMenu(){
	tcCore.post({
		url : "functionDS/importMenu.ssm",
		success : function(data){
			getFunction(0);
			if(data){
				$.messager.alert('提示','更新成功','info');
			}
		}
	});
}

function deleteFunction() {
	top.$.messager.confirm('系统提示', '确认要删除该资源信息吗', function(r) {
		if (r) {
			var functionId = $("#functionId").val();
			if (functionId) {
				tcCore.post({
					url : "functionDS/deleteFunctionByPk.ssm",
					data : {
						functionId : functionId
					},
					success : function(data) {
						$('#functionTree').treegrid('remove',functionId);
						$('#functionForm input').val('');
						$("#functionType").combobox('setText','- - - 请选择 - - -').parent().children("span").children("span").next().val('- - - 请选择 - - -');
						sendQuery({functionId : functionId});
					}
				});
			}
		}
	});

}

function cancel() {
	tcCore.closeTopDialog();
}


/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	$('#functionGridDiv').css({
		height:$("#center").innerHeight()-$("#functionFormPanel").parent().outerHeight()-60
	});
	
	$('#functionGrid').datagrid({
		title:"操作列表",
	    columns:[[
	              {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
	            	  return "<a title='编辑' class='grid_operation_btn grid_operation_btn-edit' onclick=editData(this,'"+row.operationId+"')></a>&nbsp;" +
			  	  				"<a title='删除' class='grid_operation_btn grid_operation_btn-delete'  onclick=deleteData(this,'"+row.operationId+"')></a>";
			  	  	}},
			  	  		{field:'name',title:'名称',width:100},
		    	  	 	{field:'operationType',title:'类型',width:100,formatter:function(value,row,index){
		    	  	 		switch (value) {
							case 1:
								return '按钮'
								break;
							case 2:
								return '接连';
								break;
							default:
								break;
							}
		    	  	 	}},
		    	  	 	{field:'identifyName',title:'标识',width:100},
		    	  	 	{field:'operationId',title:'id',width:100,hidden:true}
		    	  	 	

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
	    toolbar: getGridToolbar()
	});
	$("#functionGridPager").pagination({
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
 * 新增
 * 
 * @returns
 */
function addData(){
	var data = $("#functionTree").treegrid("getSelected");
	if(!data){
		alert("请先选着一个资源");
		return;
	}
	tcCore.openWindowOnTop("OperationEdit.jsp?functionId="+data.functionId, null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, null);
}

/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(a,id){
	// 打开编辑窗口
	tcCore.openWindowOnTop("OperationEdit.jsp?operationId="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, null);
}

function editDataBtnClick(){
	var data = $("#functionGrid").datagrid("getSelected");
	if(data==null){f
		alert("请先选中一行记录");
	}else{
		editData(null,data.operationId);
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

function deleteDataBtnClick(){
	var data = $("#functionGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.operationId);
	}
	
}

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(a,id,functionId){
	// debugger;
	 top.$.messager.confirm('系统提示', '确认要删除该信息吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"operationDS/deleteOperationByPk.ssm",
              		data:{
              			operationId:id
              		},
              		success:function(data){
              			sendQuery({functionId : functionId});
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
function sendQuery(param){
	// 获取分页信息
	var pager = $('#functionGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"operationDS/queryForListPage.ssm",
		data:{
			params:window.searchParam,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#functionGrid').datagrid("loadData",page.dataList);
			$("#functionGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}


$(document).ready(init);
