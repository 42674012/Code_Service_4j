  <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String context = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>医院创建向导</title>
<meta name="keywords" content="index">
<style type="text/css">
.createIndx1{
	position: absolute; 
	top: 14px; 
	left: 70px;
	font-weight: 900;
	color: white;
	text-align: center;
	z-index: 1000;
}
.createIndx2{
	position: absolute; 
	top: 14px; 
	left: 260px;
	font-weight: 900;
	color: white;
	text-align: center;
	z-index: 1000;
}
.createIndx3{
	position: absolute; 
	top: 14px; 
	left: 450px;
	font-weight: 900;
	color: white;
	text-align: center;
	z-index: 1000;
}
.createIndx4{
	position: absolute; 
	top: 14px; 
	left: 640px;
	font-weight: 900;
	color: white;
	text-align: center;
	z-index: 1000;
}
.createIndx5{
	position: absolute; 
	top: 14px; 
	left: 845px;
	font-weight: 900;
	color: white;
	text-align: center;
	z-index: 1000;
}
</style>
</head>

<body>
	<%@ include file="../includeScript.jsp"%>
	<script src='js/hospitalCreate.js'></script>
	<div class="easyui-layout" data-options="fit:true"  >
		<div id='center' data-options="region:'center',border:false" >
			<form action="" >
				<div id="p" class="easyui-panel"  style="padding: 5px;width: 1000px;">
				<div style="height: 40px">
					<img id="next1" alt="选择分类" src="css/images/daohang2.png" style="width: 187px;">
					<span  class="createIndx1">选择分类</span>
					
					<img id="next2" alt="选择科室" src="css/images/daohang1.png" style="width: 187px;">
					<span  class="createIndx2" >选择科室</span>
					
					<img id="next3" alt="选择病种" src="css/images/daohang1.png" style="width: 187px;">
					<span  class="createIndx3">选择病种</span>
					
					<img id="next4" alt="选择渠道" src="css/images/daohang1.png" style="width: 187px;">
					<span  class="createIndx4">选择渠道</span>
					
					<img id="done"  alt="完成" src="css/images/daohang3.png" style="width: 187px;">
					<span class="createIndx5">完成</span>
				</div>
				</div>
				<div id="p2" class="easyui-panel"  title="选择分类"  style="width: 1000px;">
					<input class="easyui-combobox" type="text" id='hospitaltype' 
					data-ssbtype='combobox' name="hospitaltype" 
					data-options="height:30,width:200,valueField:'dictValue',textField:'dictName'">
				</div>
				<div id="p3" class="easyui-panel"  title="选择科室" style="width: 1000px;">
					 <div id="p31" data-options="region:'west'" style="width: 310px;height:430px;padding: 5px;border-right: 1px solid #ddd;float: left">
						<ul id="orgTree" >
						</ul>
					</div>
					<div id="p32"  data-options="region:'east'" style="width: 310px;height:430px;padding: 5px;margin-left:10px;border-right: 1px solid #ddd;float: left;">
						 <table  id="disease"></table>
					</div>
					<div id="p33"  data-options="region:'east'" style="width: 310px;height:430px; padding: 5px;margin-left:10px;border: 0px solid #ddd;float: left">
						 <table  id="channel"></table>
					</div>
				</div>
				<div class='edit-form-btn' style="margin-left: 400px;margin-top: 10px;">
					<a id='cancelBtn' class="easyui-linkbutton oper" style="display: none" data-options="iconCls:'icon-form-undo'" onclick='upOption()'>上一步</a>
					<a id='addBtn' class="easyui-linkbutton oper"  data-options="iconCls:'icon-form-ok'" onclick='nextOption()'>下一步</a>
					<a id='doneBtn' class="easyui-linkbutton oper" style='margin-right:10px;display: none' data-options="iconCls:'icon-form-ok'" onclick='doneOption()'>完成</a>
		     	</div>	
			</form>
			
		</div>
	</div>
	
</body>
</html>