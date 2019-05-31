package com.xt.ssb.menu.model;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "ssb_menu")
public class Menu {

	Long menuId;

	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}

	String name;
	String rembo;
	String url;
	Integer visiable;
	Date createDate;
	String createBy;
	Date lastUpdateDate;
	String lastUpdateBy;
	Integer orderIndex;
	Long parentId;
	Integer isBlank;
	String icon;

	@Id
	// @GeneratedValue(generator = "paymentableGenerator")
	// @GenericGenerator(name = "paymentableGenerator", strategy =
	// "AssignedSequenceGenerator",
	// parameters = { @Parameter(name = "sequence", value = "seq_payablemoney")
	// })
	// @GeneratedValue(strategy = GenerationType.AUTO)
	// @GenericGenerator(name = "com.xt.ssb.util.hibernate.IGShortUUID",
	// strategy = "com.xt.ssb.util.hibernate.AssignedSequenceGenerator")
	// @GeneratedValue(strategy = GenerationType.AUTO)
	// @GenericGenerator(name = "paymentableGenerator", strategy = "assigned")
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "com.xt.ssb.util.hibernate.AssignedShortGUIDGenerator")
	@Column(name = "menu_id", nullable = false, unique = true)
	public Long getMenuId() {
		return this.menuId;
	}

	@Column(name = "name")
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "rembo")
	public String getRembo() {
		return this.rembo;
	}

	public void setRembo(String rembo) {
		this.rembo = rembo;
	}

	@Column(name = "url")
	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "visiable")
	public Integer getVisiable() {
		return this.visiable;
	}

	public void setVisiable(Integer visiable) {
		this.visiable = visiable;
	}

	@Column(name = "create_date")
	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(name = "create_by", updatable = false)
	public String getCreateBy() {
		return this.createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	@Column(name = "last_update_date")
	public Date getLastUpdateDate() {
		return this.lastUpdateDate;
	}

	public void setLastUpdateDate(Date lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}

	@Column(name = "last_update_by", updatable = false)
	public String getLastUpdateBy() {
		return this.lastUpdateBy;
	}

	public void setLastUpdateBy(String lastUpdateBy) {
		this.lastUpdateBy = lastUpdateBy;
	}

	@Column(name = "order_index")
	public Integer getOrderIndex() {
		return this.orderIndex;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}

	@Column(name = "parent_id")
	public Long getParentId() {
		return this.parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	List<Menu> children = new LinkedList<Menu>();

	@Transient
	public List<Menu> getChildren() {
		return children;
	}

	public void setChildren(List<Menu> children) {
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

	@Column(name = "is_blank")
	public Integer getIsBlank() {
		return this.isBlank;
	}

	public void setIsBlank(Integer isBlank) {
		this.isBlank = isBlank;
	}
	@Column(name ="icon")
	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}
	

}
