/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.20
 * Generated at: 2015-11-13 01:39:39 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.app.index;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.xt.ssb.util.Constants;

public final class main_005fdoc_005fass_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(1);
    _jspx_dependants.put("/app/index/../includeScript.jsp", Long.valueOf(1446121151261L));
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

      out.write("\r\n");
      out.write("\r\n");

	String context = request.getContextPath();
	String employeeName = request.getSession()
			.getAttribute(Constants.session_employee_name).toString();

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html lang=\"en\">\r\n");
      out.write("<head>\r\n");
      out.write("<meta charset=\"utf-8\">\r\n");
      out.write("<title>首页</title>\r\n");
      out.write("<meta name=\"keywords\" content=\"index\">\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("var context = '");
      out.print(context);
      out.write("';\r\n");
      out.write("</script>\r\n");
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
      out.print(context);
      out.write("/js/highcharts/highcharts.js'></script>\r\n");
      out.write("\t<script src='");
      out.print(context);
      out.write("/app/index/js/main_doc_ass.js'></script>\r\n");
      out.write("\t<script src='");
      out.print(context);
      out.write("/js/controls/jquery.circliful.min.js'></script>\r\n");
      out.write("\t<link href=\"");
      out.print(context);
      out.write("/app/index/css/main_doc_ass.css\" rel=\"stylesheet\"\r\n");
      out.write("\t\ttype=\"text/css\" />\r\n");
      out.write("\t<!-- <div class=\"easyui-layout\" data-options=\"fit:true\">\r\n");
      out.write("\t\t<div data-options=\"region:'north',border:true,fit:true\">\r\n");
      out.write("\t\t\t<div id=\"all_targetDiv\">\r\n");
      out.write("\t\t\t\t<div id=\"mySlider\" style=\"margin-top: 10px\"></div>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div data-options=\"region:'center',border:true,fit:true\"></div>\r\n");
      out.write("\t\t<div data-options=\"region:'east',border:true,fit:true\"></div>\r\n");
      out.write("\t\t<div data-options=\"region:'sourth',border:true,fit:true\"></div>\r\n");
      out.write("\t\r\n");
      out.write("\t</div> -->\r\n");
      out.write("\t<div class=\"t top\">\r\n");
      out.write("\t\t<table style=\"width: 100%\">\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td width=\"40%\">\r\n");
      out.write("\t\t\t\t\t<!--  td width=\"400\" --> <!-- div id=\"all_targetDiv\" -->\r\n");
      out.write("\t\t\t\t\t<div id=\"mySlider\" style=\"margin-top: 20px\"></div> <!--/div -->\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t<!-- <td width=\"200\">\r\n");
      out.write("\t\t\t\t\t<div id=\"my_targetDiv\">\r\n");
      out.write("\t\t\t\t\t\t<span> 我的挂号: </span> <span>我的接诊: </span> <span> 我的复诊: </span> <span>\r\n");
      out.write("\t\t\t\t\t\t\t我的业绩: </span> <span> 我的单体开发: </span>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td> -->\r\n");
      out.write("\t\t\t\t<td align='left'>\r\n");
      out.write("\t\t\t\t\t<div id=\"rangeDiv\">\r\n");
      out.write("\t\t\t\t\t\t<div class=\"c\" id=\"receptionRate\" data-dimension=\"150\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-text=\"接诊率  0%\" data-info=\"接诊率\" data-width=\"10\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-fontsize=\"14\" data-percent=\"0\" data-fgcolor=\"#61a9dc\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-bgcolor=\"#eee\" data-fill=\"#ddd\"></div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t\t<div class=\"c\" id=\"reReception\" data-dimension=\"150\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-text=\"复诊率  0% \" data-info=\"复诊率\" data-width=\"10\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-fontsize=\"14\" data-percent=\"0\" data-fgcolor=\"#61a9dc\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-bgcolor=\"#eee\" data-fill=\"#ddd\"></div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t\t<div class=\"c\" id=\"notDiagnosis\" data-dimension=\"150\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-text=\"断诊率  0% \" data-info=\"断诊率\" data-width=\"10\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-fontsize=\"14\" data-percent=\"0\" data-fgcolor=\"#61a9dc\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-bgcolor=\"#eee\" data-fill=\"#ddd\"></div>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t</table>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<div class=\"t center\">\r\n");
      out.write("\t\t<table id=\"top_tb\" style='width: 100%;'>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style='width: 25%' align=\"right\">\r\n");
      out.write("\t\t\t\t\t<div id=\"adviceDiv\" class=\"tiltediv\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"background-color: #F4A460; width: 200px\">\r\n");
      out.write("\t\t\t\t\t\t<font size=\"+1\">咨询预约</font>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t<td style='width: 25%' align=\"right\">\r\n");
      out.write("\t\t\t\t\t<div id=\"appointmentDiv\" class=\"tiltediv\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"background-color: #20B2AA; width: 200px\">\r\n");
      out.write("\t\t\t\t\t\t<font size=\"+1\">预约查询</font>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t<td style='width: 25%' align=\"right\">\r\n");
      out.write("\t\t\t\t\t<div id=\"checkhomeDiv\" class=\"tiltediv\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"background-color: #483D8B; width: 200px\">\r\n");
      out.write("\t\t\t\t\t\t<font size=\"+1\">到院登记</font>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t<td style='width: 25%' align=\"right\">\r\n");
      out.write("\t\t\t\t\t<div id=\"complaintDiv\" class=\"tiltediv\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"background-color: #008B8B; width: 200px\">\r\n");
      out.write("\t\t\t\t\t\t<font size=\"+1\">患者投诉</font>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t</table>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<div class=\"t bottom\">\r\n");
      out.write("\t\t<table>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td>\r\n");
      out.write("\t\t\t\t\t<div id=\"tt\" class=\"\" data-options=\"border:false\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"margin-top: 20px;\">\r\n");
      out.write("\t\t\t\t\t\t<div title=\"今日待回访\" data-options=\"selected:true,tabWidth:100\"\r\n");
      out.write("\t\t\t\t\t\t\tstyle=\"padding-bottom: 20px\">\r\n");
      out.write("\t\t\t\t\t\t\t<table id='callbackGrid'></table>\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t<div title=\"今日预计到诊\" data-options=\"selected:false,tabWidth:100\"\r\n");
      out.write("\t\t\t\t\t\t\tstyle=\"padding-bottom: 20px\">\r\n");
      out.write("\t\t\t\t\t\t\t<table id='willcomeGrid'></table>\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t<div title=\"新增咨询\" data-options=\"selected:false,tabWidth:100\"\r\n");
      out.write("\t\t\t\t\t\t\tstyle=\"padding-bottom: 20px\">\r\n");
      out.write("\t\t\t\t\t\t\t<table id='adviceGrid'></table>\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t<div title=\"新增患者\" data-options=\"selected:false,tabWidth:100\"\r\n");
      out.write("\t\t\t\t\t\t\tstyle=\"padding-bottom: 20px\">\r\n");
      out.write("\t\t\t\t\t\t\t<table id='customerGrid'></table>\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t<div title=\"新增投诉\" data-options=\"selected:false,tabWidth:100\"\r\n");
      out.write("\t\t\t\t\t\t\tstyle=\"padding-bottom: 20px\">\r\n");
      out.write("\t\t\t\t\t\t\t<table id='customerComplaintGrid'></table>\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t\t<td width=\"200\" align=\"center\">\r\n");
      out.write("\t\t\t\t\t<div id=\"todayCount\">\r\n");
      out.write("\t\t\t\t\t\t<div class=\"easyui-panel\" id=\"tCount\" title=\"今日汇总\"\r\n");
      out.write("\t\t\t\t\t\t\tstyle=\"width: 260px; margin: 0px auto 0px auto; height: 200px;\">\r\n");
      out.write("\t\t\t\t\t\t\t<table style=\"width: 100%\">\r\n");
      out.write("\t\t\t\t\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td width=\"40%\">今日挂号:</td>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td width=\"60%\"><label id=\"today_g\"></label></td>\r\n");
      out.write("\t\t\t\t\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td>今日接诊:</td>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td><label id=\"today_j\"></label></td>\r\n");
      out.write("\t\t\t\t\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td>今日初诊:</td>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td><label id=\"today_c\"></label></td>\r\n");
      out.write("\t\t\t\t\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td>今日复诊:</td>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<td><label id=\"today_f\"></label></td>\r\n");
      out.write("\t\t\t\t\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t\t\t\t</table>\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t</table>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\t</div>\r\n");
      out.write("\r\n");
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