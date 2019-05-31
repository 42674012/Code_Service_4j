$(document).ready(init);

function init() {
	initdict();
}
/**
 * 初始化字典配置
 * 初始化文件配置
 */
function initdict(){
	tcCore.get({
		url : "fileconfigInit/init.ssm?dictTypeCode=$file_dict",
		success : function(data) {
			initControls();
		}
	});
}

function initControls(){
	
}
/**
 * 上传
 */
function upload(){
	if($("#filebox_file_id_1").val()==""){
		alert("请选择上传文件");
		return;
	}
	$('#ff').form('submit', {
	    success: function(data){
	    	tcCore.closeTopDialog({
  				data:data,
  				command:"upload"
  			});
	    }
	});
	
}
function cancel(){
	tcCore.closeTopDialog();
}


