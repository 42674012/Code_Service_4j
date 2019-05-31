package com.xt.ssb.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.xt.oms.employee.bussiness.EmployeeDS;
import com.xt.oms.employee.model.Employee;
import com.xt.oms.org.model.Org;
import com.xt.ssb.cache.EmployeeDCache;
import com.xt.ssb.util.Constants;
import com.xt.ssb.util.json.McfJson;

public class LoginServiceServlet extends HttpServlet {
	/**
	 * 
	 */
	Log log = LogFactory.getLog(this.getClass());

	private static final long serialVersionUID = 1000001L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String lock = request.getParameter("lock");
		String password = request.getParameter("pwd");
		if (StringUtils.isEmpty(username) && StringUtils.isEmpty(password)) {
			response.sendRedirect(request.getContextPath()
					+ "/login.jsp?validatefaild=1");
			return;
		}
		HashMap<String, Object> result = null;
		// 数据库认证
		ApplicationContext ac1 = WebApplicationContextUtils
				.getRequiredWebApplicationContext(request.getSession()
						.getServletContext());
		EmployeeDS employeeDS = (EmployeeDS) ac1.getBean("employeeDS");
		result = employeeDS.getEmployeeLogin(username, password);

		if (result != null && result.get(Constants.varify_result) != null
				&& result.get(Constants.varify_result).equals("00")
				&&result.get(Constants.varify_OrgId_Attr)!=null) {
			
			// 认证成功
			// 如果有多个医院关联，到医院选择界面
			List<Org> orglist=(List<Org>) result.get(Constants.varify_OrgId_Attr);
			initSession(request, response,
					(Employee) result.get(Constants.d_varify_e), orglist);
			try {
				if (lock == null) {
					response.sendRedirect(request.getContextPath()
							+ "/app/index/index.jsp");
				} else {
					response.sendRedirect(request.getContextPath()
							+ "/app/index/lock.jsp?close=1");
				}

			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			return;

		} else {
			// 认证失败
			response.sendRedirect(request.getContextPath()
					+ "/login.jsp?validatefaild=1");
		}

	}

	public static void initSession(HttpServletRequest request,
			HttpServletResponse response, Employee e, List<Org> orgId) {
		// 多个组织，到组织选择界面
		request.getSession().setAttribute(Constants.session_employee_id,
				e.getEmployeeId());
		request.getSession().setAttribute(Constants.session_employee_name,
				e.getName());
		request.getSession().setAttribute(Constants.session_employee_phone,
				e.getPhone());
		request.getSession().setAttribute(Constants.session_org_id, orgId);
//		request.getSession().setAttribute(Constants.session_dept_id,
//				e.getDeptId());

	}

	public void setSSO(HttpServletRequest request, String employeeId) {
		String ip = getRemoteHost(request);
		EmployeeDCache.setEmployeeSSOInfo(employeeId, ip);
	}

	private LinkedHashMap getPostParamters(HttpServletRequest request)
			throws IOException {
		LinkedHashMap postParamterMap = McfJson
				.jsonStr2LinkedMap(getPostJsonStr(request));

		return postParamterMap;
	}

	private String getPostJsonStr(HttpServletRequest request)
			throws IOException {
		BufferedReader sis = request.getReader();
		char[] buf = new char[1024];
		int len = 0;
		StringBuffer sb = new StringBuffer();
		while ((len = sis.read(buf)) != -1) {
			sb.append(buf, 0, len);
		}
		return sb.toString();
	}

	public String getRemoteHost(javax.servlet.http.HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
	}
}
