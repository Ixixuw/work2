package com.example.work2.util;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @Description 获取Ip
 * @date 2022/8/3 9:56
 * @Author wuxx
 */
public class IpUtil {
    private static final String[] IP_HEADER_CANDIDATES = {
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"
    };

    /**
     * 获取ip
     * @param request
     * @return
     */
    public static String getIpAddr(HttpServletRequest request) {
        // 提取header得到IP地址列表（多重代理场景），取第一个IP
        for (String header : IP_HEADER_CANDIDATES) {
            String ipList = request.getHeader(header);
            if (ipList != null && ipList.length() != 0 &&
                    !"unknown".equalsIgnoreCase(ipList)) {
                return ipList.split(",")[0];
            }
        }
        String ip = request.getRemoteAddr();

        // 如果是本地环回IP，则根据网卡取本机配置的IP
        if ("127.0.0.1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)) {
            try {
                InetAddress inetAddress = InetAddress.getLocalHost();
                return inetAddress.getHostAddress();
            } catch (UnknownHostException e) {
                e.printStackTrace();
                return ip;
            }
        }
        return ip;
    }
}
