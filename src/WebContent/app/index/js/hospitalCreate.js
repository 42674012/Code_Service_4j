var createAttr={
	imgIndex:1,	
	ckorgId: [],
	unckorgId: [],
	unckdictId:[],//未选择渠道
};
function init(){
	$("#p3").panel("close");
	/**
	 * 初始化医院类型选择
	 */
	tcCore.get({
		url : "dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$hospital_type",
		success : function(data) {
			data.unshift({
				dictValue:"",
				dictName:"- - 请选择 - - -"
			});
			$('#hospitaltype').combobox("loadData",data);
		}
	});
	/**
	 * 初始化病种
	 * is_delete全部更新为0
	 */
	tcCore.get({
		url : "diseaseDS/updateDisease.ssm",
		success : function(data) {
			
		}
	});
}
function initOrgTree() {
	$("#orgTree").tree({
		checkbox:true,
		animate:true,
		formatter:function(node){
			return node.name;
		},
		onBeforeExpand:function(node){
			
		},
		onSelect:function(node){
			if(createAttr.imgIndex==3){
				var diseaseorg={
					orgid:	node.orgId
				}
				//查询该科室关联的病种
				tcCore.post({
					url : "diseaseOrgDS/queryForList.ssm",
					data:{
						params:diseaseorg
					},
					success : function(data) {
						var diseasedata=$("#disease").datagrid("getData");
						$("#disease").datagrid("clearChecked");
						if(diseasedata&&diseasedata!=undefined){
							$(diseasedata.rows).each(function(si,ds){
								$(data).each(function(i,o){
									if(o.diseaseid==ds.diseaseId||o.diseaseid+""===ds.diseaseId+""){
										$("#disease").datagrid("checkRow",si);
									}
								});
							});
						}
					}
				});
			}
		}
	});
	getOrg();
}
/**
 * 获取科室树结构
 * @param parentId
 * @param async
 */
function getOrg() {
	//获取所有科室
	tcCore.post({
		url : "orgDS/getOrgTree.ssm",
		data:{
			noDisable:0,
		},
		success : function(data) {
			$("#orgTree").tree("loadData", data);
				gethospitaltype();
		}
	});
}
/**
 * 选择医院类型后
 * 与之关联的默认选中
 */
function gethospitaltype(){
	var dat={
		hospitalTypekey:$("#hospitaltype").combobox("getValue"),	
	};
	//获取类型关联科室
	tcCore.post({
		url : "orgDS/queryOrgByType.ssm",
		data:{
			params:dat,
		},
		success : function(data) {
			var node = $('#orgTree').tree('getChecked', 'unchecked');
			$(data).each(function(i,o){
				$(node).each(function(i,nod){
					if(o.orgId==nod.orgId){
						$('#orgTree').tree('check', nod.target);
					}
				});
			});
		}
	});
}
/**
 * 删除未选择部门科室
 */
function delunckeckOrg(unckorgId){
	
	//删除未选择渠道
	var channel=$("#channel").tree('getChecked', 'unchecked');
	$(channel).each(function(i,o){
		if(o.dictId){
			createAttr.unckdictId.push(o.dictId);
		}
	});
	
	//删除未选择科室
	//删除未选择渠道
	tcCore.post({
		url : "orgDS/deleteOrgByAttrPk.ssm",
		data:{
			orgId:unckorgId,
			dictId:createAttr.unckdictId,
		},
		success : function(data) {
			/**
			 * 删除渠道与部门科室后
			 * 更新字典初始化选项为已初始化
			 * 跳转首页
			 */
			var dictId=tcCore.getParameter("dictId");
			if(dictId){
				tcCore.post({
					url : "dictDS/updateDictBypk.ssm",
					data:{
						dictid: dictId,
					},
					success : function(data) {
						window.location.href="index.jsp";
					}
				});
			}
		}
	});
}

/**
 * 下一步
 */
function nextOption(){
	createAttr.imgIndex++;
	if(createAttr.imgIndex==2){
		if($("#hospitaltype").combobox("getValue")==""){
			alert("请选择医院类型");
			createAttr.imgIndex--;
			return ;
		}
		$("#p2").panel("close");
		$("#p3").panel("open");
		$("#p31").show();
		initOrgTree();
		
	}
	if(createAttr.imgIndex==3){
		var data=$("#orgTree").tree('getChecked');
		if(data&&data.length>0){
			$("#p3").panel("setTitle","选择病种");
			$("#p32").show();
			//未选择科室
			var data=$("#orgTree").tree('getChecked', 'unchecked');
			$(data).each(function(i,o){
				createAttr.ckorgId.push(o.orgId);
				$("#orgTree").tree("remove",o.target);
			});
			getdisease();
		}else{
			alert("请选择医院科室");
			createAttr.imgIndex--;
			return ;
		}
	}else if(createAttr.imgIndex==4){
		//选择渠道
		$("#p3").panel("setTitle","选择渠道");
		$("#p33").show();
		initchannel();
		$("#cancelBtn").show();
		$("#doneBtn").show();
		$("#addBtn").hide();
	}
	if(1<createAttr.imgIndex&&createAttr.imgIndex<5){
		$("#cancelBtn").show();
		$("#next"+createAttr.imgIndex).attr("src","css/images/daohang2.png");
	}else{
		$("#cancelBtn").show();
		$("#doneBtn").show();
		$("#done").attr("src","css/images/daohang4.png");
	}
}
/**
 * 上一步
 */
function upOption(){
	if(createAttr.imgIndex==5){
		$("#cancelBtn").show();
		$("#doneBtn").hide();
		$("#done").attr("src","css/images/daohang3.png");
	}else if(2<createAttr.imgIndex&&createAttr.imgIndex<5){
		if(createAttr.imgIndex==3){
			$("#p3").panel("setTitle","选择科室");
			$("#p32").hide();
			$("#p33").hide();
		}else if(createAttr.imgIndex==4){
			
			$("#p3").panel("setTitle","选择病种");
			$("#p33").hide();
		}
		$("#addBtn").show();
		$("#doneBtn").hide();
		$("#cancelBtn").show();
		$("#next"+createAttr.imgIndex).attr("src","css/images/daohang1.png");
	}else{
		$("#cancelBtn").hide();
		$("#p31").hide();
		$("#p32").hide();
		$("#p33").hide();
		$("#p2").panel("open");
		$("#p3").panel("close");
		$("#next"+createAttr.imgIndex).attr("src","css/images/daohang1.png");
	}
	createAttr.imgIndex--;
}
/**
 * 完成
 */
function doneOption(){
	var data=$("#channel").tree('getChecked');
	if(data&&data.length>0){
		
		//建立选择部门科室与类型的关联关系
		var ckorgtree=$("#orgTree").tree('getChecked');
		var orgId=[];
		$(ckorgtree).each(function(i,o){
			orgId.push(o.orgId);
		});
		var hospitalTypekey=$("#hospitaltype").combobox("getValue");
		var hospitalTypeName=$("#hospitaltype").combobox("getText");
		tcCore.post({
			url : "omsOrgHospitalTypeDS/updateOrgHospitalType.ssm",
			data:{
				hospitalTypekey:hospitalTypekey,
				hospitalTypeName:hospitalTypeName,
				orgId:orgId
			},
			success : function(data) {
				 
			}
		});
		//删除未选择的关联关系
		var data=$("#orgTree").tree('getChecked', 'unchecked');
		$(data).each(function(i,o){
			createAttr.unckorgId.push(o.orgId);
		});
		tcCore.post({
			url : "omsOrgHospitalTypeDS/deleteOrgHospitalType.ssm",
			data:{
				hospitalTypekey:hospitalTypekey,
				orgId:createAttr.unckorgId
			},
			success : function(data) {
				 
			}
		});
		
		
		//删除未选择部门科室
		delunckeckOrg(createAttr.unckorgId);
	}else{
		alert("请选择选择渠道");
		createAttr.imgIndex--;
		return ;
	}
}

/**
 * 获得病种
 */
function getdisease(){
	$("#disease").datagrid({
		columns:[[
	              	{field:'ck',width:30,checkbox:true},
	              	{field:'diseaseName',title:'病种名称',width:100},
	    ]],
	    onCheck:function(rowIndex,rowData){
	    	//判断科室选择节点
	    	var nodes = $('#orgTree').tree('getSelected');
	    	if(nodes){
	    		//建立科室与病种关联关系
	    		var diseaseOrg={
	    				diseaseid:rowData.diseaseId,
	    				orgid:nodes.orgId
	    		};
	    		tcCore.post({
	    			url : "diseaseOrgDS/saveDiseaseOrg.ssm",
	    			data:{
	    				diseaseOrg:diseaseOrg
	    			},
	    			success : function(data) {
	    				
	    			}
	    		});
	    	}else{
	    		alert("请选择关联科室");
	    	}
	    },
	    onUncheck:function(rowIndex,rowData){
	    	var nodes = $('#orgTree').tree('getSelected');
	    	if(nodes){
	    		//删除病种与科室关联关系
	    		tcCore.post({
	    			url : "diseaseOrgDS/deleteByOrgidOfDiseaseid.ssm",
	    			data:{
	    				orgid:nodes.orgId,
	    				diseaseid:rowData.diseaseId
	    			},
	    			success : function(data) {
	    				
	    			}
	    		});
	    	}else{
	    		alert("请选择关联科室");
	    	}
	    },
	    onCheckAll:function(rows){
	    	//判断科室选择节点
	    	var nodes = $('#orgTree').tree('getSelected');
	    	if(nodes){
	    		$(rows).each(function(i,o){
	    			//建立科室与病种关联关系
		    		var diseaseOrg={
		    				diseaseid:o.diseaseId,
		    				orgid:nodes.orgId
		    		};
		    		tcCore.post({
		    			url : "diseaseOrgDS/saveDiseaseOrg.ssm",
		    			data:{
		    				diseaseOrg:diseaseOrg
		    			},
		    			success : function(data) {
		    				
		    			}
		    		});
	    		});
	    	}else{
	    		alert("请选择关联科室");
	    	}
	    },
	    onUncheckAll:function(rows){
	    	var nodes = $('#orgTree').tree('getSelected');
	    	if(nodes){
	    		//删除病种与科室关联关系
	    		$(rows).each(function(i,o){
	    			tcCore.post({
		    			url : "diseaseOrgDS/deleteByOrgidOfDiseaseid.ssm",
		    			data:{
		    				orgid:nodes.orgId,
		    				diseaseid:o.diseaseId
		    			},
		    			success : function(data) {
		    				
		    			}
		    		});
	    		});
	    		
	    	}else{
	    		alert("请选择关联科室");
	    	}
	    },
	    fit:true,
	    width:"100%",
	    headerCls:"gridHeaderCls",
	    iconCls:"icon-grid",
	    striped:true,
	    rownumbers:true,
	    fitColumns:true,
	    // pagination:true,
	    checkOnSelect:true
	});
	tcCore.get({
		url : "diseaseDS/getAllDiseaseList.ssm",
		success : function(data) {
			$("#disease").datagrid("loadData",data);
		}
	});
}
/**
 * 初始化渠道
 */
function initchannel(){
	$("#channel").tree({
		animate:true,
		checkbox:true,
		formatter:function(node){
			if(node.code&&node.code!=""&&node.code!=undefined){
				return node.name;
			}else{
				return node.dictName;
			}
			
		},
		onBeforeExpand:function(node){
			 
		}
	});
	getchannel();
}
/**
 * 查询渠道
 */
function getchannel(){
	/**
	 * 渠道类型
	 */
	tcCore.get({
		url : "dictTypeDS/queryDictForChannel.ssm?dictTypeCode=$channel_type",
		success : function(data) {
			var dt=[];
			$(data).each(function(i,o){
				var bb=o;
				if(o.dictlist.length>0){
					bb.children=o.dictlist;
				}
				dt.push(bb);
			});
			$("#channel").tree("loadData",dt);
			var root = $('#channel').tree('getRoots');  
			$(root).each(function(i,o){
				$("#channel").tree('check',o.target); 
			});
			
		}
	});
}





$(document).ready(init);