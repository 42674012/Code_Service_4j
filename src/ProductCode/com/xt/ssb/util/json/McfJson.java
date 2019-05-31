package com.xt.ssb.util.json;

import java.io.IOException;
import java.util.LinkedHashMap;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;

public class McfJson {

	private static ObjectMapper mapper = null;

	static {
		mapper = new ObjectMapper();
		SimpleModule simpleModule = new SimpleModule("",
				Version.unknownVersion());
		simpleModule.addSerializer(Long.class,
				org.codehaus.jackson.map.ser.ToStringSerializer.instance);
		simpleModule.addSerializer(Long.TYPE,
				org.codehaus.jackson.map.ser.ToStringSerializer.instance);
		mapper.registerModule(simpleModule);
	}

	public static String object2JsonEntityStr(Object object) {

		String jsonStr = "";
		try {
			jsonStr = mapper.writeValueAsString(object);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonStr;
	}

	/***
	 * 将object转为json
	 * 
	 * @param object
	 * @return
	 */
	public static String object2JsonStr(Object object) {

		String jsonStr = "";
		try {
			jsonStr = mapper.writeValueAsString(object);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonStr;
	}

	public static Object jsonStr2Object(String jsonStr) {
		if (StringUtils.isNotEmpty(jsonStr)) {
			try {
				Object acc = mapper.readValue(jsonStr, Object.class);
				return acc;
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static LinkedHashMap<String, Object> jsonStr2LinkedMap(String jsonStr)
			throws IOException {
		if (StringUtils.isNotEmpty(jsonStr)) {
			Object o = McfJson.jsonStr2Object(jsonStr);
			LinkedHashMap<String, Object> postParamterMap = null;
			if (o == null) {
				postParamterMap = new LinkedHashMap<String, Object>();
			} else {
				postParamterMap = (LinkedHashMap<String, Object>) o;
			}
			return postParamterMap;
		}
		return new LinkedHashMap<String, Object>();
	}
}
