package com.xt.ssb.cache;

import java.util.HashMap;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class DCache {

	static Log log = LogFactory.getLog(DCache.class);

	private DCache() {
	}

	static Jedis jedis = null;

	private static JedisPool pool = null;

	public static String ip = "";
	
	public static int port = 0;
	/**
	 * 构建redis连接池
	 * 
	 * @param ip
	 * @param port
	 * @return JedisPool
	 */
	public static Jedis getInstance() {
		return pool.getResource();
	}

	/**
	 * 返还到连接池
	 * 
	 * @param pool
	 * @param redis
	 */
	public static void returnResource(JedisPool pool, Jedis redis) {
		if (redis != null) {
			pool.returnResource(redis);
		}
	}

	/***
	 * 设置值并带有超时时间
	 * 
	 * @param tableName
	 * @param key
	 * @param seconds
	 * @param value
	 */
	public static void hmsetex(String tableName, String key, int seconds,
			HashMap<String, String> value) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			jedis.hmset(tableName + key, value);
			jedis.expire(tableName + key, seconds);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
//			if (jedis != null) {
//				jedis.disconnect();
//			}
			
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}
	}

	/***
	 * 设置值并带有超时时间
	 * 
	 * @param tableName
	 * @param key
	 * @param seconds
	 * @param value
	 */
	public static void lrem(String tableName, String key, int range,
			String value) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			jedis.lrem(tableName + key, range, value);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static String get(String tableName, String key) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			return jedis.get(tableName + key);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
			return null;
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	/***
	 * 设置值并带有超时时间
	 * 
	 * @param tableName
	 * @param key
	 * @param seconds
	 * @param value
	 */
	public static void setex(String tableName, String key, int seconds,
			String value) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			jedis.setex(tableName + key, seconds, value);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static void lpush(String tableName, String key, String value) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			jedis.lpush(tableName + key, value);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static List<String> lrange(String tableName, String key, int start,
			int end) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			return jedis.lrange(tableName + key, start, end);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
			return null;
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static void hmset(String tableName, String key, HashMap value) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			jedis.hmset(tableName + key, value);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static List<String> hmget(String tableName, String key, String mapKey) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			return jedis.hmget(tableName + key, mapKey);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
			return null;
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static List<String> hmget(String tableName, String key,
			String mapKey1, String mapKye2) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			return jedis.hmget(tableName + key, mapKey1, mapKye2);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
			return null;
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static List<String> hmget(String tableName, String key,
			String mapKey1, String mapKye2, String mapKey3, String mapKey4) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			return jedis.hmget(tableName + key, mapKey1, mapKye2, mapKey3,
					mapKey4);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
			return null;
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static void hdel(String tableName, String key) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			jedis.del(tableName + key);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	public static List<String> hvals(String tableName, String key) {
		Jedis jedis = null;
		try {
			jedis = getInstance();
			return jedis.hvals(tableName + key);
		} catch (Exception e) {
			// 释放redis对象
			// pool.returnBrokenResource(jedis);
			log.error("jedis链接错误" + e.getLocalizedMessage() + e.getMessage());
			if (jedis != null) {
				jedis.disconnect();
			}
			returnResource(pool, jedis);
			return null;
		} finally {
			// 返还到连接池
			returnResource(pool, jedis);
		}

	}

	// "192.168.199.109" 6379
	public static void setup(String ip, int port) {
		// 连接redis服务器，192.168.0.100:637
		// jedis = new Jedis(ip, port, 2000);
		JedisPoolConfig config = new JedisPoolConfig();
		// 控制一个pool可分配多少个jedis实例，通过pool.getResource()来获取；
		// 如果赋值为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)。
		config.setMaxTotal(10000);
		// 控制一个pool最多有多少个状态为idle(空闲的)的jedis实例。
		config.setMaxIdle(50);
		// 表示当borrow(引入)一个jedis实例时，最大的等待时间，如果超过等待时间，则直接抛出JedisConnectionException；
		config.setMaxWaitMillis(1000 * 100);
		// 在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
		config.setTestOnBorrow(true);
		pool = new JedisPool(config, ip, port);
	}
}
