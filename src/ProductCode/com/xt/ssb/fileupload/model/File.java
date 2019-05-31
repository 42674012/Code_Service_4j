package com.xt.ssb.fileupload.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name = "icms_file")
public class File {

	
	
	  Long  id;
	
	  public void setId(Long id){
	  	this.id =  id;
	  }
	  
		  String  atttype;
		  String  fileId;
		  String  modelname;
		  String  modelid;
		  Date  createtime;
	  
	  
	  @Id
	  @GeneratedValue(generator = "system-uuid")
	  @GenericGenerator(name = "system-uuid", strategy = "com.xt.ssb.util.hibernate.AssignedShortGUIDGenerator")
	  @Column(name = "id",nullable = false, unique = true)
	  public Long getId(){
	  	return this.id;
	  }
	  	
	  
		  @Column(name = "atttype")
		  public String getAtttype(){
		  	return this.atttype;
		  }
		  	
		  public void setAtttype(String atttype){
		  	this.atttype =  atttype;
		  }
		  
		  
		  
		  
		  @Column(name = "fileid")
		  public String getFileId(){
		  	return this.fileId;
		  }
		  	
		  public void setFileId(String fileId){
		  	this.fileId =  fileId;
		  }
		  
		  
		  
		  
		  @Column(name = "modelname")
		  public String getModelname(){
		  	return this.modelname;
		  }
		  	
		  public void setModelname(String modelname){
		  	this.modelname =  modelname;
		  }
		  
		  
		  
		  
		  @Column(name = "modelid")
		  public String getModelid(){
		  	return this.modelid;
		  }
		  	
		  public void setModelid(String modelid){
		  	this.modelid =  modelid;
		  }
		  
		  
		  
		  
		  @Column(name = "createtime")
		  public Date getCreatetime(){
		  	return this.createtime;
		  }
		  	
		  public void setCreatetime(Date createtime){
		  	this.createtime =  createtime;
		  }
		  
		  
		  
		  
}
