function sendMasssendpage() {
	var  txt_control=$("#txt_control").val()
	$.ajax({
		url:'massSendDS/massSend.ssm?msg='+txt_control,
		type:'GET',
		dataType:'json',
		success:function(data) {
			alert("成功")
		}
	});
}


