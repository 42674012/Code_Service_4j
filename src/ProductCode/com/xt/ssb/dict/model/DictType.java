package com.xt.ssb.dict.model;


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
@Table(name = "ssb_dict_type")
public class DictType {

	
	
	  Long  dictTypeId;
	
	  public void setDictTypeId(Long dictTypeId){
	  	this.dictTypeId =  dictTypeId;
	  }
	  
		  Long  parentId;
		  String  name;
		  String  code;
		  String  expand;
		  String  parentName;
		  Integer  orderIndex;
		  Date  createDate;
		  String  createBy;
		  Date  lastUpdateDate;
		  String  lastUpdateBy;
		  String pinYinHeader;
	  
	  
	  @Id
	  @GeneratedValue(generator = "system-uuid")
	  @GenericGenerator(name = "system-uuid", strategy = "com.xt.ssb.util.hibernate.AssignedShortGUIDGenerator")
	  @Column(name = "dict_type_id",nullable = false, unique = true)
	  public Long getDictTypeId(){
	  	return this.dictTypeId;
	  }
	  	
	  
		  @Column(name = "parent_id")
		  public Long getParentId(){
		  	return this.parentId;
		  }
		  	
		  public void setParentId(Long parentId){
		  	this.parentId =  parentId;
		  }
		  
		  
		List<DictType> children = new LinkedList<DictType>();
		List<Object> dictlist;
		
		@Transient
		public List<Object> getDictlist() {
			return dictlist;
		}


		public void setDictlist(List<Object> dictlist) {
			this.dictlist = dictlist;
		}


		@Transient
		public List<DictType> getChildren() {
			return children;
		}

		public void setChildren(List<DictType> children) {
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
			}else if(this.childrenCount>0){
				return "closed";
			}
			return "opened";
		}

		public void setState(String state) {
			this.state = state;
		}

		  
		  
		  @Column(name = "name")
		  public String getName(){
		  	return this.name;
		  }
		  	
		  public void setName(String name){
		  	this.name =  name;
		  }
		  
		  
		  
		  
		  @Column(name = "code")
		  public String getCode(){
		  	return this.code;
		  }
		  	
		  public void setCode(String code){
		  	this.code =  code;
		  }
		  
		  
		  
		  
		  @Column(name = "expand")
		  public String getExpand(){
		  	return this.expand;
		  }
		  	
		  public void setExpand(String expand){
		  	this.expand =  expand;
		  }
		  
		  
		  
		  
		  @Column(name = "parent_name")
		  public String getParentName(){
		  	return this.parentName;
		  }
		  	
		  public void setParentName(String parentName){
		  	this.parentName =  parentName;
		  }
		  
		  
		  
		  
		  @Column(name = "order_index")
		  public Integer getOrderIndex(){
		  	return this.orderIndex;
		  }
		  	
		  public void setOrderIndex(Integer orderIndex){
		  	this.orderIndex =  orderIndex;
		  }
		  
		  
		  
		  
		  @Column(name = "create_date")
		  public Date getCreateDate(){
		  	return this.createDate;
		  }
		  	
		  public void setCreateDate(Date createDate){
		  	this.createDate =  createDate;
		  }
		  
		  
		  
		  
		  @Column(name = "create_by",updatable = false)
		  public String getCreateBy(){
		  	return this.createBy;
		  }
		  	
		  public void setCreateBy(String createBy){
		  	this.createBy =  createBy;
		  }
		  
		  
		  
		  
		  @Column(name = "last_update_date")
		  public Date getLastUpdateDate(){
		  	return this.lastUpdateDate;
		  }
		  	
		  public void setLastUpdateDate(Date lastUpdateDate){
		  	this.lastUpdateDate =  lastUpdateDate;
		  }
		  
		  
		  
		  
		  @Column(name = "last_update_by",updatable = false)
		  public String getLastUpdateBy(){
		  	return this.lastUpdateBy;
		  }
		  	
		  public void setLastUpdateBy(String lastUpdateBy){
		  	this.lastUpdateBy =  lastUpdateBy;
		  }


		/**
		 * @return the pinYinHander
		 */
		  @Column(name = "pinyin_header")
		public String getPinYinHeader() {
			return pinYinHeader;
		}


		/**
		 * @param pinYinHander the pinYinHander to set
		 */
		public void setPinYinHeader(String pinYinHeader) {
			this.pinYinHeader = pinYinHeader;
		}
		  
		  
		  
		  
}
