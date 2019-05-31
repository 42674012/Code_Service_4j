<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <table class="insertTable insertConfigTable" width="98%" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td colspan="2" class="insertTableTitle"><strong>【关注时自动回复内容】</strong></td>
    </tr>
    <tr>
      <td width="30%" class="insertTableTdNoBg">默认关注回复：</td>
      <td width="70%"><br>
      <textarea  name="replysetContent" cols="70" rows="10" id="replysetContent" >${weiXinReplySetEntity.replysetContent}</textarea><br>*必填, 用户添加您的时候自动回复语  <br><br>
      </td>
    </tr>
   
  
  </tbody>
</table>