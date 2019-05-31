package com.xt.ssb.cache;

public class QuickCacheFactory {

    private QuickCacheFactory() {}

    public static IQuickCache getQuickCache() {
        return EnQuickCache.getInstance();
    }
}
