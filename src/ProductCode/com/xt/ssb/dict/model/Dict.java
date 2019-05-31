package com.xt.ssb.dict.model;


import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name = "ssb_dict")
public class Dict {

	
	
	  Long  dictId;
	
	  public void setDictId(Long dictId){
	  	this.dictId =  dictId;
	  }
	  
		  String  dictKey;
		  String  dictValue;
		  String  dictName;
		  Long  dictTypeId;
		  Date  createDate;
		  Date  lastUpdateDate;
		  String  createBy;
		  String  lastUpdateBy;
		  Integer isDelete;
		  
		  
	  
	  @Column(name = "is_delete")
	  public Integer getIsDelete() {
			return isDelete;
		}


		public void setIsDelete(Integer isDelete) {
			this.isDelete = isDelete;
		}


	@Id
	  @GeneratedValue(generator = "system-uuid")
	  @GenericGenerator(name = "system-uuid", strategy = "com.xt.ssb.util.hibernate.AssignedShortGUIDGenerator")
	  @Column(name = "dict_id",nullable = false, unique = true)
	  public Long getDictId(){
	  	return this.dictId;
	  }
	  	
	  
		  @Column(name = "dict_key")
		  public String getDictKey(){
		  	return this.dictKey;
		  }
		  	
		  public void setDictKey(String dictKey){
		  	this.dictKey =  dictKey;
		  }
		  
		  
		  
		  
		  @Column(name = "dict_value")
		  public String getDictValue(){
		  	return this.dictValue;
		  }
		  	
		  public void setDictValue(String dictValue){
		  	this.dictValue =  dictValue;
		  }
		  
		  
		  
		  
		  @Column(name = "dict_name")
		  public String getDictName(){
		  	return this.dictName;
		  }
		  	
		  public void setDictName(String dictName){
		  	this.dictName =  dictName;
		  }
		  
		  
		  
		  
		  @Column(name = "dict_type_id")
		  public Long getDictTypeId(){
		  	return this.dictTypeId;
		  }
		  	
		  public void setDictTypeId(Long dictTypeId){
		  	this.dictTypeId =  dictTypeId;
		  }
		  
		  
		  
		  
		  @Column(name = "create_date")
		  public Date getCreateDate(){
		  	return this.createDate;
		  }
		  	
		  public void setCreateDate(Date createDate){
		  	this.createDate =  createDate;
		  }
		  
		  
		  
		  
		  @Column(name = "last_update_date")
		  public Date getLastUpdateDate(){
		  	return this.lastUpdateDate;
		  }
		  	
		  public void setLastUpdateDate(Date lastUpdateDate){
		  	this.lastUpdateDate =  lastUpdateDate;
		  }
		  
		  
		  
		  
		  @Column(name = "create_by",updatable = false)
		  public String getCreateBy(){
		  	return this.createBy;
		  }
		  	
		  public void setCreateBy(String createBy){
		  	this.createBy =  createBy;
		  }
		  
		  
		  
		  
		  @Column(name = "last_update_by",updatable = false)
		  public String getLastUpdateBy(){
		  	return this.lastUpdateBy;
		  }
		  	
		  public void setLastUpdateBy(String lastUpdateBy){
		  	this.lastUpdateBy =  lastUpdateBy;
		  }
		  
		  
		  
		  
}
