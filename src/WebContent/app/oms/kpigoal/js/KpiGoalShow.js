var kpiGoalAttr={
	headList : {},
	bodysList : [],  
	codeValue : ''
};
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
}

function initDataGrid(value){
	kpiGoalAttr.bodysList = [];
	tcCore.post({
  		url:"kpiGoalDS/setDataGrid.ssm",
  		data : {
  			code : value
  		},
  		success:function(data){
  			if(data){
  				kpiGoalAttr.headList = data.headList;
  	  			//kpiGoalAttr.bodysList = data.bodysList;
  	  			for(var d in data.bodysList){
  	  				var colum = data.bodysList[d];
  	  				colum['editor'] = {type : 'text'};
  	  				kpiGoalAttr.bodysList.push(colum);
  	  			}
  	  			initGrid(value);
  			}
  			
  		}
  	}); 
}

function initControls(){
	/*$("#name").autocomplete('employeeDS/queryAutoComplete.ssm', {
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
		$("#name").val(item.name);
		$("#employeeId").val(item.employeeId);
		sendQuery({
			employeeId : $("#employeeId").val(),
			month : $('#month').val()
		});
	});*/
	$('#jobId').combobox({
		url : 'jobRoleDS/getJobCode.ssm',
		width:200,
		height:30,
		panelHeight:80,
		valueField:'code',
		textField:'jobroleName',
		editable:false ,
		onLoadSuccess : function(data) {
			if(jobroleId != null && jobroleId != "null"){
				if(data){
					$(data).each(function(i,o){
						if(o.jobroleId = jobroleId){
							$("#jobId").combobox('setValue', o.code);
							initDataGrid(o.code);
						}
					});
				}
			}else{
				$("#jobId").combobox('setValue', data[0].code);
				initDataGrid(data[0].code);
			}
	     },
	     onSelect: function(rec){
			var value = $("#jobId").combobox("getValue");
			initDataGrid(value);
			kpiGoalAttr.codeValue = value;
		}
	});
	/*tcCore.get({
		 url : "jobRoleDS/getJobCode.ssm", 
		 success :function(data) {
			 	$("#jobId").combobox("loadData", data);
			 	$("#jobId").combobox("setValue", data[0].code);
			 	initDataGrid(data[0].code);
			},
			onSelect: function(rec){
				var value = $("#jobId").combobox("getValue");
				alert(value);
				initDataGrid(value);
				kpiGoalAttr.codeValue = value;
			}
		onSelect : function(record){
			var value = $("#jobId").combobox("getValue");
			alert(value);
			initDataGrid(value);
			kpiGoalAttr.codeValue = value;
		}
	});*/
	
	//nameblur();
	var date = new Date();
	$('#month').val(date.getFullYear()+"-"+(date.getMonth()+1));
	//$('#Show_msg').html((date.getFullYear()+"-"+(date.getMonth()+1)) + "月的营业目标");
	
	
}
function addMonth(){
	var date = $('#month').val();
	var dates = date.split('-');
	var year = dates[0];
	var month = dates[1];
	if(month == 12){
		month = 1;
		year = Number(year) + 1;
	}else{
		month = Number(month) + 1;
	}
	$('#month').val(year+"-"+month);
	//$('#Show_msg').html(year+"-"+month + "的绩效");

	sendQuery({
		//employeeId : $("#employeeId").val(),
		month : $('#month').val(),
		code : $("#jobId").combobox("getValue")
	});
	
	
}
function subMonth(){
	var date = $('#month').val();
	var dates = date.split('-');
	var year = dates[0];
	var months = dates[1];
	if(months == 1){
		months = 12;
		year = Number(year) - 1;
	}else{
		months = Number(months) - 1;
	}
	$('#month').val(year+"-"+months);
	$('#Show_msg').html(year+"-"+months + "的绩效");
	sendQuery({
		//employeeId : $("#employeeId").val(),
		month : (year+"-"+months),
		code : $("#jobId").combobox("getValue")
	});
}
/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(value){
	$('#kpiGoalGridDiv').css({
		height:window.innerHeight-$("#kpiGoalForm").innerHeight()-$("#operbtn").innerHeight() - 30
	});
	
	$('#kpiGoalGrid').datagrid({
		columns:[kpiGoalAttr.headList,kpiGoalAttr.bodysList],
	    fit:true,
	    width:"100%",
	    headerCls:"gridHeaderCls",
	    iconCls:"icon-grid",
	    striped:true,
	    singleSelect:true,
	    rownumbers:true,
	    //fitColumns:true,
	    // pagination:true,
	    checkOnSelect:true,
	    onClickCell: editData
	    // toolbar: getGridToolbar()
	});
	sendQuery({
		month :  $('#month').val(),
		code : value
	});
	
}



/*******************************************************************************
 * 发送查询请求
 * 
 * @returns
 */
function sendQuery(param){
	tcCore.post({
		url:"employeeGoalViewDS/getEmployeeAndGoal.ssm",
		data :{
			params : param
		},
		success:function(data){
			$('#kpiGoalGrid').datagrid("loadData",data);
		}
	});
}

/*******************************************************************************
 * 保存
 * 
 * @returns
 */
function saveData(){
	var row = $('#kpiGoalGrid').datagrid('getRows');
	for(var i=0;i<row.length;i++){
		$('#kpiGoalGrid').datagrid('endEdit', i);
	}
	
	var data = [];
	var rows = $('#kpiGoalGrid').datagrid('getRows');

	tcCore.post({
		url : "kpiGoalDS/saveKpiGoalArray.ssm",
		data : {
			kpiGoal : rows,
			month : $('#month').val()
		},
		success : function(data) {
			$.messager.alert('提示','操作成功','info');
		}
	});
	/*tcCore.openWindowOnTop("KpiGoalEdit.jsp", null, null, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"新增经营目标"
	});*/
}
/*******************************************************************************
 * 编辑
 * 
 * @returns
 */
function editData(index, field){
	//sendQuery();getEmployeeSet
	/*tcCore.post({
		url:"employeeGoalViewDS/getEmployeeSet.ssm",
		data :{
			code : kpiGoalAttr.codeValue
		},
		success:function(data){
			$('#kpiGoalGrid').datagrid("loadData",data);
			
		}
	});*/
	if (endEditing()){
		//$('#kpiGoalGrid').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		var rows = $('#kpiGoalGrid').datagrid('getRows');
		for(var i=0;i<rows.length;i++){ 
			$('#kpiGoalGrid').datagrid('beginEdit',i);
		}
		editIndex = index;
	}
	
	
	
	/*$('#kpiGoalGrid').datagrid("selectRow",index);
	var data = $('#kpiGoalGrid').datagrid("getSelected");
	tcCore.openWindowOnTop("KpiGoalEdit.jsp?id="+id, data, a, function(result){
		// 关闭窗口的回调
		operaCallBack(result);
	}, {
		title:"编辑经营目标"
	});*/
}

function editDataBtnClick(){
	var data = $("#kpiGoalGrid").datagrid("getSelected");
	if(data==null){
		alert("请先选中一行记录");
	}else{
		editData(null,data.kpiGoalId);
	}
}

/*******************************************************************************
 * 新增，编辑的回调
 */
function operaCallBack(result){
	if(result && (result.command=="save" ||  result.command=="delete")){
		sendQuery(null);
	}/*else if(result && result.command=="editor"){
		if (endEditing()){
			//$('#kpiGoalGrid').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
			var rows = $('#kpiGoalGrid').datagrid('getRows');
			for(var i=0;i<rows.length;i++){ 
				$('#kpiGoalGrid').datagrid('beginEdit',i);
			}
			editIndex = result.indexs;
		}
	}*/
}

function nameblur(){
	$('#name').blur(function(){
		$("#employeeId").val('');
		sendQuery({
			employeeId : $("#employeeId").val(),
			month : $('#month').val()
		});
	});
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
	if ($('#kpiGoalGrid').datagrid('validateRow', editIndex)){
		$('#kpiGoalGrid').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field){
	if (endEditing()){
		//$('#kpiGoalGrid').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		var rows = $('#kpiGoalGrid').datagrid('getRows');
		for(var i=0;i<rows.length;i++){
			$('#kpiGoalGrid').datagrid('beginEdit',i);
		}
		editIndex = index;
	}
}

/*function editData(){
	if (endEditing()){
		var rows = $('#kpiGoalGrid').datagrid('getRows');
		for(var i;i<rows.length;i++){
			$('#kpiGoalGrid').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		}
	}
}
*/
$(document).ready(init);
