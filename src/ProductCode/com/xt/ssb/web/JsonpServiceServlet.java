package com.xt.ssb.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.xt.ssb.util.bean.ReflectAssists;
import com.xt.ssb.util.json.McfJson;
import com.xt.ssb.util.security.CryptoCenter;
import com.xt.ssb.web.jsonentity.JsonEntity;
import com.xt.ssb.web.jsonentity.JsonOutputEntity;

/**
 * Servlet implementation class JsonServiceServlet
 */
public class JsonpServiceServlet extends HttpServlet {

    Log logger = LogFactory.getLog(this.getClass());

    private static final long serialVersionUID = 1L;

    private static boolean needEncorypt = false;

    private static String classAlisNameKey = "classAlisName";

    private static String methodNameKey = "methodName";

    private static String suffixKey = "suffix";

    /**
     * @see HttpServlet#HttpServlet()
     */
    public JsonpServiceServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    @Override
	protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        dispatcher(request, response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    @Override
	protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        dispatcher(request, response);
    }

    private void dispatcher(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        String url = request.getRequestURL().toString();
        Object data = callMethod(request);
        // 将业务对象转为json字符串
        String jsonStr = McfJson.object2JsonEntityStr(data);
      
        // 用客户端的调用来决定是否需要加密对象
        if (url.indexOf(".ssme") > 0) {
            jsonStr = encrypt(jsonStr);
           
        }
        // 判断是否要JSONP
        jsonStr = assembleJsonp(request, jsonStr);
       
        // 输出
        outputJsonStr(request, response, jsonStr);
    }

    public Map<String, String> getClassMethodFormUrL(String url) {
    	if(url.indexOf(".ssm")>0){
    		url = url.substring(0, url.indexOf(".ssm"));
    	}else if(url.indexOf(".d")>0){
    		url = url.substring(0, url.indexOf(".d"));
    	}
        
        String name[] = url.split("/");
        Map<String, String> classMethodMap = new HashMap<String, String>();
        classMethodMap.put(classAlisNameKey, name[name.length - 2]);
        classMethodMap.put(methodNameKey, name[name.length - 1]);
        classMethodMap
                .put(suffixKey, url.indexOf(".ssme") > 0 ? "ssme" : "ssm");
        if(url.indexOf(".d")>0){
        	classMethodMap .put(suffixKey, url.indexOf(".d") > 0 ? "d" : "ssm");
        }
        return classMethodMap;
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
    @SuppressWarnings("rawtypes")
    private Object callMethod(HttpServletRequest request)
            throws ServletException, IOException {
        String url = request.getRequestURL().toString();
        Map<String, String> classMethodMap = getClassMethodFormUrL(url);
        String classAlisName = classMethodMap.get(classAlisNameKey);
        String methodName = classMethodMap.get(methodNameKey);
        String suffix = classMethodMap.get(suffixKey);
        //DoradoContext.init(request.getSession().getServletContext());

        Map<String, Object> paramterMap = new HashMap<String, Object>();

        String requestMethod = request.getMethod();
        // 获取URl参数值
        Map<String, Object> urlParamterMap = new HashMap<String, Object>();
        Map<String, Object> postParamterMap = new HashMap<String, Object>();
        if (requestMethod.equals("GET")) {
            // 获取URl参数值
            urlParamterMap = getUrlParamters(request, paramterMap);
        } else if (requestMethod.equals("POST")) {
            // 获取post参数值
            postParamterMap = getPostParamters(request, paramterMap);
        }

        try {
            return ReflectAssists.callMethod(classAlisName, methodName,
                    paramterMap, request);
        } catch (Exception e) {
            
            // TODO Auto-generated catch block
            e.printStackTrace();
            JsonEntity error =  new JsonEntity();
            error.set$mcfDispacherStatus(101);
            error.setMsg(e.toString());
            error.setData(e.getCause()==null?"":e.getCause().getClass().toString()+":"+e.getCause().getMessage());
            return error;
        }
    }

    private Map<String, Object> getUrlParamters(HttpServletRequest request,
            Map<String, Object> paramterMap) {
        Map<String, String[]> urlPrameterStringArrMap = request
                .getParameterMap();
        Set<String> keySet = urlPrameterStringArrMap.keySet();
        String key;
        String[] valueArr;
        String value;
        Map<String, Object> urlparamterMap = new HashMap<String, Object>();
        for (Iterator it = keySet.iterator(); it.hasNext();) {
            key = (String) it.next();
            if (StringUtils.isNotEmpty(key)) {
                valueArr = urlPrameterStringArrMap.get(key);
                if (valueArr != null && valueArr.length > 0) {
                    value = valueArr[0];
                    if (value != null) {
                        try {
                            value = URLDecoder.decode(value,"UTF-8");
                        } catch (UnsupportedEncodingException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }
                    paramterMap.put(key, value);
                }
            }
        }
        paramterMap.putAll(urlparamterMap);
        return urlparamterMap;
    }

    private LinkedHashMap getPostParamters(HttpServletRequest request,
            Map<String, Object> paramterMap) throws IOException {
        String d = getPostJsonStr(request);
    	
    	LinkedHashMap postParamterMap = McfJson
                .jsonStr2LinkedMap(d);
        paramterMap.putAll(postParamterMap);
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

    @SuppressWarnings("unused")
    private String fisrtLetterToUpper(String str) {
        StringBuilder sb = new StringBuilder(str);
        sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
        str = sb.toString();
        return str;
    }

    /***
     * 输出
     * 
     * @param request
     * @param response
     * @param jsonStr
     * @throws ServletException
     * @throws IOException
     */
    private void outputJsonStr(HttpServletRequest request,
            HttpServletResponse response, String jsonStr)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache,must-revalidate");
        response.getWriter().println(jsonStr);
        response.getWriter().flush();
        response.getWriter().close();
    }

    /***
     * 判断是否使用jsonp
     * 
     * @param request
     * @param jsonStr
     * @return
     */
    private String assembleJsonp(HttpServletRequest request, String jsonStr) {
        String callBackFuncName = request.getParameter("callback");
        if (StringUtils.isEmpty(callBackFuncName)
                || callBackFuncName.equals("null")) {
            // 如果没有传callBack 使用json
            return jsonStr;
        } else {
            // 如果传递了callback 使用jsonp
            jsonStr = callBackFuncName + "(" + jsonStr + ")";
            return jsonStr;
        }

    }

    /***
     *判断是否需要加密对象
     * 
     * @param request
     * @param jsonStr
     * @return
     */
    private String encrypt(String jsonStr) {
        JsonOutputEntity jsonOutputEntity = new JsonOutputEntity();
        // 判断是否要加密
        if (needEncorypt) {
            jsonStr = CryptoCenter.encrypt(jsonStr);
            jsonOutputEntity.setEncoryptd(true);
        } else {
            jsonOutputEntity.setEncoryptd(false);
        }
        jsonOutputEntity.setJsonStr(jsonStr);
        jsonStr = McfJson.object2JsonStr(jsonOutputEntity);
        return jsonStr;
    }
}
