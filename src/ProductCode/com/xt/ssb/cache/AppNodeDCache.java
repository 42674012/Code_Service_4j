package com.xt.ssb.cache;

import java.util.HashMap;
import java.util.List;

public class AppNodeDCache {

	public static String app_table_name = "200_";

	public static void setAppNode(long key, HashMap value) {
		DCache.hmset(app_table_name, key + "", value);
	}

	public static void setAppNode(String key, HashMap value) {
		DCache.hmset(app_table_name, key, value);
	}

	public static List<String> getAppNodeValue(String key, String mapKey) {
		return DCache.hmget(app_table_name, key, mapKey);
	}

	public static List<String> getAppNodeValue(String key, String mapKey,
			String mapKey1) {
		return DCache.hmget(app_table_name, key, mapKey, mapKey1);
	}

	public static List<String> getAppNodeValue(String key, String mapKey1,
			String mapKye2, String mapKye3, String mapKey4) {
		return DCache.hmget(app_table_name , key, mapKey1, mapKye2, mapKye3,
				mapKey4);
	}

	public static void deleteAppNode(String key) {
		DCache.hdel(app_table_name, key);
	}
}
