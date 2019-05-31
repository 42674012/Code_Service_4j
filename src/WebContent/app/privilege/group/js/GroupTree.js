
var groupAttr = {
	groupId : "",
	gId : ""
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
	initGroupTree();
	getGroup(0);
	initExistGrid();
	initMenu();
}

function getGroup(parentId,async) {
	tcCore.get({
		async:async,
		url : "groupDS/getGroupTree.ssm",
		success : function(data) {
			if(groupAttr.expendId==null||groupAttr.expendId==""){
				$("#groupTree").treegrid("loadData", data);
			}else{
				$("#groupTree").treegrid("append", {
					parent : groupAttr.expendId, 
					data : data
				});
			}
		}
	});
//一次性加载所有
//	tcCore.get({
//		url : "groupDS/getGroupTree.ssm?noDisable=0",
//		success : function(data) {
//			$("#groupTree").treegrid("loadData", data);
//		}
//	});
}

function initGroupTree() {
	$("#groupTree").treegrid({
		title : "群组列表",
		toolbar : getToolbar(),
		idField : 'groupId',
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
			groupAttr.gId = row.groupId;
			for(var d in row){
				tcCore.setControlValue($("#"+d),row[d]);
			}
			existSendQuery({groupId:row.groupId});
		},
		/*//一次性加载所有的时候该方法屏蔽
		onBeforeExpand:function(row){
			groupAttr.expendId = row.groupId;
			if(!row.opened){
				row.opened = true;
				getGroup(groupAttr.expendId,false);
			}
			
		},*/
		onLoadSuccess: function(row){
            $(this).treegrid('enableDnd', row?row.id:null);
        }
	});
}

function getToolbar() {
	return [  {
			iconCls : 'icon-grid-add',//icon-grid-edit
			text : "新增群组",
			handler : function() {
				addSameLevel();
			}
	}, '-',  
	{
		iconCls : 'icon-grid-add',
		text : "新增子级",
		handler : function() {
			addSub();
		}
	}];
}

/*******************************************************************************
 * 添加子集
 */
function addSub() {
	// 获取当前选中
	var data = $("#groupTree").treegrid("getSelected");
	if(!data){
		$.messager.alert('提示','请选择一个群组','warning');
		return false;
	}
	tcCore.openWindowOnTop("GroupTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = $("#groupTree").treegrid("getSelected");
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			parentId = data1.groupId;
		}
		//如果父节点已经打开过，附加数据,再打开
		$("#groupTree").treegrid("append", {
			parent : parentId, 
			data : [ result.data ]
		});
		operaCallBack(result);
		$("#groupTree").treegrid("expand", parentId);
	}, {
		title : '添加子群',
		width : 400,
		height : 300
	});
}

/*******************************************************************************
 * 添加群组
 */
function addSameLevel(){
	// 获取当前选中
	var data = tcCore.getSelectParent("groupTree");
	tcCore.openWindowOnTop("GroupTreeEdit.jsp", data, null, function(result) {
		// 关闭窗口的回调
		var data1 = tcCore.getSelectParent("groupTree");
		
		var parentId = null;
		if (!data1) {
			parentId = 0;
		} else {
			 parentId = data1.groupId;
		}
		$("#groupTree").treegrid("append", {
			parent : parentId, // the node has a 'id' value that defined
			data : [ result.data ]
		});
		operaCallBack(result);
	},{
		title : '添加群组',
		width : 400,
		height : 300
	});
}

//获取父节点
tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#groupTree").treegrid("getParent",data.groupId);
	}
	return data;
}

function initGroup(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存
 */
function saveGroup(){
	var sdata = $("#groupTree").treegrid("getSelected");
	if(!sdata){
		$.messager.alert('提示','请先选择一个群组','info');
		return;
	}
	
	var dataSource = tcCore.getFormData("groupForm");
	tcCore.post({
		url:"groupDS/saveGroup.ssm",
		data:{
			group:dataSource
		},
		success:function(data){
			data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#groupTree').treegrid('update',{
				id: data.groupId,
				row: data
			});
		}
	});
	
}

function deleteGroup() {
	top.$.messager.confirm('系统提示', '确认要删除该群组信息吗', function(r) {
		if (r) {
			var groupId = $("#groupId").val();
			if (groupId) {
				tcCore.post({
					url : "groupDS/deleteGroupByPk.ssm",
					data : {
						groupId : groupId
					},
					success : function(data) {
						$('#groupTree').treegrid('remove',groupId);
						$('#name').textbox('setValue',"");
						existSendQuery();
					}
				});
			}
		}
	});

}

//--------------------------------------已存在群组的人员Grid-----------------------------------------------------------------------//
/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initExistGrid(){
	/*$('#existGridDiv').css({
		height:$("#center").innerHeight()/2-50
	});*/
	$('#existGridDiv').css({
		height:window.innerHeight-$("#groupFormPanel").innerHeight()-80
	});

	//$('#existTool').css('visibility','visible');
	$('#existGrid').datagrid({
		title:"群组成员",
	    columns:[[
	            {field:'geId',title:'编号',width:100,hidden:true},
	            {field:'groupId',title:'编号',width:100,hidden:true},
	            {field:'employeeId',title:'编号',width:100,hidden:true},
	            {field:'name',title:'姓名',width:100},
	            {field:'phone',title:'手机号',width:100},
    	  	 	//{field:'cardId',title:'身份证',width:100},
    	  	 	//{field:'groupType',title:'<span>来源&nbsp;&nbsp;<a id="menuBtn" >&nbsp;&nbsp;+&nbsp;&nbsp;</a></span>',width:60,align:"center",formatter:function(value,rowData,index){
    	  	 	{field:'groupType',title:'来源',width:60,align:"center",formatter:function(value,rowData,index){
    	  	 		if(value == '0'){
    	  	 			return '静态';
    	  	 		}else{
    	  	 			return '动态';
    	  	 		}
            	  //return "<a title='移除' class='grid_operation_btn grid_operation_btn-delete'  onclick=deleteData('"+rowData.geId+"')></a>";class="grid_operation_btn icon-grid-add"
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
	   toolbar: existTool()//getGridToolbar()
	});
	$("#existGridPager").pagination({
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
	/*$('#menuBtn').mouseover(function(){
		$('#menuDiv').css("display","block");
	});*/
	
}

function existTool(){
	return [ {
		iconCls : 'icon-grid-add',
		text : "单个",
		handler : function() {
			addSimple();
		}
	}, '-', {
		iconCls : 'icon-grid-add',
		text : "集体",
		handler : function() {
			addBatch();
		}
	}];
}

function initMenu(){
	$('#menuBtn').click(function(){
		var offset = $('#menuBtn').offset();
		var wi = $('#menuDiv').width();
		var w = $(this).width();
		var h = $(this).height();
		var top = offset.top + h + 10;
		var left = offset.left - w - 20 ;
		
		//$("#menuDiv").css("position","absolute").css("border","1px solid red").css("top",offset+h).show();
		$('#menuDiv').attr('style','position: absolute;top: '+top+'px;left:'+left+'px;z-index: 9999999;').show();
		//$('#menuDiv').attr("style","top:"+offset.top+600+"left:"+offset.left+";z-index:999999;position:absolute;display:block;border:1px solid red");
		//$('#menuDiv').css('display','block');//.css("top",offset.top+100);.attr("style","top:"+offset.top+input.height()+6+";z-index:999999;position:absolute;display:block;");
		//alert(x.top+"----"+x.left);
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
	var pager = $('#existGridPager').pagination("options");
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
			$('#existGrid').datagrid("loadData",page.dataList);
			$("#existGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}

/*******************************************************************************
 * 逐个添加到群组
 * 
 * @returns
 */
function addSimple(){
	var sdata = $("#groupTree").treegrid("getSelected");
	if(!sdata){
		$.messager.alert('提示','请先选择一个群组','info');
		return false;
	}
	var  id = sdata.groupId;
	tcCore.openWindowOnTop("GroupSimpleEdit.jsp?GroupId="+id, null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"群组编辑",
		width:800,
		height:600
	});
}

/****
 * 规则添加
 */
function addBatch(){
	var sdata = $("#groupTree").treegrid("getSelected");
	if(!sdata){
		$.messager.alert('提示','请先选择一个群组','info');
		return false;
	}
	var  data = {
			groupId : sdata.groupId,
			name : sdata.name
	};
	tcCore.openWindowOnTop("GroupBatchEdit.jsp", data, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"规则编辑"
	});
}

function operaCallBack(result) {
	if (result) {//&& (result.command == "save" || result.command == "delete")select * from oms_employee where sex = '0'
		tcCore.post({url:'groupSqlDS/excuteProc.ssm',
		success : function(data){
			if(result.command == "delete"){
				existSendQuery({groupId:0});
			}else{
				existSendQuery({groupId:result.data.groupId});
			}
		}
		});
		
	}
	
}

function cancel() {
	tcCore.closeTopDialog();
}

$(document).ready(init);
