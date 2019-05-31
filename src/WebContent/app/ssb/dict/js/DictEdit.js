

var dictAttr = {
		dictId:0
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#dictFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	dictAttr.dictId = tcCore.getParameter("dictId");
	if(dictAttr.dictId){
		$("#cancelBtn").remove();
	}else{
		$("#deleteBtn").remove();
	}
	dictAttr.dictTypeId = tcCore.getParameter("dictTypeId");
	$("#dictTypeId").val(dictAttr.dictTypeId); 
	getDict(dictAttr.dictId);
}

function getDict(id){
	if(id==null||id==""){
		id=0;
	}
	tcCore.get({
		url:"dictDS/getDictByPk.ssm?dictId="+encodeURI(id),
		success:function(data){
			initDict(data);
		}
	});
}


function initDict(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveDict(){
	var data = tcCore.getFormData("dictForm");
	if(dictAttr.dictId){
		data.dictId = dictAttr.dictId;
	}
	if(data.dictTypeId==null||data.dictTypeId==""){
		alert("缺少字典类型");
		return;
	}
	
	tcCore.post({
		url:"dictDS/saveDict.ssm",
		data:{
			dict:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteDict(){
	 top.$.messager.confirm('系统提示', '确认要删除该dict信息吗', function(r){
         if (r){
             if(dictAttr.dictId){
            	 tcCore.post({
              		url:"dictDS/deleteDictByPk.ssm",
              		data:{
              			dictId:dictAttr.dictId
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
