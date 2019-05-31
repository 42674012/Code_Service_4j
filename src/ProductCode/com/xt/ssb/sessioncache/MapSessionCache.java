package com.xt.ssb.sessioncache;

import java.util.HashMap;
import java.util.Map;

import com.xt.ssb.cache.QuickCacheFactory;

public class MapSessionCache implements ISessionCache {

    private static MapSessionCache instance;

    private MapSessionCache() {};

    public static ISessionCache getInstance() {
        if (instance == null) {
            instance = new MapSessionCache();
        }
        return instance;
    }

    @Override
	public Object getValue(String sessionId, Object key) {
        Object map = QuickCacheFactory.getQuickCache().getValue(sessionId);
        if (map == null) {
            return null;
        }
        return ((Map) map).get(key);
    }

    @Override
	public void setValue(String sessionId, Object key, Object value) {
        Object cacheMap = QuickCacheFactory.getQuickCache().getValue(sessionId);
        if (cacheMap == null) {
            cacheMap = new HashMap();
        }
        ((HashMap) cacheMap).put(key, value);
        QuickCacheFactory.getQuickCache().setValue(sessionId, cacheMap);
    }

    @Override
	public void remove(String sessionId, Object key) {
        Object cacheMap = QuickCacheFactory.getQuickCache().getValue(sessionId);
        if (cacheMap != null) {
            ((HashMap) cacheMap).remove(key);
        }
    }

    @Override
	public void remove(String sessionId) {
        QuickCacheFactory.getQuickCache().remove(sessionId);
    }
}
