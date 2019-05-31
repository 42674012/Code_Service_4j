
var empowerAttr = {
	empowerId : ""
};

function init() {
	
	initEmpowerTree();
	getEmpower(true);
	initControl();
}

function getEmpower(async) {
	tcCore.get({
		async:async,
		url : "empowerDS/queryForTree.ssm?noDisable=0",
		success : function(data) {
			if(empowerAttr.expendId==null||empowerAttr.expendId==""){
				$(data).each(function(i,o){
					if(o.perantId = '0'){
						o.state = 'open';
					}
				});
				$("#empowerTree").treegrid("loadData", data);
				$(".datagrid-body").mCustomScrollbar({
					theme : "minimal-dark",
					scrollSpeed : 50,
					scrollInertia : 100
				});
			}else{
				$("#empowerTree").treegrid("append", {
					parent : empowerAttr.expendId, 
					data : data
				});
			}
		}
	});
//一次性加载所有
	/*tcCore.get({
		url : "empowerDS/queryForTree.ssm?noDisable=0",
		success : function(data) {
			$("#empowerTree").treegrid("loadData", data);
		}
	});*/
}

function initEmpowerTree() {
	$("#empowerTree").treegrid({
		//title : "资源列表",
		//toolbar : getToolbar(),
		idField : 'functionId',
		collapsible : true,
		treeField : 'remark',
		fit:true,
		fitColumns : true,
		iconCls : "icon-grid",
		headerCls : "gridHeaderCls",
		showHeader : true,
		columns : [ [ 
	              {title : '资源',field : 'remark',width : 140},
	              {title : '操作',field : 'operCont',width : 800,formatter:function(value,rowData,index){
	            	  var str = "<input type='checkbox' id='"+rowData.functionId+"' style='width:15px;height:15px;' class='checkAllBox' name='"+rowData.functionId+"' onclick=checkAll('"+rowData.functionId+"')>全选</input>";
	            	  for(var i=0;i<value.length;i++){
	            		  str = str + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="operBox" style="width:15px;height:15px;"  type="checkbox" id="'+value[i].operationId+'" onclick=checkPvisited("'+rowData.functionId+'","'+value[i].operationId+'") name="'+rowData.functionId+'" value="'+value[i].identifyName+'" functionId="'+rowData.functionId+'" uri="'+rowData.uri+'">'+value[i].name+'</input>';
	            	  }
	            	  return str;
	              }}
			] ],
		onClickRow:function(row){
			//设置控件值
			for(var d in row){
				tcCore.setControlValue($("#"+d),row[d]);
			}
		},
		//一次性加载所有的时候该方法屏蔽
		/*onBeforeExpand:function(row){
			empowerAttr.expendId = row.empowerId;
			if(!row.opened){
				row.opened = true;
				getEmpower(false);//empowerAttr.expendId,
			}
		},*/
		onLoadSuccess: function(row){
            $(this).treegrid('enableDnd', row?row.id:null);
        }
	});
}

function initControl(){
	$("#groupIdShow").autocomplete('groupDS/queryAutoComplete.ssm', {
		dataType: "json",
		parse: function(data) {
			return $.map(data, function(item) {
				return {data: item,name: item.name}
			});
		},matchContains:true,max:1000,cacheLength:1,
		formatItem: function(item) {
			return item.name;
		},
		formatMatch:function (item){
		}
	}).result(function(e, item) {
		$("#groupIdShow").val(item.name);
		$("#groupId").val(item.groupId);
		getOperationSet(item.groupId);
	});
}

//获取OperationId集
function getOperationSet(groupId){
	$.each($(".operBox"),function(i,o){
		if(o.checked){
			o.checked = false;
		}
	});
	$.each($(".checkAllBox"),function(i,o){
		if(o.checked){
			o.checked = false;
		}
	});
	tcCore.get({
		url : "empowerDS/getOperationSet.ssm?groupId="+encodeURI(groupId),
		success : function(data) {
			//indexAttr.map = data;
			if(data){
				for(var i=0;i<data.length;i++){
					chk = document.getElementById(data[i]+ '');
					chk.checked = true;
				}
			}
		}
	});
}

/*function getToolbar() {
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
}*/



tcCore.getSelectParent = function(id){
	var data = $("#"+id).treegrid("getSelected");
	if(data){
		data = $("#empowerTree").treegrid("getParent",data.empowerId);
	}
	return data;
}

function initEmpower(data) {
	for ( var d in data) {
		tcCore.setControlValue($("#" + d), data[d]);
	}
}

/***
 * 保存权限
 */
function saveEmpower(){
	//fhjgfhjgj
	var privilegeArr = [];
	$.each($(".operBox"),function(i,o){
		//判断o是否选中
		if(o.checked){
			var data = {
				operationId : o.id,
				functionId : $('#'+o.id+'').attr("functionId"),
				uri: $('#'+o.id+'').attr("uri"),
				identifyName: o.value
			}
			privilegeArr.push(data);
		}
		
		
	});

	if(privilegeArr == "" || privilegeArr == null){
		$.messager.alert('提示','请至少选择一个操作','info');
		return false;
	}
	/*var data = tcCore.getFormData("empowerForm");
	alert(JSON.stringify(data));
	var sdata = $("#empowerTree").treegrid("getSelected");
	if(!sdata){
		alert("请先选择一个菜单节点");
		return false;
	}*/
	if($("#groupIdShow").val() == ''){
		 $("#groupId").val('');
	}
	var groupId = $("#groupId").val();
	if(groupId == null || groupId == ''){
		$.messager.alert('提示','请选择群组或人');
		return false;
	}
	//var data = tcCore.getFormData("empowerForm");
	tcCore.post({
		url:"empowerDS/saveEmpower.ssm",
		data:{
			empower : privilegeArr,
			groupId : groupId
		},
		success:function(data){
			$.messager.alert('提示','操作成功！','info');
			/*data.children = sdata.children;
			data.state = sdata.state;
			//更新界面上的节点
			$('#empowerTree').treegrid('update',{
				id: data.empowerId,
				row: data
			});*/
		}
	});
	
}

function deleteEmpower() {
	top.$.messager.confirm('系统提示', '确认要删除该群组信息吗', function(r) {
		if (r) {
			var empowerId = $("#empowerId").val();
			if (empowerId) {
				tcCore.post({
					url : "empowerDS/deleteEmpowerByPk.ssm",
					data : {
						empowerId : empowerId
					},
					success : function(data) {
						$('#empowerTree').treegrid('remove',empowerId);
					}
				});
			}
		}
	});

}

function checkAll(checkName){
	var chk = document.getElementById(checkName);
	if(chk.checked){
		data = $("#empowerTree").treegrid("getParent",checkName);
		if(data){
			var d = data.operCont;
			for(var i=0;i<d.length;i++){
				if(d[i].identifyName == 'visited'){
					chk = document.getElementById(d[i].operationId + '');
					chk.checked = true;
				}
			}
		}
		$('input[name="'+checkName+'"]').prop("checked",true);
	}else{
		$('input[name="'+checkName+'"]').prop("checked",false);
	}
}

function checkPvisited(functionId,operationId){
	var thisBox = document.getElementById(operationId + '');
	var columAllBox = document.getElementById(functionId + '');
	
	//选中父节点的访问
	if(thisBox.checked){
		var data = $("#empowerTree").treegrid("getParent",functionId);
		if(data){
			var Fid = functionId;
			outerloop:while(1){
				var Fdata = $("#empowerTree").treegrid("getParent",Fid);
				if(Fdata){
					var d = Fdata.operCont;
					for(var i=0;i<d.length;i++){
						if(d[i].identifyName == 'visited'){
							chk = document.getElementById(d[i].operationId + '');
							chk.checked = true;
						}
					}
					if(Fdata.parentId != '0'){
						Fid = Fdata.functionId;
					}else{
						break outerloop;
					}
				}else{
					break outerloop;
				}
			}
			
		}
	}
	
	//判断是否全选
	var columdata = $("#empowerTree").treegrid("find",functionId);
	if(columdata){
		var columD = columdata.operCont;
		var countN = 0;
		for(var j=0;j<columD.length;j++){
			checkYN = document.getElementById(columD[j].operationId + '');
			if(checkYN.checked){
				countN++;
			}
		}
		if(countN <columD.length){
			columAllBox.checked = false;
		}else{
			columAllBox.checked = true;
		}
	}
	
	
}

function cancel() {
	tcCore.closeTopDialog();
}

$(document).ready(init);
