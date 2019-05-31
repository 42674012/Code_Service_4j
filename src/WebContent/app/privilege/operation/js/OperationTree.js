
var operationAttr = {
	operationId : ""
};

function init() {
	initOperationTree();
	getOperation(0);
}

function getOperation(parentId,async) {
	tcCore.get({
		async:async,
		url : "operationDS/getOperationListWithChildrenByParentId.ssm?parentId="+parentId+"&noDisable=0",
		success : function(data) {
			if(operationAttr.expendId==null||operationAttr.expendId==""){
				$("#operationTree").treegrid("loadData", data);
			}else{
				$("#operationTree").treegrid("append", {
					parent : operationAttr.expendId, 
					data : data
				});
			}
		}
	});
//一次性加载所有
//	tcCore.get({
//		url : "operationDS/getOperationTree.ssm?noDisable=0",
//		success : function(data) {
//			$("#operationTree").treegrid("loadData", data);
//		}
//	});
}

function initOperationTree() {
	$("#operationTree").treegrid({
		title : "Operation列表",
		toolbar : getToolbar(),
		idField : 'operationId',
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
		},
		//一次性加载所有的时候该方法屏蔽
		onBeforeExpand:function(row){
			operationAttr.expendId = row.operationId;
			if(!row.opened){
				row.opened = true;
				getOperation(operationAttr.expendId,false);
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
	var data = $("#operationTree").treegrid("getSelected");
	tcCore.openWindowOnTop("OperationTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#operationTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.operationId;
		}
		//如果父节点已经打开过，附加数据,再打开
		$("#operationTree").treegrid("append", {
			parent : parentId, 
			data : [ result.data ]
		});
		$("#operationTree").treegrid("expand", parentId);
	}, null);
}

/*******************************************************************************
 * 添加同级
 */
function addSameLevel(){
	// 获取当前选中
	var data = tcCore.getSelectParent("operationTree");
	tcCore.openWindowOnTop("OperationTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("operationTree");
		
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			 parentId = data1.operationId;
		}
		$("#operationTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
	}, null);
}


tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#operationTree").treegrid("getParent",data.operationId);
	}
	return data;
}

function initOperation(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存菜单
 */
function saveOperation(){
	var sdata = $("#operationTree").treegrid("getSelected");
	if(!sdata){
		alert("请先选择一个菜单节点");
		return;
	}
	
	
	var data = tcCore.getFormData("operationForm");

	tcCore.post({
		url:"operationDS/saveOperation.ssm",
		data:{
			operation:data
		},
		success:function(data){
			data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#operationTree').treegrid('update',{
				id: data.operationId,
				row: data
			});
		}
	});
	
}

function deleteOperation() {
	top.$.messager.confirm('系统提示', '确认要删除该operation信息吗', function(r) {
		if (r) {
			var operationId = $("#operationId").val();
			if (operationId) {
				tcCore.post({
					url : "operationDS/deleteOperationByPk.ssm",
					data : {
						operationId : operationId
					},
					success : function(data) {
						$('#operationTree').treegrid('remove',operationId);
					}
				});
			}
		}
	});

}

function cancel() {
	tcCore.closeTopDialog();
}

$(document).ready(init);
