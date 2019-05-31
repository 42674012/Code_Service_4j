package com.xt.ssb.sessioncache;

public class SessionCacheFactory {

    private void SessionCacheFactory() {};

    public static ISessionCache getSessonCache() {
        return MapSessionCache.getInstance();
    }
}
