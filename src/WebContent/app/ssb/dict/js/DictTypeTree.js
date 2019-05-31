
var dictTypeAttr = {
	dictTypeId : ""
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
	initDictTypeTree();
	initGrid();
	getDictType(0);
}

function getDictType(parentId,async) {
	tcCore.get({
		async:async,
		url : "dictTypeDS/getDictTypeListWithChildrenByParentId.ssm?parentId="+parentId+"&noDisable=0",
		success : function(data) {
			if(dictTypeAttr.expendId==null||dictTypeAttr.expendId==""){
				$("#dictTypeTree").treegrid("loadData", data);
			}else{
				$("#dictTypeTree").treegrid("append", {
					parent : dictTypeAttr.expendId, 
					data : data
				});
			}
		}
	});
//一次性加载所有
//	tcCore.get({
//		url : "dictTypeDS/getDictTypeTree.ssm?noDisable=0",
//		success : function(data) {
//			$("#dictTypeTree").treegrid("loadData", data);
//		}
//	});
}

function initDictTypeTree() {
	$("#dictTypeTree").treegrid({
		title : "字典类型列表",
		toolbar : getToolbar(),
		idField : 'dictTypeId',
		collapsible : true,
		treeField : 'name',
		fitColumns : true,
		iconCls : "icon-grid",
		headerCls : "gridHeaderCls",
		showHeader : false,
		columns : [ [ {
			title : '名称',
			field : 'name',
			width : 180
		} ] ],
		onClickRow:function(row){
			//设置控件值
			for(var d in row){
				tcCore.setControlValue($("#"+d),row[d]);
			}
			sendQuery({
				dictTypeId:row.dictTypeId
			});
			//判断是否有父节点
			if(row.parentId!="0"){
//				//找出父节点
//				var parent = $("#dictTypeTree").treegrid("getParent",row.dictTypeId);
//				var d = $("#dictGridDiv").children(".datagrid:first").children(".panel-body").children(".datagrid-toolbar");
//				d.children().each(function(i,o){
//					if(i!=0){
//						$(o).remove();
//					}
//				});
//				d.children("table").css("float","left");
//				d.append("<div style='float:right'><input id='"+row.dictTypeId+"' /></div>");
//				//获取该字典类型下的所有字典
//				tcCore.get({
//					url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode="+parent.code,
//					success:function(data){
//						$("#"+row.dictTypeId).combobox({
//							height:30,width:90,
//							valueField:'dictValue',
//							textField:'dictName',
//							panelHeight:100,
//							data:data
//						});
//					}
//				});
			}
		},
		//一次性加载所有的时候该方法屏蔽
		onBeforeExpand:function(row){
			dictTypeAttr.expendId = row.dictTypeId;
			if(!row.opened){
				row.opened = true;
				getDictType(dictTypeAttr.expendId,false);
			}
			
		},
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
	} ];
}

/*******************************************************************************
 * 添加子集
 */
function addSub() {
	// 获取当前选中
	var data = $("#dictTypeTree").treegrid("getSelected");
	if(!data){
		$.messager.alert('提示','请选择一个字典类型!','info');
		return false;
	}
	tcCore.openWindowOnTop("DictTypeTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#dictTypeTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.dictTypeId;
		}
		//如果父节点已经打开过，附加数据,再打开
		$("#dictTypeTree").treegrid("append", {
			parent : parentId, 
			data : [ result.data ]
		});
		$("#dictTypeTree").treegrid("expand", parentId);
	}, null);
}

/*******************************************************************************
 * 添加同级
 */
function addSameLevel(){
	// 获取当前选中
	var data = tcCore.getSelectParent("dictTypeTree");
	tcCore.openWindowOnTop("DictTypeTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("dictTypeTree");
		
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			 parentId = data1.dictTypeId;
		}
		$("#dictTypeTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
	}, null);
}


tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#dictTypeTree").treegrid("getParent",data.dictTypeId);
	}
	return data;
}

function initDictType(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存菜单
 */
function saveDictType(){
	var sdata = $("#dictTypeTree").treegrid("getSelected");
	if(!sdata){
		alert("请先选择一个菜单节点");
		return;
	}
	var isValid = $('#dictTypeForm').form('validate');
	if(!isValid){
		$.messager.alert('提示','请完善数据!','info');
		return false;
	}
	var data = tcCore.getFormData("dictTypeForm");
	tcCore.post({
		url:"dictTypeDS/saveDictType.ssm",
		data:{
			dictType:data
		},
		success:function(data){
			data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#dictTypeTree').treegrid('update',{
				id: data.dictTypeId,
				row: data
			});
		}
	});
	
}

function deleteDictType() {
	top.$.messager.confirm('系统提示', '确认要删除该字典信息吗', function(r) {
		if (r) {
			var dictTypeId = $("#dictTypeId").val();
			if (dictTypeId) {
				tcCore.post({
					url : "dictTypeDS/deleteDictTypeByPk.ssm",
					data : {
						dictTypeId : dictTypeId
					},
					success : function(data) {
						$('#dictTypeTree').treegrid('remove',dictTypeId);
             			 $('#dictTypeForm input').val('');
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
	$('#dictGridDiv').css({
		height:$("#center").innerHeight()-$("#dictTypeFormPanel").parent().outerHeight()-50
	});
	
	$('#dictGrid').datagrid({
		title:"字典列表",
	    columns:[[
	              {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
	            	  return "<a title='编辑' class='grid_operation_btn grid_operation_btn-edit' onclick=editData(this,'"+row.dictId+"')></a>&nbsp;" +
			  	  				"<a title='删除' class='grid_operation_btn grid_operation_btn-delete'  onclick=deleteData(this,'"+row.dictId+"')></a>";
			  	  	}},
			  	  		{field:'dictName',title:'描述',width:100},
		    	  	 	{field:'dictKey',title:'键',width:100},
		    	  	 	{field:'dictValue',title:'值',width:100}
		    	  	 	

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
	$("#dictGridPager").pagination({
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
function copyProerty(p,p1){
	for(var a in p1){
		p[a] = p1[a];
	}
	return p;
}

/*******************************************************************************
 * 新增
 * 
 * @returns
 */
function addData(){
	var data = $("#dictTypeTree").treegrid("getSelected");
	if(!data){
		alert("请先选着一个字典类型");
		return;
	}
	tcCore.openWindowOnTop("DictEdit.jsp?dictTypeId="+data.dictTypeId, null, null, function(result){
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
	tcCore.openWindowOnTop("DictEdit.jsp?dictId="+id, null, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, null);
}

function editDataBtnClick(){
	var data = $("#dictGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.dictId);
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
	var data = $("#dictGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		deleteData(null,data.dictId);
	}
	
}

/*******************************************************************************
 * 删除
 * 
 * @returns
 */
function deleteData(a,id){
	 top.$.messager.confirm('系统提示', '确认要删除该字典吗', function(r){
         if (r){
             if(id){
            	 tcCore.post({
              		url:"dictDS/deleteDictByPk.ssm",
              		data:{
              			dictId:id
              		},
              		success:function(data){
              			
              			sendQuery();
              		}
              	}); 
             }
         }
     });
}

/*******************************************************************************
 * 发送查询请求
 * 
 * @returns
 */
function sendQuery(param){
	// 获取分页信息
	var pager = $('#dictGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	// 计算起始，和截至数据
	tcCore.post({
		url:"dictDS/queryForListPage.ssm",
		data:{
			params:window.searchParam,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#dictGrid').datagrid("loadData",page.dataList);
			$("#dictGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}

$(document).ready(init);
