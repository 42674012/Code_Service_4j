package com.xt.ssb.common.domain;

public class ReturnMsg {

	public ReturnMsg(String msg) {
		this.msg = msg;
	}
	
	public ReturnMsg(String msg, String stutas) {
		this.msg = msg;
		this.stutas = stutas;
	}

	String msg;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getStutas() {
		return stutas;
	}

	public void setStutas(String stutas) {
		this.stutas = stutas;
	}

	String stutas;

}
