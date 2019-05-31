

var menuAttr = {
		menuId:"",
		parentId:""
	};

function init(){
	
	var dialogId =  tcCore.getParameter("dialogId");
	if(!dialogId){
		//判断是否为窗口打开，如果被打开，隐藏form的头，border
		$("#menuFormPanel").panel({
			iconCls:"icon-form-edit"
		});
	}
	
	var data = tcCore.getTopWindowParam();
	if(data){
		menuAttr.parentId = data.menuId;
		$("#parentName").html(data.name);
	}
	
}

function getMenu(id){
	tcCore.get({
		url:"menuDS/getMenuByPk.ssm?menuId="+encodeURI(id),
		success:function(data){
			initMenu(data);
		}
	});
}


function initMenu(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d]);
	}
}

function saveMenu(){
	var data = tcCore.getFormData("menuForm");
	if(menuAttr.parentId){
		data.parentId = menuAttr.parentId;
	}else{
		data.parentId = 0;
	}
	if($("#visiable:checked").get(0)){
		data.visiable = 1;
	}else{
		data.visiable = 0;
	}
	var isValid = $('#menuForm').form('validate');
	if(!isValid){
		$.messager.alert('提示','请完善信息!','warning');
		return false;
	}
	tcCore.post({
		url:"menuDS/saveMenu.ssm",
		data:{
			menu:data
		},
		success:function(data){
			tcCore.closeTopDialog({
				data:data,
				command:"save"
			});
		}
	});
	
}

function deleteMenu(){
	 top.$.messager.confirm('系统提示', '确认要删除该菜单吗', function(r){
         if (r){
             if(menuAttr.menuId){
            	 tcCore.post({
              		url:"menuDS/deleteMenuByPk.ssm",
              		data:{
              			menuId:menuAttr.menuId
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
