package com.xt.ssb.util.bean;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javassist.ClassClassPath;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.CtMethod;
import javassist.Modifier;
import javassist.NotFoundException;
import javassist.bytecode.CodeAttribute;
import javassist.bytecode.LocalVariableAttribute;
import javassist.bytecode.MethodInfo;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;
import org.springframework.context.ApplicationContext;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.xt.ssb.util.Constants;
import com.xt.ssb.web.SessiontimeoutFilter;
import com.xt.ssb.web.utils.DataSourceContextHolder;

public class ReflectAssists {

	private static Log loger = LogFactory.getLog(ReflectAssists.class);

	private static ObjectMapper mapper = null;

	static {
		mapper = new ObjectMapper();
		SimpleModule simpleModule = new SimpleModule("",
				Version.unknownVersion());
		simpleModule.addSerializer(Long.class,
				org.codehaus.jackson.map.ser.ToStringSerializer.instance);
		simpleModule.addSerializer(Long.TYPE,
				org.codehaus.jackson.map.ser.ToStringSerializer.instance);
		
		//mapper.getSerializationConfig().setDateFormat(new SimpleDateFormat("YYYY-MM-ddThh:mm:ss"));  
		mapper.registerModule(simpleModule);
	}

	static ClassPool pool = null;

	static Map<String, String[]> methodparamsMap = new HashMap<String, String[]>();
	static Map<String, Class[]> methodparamsTypeMap = new HashMap<String, Class[]>();
	static Map<String, Method> methodMap = new HashMap<String, Method>();
	static {
		pool = ClassPool.getDefault();
		ClassClassPath classPath = new ClassClassPath(ReflectAssists.class);
		pool.insertClassPath(classPath);

	}

	/***
	 * 获取方法参数名称
	 * 
	 * @param c
	 *            类
	 * @param methodName
	 *            方法名
	 * @return
	 */
	public static String[] getMethodParamterNames(Class c, String methodName) {
		try {
			String className = c.getName();// com.gs.mcf.view.IndexView$$EnhancerByCGLIB$$4a2048c0
			if (className.indexOf("$$") > 0) {
				className = className.substring(0, className.indexOf("$$"));
			}
			CtClass cc = pool.get(className);
			CtMethod cm = cc.getDeclaredMethod(methodName);

			MethodInfo methodInfo = cm.getMethodInfo();
			CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
			LocalVariableAttribute attr = (LocalVariableAttribute) codeAttribute
					.getAttribute(LocalVariableAttribute.tag);
			if (attr == null) {
				return new String[] {};
			}
			String[] paramNames = new String[cm.getParameterTypes().length];
			int pos = Modifier.isStatic(cm.getModifiers()) ? 0 : 1;
			for (int i = 0; i < paramNames.length; i++) {
				paramNames[i] = attr.variableName(i + pos);
			}
			return paramNames;
		} catch (NotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new String[] {};
	}

	/***
	 * 获取方法参数名称
	 * 
	 * @param classAlisName
	 *            类别名
	 * @param c1
	 *            类
	 * @param methodName
	 *            方法名
	 * @return
	 */
	public static String[] getMethodParamterNames(String classAlisName,
			Class c1, String methodName) {
		String[] paramterNamesArr = methodparamsMap.get(classAlisName + "/"
				+ methodName);
		if (paramterNamesArr == null) {
			paramterNamesArr = getMethodParamterNames(c1, methodName);
			methodparamsMap.put(classAlisName + "/" + methodName,
					paramterNamesArr);
		}
		return paramterNamesArr;
	}

	public static Class[] getParamTypes(String classAlisName,
			String methodName, Method m) {
		Class[] pclassArr = methodparamsTypeMap.get(classAlisName + "/"
				+ methodName);
		if (pclassArr == null) {
			pclassArr = m.getParameterTypes();
			methodparamsTypeMap
					.put(classAlisName + "/" + methodName, pclassArr);
		}
		return pclassArr;
	}

	public static Method getMethod(Class c1, String classAlisName,
			String methodName) {
		Method m = methodMap.get(classAlisName + "/" + methodName);
		if (m == null) {
			Method[] methods = c1.getMethods();
			for (int i = 0; i < methods.length; i++) {
				m = methods[i];
				if (m.getName().equals(methodName)) {
					break;
				}
			}
			methodMap.put(classAlisName + "/" + methodName, m);
		}
		return m;
	}

	/***
	 * 调用方法
	 * 
	 * @param classAliasName
	 *            类别名 这里做一个要求，别名必须是和类名一样，只是首字母小写
	 * @param methodName
	 *            方法名
	 * @param params
	 *            参数
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Object callMethod(String classAlisName, String methodName,
			Map<String, Object> paramterMap, HttpServletRequest request)
			throws Exception {
		ApplicationContext ac1 = WebApplicationContextUtils
				.getRequiredWebApplicationContext(request.getSession()
						.getServletContext());
		if(!setDataSource(request, ac1)){
			throw new Exception("--------------------------没有数据源ID");
		}
		String errormsg = null;
		Object data = null;
		// Class c = ac1.getType(classAlisName);
		Object o = ac1.getBean(classAlisName);
		Class c1 = Class.forName(o.toString().substring(0,
				o.toString().indexOf("@")));
		Method m = getMethod(c1, classAlisName, methodName);
		String[] paramterNamesArr = getMethodParamterNames(classAlisName, c1,
				methodName);
		// 获取参数类型
		Class[] pclassArr = getParamTypes(classAlisName, methodName, m);
		// 根据方法参数名称构建反射调用时的参数数组
		Object[] methodParamterObjectArr = new Object[paramterNamesArr.length];
		int i = 0;
		for (String pName : paramterNamesArr) {
			Object value = paramterMap.get(pName);
			Class pc = pclassArr[i];
			if (value == null) {
				methodParamterObjectArr[i] = value;
			} else {
				String paramSName = pc.getSimpleName().toLowerCase();
				String valueSName = value.getClass().getSimpleName()
						.toLowerCase();
				if (paramSName.equals(valueSName)) {
					if (paramSName.equals("string") && value != null
							&& value.equals("null")) {
						value = null;
					}
					methodParamterObjectArr[i] = value;
				} else if (paramSName.equals("string")) {
					methodParamterObjectArr[i] = String.valueOf(value);
				} else if (paramSName.equals("int")) {
					if (StringUtils.isEmpty(value)
							|| value.toString().equals("null")) {
						methodParamterObjectArr[i] = -1;
					} else {
						methodParamterObjectArr[i] = Integer.parseInt(value
								.toString());
					}
				} else if (paramSName.equals("float")) {
					if (StringUtils.isEmpty(value)
							|| value.toString().equals("null")) {
						methodParamterObjectArr[i] = -1;
					} else {
						methodParamterObjectArr[i] = Float.parseFloat(value
								.toString());
					}
				} else if (paramSName.equals("long")) {
					if (StringUtils.isEmpty(value)
							|| value.toString().equals("null")) {
						methodParamterObjectArr[i] = -1l;
					} else {
						methodParamterObjectArr[i] = Long.parseLong(value
								.toString());
					}
				} else if (paramSName.equals("double")) {
					if (StringUtils.isEmpty(value)
							|| value.toString().equals("null")) {
						methodParamterObjectArr[i] = 0l;
					} else {
						methodParamterObjectArr[i] = Double.parseDouble(value
								.toString());
					}
				} else if (paramSName.toLowerCase().equals("date")) {
					if (value.toString().equals("")) {
						methodParamterObjectArr[i] = null;
					} else {
						methodParamterObjectArr[i] = mapper.readValue(
								value.toString(), pc);
					}
				} else {
					try {
						methodParamterObjectArr[i] = mapper.readValue(
								value.toString(), pc);
					} catch (Exception e) {
						methodParamterObjectArr[i] = null;
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
			i++;
		}
		m.setAccessible(true);
		// Invoker invoker = Invokers.newInvoker(m);
		// data = invoker.invoke(o, methodParamterObjectArr);
		data = m.invoke(o, methodParamterObjectArr);
		return data;
	}

	public static boolean  setDataSource(HttpServletRequest request,
			ApplicationContext ac1) throws Exception {
//		Object orgIdObj = request.getSession().getAttribute(
//				Constants.session_org_id);
//		Object dsIdObj = request.getSession().getAttribute(
//				Constants.session_dataSource_id);
//		if (!SessiontimeoutFilter.debugger || orgIdObj != null) {
//			// 先判断该数据源是否创建过&& if (DataSoureMap.targetDataSources.get(orgIdObj)
//			// ****这里后续应该换做数据源ID为key
//			if(StringUtils.isEmpty(dsIdObj)){
//				return false;
//			}
//			DataSourceContextHolder.setDataSourceType(dsIdObj.toString());
//
//		} else {
//			
//		}
		DataSourceContextHolder.setDataSourceType("defaultDataSource");
		return true;
	}
	
	public static void main(String[] args) {
		 try {
			mapper.readValue(
						"2015-11-12T00:00:00.000Z", Date.class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
