package com.example.work2.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.work2.dao.OperateLogMapper;
import com.example.work2.entity.OperateLog;
import com.example.work2.entity.User;
import com.example.work2.model.OperateLogParam;
import com.example.work2.model.UserParam;
import com.example.work2.service.OperateLogService;
import com.example.work2.util.IpUtil;
import com.example.work2.util.StrUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * @Description TODO
 * @date 2022/8/3 12:46
 * @Author wuxx
 */
@Service
public class OperateServiceImpl implements OperateLogService {

    public static String AUTHOR = "wuxx";

    public static String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";

    public static String OPERATE_BY = "operate_by";

    @Autowired
    private OperateLogMapper operateLogMapper;

    @Override
    public Boolean insertOperateLog(String content) {
        // 接收到请求，记录请求内容
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        OperateLog operateLog = new OperateLog();
        operateLog.setIp(IpUtil.getIpAddr(request));
        SimpleDateFormat sdf = new SimpleDateFormat(YYYY_MM_DD_HH_MM_SS);
        operateLog.setOperateDate(sdf.format((new GregorianCalendar()).getTime()) );
        operateLog.setOperateBy(AUTHOR);
        operateLog.setDeleteFlag(StrUtil.VALID);
        operateLog.setContent(content);
        int result = operateLogMapper.insert(operateLog);
        return result >= 1;
    }

    @Override
    public Long countOperateLog(OperateLogParam operateLogParam) {
        QueryWrapper<OperateLog> ew = getRoleWrapper(operateLogParam);
        return operateLogMapper.selectCount(ew);
    }

    @Override
    public List<OperateLog> listOperateLog(OperateLogParam operateLogParam) {
        QueryWrapper<OperateLog> ew = getRoleWrapper(operateLogParam);
        Page<OperateLog> page = new Page<>(operateLogParam.getCurrent(),operateLogParam.getSize());
        Page<OperateLog> operateLogPage = operateLogMapper.selectPage(page,ew);
        return operateLogPage.getRecords();
    }

    /**
     * 根据条件生成查询条件
     * @param operateLogParam
     * @return
     */
    private QueryWrapper<OperateLog> getRoleWrapper(OperateLogParam operateLogParam) {
        QueryWrapper<OperateLog> queryWrapper = new QueryWrapper<>();
        if (!StrUtil.isNullOrEmpty(operateLogParam.getOperateBy())) {
            queryWrapper.like(OPERATE_BY, operateLogParam.getOperateBy());
        }
        queryWrapper.eq(StrUtil.DELETE_FLAG, StrUtil.VALID);
        return queryWrapper;
    }
}
