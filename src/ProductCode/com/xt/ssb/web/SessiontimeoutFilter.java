package com.xt.ssb.web;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.xt.oms.employee.bussiness.EmployeeDS;
import com.xt.oms.employee.model.Employee;
import com.xt.oms.org.bussiness.OrgDS;
import com.xt.oms.org.model.Org;
import com.xt.ssb.cache.AppNodeDCache;
import com.xt.ssb.cache.DCache;
import com.xt.ssb.cache.EmployeeDCache;
import com.xt.ssb.cache.EnQuickCache;
import com.xt.ssb.util.Constants;
import com.xt.ssb.util.json.McfJson;
import com.xt.ssb.util.net.LoadUrl;
import com.xt.ssb.util.security.CryptoCenter;
import com.xt.ssb.web.jsonentity.JsonEntity;
import com.xt.ssb.web.utils.DataSourceContextHolder;
import com.xt.ssb.web.utils.DataSoureMap;
import com.xt.ssb.web.utils.DynamicDataSource;

/**
 * Servlet Filter implementation class SessiontimeoutFilter
 */
// @WebFilter(filterName = "/SessiontimeoutFilter", urlPatterns = "*.ssm")
public class SessiontimeoutFilter implements Filter {

	private static Log logger = LogFactory.getLog(SessiontimeoutFilter.class);

	public static boolean debugger = false;

	private final static String urlPatternsNeedCheck = ".ssm|.html|.jsp|/$";

	private final static Pattern pattern = Pattern
			.compile(urlPatternsNeedCheck);

	/**
	 * Default constructor.
	 */
	public SessiontimeoutFilter() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;

		String url = req.getRequestURL().toString();
		Matcher matcher = pattern.matcher(url);
		if (url.contains("login") || url.contains("logout")
				|| url.contains("GoodsView.jsp") || url.contains(".mp")
				|| url.contains("getGoodsByPk.ssm")
				|| url.contains("Facade.ssm")
				|| url.contains("BespeakEdit.jsp")
				|| url.contains("saveBypagBespeak.ssm")
				|| url.contains("saveBespeakZf.ssm")
				|| url.contains("wxpay.jsp")
				|| url.contains("notifyServlet")
				|| url.contains("wxNativePay.ssm")
				|| url.contains("coreservlet")
				|| url.contains("OrgView.jsp")
				|| url.contains("queryForappgoods.ssm")
				|| url.contains("getCampaignInfo.ssm")
				|| url.contains("CampaignShow.jsp")
				|| url.contains("loadMoreGoods.ssm")
				|| url.contains("loadMoreCampaign.ssm")
				) {
				
			chain.doFilter(request, response);
			return;
		}
		// if (true) {
		// chain.doFilter(request, response);
		// return;
		// }

		String token = req.getParameter("token");
		Object sessionToken = req.getSession().getAttribute(
				Constants.session_token);
		// 校验session是否合法
		if (req.getSession().getAttribute(Constants.session_employee_id) != null) {
			if (!(token != null && sessionToken != null && !sessionToken
					.equals(token))) {
				chain.doFilter(request, response);
				return;
			}
		}
		// 判断url中是否带有单点标示
		if (token == null) {
			// 从cookie中取单点信息
			Map<String, Cookie> cookieMap = ReadCookieMap(req);
			if (cookieMap.get("token") != null) {
				token = cookieMap.get("token").getValue();
			}
		}
		if (StringUtils.isNotEmpty(token)) {
			try {
				String tokendecrypt = CryptoCenter.decrypt(token);
				String[] arr = tokendecrypt.split("\\$");
				if (arr.length > 0) {
					String employeeId = arr[0];
					String dcacheIp = arr[2];
					String dcachePort = arr[3];
					if (validateSSO(req, employeeId, dcacheIp, dcachePort)) {
						// 验证通过
						// setDataSource(req, orgId);
						// initDataBase(orgId, req);

						ApplicationContext ac1 = WebApplicationContextUtils
								.getRequiredWebApplicationContext(req
										.getSession().getServletContext());
						EmployeeDS employeeDS = (EmployeeDS) ac1
								.getBean("employeeDS");
						// 进行userName二次校验,在数据库中查询employee信息
						Employee e = employeeDS.getEmployeeByPk(Long
								.parseLong(employeeId));
						
						/**
						 * 验证部门
						 */
						List<Org> orgdidList=new ArrayList<Org>();
						OrgDS orgds = (OrgDS) ac1 .getBean("OrgDS");
						
						HashMap<String, Object> parameterMap=new HashMap<String, Object>();
						if(e.getEmployeeId()!=null){
							parameterMap.put("managerUserId", e.getEmployeeId());
							orgdidList=orgds.queryForListPage(parameterMap);
						}
						if(e==null||orgdidList==null||orgdidList.size()==0){
							resp.sendRedirect(getLoginUrl(req.getContextPath()));
						}else{
							// 单点信息写入cookie
							Cookie cookie = new Cookie("token", token);
							cookie.setMaxAge(24 * 60 * 60);
							cookie.setPath("/");
							resp.addCookie(cookie);
							req.getSession().setAttribute(Constants.session_token,
									token);
							LoginServiceServlet.initSession(req, resp, e, orgdidList);
							// resp.sendRedirect(req.getContextPath()+"/app/index/inidex");
							chain.doFilter(request, response);
							return;
						}
					}
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if (req.getRequestURL().toString().contains(".ssm")) {
			JsonEntity error = new JsonEntity();
			error.set$mcfDispacherStatus(-100);
			error.setMsg(getLoginUrl(req.getContextPath()));
			response.getWriter().print(McfJson.object2JsonEntityStr(error));
			response.getWriter().flush();
			response.getWriter().close();
			return;
		} else {
			resp.sendRedirect(getLoginUrl(req.getContextPath()));
		}
		// pass the request along the filter chain
	}

	public String getLoginUrl(String context) {
		if (debugger) {
			return context + "/login.jsp";
		} else {
			return EnQuickCache.getInstance()
					.getValue(Constants.encache_bcc_url).toString()
					+ "/loginexb.jsp";

		}
	}

	public boolean validateSSO(HttpServletRequest request, String employeeId,
			String dip, String dport) {
		String ip = getRemoteHost(request);
		if (!dip.equals(DCache.ip) || Integer.parseInt(dport) != DCache.port) {
			DCache.setup(dip, Integer.parseInt(dport));
		}
		String ip1 = EmployeeDCache.getEmployeeSSOInfo(employeeId, dip, dport);
		if (StringUtils.isNotEmpty(ip1) && ip.equals(ip1)) {
			// 认证成功
			return true;
		}
		return false;
	}

	public static HashMap<String, Org> systemInfo = new HashMap<>();

	public void setDataSource(HttpServletRequest request, String orgId) {
		Object dsIdObj = request.getSession().getAttribute(
				Constants.session_dataSource_id);
		boolean flag = dsIdObj == null
				|| DataSoureMap.targetDataSources.get(dsIdObj.toString()) == null;
		if (flag) {
			synchronized (DataSoureMap.targetDataSources) {
				flag = dsIdObj == null
						|| DataSoureMap.targetDataSources.get(dsIdObj
								.toString()) == null;
				if (flag) {
					List<String> result = AppNodeDCache.getAppNodeValue(orgId,
							Constants.d_ds_user, Constants.d_ds_password,
							Constants.d_ds_url, Constants.d_ds_id);
					if (result == null || result.size() == 0) {
						logger.error("从缓存中获取的数据库信息为空,医院ID为" + orgId);
						return;
					}
					dsIdObj = result.get(3).trim();

					if (DataSoureMap.targetDataSources.get(dsIdObj.toString()) == null) {
						// 创建数据源
						logger.debug("--------------------------------------初始化数据源");
						ComboPooledDataSource dataSource = null;
						try {
							ApplicationContext ac1 = WebApplicationContextUtils
									.getRequiredWebApplicationContext(request
											.getSession().getServletContext());
							dataSource = (ComboPooledDataSource) ac1
									.getBean("dataSourceDynmic");
							dataSource.setUser(result.get(0).trim());
							dataSource.setPassword(CryptoCenter.decrypt(result
									.get(1).trim()));
							dataSource.setDriverClass("com.mysql.jdbc.Driver");
							// 由于jedis连着取3个字段会返回异常，所以分两次请求。
							dataSource.setJdbcUrl(result.get(2).trim());
							dataSource.setInitialPoolSize(10);
							dataSource.setMinPoolSize(10);
							dataSource.setMaxPoolSize(20);
							dataSource.setMaxStatements(50);
							dataSource.setMaxIdleTime(10);
							// ****这里后续应该换做数据源ID为key
							DataSoureMap.targetDataSources.put(dsIdObj,
									dataSource);
							DynamicDataSource dynamicDataSource = (DynamicDataSource) ac1
									.getBean("dynamicdatasource");
							dynamicDataSource
									.setTargetDataSources(DataSoureMap.targetDataSources);
							// 当前请求的数据源设置
							DataSourceContextHolder.setDataSourceType(dsIdObj
									.toString());
							request.getSession().setAttribute(
									Constants.session_dataSource_id, dsIdObj);
						} catch (BeansException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (PropertyVetoException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else {

					}
				}
			}
		}
	}

	/***
	 * 判断数据库是否初始化过，如果没有，进行数据库初始化
	 */
	@Transactional
	public boolean initDataBase(String orgId, HttpServletRequest request) {
		if (systemInfo.get(orgId) == null) {
			// 从数据库中读医院信息，进行初始化
			ApplicationContext ac1 = WebApplicationContextUtils
					.getRequiredWebApplicationContext(request.getSession()
							.getServletContext());
			OrgDS orgDS = (OrgDS) ac1.getBean("orgDS");
			EmployeeDS employeeDS = (EmployeeDS) ac1.getBean("employeeDS");
			Org org = orgDS.getOrgObjByPk(Long.valueOf(orgId));
			if (org == null) {
				// 如果数据库中没有组织节点，从服务器获取组织信息，组织的管理员信息，写入数据库
				org = getOrgInfo(orgId, orgDS, employeeDS);
			}
			if (org == null) {
				return false;
			}
			systemInfo.put(org.getOrgId() + "", org);
			return true;
		}
		return true;
	}

	public Org getOrgInfo(String orgId, OrgDS orgDS, EmployeeDS employeeDS) {
		String url = EnQuickCache.getInstance()
				.getValue(Constants.encache_bcc_url).toString()
				+ "/orgFacade/getHospitalFacade.ssm";
		LinkedHashMap<String, Object> emap = new LinkedHashMap<>();
		emap.put("orgId", orgId);
		try {
			String info = LoadUrl.loadUrl(url,
					McfJson.object2JsonEntityStr(emap));

			emap = McfJson.jsonStr2LinkedMap(info);
			Org org = new Org();
			org.setOrgId(Long.parseLong(orgId));
			org.setName(emap.get("org_name").toString());
			org.setType(Constants.org_type_hospital);
			Employee e = new Employee();
			e.setName(emap.get("name").toString());
			e.setEmployeeId(Long.parseLong(emap.get("employeeId").toString()));
			e.setPassword(emap.get("password") == null ? null : emap.get(
					"password").toString());
			e.setQQ(emap.get("qq") == null ? null : emap.get("qq").toString());
			e.setPhone(emap.get("phone").toString());
			e.setSex(emap.get("sex") == null ? null : Integer.parseInt(emap
					.get("sex").toString()));
			orgDS.saveOrg(org);
			employeeDS.saveEmployeeOnlyLocal(e, null, null, null);
			return org;
		} catch (IOException e) {
			logger.error("初始化医院数据库时发生错误" + e.getCause());
			return null;
		}

	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig config) throws ServletException {
		String model = config.getInitParameter("model");
		if (model == null || !model.equals("debug")) {
			debugger = false;
		} else {
			debugger = true;
		}
	}

	public String vadiateFromCookies(HttpServletRequest request) {
		Map<String, Cookie> cookiesMap = ReadCookieMap(request);
		// cookiesMap.get(Constants.cookie_employeeid).get;
		return null;
	}

	/**
	 * 将cookie封装到Map里面
	 * 
	 * @param request
	 * @return
	 */
	private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
		Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
		Cookie[] cookies = request.getCookies();
		if (null != cookies) {
			for (Cookie cookie : cookies) {
				cookieMap.put(cookie.getName(), cookie);
			}
		}
		return cookieMap;
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
