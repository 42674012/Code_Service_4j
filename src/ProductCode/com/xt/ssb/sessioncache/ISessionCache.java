package com.xt.ssb.sessioncache;

public interface ISessionCache {
    public Object getValue(String sessionId, Object key);

    public void setValue(String sessionId, Object key, Object value);

    public void remove(String sessionId, Object key);

    public void remove(String sessionId);
}
