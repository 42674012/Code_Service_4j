package com.xt.ssb.cache;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import net.sf.ehcache.config.CacheConfiguration;

public class EnQuickCache implements IQuickCache {

    private static EnQuickCache instance;

    private EnQuickCache() {}

    public static IQuickCache getInstance() {
        if (instance == null) {
            instance = new EnQuickCache();
        }
        return instance;
    }

    private static CacheManager cacheManager = new CacheManager();

    private static Cache        defalutCache;

    private final static String cache_name   = "EnQuickCache";

    private static Cache getDefaultCache() {
        if (defalutCache == null) {
            defalutCache = cacheManager.getCache(cache_name);
            if (defalutCache == null) {
                CacheConfiguration cacheConfiguration = new CacheConfiguration();
                defalutCache = new Cache(cacheConfiguration);

            }
        }
        return defalutCache;
    }

    @Override
    public Object getValue(Object key) {
        Element element = getDefaultCache().get(key);
        if (element != null) {
            return element.getObjectValue();
        }
        else {
            return null;
        }
    }

    @Override
    public void setValue(Object key, Object value) {
        Element element = new Element(key, value);
        getDefaultCache().put(element);
    }

    @Override
    public void remove(Object key) {
        getDefaultCache().remove(key);
    }
}
