package com.xt.ssb.web.jsonentity;

public class JsonOutputEntity {
	
	boolean encoryptd =true;
	
    public boolean getEncoryptd() {
		return encoryptd;
	}

	public void setEncoryptd(boolean encoryptd) {
		this.encoryptd = encoryptd;
	}

	String jsonStr;

    public String getJsonStr() {
        return jsonStr;
    }

    public void setJsonStr(String jsonStr) {
        this.jsonStr = jsonStr;
    }
}
