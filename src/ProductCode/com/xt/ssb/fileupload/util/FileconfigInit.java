package com.xt.ssb.fileupload.util;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import net.mikesu.fastdfs.FastdfsClientConfig;
import net.mikesu.fastdfs.sql.FastdfsDateMap;

import org.springframework.stereotype.Component;

import com.xt.ssb.dict.bussiness.DictDS;
import com.xt.ssb.dict.facade.DictDomain;

/**
 * 配置文件初始类
 * @author jxcw
 */
@Component
public class FileconfigInit {
	@Resource
	DictDS dictds;
	private static String dictTypeCode="$file_dict";
	/**
	 * 配置文件读取类
	 * @param params
	 */
	@PostConstruct  
	@SuppressWarnings("static-access")
	public  void init() {
		if(FastdfsDateMap.getvalue()==null){
			Hashtable<String,Object> params=getFileConfig(dictTypeCode);
			if(params==null){
				return ;
			}
			FastdfsClientConfig config=new FastdfsClientConfig();
			config.setConnectTimeout(Integer.valueOf((params.get("connect_timeout")==null?0:params.get("connect_timeout"))+"") *1000);
			config.setNetworkTimeout(Integer.valueOf((params.get("network_timeout")==null?0:params.get("network_timeout"))+"") *1000);
			config.http_port=Integer.valueOf((params.get("http_port")==null?80:params.get("http_port"))+"") ;
			config.http_url=(params.get("http_url")==null?"":params.get("http_url"))+"";
			List<String> trackerAddrs = new ArrayList<String>();
			String[] trackerServers =config.getValues(params, "tracker_server");
			for(String trackerServer:trackerServers){
				trackerAddrs.add((String)trackerServer);
			}
			config.setTrackerAddrs(trackerAddrs);
			
			FastdfsDateMap.setvalue(config);
		}
	}
	/**
	 * @param key
	 * @return
	 */
	private Hashtable<String,Object> getFileConfig (String dictTypeCode){
		Hashtable<String,Object> map=new Hashtable<String,Object>();
		List<Object> list=dictds.getDictByDictTypeCode(dictTypeCode);
		List<Object> serlist=new ArrayList<Object>();
		String dictname="";
		for (Object o:list) {
			DictDomain dict = (DictDomain)o;
			dictname=dict.getDictName()+"";
			if((dictname)!=null&&!"".equals(dictname)&&"tracker_server".equals(dictname)){
				serlist.add(dict.getDictValue()+"");
			}else{
				map.put(dictname, dict.getDictValue()+"");
			}
		}
		if(serlist!=null&&serlist.size()>0){
			map.put("tracker_server", serlist);
		}
		return map;
	} 
	
}
