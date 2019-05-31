package com.xt.ssb.web.jsonentity;

public class JsonEntity {
    
    int $mcfDispacherStatus;//200正常/100 系统错误 101 业务错误 -100 超时
    
    String msg;

    Object data;

    public JsonEntity(int mcfDispacherStatus,String msg) {
        this.$mcfDispacherStatus =$mcfDispacherStatus;
        this.msg = msg;
    }
    
    
    public JsonEntity() {
        
    }
    
    
    public int get$mcfDispacherStatus() {
        return $mcfDispacherStatus;
    }


    public void set$mcfDispacherStatus(int $mcfDispacherStatus) {
        this.$mcfDispacherStatus = $mcfDispacherStatus;
    }


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
