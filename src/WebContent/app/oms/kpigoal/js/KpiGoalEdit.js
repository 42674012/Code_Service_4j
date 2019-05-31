var kpiGoalAttr = {
	kpiGoalId : "",
	initControlCount : 0,
	headList : {},
	bodysList : []
};

function init() {
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId = tcCore.getParameter("dialogId");
	if (!dialogId) {
		// 判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#kpiGoalFormPanel").panel({
			iconCls : "icon-form-edit"
		});
	}
	initpage();
	initControls();
	kpiGoalAttr.id = tcCore.getParameter("id");
	kpiGoalAttr.goal = tcCore.getTopWindowParam();
	if(kpiGoalAttr.id){
		getKpiGoal(kpiGoalAttr.id,kpiGoalAttr.goal.kpiObjId,kpiGoalAttr.goal.month);
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
}

function initpage(){
	tcCore.post({
  		url:"kpiGoalDS/setDataGrid.ssm",
  		success:function(data){
  			kpiGoalAttr.headList = data.headList;
  			//kpiGoalAttr.bodysList = data.bodysList;
  			for(var d in data.bodysList){
  				var colum = data.bodysList[d];
  				colum['editor'] = {type : 'text'};
  				kpiGoalAttr.bodysList.push(colum);
  			}
  			//alert(JSON.stringify(kpiGoalAttr.bodysList));
  			initGrid();
  			initData();
  		}
  	});
}

function initData(){
	tcCore.post({
	url:"employeeDS/getBranchEmployee.ssm",
	success:function(data){
		$('#kpiGoalGrid').datagrid('loadData',data);
	}
});
}

function initControls() {
	$("#kpiObjIdShow").autocomplete('employeeDS/queryAutoComplete.ssm', {
		dataType : "json",
		parse : function(data) {
			return $.map(data, function(item) {
				return {
					data : item,
					name : item.name
				}
			});
		},
		matchContains : true,
		max : 1000,
		cacheLength : 1,
		formatItem : function(item) {
			return item.name;
		},
		formatMatch : function(item) {
		}
	}).result(function(e, item) {
		$("#kpiObjIdShow").val(item.name);
		$("#kpiObjId").val(item.employeeId);
	});
	$("#month").simpleCanleder();  
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid() {
	$('#kpiGoalGrid').datagrid({
						// title:"KpiGrade列表",
						columns : [kpiGoalAttr.headList,kpiGoalAttr.bodysList],
								/*{
									field : 'specificationsId',
									title : '考核指标',
									width : 100,
									editor : {
										type : 'combobox',
										options : {
											valueField : 'id',
											textField : 'varDesc',
											method : 'get',
											url : 'ruleVarDS/getAllRuleVarList.ssm',
											required : true
										}
									},
									formatter : function(value, row, index) {
										return row.specificationsIdShow;
									}
								},
								{
									field : 'specificationsValue',
									title : '目标值',
									width : 100,
									editor : {
										type : 'textbox'
									}
								},
								{
									field : 'operation_custom',
									title : '操作',
									width : 60,
									align : "center",
									formatter : function(value, row, index) {
										var btnIcon = "";
										if (kpiGoalAttr.itemFlag) {
											btnIcon = "<a title='确认' class='grid_opreat_a' href='javascript:;'  onclick='sureItem("
													+ index + ")'>确认</a>";
											btnIcon += "-<a title='删除' class='grid_opreat_a' href='javascript:;'  onclick='removeit("
													+ index + ")')>删除</a>";
										} else {
											btnIcon = "<a title='编辑' class='grid_opreat_a' href='javascript:;'  onclick=editItem("
													+ index + ")>编辑</a>&nbsp;";
										}
										return btnIcon;
									}
								} ] ],*/
						width : "100%",
						headerCls : "gridHeaderCls",
						iconCls : "icon-grid",
						striped : true,
						singleSelect : true,
						rownumbers : true,
						fitColumns : true,
						// pagination:true,
						checkOnSelect : true,
						onClickCell: onClickCell
					// toolbar: getGridToolbar()
					});
}

/**
 * 增加消费清单项目
 */
function addItem() {//新增指标
	if (endEditing()) {
		var ed = $('#kpiGoalGrid').datagrid('getEditor', {
			index : 0,
			field : 'consumeType'
		});
		$('#kpiGoalGrid').datagrid('appendRow', {});
		editIndex = $('#kpiGoalGrid').datagrid('getRows').length - 1;
		$('#kpiGoalGrid').datagrid('selectRow', editIndex).datagrid(
				'beginEdit', editIndex);
	}
}
/*var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		kpiGoalAttr.itemFlag = true;
		return true
	}
	if ($('#kpiGoalGrid').datagrid('validateRow', editIndex)) {
		// var ed = $('#kpiGoalGrid').datagrid('getEditor',
		// {index:editIndex,field:'consumeType'});
		// var productname = $(ed.target).combobox('getText');
		// $('#kpiGoalGrid').datagrid('getRows')[editIndex]['dictName'] =
		// productname;
		// $('#kpiGoalGrid').datagrid('endEdit', editIndex);
		editIndex = undefined;
		kpiGoalAttr.itemFlag = true;
		return true;
	} else {
		kpiGoalAttr.itemFlag = false;
		return false;
	}
}*/
/**
 * 清单项确认
 */
function sureItem(index) {
	var grid = $('#kpiGoalGrid').datagrid('selectRow', index);
	var ed = $('#kpiGoalGrid').datagrid('getEditor', {
		index : index,
		field : 'specificationsId'
	});
	var specificationsIdShow = $(ed.target).combobox('getText');
	$('#kpiGoalGrid').datagrid('getRows')[index]['specificationsIdShow'] = specificationsIdShow;

	$(grid).datagrid('endEdit', index);
	$('#kpiGoalGrid').datagrid('refreshRow', index);

}
/**
 * 清单项取消
 */
function removeit(index) {
	var grid = $('#kpiGoalGrid').datagrid('selectRow', index);
	$(grid).datagrid('deleteRow', index);
}

function getKpiGoal(id,kpiObjId,month) {
	tcCore.get({
		url : "kpiGoalDS/getViewById.ssm?id=" +id,
		success : function(data) {
			var flag = window.setInterval(function() {
				if (kpiGoalAttr.initControlCount == 0) {
					initKpiGoal(data);
				}
				window.clearInterval(flag);
			}, 50);
		}
	});
	
	tcCore.post({
		url : "kpiGoalDS/queryForListPage.ssm",
		data:{
			params:{
				kpiObjId:kpiObjId,
				month:month
			},
			size:200,
			start:0 
		},
		success : function(data) {
			if(data.dataList){
				$('#kpiGoalGrid').datagrid("loadData",data.dataList);
			}
		}
	});
}

function initKpiGoal(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d], data);
	}
}

function saveKpiGoal() {
	var data = tcCore.getFormData("kpiGoalForm");
	if (kpiGoalAttr.kpiGoalId) {
		data.kpiGoalId = kpiGoalAttr.kpiGoalId;
	}
	data.kpiObjType = 1;
	var goalList = $('#kpiGoalGrid').datagrid('getData').rows;
	tcCore.post({
		url : "kpiGoalDS/saveKpiGoalList.ssm",
		data : {
			kpiGoal : data,
			goalList : goalList
		},
		success : function(data) {
			tcCore.closeTopDialog({
				data : data,
				command : "save"
			});
		}
	});

}

function deleteKpiGoal() {
	top.$.messager.confirm('系统提示', '确认要删除该指标信息吗', function(r) {
		if (r) {
			if (kpiGoalAttr.kpiGoalId) {
				tcCore.post({
					url : "kpiGoalDS/deleteKpiGoalByPk.ssm",
					data : {
						kpiGoalId : kpiGoalAttr.kpiGoalId
					},
					success : function(data) {
						tcCore.closeTopDialog({
							data : data,
							command : "save"
						});
					}
				});
			}
		}
	});

}

function cancel() {
	tcCore.closeTopDialog();
}

$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});

var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#dg').datagrid('validateRow', editIndex)){
		$('#dg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field){
	if (endEditing()){
		$('#kpiGoalGrid').datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;
	}
}

$(document).ready(init);
