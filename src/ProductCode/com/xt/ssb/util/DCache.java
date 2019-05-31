package com.xt.ssb.util;

import redis.clients.jedis.Jedis;

public class DCache {

	Jedis jedis = null;

	public void put(String key, String value) {
		jedis.append(key, value);
	}

	public String get(String key) {
		String value = jedis.get(key);
		return key;
	}

	public void setup() {
		// 连接redis服务器，192.168.0.100:6379

	}

	public static void main(String[] args) {
		Jedis jedis = jedis = new Jedis("192.168.199.109", 6379);
		// 权限认证
		// jedis.auth("admin");

		//jedis.set("name", "xinxin");// 向key-->name中放入了value-->xinxin
		System.out.println(jedis.get("name"));// 执行结果：xinxin

		//jedis.append("name", " is my lover"); // 拼接
		System.out.println(jedis.get("name"));
	}
}
