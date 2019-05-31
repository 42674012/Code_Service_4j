package com.xt.ssb.menu.model;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

public class MenuCommon {
	

	Long menuId;
	String name;
	String url;
	Integer visiable;
	Integer orderIndex;
	Long parentId;
	String icon;
	Integer isBlank;
	
	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}
	public Long getMenuId() {
		return this.menuId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getVisiable() {
		return this.visiable;
	}

	public void setVisiable(Integer visiable) {
		this.visiable = visiable;
	}


	public Integer getOrderIndex() {
		return this.orderIndex;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}

	public Long getParentId() {
		return this.parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	List<MenuCommon> children = new LinkedList<MenuCommon>();

	@Transient
	public List<MenuCommon> getChildren() {
		return children;
	}

	public void setChildren(List<MenuCommon> children) {
		this.children = children;
	}

	int childrenCount;

	@Transient
	public int getChildrenCount() {
		return childrenCount;
	}

	public void setChildrenCount(int childrenCount) {
		this.childrenCount = childrenCount;
	}

	String state = null;

	@Transient
	public String getState() {
		if (children != null && children.size() > 0) {
			return "closed";
		} else if (this.childrenCount > 0) {
			return "closed";
		}
		return "opened";
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}
	public Integer getIsBlank() {
		return isBlank;
	}
	public void setIsBlank(Integer isBlank) {
		this.isBlank = isBlank;
	}
	
}
