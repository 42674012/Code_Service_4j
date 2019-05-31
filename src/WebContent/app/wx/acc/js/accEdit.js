function init() {
	tcCore.post({
		url:"accountConfigDS/getAccountConfig.ssm",
		success:function(data){
			console.log(data);
			initWXapp(data);
		}
	});
}
function saveWXapp(){
	var data = tcCore.getFormData("wxappForm");
	console.log(data)
	tcCore.post({
		url:"accountConfigDS/saveAccountConfig.ssm",
		data:{
			appsecret:data
		},
		success:function(data){
			console.log(data);
			initWXapp(data);
			alert("成功");
		}
	});
}

function initWXapp(data){
	for(var d in data){
		tcCore.setControlValue($("#"+d),data[d],data);
	}
}

