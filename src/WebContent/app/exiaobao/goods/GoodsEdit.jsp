<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String context = request.getContextPath();
%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title></title>
<meta name="keywords" content="index">
 <link href="<%=context %>/css/umeditor/umeditor.css" type="text/css" rel="stylesheet">
 <script type="text/javascript" src="<%=context %>/js/swfupload/swfupload.js"></script>
 <script type="text/javascript" src="<%=context %>/js/swfupload/handlers.js"></script>
 <link type="text/css" href="css/GoodsEdit.css" rel="stylesheet"/>
</head>

<body>
<%@ include file="../../includeScript.jsp" %>

<script type="text/javascript" charset="utf-8" src="<%=context %>/js/umeditor/umeditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="<%=context %>/js/umeditor/umeditor.min.js"></script>
<script type="text/javascript" src="<%=context %>/js/umeditor/zh-cn/zh-cn.js"></script>
<script src='js/Upload.js'></script>
<script src='js/GoodsEdit.js'></script>
<div class="easyui-layout" data-options="fit:true">
	  <div id="goodstext" style="float: left" data-options="region:'center',border:false">
	   <form id="goodsForm" class='edit-form' method="post">
            <table cellspacing='10'>
	            <tr>
					<td colspan="4">
						<span id="uploadButton" style="margin-left: 20px;"></span>
					 	<div id="goodsnails">
							<table id="goodsTable" border="0" width="530" style="display: inline; padding: 2px; margin-top: 5px;">
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="4">
						<div  id="goodesphone">
				 		</div>
					</td>
				</tr>
				<tr>
					<td   class='td-label'><font color=red>*</font>商品名称:</td>
					<td colspan="3">
					<input class="easyui-textbox" type="text" id='goodsname' 
                    data-ssbtype='text' name="goodsname" data-options="height:30,width:590,required:true"></input>
					</td>
				</tr>
				<tr>
					<td   class='td-label'><font color=red>*</font>价 &nbsp;&nbsp; 格:</td>
					<td><input class=" easyui-numberbox" type="text"
						id='price' data-ssbtype='int'
						name="price" data-options="height:30,width:200,required:true,precision:2"></input></td>
					
					<td   class='td-label'><font color=red>*</font>佣&nbsp;&nbsp; 金:</td>
					<td><input class=" easyui-numberbox" type="text"
						id='brokerage' data-ssbtype='int' value="0"
						name="brokerage" data-options="height:30,width:200,required:true,precision:2"></input></td>		
				</tr>
				<tr>
					<td   class='td-label'><font color=red>*</font>折 扣 数:</td>
					<td colspan="3"><input class=" easyui-numberbox" type="text"
						id='discount' data-ssbtype='int' value="10"
						name="discount" data-options="height:30,width:200,required:true,precision:2"></input>
						<font style="color:blue;padding-top: 2px;margin-left: 5px;">默认不打折为10,直接填写0-10即可</font>
					</td>
				</tr>
				<tr>
					<td colspan="4"  >
						<div id="tt" class="easyui-tabs" style="width:770px;height:500px;border-bottom: 1px solid #ddd;">
							<div title="商品信息"  style="padding:5px;">
								<script id="editorinfo" name="editorinfo" type="text/plain"  style="width:740px;height:390px;">
								</script>
    							<input type="hidden" name="goodsinfo" id="goodsinfo" data-ssbtype='text'/>
						    </div>
						    <div title="规格明细" style="padding:10px;"  >
								  <div>
								  	<table cellspacing='0' id="daltable" border="0">
								  		<tr>
								  			<td class="imgtd">
								  				<img src="images/edit_add.png"  onclick="addTr()"/>
								  				<img src="images/edit_remove.png"  onclick="removeit(this)"/>
								  			</td>
								  			<td class="lefttd toptd"><input type="text" ></td>
								  			<td class="righttd toptd"><input type="text" ></td>
								  		</tr>
								  		<tr>
								  			<td class="imgtd">
								  				<img src="images/edit_add.png"  onclick="addTr()"/>
								  				<img src="images/edit_remove.png"   onclick="removeit(this)"/>
								  			</td>
								  			<td class="lefttd"><input type="text" ></td>
								  			<td class="righttd"><input type="text"></td>
								  		</tr>
								  		<tr>
								  			<td class="imgtd">
								  				<img src="images/edit_add.png"  onclick="addTr()"/>
								  				<img src="images/edit_remove.png"   onclick="removeit(this)"/>
								  			</td>
								  			<td class="lefttd"><input type="text" ></td>
								  			<td class="righttd"><input type="text"  ></td>
								  		</tr>
								  		 
								  	</table>
								  </div>
						    </div>
						</div>
					</td>
				</tr>
				
            </table>
        </form>
        </div>
        <!--  
        <div id="mobile" style="float: left;border-left: 1px solid #ddd;">
        	<iframe id="mobileiframe"  frameborder=0> </iframe>
        </div>
        -->
    </div>
     <div class='edit-form-btn dialog-btn' style="z-index: 1200">
		<a id='cancelBtn' class="easyui-linkbutton oper"  data-options="iconCls:'icon-form-undo'" onclick='cancel()'>取消</a>
		<a id='deleteBtn' class="easyui-linkbutton oper"  data-options="iconCls:'icon-form-dustbin'" onclick='deleteGoods()'>删除</a>
		<a id='addBtn' class="easyui-linkbutton oper" style='margin-left:10px;margin-right:10px;' data-options="iconCls:'icon-form-ok'" onclick='saveGoods()'>保存</a>
   	</div>
   </div>
   	<!-- 实例化编辑器 -->
	<script type="text/javascript">
	    //获得编辑框内容
	    function getContent() {
	        var arr = [];
	        arr.push(UM.getEditor("editorinfo").getContent());
	        $("#goodsinfo").val(arr.join(""));
	    }
	    //设置编辑框内容
	    function setContent(appendinfo) {
	        UM.getEditor('editorinfo').setContent(appendinfo, false);
	    }
	</script>
</body>
</html>
