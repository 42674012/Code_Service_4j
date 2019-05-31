
var shareAttr = {
	shareid : ""
};

function init() {
	initShareTree();
	getShare(0);
}

function getShare(parentId,async) {
	tcCore.get({
		async:async,
		url : "shareDS/getShareListWithChildrenByParentId.ssm?parentId="+parentId+"&noDisable=0",
		success : function(data) {
			if(shareAttr.expendId==null||shareAttr.expendId==""){
				$("#shareTree").treegrid("loadData", data);
			}else{
				$("#shareTree").treegrid("append", {
					parent : shareAttr.expendId, 
					data : data
				});
			}
		}
	});
//一次性加载所有
//	tcCore.get({
//		url : "shareDS/getShareTree.ssm?noDisable=0",
//		success : function(data) {
//			$("#shareTree").treegrid("loadData", data);
//		}
//	});
}

function initShareTree() {
	$("#shareTree").treegrid({
		title : "Share列表",
		toolbar : getToolbar(),
		idField : 'shareid',
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
			shareAttr.expendId = row.shareid;
			if(!row.opened){
				row.opened = true;
				getShare(shareAttr.expendId,false);
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
	var data = $("#shareTree").treegrid("getSelected");
	tcCore.openWindowOnTop("ShareTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#shareTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.shareid;
		}
		//如果父节点已经打开过，附加数据,再打开
		$("#shareTree").treegrid("append", {
			parent : parentId, 
			data : [ result.data ]
		});
		$("#shareTree").treegrid("expand", parentId);
	}, null);
}

/*******************************************************************************
 * 添加同级
 */
function addSameLevel(){
	// 获取当前选中
	var data = tcCore.getSelectParent("shareTree");
	tcCore.openWindowOnTop("ShareTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("shareTree");
		
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			 parentId = data1.shareid;
		}
		$("#shareTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
	}, null);
}


tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#shareTree").treegrid("getParent",data.shareid);
	}
	return data;
}

function initShare(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存菜单
 */
function saveShare(){
	var sdata = $("#shareTree").treegrid("getSelected");
	if(!sdata){
		alert("请先选择一个菜单节点");
		return;
	}
	
	
	var data = tcCore.getFormData("shareForm");

	tcCore.post({
		url:"shareDS/saveShare.ssm",
		data:{
			share:data
		},
		success:function(data){
			data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#shareTree').treegrid('update',{
				id: data.shareid,
				row: data
			});
		}
	});
	
}

function deleteShare() {
	top.$.messager.confirm('系统提示', '确认要删除该share信息吗', function(r) {
		if (r) {
			var shareid = $("#shareid").val();
			if (shareid) {
				tcCore.post({
					url : "shareDS/deleteShareByPk.ssm",
					data : {
						shareid : shareid
					},
					success : function(data) {
						$('#shareTree').treegrid('remove',shareid);
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
