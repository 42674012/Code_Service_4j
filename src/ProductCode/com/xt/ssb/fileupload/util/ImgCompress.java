package com.xt.ssb.fileupload.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGEncodeParam;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

public class ImgCompress {
	/**
	 * @param inStream
	 * @return
	 * @throws IOException
	 */
	public static  byte[] input2byte(InputStream inStream)  
            throws IOException {  
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();  
        byte[] buff = new byte[100];  
        int rc = 0;  
        while ((rc = inStream.read(buff, 0, 100)) > 0) {  
            swapStream.write(buff, 0, rc);  
        }  
        byte[] in2b = swapStream.toByteArray();  
        inStream.close();
        swapStream.close();
        return in2b;  
    }  
	/** 
     *  
     * 自己设置压缩质量来把图片压缩成byte[] 
     *  
     * @param image 
     *            压缩源图片 
     * @param quality 
     *            压缩质量，在0-1之间， 
     * @return 返回的字节数组 
     */  
    public byte[] bufferedImageTobytes(InputStream instream, float quality) {
    	 ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); // 取得内存输出流
		try {
			BufferedImage image = ImageIO.read(instream);
			 // 如果图片空，返回空 
			if (image == null) {  
	            return null;  
	        } 
			 // 得到指定Format图片的writer  
	        Iterator<ImageWriter> iter = ImageIO
	                .getImageWritersByFormatName("jpeg");// 得到迭代器  
	        ImageWriter writer = (ImageWriter) iter.next(); // 得到writer  
	  
	        // 得到指定writer的输出参数设置(ImageWriteParam )  
	        ImageWriteParam iwp = writer.getDefaultWriteParam();  
	        iwp.setCompressionMode(ImageWriteParam.MODE_EXPLICIT); // 设置可否压缩  
	        iwp.setCompressionQuality(quality); // 设置压缩质量参数  
	  
	        iwp.setProgressiveMode(ImageWriteParam.MODE_DISABLED);  
	  
	        ColorModel colorModel = ColorModel.getRGBdefault();  
	        // 指定压缩时使用的色彩模式  
	        iwp.setDestinationType(new javax.imageio.ImageTypeSpecifier(colorModel,  
	                colorModel.createCompatibleSampleModel(16, 16)));  
	  
	        // 开始打包图片，写入byte[]  
	         
	        IIOImage iIamge = new IIOImage(image, null, null);  
	        try {  
	            // 此处因为ImageWriter中用来接收write信息的output要求必须是ImageOutput  
	            // 通过ImageIo中的静态方法，得到byteArrayOutputStream的ImageOutput  
	            writer.setOutput(ImageIO  
	                    .createImageOutputStream(byteArrayOutputStream));  
	            writer.write(null, iIamge, iwp);  
	        } catch (IOException e) {  
	            System.out.println("write errro");  
	            e.printStackTrace();  
	        }  
	        System.out.println("jpeg" + quality + "质量完成打包----lenth----" + byteArrayOutputStream.toByteArray().length);  
	        byteArrayOutputStream.close(); 
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return byteArrayOutputStream.toByteArray();
    }  
	/**
	 * 直接指定压缩后的宽高：
	 * @param oldFile 要进行压缩的文件全路径
	 * @param width 压缩后的宽度
	 * @param height 压缩后的高度
	 * @param quality 压缩质量
	 * @return 返回压缩后的文件的全路径
	 */
	public  byte[] zipImageFile(InputStream instream, int width, int height,
			float quality) {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			if (instream == null) {
				return null;
			}
			/**对服务器上的临时文件进行处理 */
			Image srcFile = ImageIO.read(instream);
			/** 宽,高设定 */
			BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			 
			tag.getGraphics().drawImage(srcFile, 0, 0, width, height, null);
			System.err.println("ImgCompress---5");
//			String filePrex = oldFile.substring(0, oldFile.indexOf('.'));
			/** 压缩后的文件名 */
//			newImage = filePrex + smallIcon	+ oldFile.substring(filePrex.length());
			/** 压缩之后临时存放位置 */
			JPEGEncodeParam jep = JPEGCodec.getDefaultJPEGEncodeParam(tag);
			System.err.println("ImgCompress---6");
			/** 压缩质量 */
			jep.setQuality(quality, true);
			System.err.println("ImgCompress---7");
			
			JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(byteArrayOutputStream);
			System.err.println("ImgCompress---8");
			encoder.encode(tag, jep);
			System.err.println("ImgCompress---9");
			byteArrayOutputStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return byteArrayOutputStream.toByteArray();
		
	}

	/**
	 * 保存文件到服务器临时路径(用于文件上传)
	 * @param fileName
	 * @param is
	 * @return 文件全路径
	 */
	public  String writeFile(String fileName, InputStream is) {
		if (fileName == null || fileName.trim().length() == 0) {
			return null;
		}
		try {
			/** 首先保存到临时文件 */
			FileOutputStream fos = new FileOutputStream(fileName);
			byte[] readBytes = new byte[512];// 缓冲大小
			int readed = 0;
			while ((readed = is.read(readBytes)) > 0) {
				fos.write(readBytes, 0, readed);
			}
			fos.close();
			is.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return fileName;
	}

	/**
	 * 等比例压缩算法： 
	 * 算法思想：根据压缩基数和压缩比来压缩原图，生产一张图片效果最接近原图的缩略图
	 * @param srcURL 原图地址
	 * @param deskURL 缩略图地址
	 * @param comBase 压缩基数
	 * @param scale 压缩限制(宽/高)比例  一般用1：
	 * 当scale>=1,缩略图height=comBase,width按原图宽高比例;若scale<1,缩略图width=comBase,height按原图宽高比例
	 * @throws Exception
	 * @author shenbin
	 * @createTime 2014-12-16
	 * @lastModifyTime 2014-12-16
	 */
	public  void saveMinPhoto(String srcURL, String deskURL, double comBase,
			double scale) throws Exception {
		File srcFile = new java.io.File(srcURL);
		Image src = ImageIO.read(srcFile);
		int srcHeight = src.getHeight(null);
		int srcWidth = src.getWidth(null);
		int deskHeight = 0;// 缩略图高
		int deskWidth = 0;// 缩略图宽
		double srcScale = (double) srcHeight / srcWidth;
		/**缩略图宽高算法*/
		if ((double) srcHeight > comBase || (double) srcWidth > comBase) {
			if (srcScale >= scale || 1 / srcScale > scale) {
				if (srcScale >= scale) {
					deskHeight = (int) comBase;
					deskWidth = srcWidth * deskHeight / srcHeight;
				} else {
					deskWidth = (int) comBase;
					deskHeight = srcHeight * deskWidth / srcWidth;
				}
			} else {
				if ((double) srcHeight > comBase) {
					deskHeight = (int) comBase;
					deskWidth = srcWidth * deskHeight / srcHeight;
				} else {
					deskWidth = (int) comBase;
					deskHeight = srcHeight * deskWidth / srcWidth;
				}
			}
		} else {
			deskHeight = srcHeight;
			deskWidth = srcWidth;
		}
		BufferedImage tag = new BufferedImage(deskWidth, deskHeight, BufferedImage.TYPE_3BYTE_BGR);
		tag.getGraphics().drawImage(src, 0, 0, deskWidth, deskHeight, null); //绘制缩小后的图
		FileOutputStream deskImage = new FileOutputStream(deskURL); //输出到文件流
		JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(deskImage);
		encoder.encode(tag); //近JPEG编码
		deskImage.close();
	} 
}
