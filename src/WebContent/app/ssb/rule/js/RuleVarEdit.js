
var ruleVarAttr = {
		id:"",
		initControlCount:2,
		nonRefrenceVar:[]
	};

function init(){
	//createRuleParams(" #111  #222");
	$("#center").mCustomScrollbar({
		theme : "minimal-dark",
		scrollSpeed : 50,
		scrollInertia : 100
	});
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#ruleVarFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	initControls();
	ruleVarAttr.id = tcCore.getParameter("id");
	if(ruleVarAttr.id){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	getRuleVar(ruleVarAttr.id);
}

function test(){
	createRuleParams(ruleVarAttr.editor.getValue(),"dd");
}

function createRuleParams(s,id){
	var rs = null;
	if(s!=null){
		rs=s.match(/#[a-zA-Z0-9]+/mg);
	}
	if(rs==null||rs.length==0){
		//没有匹配的值
		return;
	}
	
	var data = [];
	$(rs).each(function(i,o){
		rs[i] = o.substring(1);
		$(ruleVarAttr.nonRefrenceVar).each(function(){
			if(this.varCode==rs[i]){
				data.push(this);
			}
		});
	});
	//生成变量控件
	initVarUI(data,id);
}

function refrenceExists(sql){
	var reg = /#[a-zA-Z0-9]/;
	return reg.test(sql);
}

function initVarUI(data,id){
	$("#"+id).html("<table cellspacing='10'><tr><td id='varTestTd'></td></tr><tr><td><a onclick='sendTest()'>测试</a></td></></table>");
	$(data).each(function(i,o){
		eval("initVarUI_"+o.uiType+"(o,'varTestTd');");
	});
}

function sendTest(){
	//获取变量的值
	var param = {};
	$("#varTestTd").find(".var_param").each(function(i,o){
		var ssbType = $(o).data("ssbtype");
		if(ssbType=="date"){
			var t = $(o).datebox("getValue");
			param[$(o).attr("id")] = tcCore.easyUiDateTimeBox.parseDate(t);
		}else{
			param[$(o).attr("id")] = $(o).val(); 
		}
	});
	//调用后台测试方法
	var varCode = $("#varCode").val();
	var varSql =  ruleVarAttr.editor.getValue();
	tcCore.post({
		url:"ruleVarDS/caculateVar.ssm",
		data:{
			code:varCode,
			sql:varSql,
			params:param
		},
		success:function(data){
			alert(data);
		}
	});
}

function initVarUI_date(o,id){
	var html = [];
	html.push("<div>",o.varDesc," <input  class='var_param'  type='text' id='",o.varCode,"' data-ssbtype='date'></input></div>");
	$("#"+id).append(html.join(""));
	$("#"+o.varCode).datebox({
		formatter:tcCoreformatter,
		parser:tcCoreParser,
		height:30
	});
}

function initVarUI_autocomplete(o,id){
	var html = [];
	html.push("<div>",o.varDesc,"<input type='hidden' class='var_param' data-ssbtype='autocomplete' id='",o.varCode,"' >");
	html.push("<input class='normal-input' type='text' id='",o.varCode,"Show' style='height: 30px; width: 200px' ></div>");
	$("#"+id).append(html.join(""));
	$("#"+o.varCode+"Show").autocomplete('ruleVarDS/getVarValueListByAutoComplete.ssm', {
		dataType : "json",
		extraParams:{
			code:o.varCode
		},
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
			$("#"+o.varCode).val(null);
			return item.name;
		},
		formatMatch : function(item) {
		}
	}).result(function(e, item) {
		$("#"+o.varCode+"Show").val(item.name);
		$("#"+o.varCode).val(item.id);
	});
}



function initControls(){
	var uidate=[{
	    id:"combobox",
	    text:"组合框"
	},{
	    id:"slider",
	    text:"滑块"
	}];
	$("#uiType").combobox("loadData",uidate);
	$("#uiType").combobox("setValue","slider");
	
	
	ruleVarAttr.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
		  lineNumbers: true,
		  mode: "htmlmixed"
		});
	ruleVarAttr.editor.setSize(400,150);
	
		    	tcCore.get({
		    		url:"dictDS/getDictByDictTypeCode.ssm?dictTypeCode=$rule_var_type",
		    		success:function(data){
		    			var html = [];
		    			$(data).each(function(i,o){
		    				if(i==0){
		    					html.push("<input type='radio' name='varType' checked='checked' value='",o.dictValue,"'>",o.dictName);
		    				}else{
		    					html.push("<input type='radio' name='varType' value='",o.dictValue,"'>",o.dictName);
		    				}
		    			});
		    			$("#varType").parent().append(html.join(""));
		    			ruleVarAttr.initControlCount--;
		    		}
		    	});
		    	
		    	
		    	//找出所有没有引用的变量
		    	tcCore.get({
		    		url : "ruleVarDS/getByVarType.ssm?varType=2",
		    		success : function(data) {
		    			ruleVarAttr.nonRefrenceVar = data;
		    			ruleVarAttr.initControlCount--;
		    		}
		    	});
}

function getRuleVar(id){
	if(!id){
		return;
	}
	tcCore.get({
		url:"ruleVarDS/getRuleVarByPk.ssm?id="+encodeURI(id),
		success:function(data){
			var flag = window.setInterval(function(){
				if(ruleVarAttr.initControlCount==0){
					initRuleVar(data);
				}
				window.clearInterval(flag);
			},50);
		}
	});
}


function initRuleVar(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
	if(data){
		ruleVarAttr.editor.setValue(data.varSql);
	}
	
}

function saveRuleVar(){
	var data = tcCore.getFormData("ruleVarForm");
	if(ruleVarAttr.id){
		data.id = ruleVarAttr.id;
	}
	if(!refrenceExists(data.varSql)){
		data.varType = 2;
	}else{
		data.varType = 1;
	}
	data.varSql = ruleVarAttr.editor.getValue();
	tcCore.post({
		url:"ruleVarDS/saveRuleVar.ssm",
		data:{
			ruleVar:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteRuleVar(){
	 top.$.messager.confirm('系统提示', '确认要删除该变量信息吗', function(r){
         if (r){
             if(ruleVarAttr.id){
            	 tcCore.post({
              		url:"ruleVarDS/deleteRuleVarByPk.ssm",
              		data:{
              			id:ruleVarAttr.id
              		},
              		success:function(data){
              			tcCore.closeTopDialog({
              				data:data,
              				command:"save"
              			});
              		}
              	}); 
             }
         }
     });
	
}

function cancel(){
	tcCore.closeTopDialog();
}




$(document).ready(init);
