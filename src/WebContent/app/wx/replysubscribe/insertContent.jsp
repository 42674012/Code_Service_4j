<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<form id="insertForm" name="insertForm" method="post">
  <input id="id" name="id" type="hidden" value="1" />
  <div class="easyui-tabs" style="width: auto; height: auto">
    <div title="【默认设置】" style="padding: 10px">
      <%@ include file="insertReplysubscribe.jsp"%>
    </div>
  </div>
  <table width="98%" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td colspan="2" align="center" height="35"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="onSubmitInsertAjax();">保存</a>
        </td>
      
      </tr>
    </tbody>
  </table>
</form>
