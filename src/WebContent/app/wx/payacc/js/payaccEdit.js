function init() {
	tcCore.post({
		url:"accountConfigDS/getPayAccountConfig.ssm",
		success:function(data){
			console.log(data);
			initWXapp(data);
		}
	});
}
function saveWXapp(){
	var data = tcCore.getFormData("wxAppPayForm");
	console.log(data)
	tcCore.post({
		url:"accountConfigDS/savePayAccountConfig.ssm",
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

