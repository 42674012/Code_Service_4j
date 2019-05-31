package com.xt.ssb.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.xt.oms.employee.bussiness.EmployeeDS;
import com.xt.privilege.empower.bussiness.EmpowerDS;
import com.xt.privilege.empower.model.Empower;
import com.xt.privilege.group.bussiness.GroupDS;
import com.xt.ssb.cache.EnQuickCache;
import com.xt.ssb.util.Constants;

/***
 * 权限过滤器
 * 
 * @author TT
 * 
 */
/**
 * Servlet Filter implementation class SessiontimeoutFilter
 */
// @WebFilter(filterName = "/PrivilegeFilter", urlPatterns = "*.jsp")
public class PrivilegeFilter implements Filter {

	private final static String urlPatternsNeedCheck = ".ssm|.html|.jsp|/$";

	private final static Pattern pattern = Pattern
			.compile(urlPatternsNeedCheck);

	private final static boolean need = false;

	/*
	 * @Resource EmployeeDS employeeDS;
	 */

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		String uri = "";
		String url = req.getRequestURL().toString();

		Matcher matcher = pattern.matcher(url);
		if (need) {
			if (!url.contains("login") && !url.contains("lock")
					&& matcher.find() && !url.contains("messager")) {
				// 判断是否有权限
				ApplicationContext ac1 = WebApplicationContextUtils
						.getRequiredWebApplicationContext(req.getSession()
								.getServletContext());
				EmpowerDS empowerDS = (EmpowerDS) ac1.getBean("empowerDS");
				if (url.indexOf("app/") < 0) {
					chain.doFilter(request, response);
					return;
				}
				uri = url.substring(url.indexOf("app/"));
				/*
				 * String paramUri = req.getQueryString(); if(paramUri != null
				 * && !StringUtils.isEmpty(paramUri)){ uri += "?"+ paramUri; }
				 */
				/*HashMap<String, Object> params = new HashMap<String, Object>();
				params.put("url", uri);*/
				String operationSet = empowerDS.getOperationSetS(uri);
				req.setAttribute("operations", operationSet);

				Long employeeId = Long.parseLong(req.getSession().getAttribute(
						Constants.session_employee_id)
						+ "");
				if (employeeId != null) {

					Empower empower = new Empower();

					// uri = url.substring(url.indexOf("app/"));
					HashMap<String, Long> map = (HashMap<String, Long>) EnQuickCache
							.getInstance().getValue(
									Constants.encache_dcache_functionMap);
					if (map.get(uri) != null) {
						empower.setUri(uri);
						empower.setIdentifyName("visited");
						int i = empowerDS.getEmployeeSet(employeeId, empower);
						if (i == 0) {
							// res.sendRedirect("http://baidu.com");
							res.sendRedirect(req.getContextPath()
									+ "/app/index/messager.jsp");
							return;
						}
					}
					/*
					 * if(map.get(uri) == null){ empower.setUri(uri);
					 * empower.setIdentifyName("visited"); //int i =
					 * employeeDS.getEmployeeSet(employeeId, empower); //int i
					 * =0; if(map.get(uri) != 1){
					 * //res.sendRedirect("http://baidu.com");
					 * res.sendRedirect(req.getContextPath() +
					 * "/app/index/messager.jsp"); return; } }
					 */
					/*
					 * else{ Runtime.getRuntime().exec(url); }
					 */
				}/*
				 * else{ chain.doFilter(request, response); }
				 */
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
