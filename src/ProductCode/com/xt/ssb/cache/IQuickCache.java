package com.xt.ssb.cache;

public interface IQuickCache {
    public Object getValue(Object key);

    public void setValue(Object key, Object value);
    
    public void remove(Object key) ;
}
