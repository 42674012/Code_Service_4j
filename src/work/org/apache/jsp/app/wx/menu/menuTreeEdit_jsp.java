/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.20
 * Generated at: 2016-01-15 10:13:51 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.app.wx.menu;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.HashMap;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.xt.privilege.empower.bussiness.EmpowerDS;
import com.xt.ssb.util.Constants;

public final class menuTreeEdit_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(1);
    _jspx_dependants.put("/app/wx/menu/../../includeScript.jsp", Long.valueOf(1448597232733L));
  }

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write('\r');
      out.write('\n');

	String context = request.getContextPath();

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html lang=\"en\">\r\n");
      out.write("<head>\r\n");
      out.write("<meta charset=\"utf-8\">\r\n");
      out.write("\r\n");
      out.write("<title></title>\r\n");
      out.write("<meta name=\"keywords\" content=\"index\">\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
 
	//Long employeeIde = Long.parseLong(request.getSession().getAttribute(Constants.session_employee_id)+"");
	String operationSet = request.getAttribute("operations")==null?"-1":request.getAttribute("operations").toString();
	
	//String uri = //获取当前页的url
			//截取app 后面的 发到后台 获取操作资源的 identityName   print

      out.write("\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("\n");
      out.write("</head>\n");
      out.write("<body>\n");
      out.write("\t\n");
      out.write("\t<script type='text/javascript'>\n");
      out.write("\t\tvar context= \"");
      out.print(context);
      out.write("\";\n");
      out.write("\t\tvar operationSet = \"");
      out.print(operationSet);
      out.write("\";\n");
      out.write("\t\t\n");
      out.write("\t</script>\n");
      out.write("\t<link rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("\t\thref=\"");
      out.print(context);
      out.write("/js/easyui/themes/metro/easyui.css\">\n");
      out.write("\t<link rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("\t\thref=\"");
      out.print(context);
      out.write("/js/easyui/themes/icon.css\">\n");
      out.write("\t\t\t\t<link rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("\t\thref=\"");
      out.print(context);
      out.write("/js/scroll/jquery.mCustomScrollbar.min.css\">\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("\t\thref=\"");
      out.print(context);
      out.write("/css/style.css\">\n");
      out.write("\t\t\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("\t\thref=\"");
      out.print(context);
      out.write("/js/jquery-autocomplete/jquery.autocomplete.css\">\n");
      out.write("\t\t<link rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("\t\thref=\"");
      out.print(context);
      out.write("/js/controls/controls.css\">\n");
      out.write("\n");
      out.write("\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/easyui/jquery.min.js\"></script>\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/form.js\"></script>\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/easyui/jquery.easyui.min.js\"></script>\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/easyui/easyui-lang-zh_CN.js\"></script> \n");
      out.write("\t\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/controls/controls.js\"></script>\n");
      out.write("\t\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/scroll/jquery.mCustomScrollbar.concat.min.js\"></script>\n");
      out.write("\t\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/core/core.js\"></script>\n");
      out.write("\t\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/jquery-autocomplete/browser.js\"></script>\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/jquery-autocomplete/lib/jquery.ajaxQueue.js\"></script>\n");
      out.write("\t<script src=\"");
      out.print(context);
      out.write("/js/jquery-autocomplete/jquery.autocomplete.min.js\"></script>\n");
      out.write("\t\n");
      out.write("\t\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!-- \n");
      out.write("\t<link href='");
      out.print(context);
      out.write("/js/fullcalendar/fullcalendar.min.css' rel='stylesheet' />\n");
      out.write("\t<link href='");
      out.print(context);
      out.write("/js/fullcalendar/fullcalendar.print.css' rel='stylesheet' media='print' />\n");
      out.write("\t<script src='");
      out.print(context);
      out.write("/js/fullcalendar/lib/moment.min.js'></script>\n");
      out.write("\t<script src='");
      out.print(context);
      out.write("/js/fullcalendar/fullcalendar.js'></script>\n");
      out.write("\t<script src='");
      out.print(context);
      out.write("/js/fullcalendar/lang-all.js'></script>\n");
      out.write("\t\n");
      out.write("\t<link href='");
      out.print(context);
      out.write("/js/jquery-ui-auto/jquery-ui.theme.min.css' rel='stylesheet' />\n");
      out.write("\t<script src='");
      out.print(context);
      out.write("/js/jquery-ui-auto/jquery-ui.min.js'></script>\n");
      out.write("\t\n");
      out.write("\t -->\n");
      out.write("</body>\n");
      out.write("</html>\n");
      out.write("\r\n");
      out.write("\t<script src='");
      out.print(context );
      out.write("/js/easyui/plugin/treegrid-dnd.js'></script>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.print(context );
      out.write("/css/wxmenu.css\">\r\n");
      out.write("\r\n");
      out.write("<!-- Bootstrap -->\r\n");
      out.write("<link rel=\"stylesheet\" href=\"");
      out.print(context);
      out.write("/js/bootstrap/css/bootstrap.min.css\">\r\n");
      out.write("<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->\r\n");
      out.write("\r\n");
      out.write("<!-- Include all compiled plugins (below), or include individual files as needed -->\r\n");
      out.write("<script src=\"");
      out.print(context);
      out.write("/js/bootstrap/bootstrap.min.js\"></script>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!-- 自定义修改css -->\r\n");
      out.write("<link rel=\"stylesheet\" href=\"");
      out.print(context);
      out.write("/js/bootstrap/css/layoutit.css\">\r\n");
      out.write("\r\n");
      out.write("</head>\r\n");
      out.write("\r\n");
      out.write("<body>\r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\t<script src='js/menuTreeEdit.js'></script>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\t\r\n");
      out.write("\r\n");
      out.write("\t<div id=\"cc\" class=\"easyui-layout\" data-options=\"fit:true\">\r\n");
      out.write("\t   \r\n");
      out.write("\t\t<div id='west' data-options=\"region:'west',border:false\"\r\n");
      out.write("\t\t\tstyle=\"width: 400px; padding: 5px;\">\r\n");
      out.write("\t\t\t<ul id=\"menuTree\">\r\n");
      out.write("\t\t\t</ul>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div data-options=\"region:'center',border:false\" style=\"padding: 5px;\">\r\n");
      out.write("\t\t\t<div id='menuFormPanel' class='easyui-panel' title=\"菜单信息\"\r\n");
      out.write("\t\t\t\tstyle=\"width: 100%; height: 500px; font-size: 13px;\"\r\n");
      out.write("\t\t\t\tdata-options=\"iconCls:'icon-form-edit'\">\r\n");
      out.write("\t\t\t\t\r\n");
      out.write("\t\t\t\t\r\n");
      out.write("\t\t\t\t<form id=\"menuForm\" class='form-horizontal edit-form' method=\"post\"  role=\"form\">\r\n");
      out.write("\t\t\t\t\t<input type='hidden' value='0' id='orderIndex' name='orderIndex'>\r\n");
      out.write("\t\t\t\t\t<input type='hidden' id='parentId' name='parentId'> \r\n");
      out.write("\t\t\t\t\t<input type='hidden' id='menuId' name='menuId'>\r\n");
      out.write("\t\t\t\t\t\r\n");
      out.write("\t\t\t<div class=\"form-group\">\r\n");
      out.write("     \t         <label for=\"accountType\" class=\"col-sm-2 control-label\">菜单名称:</label> \r\n");
      out.write("     \t        <div class=\"col-sm-6\">\r\n");
      out.write("                    <input type=\"text\" class=\"form-control\" name=\"name\" id=\"name\" placeholder=\"菜单名称\">\r\n");
      out.write("                   <p class=\"help-block\">字数不超过8个汉字或16个字母</p>\r\n");
      out.write("                  </div>\r\n");
      out.write("             </div>\r\n");
      out.write("\t\t\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t<div class=\"form-group\">\r\n");
      out.write("     \t         <label for=\"accountType\" class=\"col-sm-2 control-label\">菜单内容:</label> \r\n");
      out.write("     \t            <div class=\"col-sm-6\">\r\n");
      out.write("               \r\n");
      out.write("                   <label  class=\"radio-inline\">\r\n");
      out.write("                           <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios1\"  value=\"option1\" checked>发送消息 </label>\r\n");
      out.write("                           <label  class=\"radio-inline\">\r\n");
      out.write("                          <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios2\"  value=\"option2\">跳转网页</label>\r\n");
      out.write("                    </div>\r\n");
      out.write("             </div>\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\t\t<div class=\"form-group\">\r\n");
      out.write("\t\t     \t      <div class=\"col-sm-12\">\r\n");
      out.write("\t\t               <div  id=\"urltr\" style=\"height: 200px\">\r\n");
      out.write("\t\t               \t\t\t<span class=\"help-block\">订阅者点击该子菜单会跳到以下链接</span>\r\n");
      out.write("\t\t\t\t\t\t       <div class=\"form-group\" >\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<label for=\"accountToken\" class=\"col-sm-2 control-label\">页面地址:</label> \r\n");
      out.write("\t\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id='url'  name=\"url\" >\r\n");
      out.write("\t\t\t\t\t\t\t\t    </div>\r\n");
      out.write("\t\t\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t               </div>\r\n");
      out.write("\t\t\t\t       <div id=\"xxtr\" style=\"height: 200px\">\r\n");
      out.write("\t\t\t\t\t\t        <ul id=\"myTab\" class=\"nav nav-tabs\">\r\n");
      out.write("\t\t\t\t\t\t         <li class=\"active\"><a href=\"#home\" data-toggle=\"tab\"> 图文消息</a></li>\r\n");
      out.write("\t\t\t\t\t\t         <li><a href=\"#ios\" data-toggle=\"tab\">文字</a></li>\r\n");
      out.write("\t\t\t\t\t\t         <li><a href=\"#ios\" data-toggle=\"tab\">图片</a></li>\r\n");
      out.write("\t\t\t\t\t\t         <li><a href=\"#ios\" data-toggle=\"tab\">卡券</a></li>\r\n");
      out.write("\t\t\t\t\t\t         <li><a href=\"#ios\" data-toggle=\"tab\">语音</a></li>\r\n");
      out.write("\t\t\t\t\t\t         <li><a href=\"#ios\" data-toggle=\"tab\">视频</a></li>\r\n");
      out.write("\t\t\t\t\t\t       </ul>\r\n");
      out.write("\t\t\t\t       </div>    \r\n");
      out.write("\t\t              </div>\r\n");
      out.write("\t\t             </div>\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t<div class=\"form-group\">\r\n");
      out.write("      <div class=\"col-sm-offset-2 col-sm-10\">\r\n");
      out.write("        \r\n");
      out.write("        <a id='deleteBtn' type=\"button\" class=\"btn btn_primary save_submit\" onclick='deleteMenu()'>删除</a> <a id='addBtn' class=\"btn btn-primary save_submit\"\" onclick='saveMenu()'>保存</a>\r\n");
      out.write("      </div>\r\n");
      out.write("   </div>\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\t\t\r\n");
      out.write("\t\t\t\t\t\r\n");
      out.write("\t\t\t\t</form>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\t<script>\r\n");
      out.write("   $(function() { \r\n");
      out.write("      $(\"#optionsRadios1\").click(function(){\r\n");
      out.write("    \t  $(\"#urltr\").hide();\r\n");
      out.write("    \t  $(\"#xxtr\").show(); \r\n");
      out.write("      });\r\n");
      out.write("      $(\"#optionsRadios2\").click(function(){\r\n");
      out.write("    \t  $(\"#urltr\").show(); \r\n");
      out.write("          $(\"#xxtr\").hide();\r\n");
      out.write("       });\r\n");
      out.write("      $(\"#xxtr\").show(); \r\n");
      out.write("      $(\"#urltr\").hide();\r\n");
      out.write("   });  \r\n");
      out.write("</script>\t\r\n");
      out.write("\t\r\n");
      out.write("\r\n");
      out.write("</body>\r\n");
      out.write("</html>\r\n");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
