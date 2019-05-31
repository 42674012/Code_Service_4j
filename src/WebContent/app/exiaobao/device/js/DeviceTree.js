
var deviceAttr = {
	deviceid : ""
};

function init() {
	initDeviceTree();
	getDevice(0);
}

function getDevice(parentId,async) {
	tcCore.get({
		async:async,
		url : "deviceDS/getDeviceListWithChildrenByParentId.ssm?parentId="+parentId+"&noDisable=0",
		success : function(data) {
			if(deviceAttr.expendId==null||deviceAttr.expendId==""){
				$("#deviceTree").treegrid("loadData", data);
			}else{
				$("#deviceTree").treegrid("append", {
					parent : deviceAttr.expendId, 
					data : data
				});
			}
		}
	});
//一次性加载所有
//	tcCore.get({
//		url : "deviceDS/getDeviceTree.ssm?noDisable=0",
//		success : function(data) {
//			$("#deviceTree").treegrid("loadData", data);
//		}
//	});
}

function initDeviceTree() {
	$("#deviceTree").treegrid({
		title : "Device列表",
		toolbar : getToolbar(),
		idField : 'deviceid',
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
			deviceAttr.expendId = row.deviceid;
			if(!row.opened){
				row.opened = true;
				getDevice(deviceAttr.expendId,false);
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
	var data = $("#deviceTree").treegrid("getSelected");
	tcCore.openWindowOnTop("DeviceTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#deviceTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.deviceid;
		}
		//如果父节点已经打开过，附加数据,再打开
		$("#deviceTree").treegrid("append", {
			parent : parentId, 
			data : [ result.data ]
		});
		$("#deviceTree").treegrid("expand", parentId);
	}, null);
}

/*******************************************************************************
 * 添加同级
 */
function addSameLevel(){
	// 获取当前选中
	var data = tcCore.getSelectParent("deviceTree");
	tcCore.openWindowOnTop("DeviceTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("deviceTree");
		
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			 parentId = data1.deviceid;
		}
		$("#deviceTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
	}, null);
}


tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#deviceTree").treegrid("getParent",data.deviceid);
	}
	return data;
}

function initDevice(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存菜单
 */
function saveDevice(){
	var sdata = $("#deviceTree").treegrid("getSelected");
	if(!sdata){
		alert("请先选择一个菜单节点");
		return;
	}
	
	
	var data = tcCore.getFormData("deviceForm");

	tcCore.post({
		url:"deviceDS/saveDevice.ssm",
		data:{
			device:data
		},
		success:function(data){
			data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#deviceTree').treegrid('update',{
				id: data.deviceid,
				row: data
			});
		}
	});
	
}

function deleteDevice() {
	top.$.messager.confirm('系统提示', '确认要删除该device信息吗', function(r) {
		if (r) {
			var deviceid = $("#deviceid").val();
			if (deviceid) {
				tcCore.post({
					url : "deviceDS/deleteDeviceByPk.ssm",
					data : {
						deviceid : deviceid
					},
					success : function(data) {
						$('#deviceTree').treegrid('remove',deviceid);
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
