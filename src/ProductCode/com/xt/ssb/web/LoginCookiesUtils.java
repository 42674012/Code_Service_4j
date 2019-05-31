package com.xt.ssb.web;

import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.xt.ssb.sessioncache.SessionCacheFactory;
import com.xt.ssb.util.Constants;
import com.xt.ssb.util.security.des.SimpleDESCoder;

public class LoginCookiesUtils {

    private static final int maxAge = 3600 * 10;

    public static List<String> getDecodeCookies(HttpServletRequest request) {
        List<String> list = new LinkedList<>();

        String employeeId = getDecodeCookieValue(request, Constants.cookie_employeeid);
        String sessionId = getDecodeCookieValue(request, Constants.cookie_sessionid);
        if (employeeId == null || sessionId == null) {
            return null;
        }
        list.add(employeeId);
        list.add(sessionId);
        return list;
    }

    private static String getDecodeCookieValue(HttpServletRequest request, String cookieKey) {
        Cookie cookies = CookiesUtils.getCookieByName(request, cookieKey);
        if (cookies != null) {
            String encoderValue = cookies.getValue().trim();
            if (encoderValue == null) {
                return null;
            }
            return com.xt.ssb.util.security.des.SimpleDESCoder.getInstance().decrypt(encoderValue);
        }
        return null;
    }

    public static void writeEncodeCookies(HttpServletRequest request, HttpServletResponse response) {

        HttpSession session = request.getSession();
        String sessionId = session.getId();
        String employeeId = String.valueOf(SessionCacheFactory.getSessonCache().getValue(sessionId, Constants.session_employee_id));
        String encodeEmployeeId = SimpleDESCoder.getInstance().encrypt(employeeId);
        String encodeSessionId = SimpleDESCoder.getInstance().encrypt(sessionId);

        CookiesUtils.addCookie(response, Constants.cookie_employeeid, encodeEmployeeId, maxAge);
        CookiesUtils.addCookie(response, Constants.cookie_sessionid, encodeSessionId, maxAge);
    }
}
