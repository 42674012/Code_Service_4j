/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.20
 * Generated at: 2015-10-13 08:18:11 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.app.ejanton.customercomplaint;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class CustomerComplaintEdit_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(1);
    _jspx_dependants.put("/app/ejanton/customercomplaint/../../includeScript.jsp", Long.valueOf(1444619467078L));
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

      out.write(" \r\n");
      out.write(" \r\n");
      out.write("  \r\n");

	String context = request.getContextPath();

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html lang=\"en\">\r\n");
      out.write("<head>\r\n");
      out.write("<meta charset=\"utf-8\">\r\n");
      out.write("<title></title>\r\n");
      out.write("<meta name=\"keywords\" content=\"index\">\r\n");
      out.write("</head>\r\n");
      out.write("\r\n");
      out.write("<body>\r\n");
      out.write("\t");
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
      out.write("/css/address.css\">\n");
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
      out.write("\r\n");
      out.write("\t<script src='js/CustomerComplaintEdit.js'></script>\r\n");
      out.write("\r\n");
      out.write("<div class=\"easyui-layout\" data-options=\"fit:true\">\r\n");
      out.write("\r\n");
      out.write("\t\t<div id='center'\r\n");
      out.write("\t\t\tdata-options=\"region:'center',border:false\">\r\n");
      out.write("\r\n");
      out.write("\t<form id=\"customerComplaintForm\" class='edit-form' method=\"post\">\r\n");
      out.write("\t\t<div id='customerComplaintFormPanel' class='easyui-panel'\r\n");
      out.write("\t\t\tdata-options='headerCls:\"formHeaderCls\",bodyCls:\"formBodyCls\"'\r\n");
      out.write("\t\t\ttitle=\"customerComplaint信息\" style=\"width: 100%; font-size: 13px;\">\r\n");
      out.write("\t\t\t<table cellspacing='10'>          \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>投诉者id</td>\r\n");
      out.write("\t\t\t\t\t<td>\r\n");
      out.write("\t\t\t\t\t\t<input class=\" easyui-numberbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='custormerId' data-ssbtype='int'\r\n");
      out.write("\t\t\t\t\t\tname=\"custormerId\" data-options=\"height:30,width:200\"></input>\r\n");
      out.write("\t\t\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t           \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>投诉者姓名-autocomplete</td>\r\n");
      out.write("\t\t\t\t\t<td><input class=\"easyui-textbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='customerName' data-ssbtype='text'\r\n");
      out.write("\t\t\t\t\t\tname=\"customerName\" data-options=\"height:30,width:200\"></input></td>\r\n");
      out.write("\t\t\t\t</tr>            \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>投诉对象</td>\r\n");
      out.write("\t\t\t\t\t<td><input class=\"easyui-textbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='complaintObject' data-ssbtype='text'\r\n");
      out.write("\t\t\t\t\t\tname=\"complaintObject\" data-options=\"height:30,width:200\"></input></td>\r\n");
      out.write("\t\t\t\t</tr>            \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>投诉内容</td>\r\n");
      out.write("\t\t\t\t\t<td><input class=\"easyui-textbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='complaintContent' data-ssbtype='text'\r\n");
      out.write("\t\t\t\t\t\tname=\"complaintContent\" data-options=\"height:30,width:200\"></input></td>\r\n");
      out.write("\t\t\t\t</tr>            \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>受理人-autocomplete</td>\r\n");
      out.write("\t\t\t\t\t<td><input class=\"easyui-textbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='complaintAccepter' data-ssbtype='text'\r\n");
      out.write("\t\t\t\t\t\tname=\"complaintAccepter\" data-options=\"height:30,width:200\"></input></td>\r\n");
      out.write("\t\t\t\t</tr>               \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>受理人id</td>\r\n");
      out.write("\t\t\t\t\t<td>\r\n");
      out.write("\t\t\t\t\t\t<input class=\" easyui-numberbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='complaintAccepterId' data-ssbtype='int'\r\n");
      out.write("\t\t\t\t\t\tname=\"complaintAccepterId\" data-options=\"height:30,width:200\"></input>\r\n");
      out.write("\t\t\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t            \r\n");
      out.write("\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>处理状态\r\n");
      out.write("\t\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t\t<td>\r\n");
      out.write("\t\t\t\t\t\t<input class=\" easyui-numberbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='processingStatus' data-ssbtype='int'\r\n");
      out.write("\t\t\t\t\t\tname=\"processingStatus\" data-options=\"height:30,width:200\"></input>\r\n");
      out.write("\t\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t</tr>\r\n");
      out.write("           \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>处理结果</td>\r\n");
      out.write("\t\t\t\t\t<td><input class=\"easyui-textbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='processingResult' data-ssbtype='text'\r\n");
      out.write("\t\t\t\t\t\tname=\"processingResult\" data-options=\"height:30,width:200\"></input></td>\r\n");
      out.write("\t\t\t\t</tr>              \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>投诉时间</td>\r\n");
      out.write("\t\t\t\t\t<td><input class=\"easyui-datebox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='complaintDate' data-ssbtype='date'\r\n");
      out.write("\t\t\t\t\t\tname=\"complaintDate\"\r\n");
      out.write("\t\t\t\t\t\tdata-options=\"formatter:tcCoreformatter,parser:tcCoreParser,height:30\"></input></td>\r\n");
      out.write("\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t                                                              \t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>投诉者电话</td>\r\n");
      out.write("\t\t\t\t\t<td><input class=\"easyui-textbox\" type=\"text\"\r\n");
      out.write("\t\t\t\t\t\tid='customerPhone' data-ssbtype='text'\r\n");
      out.write("\t\t\t\t\t\tname=\"customerPhone\" data-options=\"height:30,width:200\"></input></td>\r\n");
      out.write("\t\t\t\t</tr>             \r\n");
      out.write("\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'>投诉类型-combobox\r\n");
      out.write("\t\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t\t<td>\r\n");
      out.write("\t\t\t\t\t\t\t\t<input id='complaintType'\r\n");
      out.write("\t\t\t\t\t\t\t\tclass=\"easyui-combobox\"\r\n");
      out.write("\t\t\t\t\t\t\t\tname=\"complaintType\"\r\n");
      out.write("\t\t\t\t\t\t\t\tdata-ssbtype='combobox'\r\n");
      out.write("\t\t\t\t\t\t\t\tdata-options=\"height:30,width:200,valueField:'dictValue',textField:'dictName',panelHeight:100\">\r\n");
      out.write("\t\t\t\t\t\t\t\r\n");
      out.write("\t\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t</tr>\r\n");
      out.write("    \r\n");
      out.write("\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t<td align='right' class='td-label'></td>\r\n");
      out.write("\t\t\t\t\t<td></td>\r\n");
      out.write("\t\t\t\t</tr>\r\n");
      out.write("\t\t\t</table>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</form>\r\n");
      out.write("</div>\r\n");
      out.write("\r\n");
      out.write("\t\t<div data-options=\"region:'south',split:true,border:false\" style=\"height:40px;\">\r\n");
      out.write("\t\t\t<div class='edit-form-btn' style='float: right;margin-right:5px;'>\r\n");
      out.write("\t\t<a id='cancelBtn' class=\"easyui-linkbutton oper\"\r\n");
      out.write("\t\t\tdata-options=\"iconCls:'icon-form-undo'\" onclick='cancel()'>取消</a> <a\r\n");
      out.write("\t\t\tid='deleteBtn' class=\"easyui-linkbutton oper\"\r\n");
      out.write("\t\t\tdata-options=\"iconCls:'icon-form-dustbin'\"\r\n");
      out.write("\t\t\tonclick='deleteCustomerComplaint()'>删除</a> <a id='addBtn'\r\n");
      out.write("\t\t\tclass=\"easyui-linkbutton oper\"\r\n");
      out.write("\t\t\tstyle='margin-left: 10px; margin-right: 10px;'\r\n");
      out.write("\t\t\tdata-options=\"iconCls:'icon-form-ok'\" onclick='saveCustomerComplaint()'>保存</a>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("</div>\r\n");
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
