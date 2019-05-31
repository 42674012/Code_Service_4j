package com.xt.ssb.util.security.des;

import com.xt.ssb.util.security.Key;

public class SimpleDESCoder {

    private static SimpleDESCoder instance;

    public SimpleDESCoder() {
    }

    private static String key = "";

    public static SimpleDESCoder getInstance() {
        if (instance == null) {
            instance = new SimpleDESCoder();
            try {
                key = DESCoder.initKey(Key.des_key);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return instance;
    }

    public String decrypt(String inputStr) {
        try {
            byte[] outputData = DESCoder.decrypt(
                    Coder.decryptBASE64(inputStr), key);
            String outputStr = new String(outputData);
            return outputStr;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String encrypt(String inputStr) {
        try {
            byte[] inputData = inputStr.getBytes();
            inputData = DESCoder.encrypt(inputData, key);
            String outputStr = Coder.encryptBASE64(inputData);
            return outputStr;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String decrypt(String inputStr, String key) {
        try {
            key = DESCoder.initKey(Key.des_key);
            byte[] outputData = DESCoder.decrypt(
                    Coder.decryptBASE64(inputStr), key);
            String outputStr = new String(outputData);
            return outputStr;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        try {
            String key = DESCoder.initKey("SSODESxx");
            byte[] inputData = "yangting".getBytes();
            inputData = DESCoder.encrypt(inputData, key);
            String outputStr = Coder.encryptBASE64(inputData);
            System.out.print(outputStr);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

}
