
var menuAttr = {
	menuId : ""
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
	initMenuTree();
	getMenu();
}

function getMenu() {
	tcCore.get({
		url : "menuDS/getMenuTree.ssm?noDisable=0",
		success : function(data) {
			$("#menuTree").treegrid("loadData", data);
		}
	});
}

function initMenuTree() {
	$("#menuTree").treegrid({
		title : "菜单列表",
		toolbar : getToolbar(),
		idField : 'menuId',
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
	var data = $("#menuTree").treegrid("getSelected");
	tcCore.openWindowOnTop("menuEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#menuTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.menuId;
		}
		$("#menuTree").treegrid("append", {
			parent : parentId, 
			data : [ result.data ]
		});
	}, null);
}

/*******************************************************************************
 * 添加同级
 */
function addSameLevel(){
	// 获取当前选中
	var data = tcCore.getSelectParent("menuTree");
	tcCore.openWindowOnTop("menuEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("menuTree");
		
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			 parentId = data1.menuId;
		}
		$("#menuTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
	}, null);
}


tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#menuTree").treegrid("getParent",data.menuId);
	}
	return data;
}

function initMenu(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存菜单
 */
function saveMenu(){
	var sdata = $("#menuTree").treegrid("getSelected");
	if(!sdata){
		alert("请先选择一个菜单节点");
		return;
	}
	var isValid = $('#menuForm').form('validate');
	if(!isValid){
		$.messager.alert('提示','请完善信息!','warning');
		return false;
	} 
	
	var data = tcCore.getFormData("menuForm");
	if($("#visiable:checked").get(0)){
		data.visiable = 1;
	}else{
		data.visiable = 0;
	}
	if($("#isBlank:checked").get(0)){
		data.isBlank = 1;
	}else{
		data.isBlank = 0;
	}
	tcCore.post({
		url:"menuDS/saveMenu.ssm",
		data:{
			menu:data
		},
		success:function(data){
			data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#menuTree').treegrid('update',{
				id: data.menuId,
				row: data
			});
			$.messager.alert('提示','主菜单刷新后起效!','info');
		}
	});
	
}

function deleteMenu() {
	var menuId = $("#menuId").val();
	var rows = $('#menuTree').treegrid('getChildren',menuId);
	if(rows.length>0){
		$.messager.alert('提示','请删除子菜单','info');
	}else{
		top.$.messager.confirm('系统提示', '确认要删除该菜单信息吗', function(r) {
			if (r) {
				if (menuId) {
					tcCore.post({
						url : "menuDS/deleteMenuByPk.ssm",
						data : {
							menuId : menuId
						},
						success : function(data) {
							if(data == 1){
								$('#menuTree').treegrid('remove',menuId);
								$('#name').textbox('setValue','');
								$('#menuForm input').val('');
								$.messager.alert('提示','操作成功,主菜单刷新后起效','info');
							}else{
								$.messager.alert('提示','操作失败,主菜单刷新后起效!','info');
							}
							
						}
					});
				}
			}
		});
	}
}

function cancel() {
	tcCore.closeTopDialog();
}

$(document).ready(init);
