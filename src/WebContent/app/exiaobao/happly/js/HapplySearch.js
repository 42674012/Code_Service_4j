
function init(){
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	initControls();
	initGrid();
	queryHapply();
}
 

function initControls(){
}

/*******************************************************************************
 * 初始化表格
 * 
 * @returns
 */
function initGrid(){
	
	$('#happlyGridDiv').css({
		height:window.innerHeight-$("#happlyForm").innerHeight()-$("#operbtn").innerHeight()-48
	});
	
	$('#happlyGrid').datagrid({
		// title:"Happly列表",
	    columns:[[
	              		{field:'ck',width:30,checkbox:true},
		    	  	 	{field:'aemployeeName',title:'申请人名称',width:100},
		    	  	 	{field:'phone',title:'申请人电话',width:100},
		    	  	 	{field:'status',title:'申请状态',width:100,formatter:function(value,row,index){
		    	  	  		if(value==1){
		    	  	  			return "审批中";
		    	  	  		}
		    	  	  		if(value==3){
		    	  	  		return "已拒绝";
		    	  	  		}
		    	  	  		return "审批通过";
		    	  	  	}},
		    	  	  	{field:'createdate',title:'申请时间',width:100,formatter:function(value,row,index){
		    	  	  		if(value){
		    	  	  			return new Date(value).format("yyyy-MM-dd hh:mm:ss")
		    	  	  		}
		    	  	  		return value;
		    	  	  	}},

		    	  	 	{field:'orgname',title:'医院名称',width:100},

	    	 {field:'operation_custom',title:'操作',width:60,align:"center",formatter:function(value,row,index){
		  	  		return "<a title='查看' class='grid_link'  onclick=approve(this,'"+row.applyid+"')>审批</a>&nbsp;&nbsp;&nbsp;"+
		  	  		"<a title='编辑' class='grid_link' onclick=refuse(this,'"+row.applyid+"')>拒绝</a>" ;
		  	  	}}
	    ]],
	    fit:true,
	    width:"100%",
	    headerCls:"gridHeaderCls",
	    iconCls:"icon-grid",
	    striped:true,
	    rownumbers:true,
	    fitColumns:true,
	    // pagination:true,
	    checkOnSelect:true
	    // toolbar: getGridToolbar()
	});
	$("#happlyGridPager").pagination({
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
 * 查询
 * 
 * @returns
 */
function queryHapply(){
	var param = tcCore.getFormData("happlyForm");
	var param1 =tcCore.getFormData("happlyFormMoreCondition"); 
	var p = {};
	copyProerty(p,param);
	copyProerty(p,param1);
	sendQuery(p);
}

function copyProerty(p,p1){
	for(var a in p1){
		p[a] = p1[a];
	}
	return p;
}


/*******************************************************************************
 * 发送查询请求
 * 
 * @returns
 */
function sendQuery(param){
	// 获取分页信息
	var pager = $('#happlyGridPager').pagination("options");
	if(param){
		window.searchParam = param;
	}
	param={
		status:1	
	};
	// 计算起始，和截至数据
	tcCore.post({
		url:"happlyDS/queryForListPage.ssm",
		data:{
			params:param,
			size:pager.pageSize,
			start:(pager.pageNumber-1)*pager.pageSize  
		},
		success:function(page){
			// dataList total
			$('#happlyGrid').datagrid("loadData",page.dataList);
			$("#happlyGridPager").pagination('refresh',{	
				total:page.total
			});
		}
	});
}

/*******************************************************************************
 * 审批
 * @returns
 */
function approve(a,id){
	var applyid=[];
	applyid.push(id);
	var status=2;
	// 计算起始，和截至数据
	tcCore.post({
		url:"happlyDS/updateHapply.ssm",
		data:{
			applyid:applyid,
			status:status,
			remark:""
		},
		success:function(page){
			 if(page){
				 alert("审批成功");
				 operaCallBack();
			 }
		}
	});
}

/*******************************************************************************
 * 拒绝
 * @returns
 */
function refuse(a,id){
	var applyid=[];
	applyid.push(id);
	var status=3;
	$.messager.prompt('提示', '请输入拒绝原因', function(r){
		if (r){
			var remark=r;
			// 计算起始，和截至数据
			tcCore.post({
				url:"happlyDS/updateHapply.ssm",
				data:{
					applyid:applyid,
					status:status,
					remark:remark
				},
				success:function(page){
					 if(page){
						 alert("操作成功");
						 operaCallBack();
					 }
				}
			});
		}
	});
	
}
/**
 * 批量审批
 */
function bttapprove(){
	var applyid=[];
	var chgrid=$('#happlyGrid').datagrid("getChecked");
	if(chgrid&&chgrid.length>0){
		$(chgrid).each(function(i,o){
			applyid.push(o.applyid);
		});
	}else{
		alert("请选择审批记录");
		return;
	}
	var status=2;
	// 计算起始，和截至数据
	tcCore.post({
		url:"happlyDS/updateHapply.ssm",
		data:{
			applyid:applyid,
			status:status,
			remark:""
		},
		success:function(page){
			 if(page){
				 alert("审批成功");
				 operaCallBack();
			 }
		}
	});
}
/**
 * 批量拒绝
 */
function bttrefuse(){
	var applyid=[];
	var chgrid=$('#happlyGrid').datagrid("getChecked");
	if(chgrid&&chgrid.length>0){
		$(chgrid).each(function(i,o){
			applyid.push(o.applyid);
		});
	}else{
		alert("请选择审批记录");
		return;
	}
	var status=3;
	$.messager.prompt('提示', '请输入拒绝原因', function(r){
		if (r){
			var remark=r;
			// 计算起始，和截至数据
			tcCore.post({
				url:"happlyDS/updateHapply.ssm",
				data:{
					applyid:applyid,
					status:status,
					remark:remark
				},
				success:function(page){
					 if(page){
						 alert("操作成功");
						 operaCallBack();
					 }
				}
			});
		}
	});
	
}

/*******************************************************************************
 * 审批 回调
 */
function operaCallBack(){
	queryHapply()
}

$(document).ready(init);
