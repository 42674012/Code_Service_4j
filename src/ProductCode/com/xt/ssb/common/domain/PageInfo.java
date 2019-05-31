package com.xt.ssb.common.domain;

import java.util.LinkedList;
import java.util.List;

public class PageInfo<T> {

    List<T> dataList = new LinkedList<>();

    int          total;

    public List<T> getDataList() {
        return dataList;
    }

    public void setDataList(List<T> dataList) {
        this.dataList = dataList;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
