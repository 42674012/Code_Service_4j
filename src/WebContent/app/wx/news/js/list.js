function del(mediaId){
	console.log(mediaId.id);
		tcCore.get({
			url:"newsDS/deleteMaterialMedia.ssm?mediaId="+mediaId.id,
			success:function(data){
				if(data.code==0)
				{
					alert("删除成功");
				}else{
					
					alert("删除失败:错误代码"+data.text);
				}
				console.log(data);
			}
		});
}
function cancel(id){
var ida=id.id;
 $('#'+ida).popover('hide');
}
