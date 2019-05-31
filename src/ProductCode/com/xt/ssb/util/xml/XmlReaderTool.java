package com.xt.ssb.util.xml;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class XmlReaderTool {
	
	public final static String doradoButtonId		= "id";
	public final static String doradoButtonCaption	= "caption"; 
	
	private final static String doradoButton		= "Button";
	private final static String doradoToolBarButton = "ToolBarButton";
	
	// 首先第一步获取XML相关的Document
	private Document doc = null;

	
	/**
	 * 初始化Document
	 * @param xmlFile
	 * @throws Exception
	 */
	public void init(String xmlFile) throws Exception {
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		// 这个Document就是一个XML文件在内存中的镜像
		doc = db.parse(new File(xmlFile));
	}

	/**
	 *  该方法获取Button
	 * @param xmlFile
	 * @throws Exception
	 */
	public List<Map<String, String>> findDoradoButton(String xmlFile, String tagName) throws Exception {
		
		this.init(xmlFile);
		NodeList nodeList = doc.getElementsByTagName(tagName);
		
		List<Map<String, String>> tempList = new ArrayList<Map<String,String>>();
		
		for(int index=0; index<nodeList.getLength(); index++){
			Node fatherNode = nodeList.item(index);
			
			String code = null;
			String caption = null;
			
			// 找出父节点的ID属性
			NamedNodeMap attributes = fatherNode.getAttributes();
			for (int i = 0; i < attributes.getLength(); i++) {
				Node attribute = attributes.item(i);
				if(doradoButtonId.equals(attribute.getNodeName())){
					code = attribute.getNodeValue();
					break;
				}
			}
			
			// 找出子节点的caption
			NodeList childNodes = fatherNode.getChildNodes();
			for (int j = 0; j < childNodes.getLength(); j++) {
				if(caption != null){
					break;
				}
				org.w3c.dom.Node childNode = childNodes.item(j);
				// 如果这个节点属于Element ,再进行取值				
				if (childNode instanceof Element) {
					attributes = childNode.getAttributes();
					for (int i = 0; i < attributes.getLength(); i++) {
						Node attribute = attributes.item(i);
						if(doradoButtonCaption.equals(attribute.getNodeValue())){
							// 如果子节点的属性是caption,则取出父节点的内容
							//caption = childNode.getTextContent();
							break;
						}
					}
				}
			}
			
			Map<String, String> map = new HashMap<String, String>();
			map.put(doradoButtonId, code);
			map.put(doradoButtonCaption, caption);
			tempList.add(map);
		}
		return tempList;
	}


	/**
	 * 解析resourceURI XML页面 找出Button ToolBarButton的ID， caption
	 * @param filePath
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, String>> readDoradoButton(String filePath) throws Exception {
		XmlReaderTool parse = new XmlReaderTool();
		List<Map<String, String>> btnList = parse.findDoradoButton(filePath, doradoButton);
		btnList.addAll(parse.findDoradoButton(filePath, doradoToolBarButton));
		return btnList;
	}
	
	
}
