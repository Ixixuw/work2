package com.example.work2.service;

import com.example.work2.entity.OperateLog;
import com.example.work2.entity.User;
import com.example.work2.model.OperateLogParam;

import java.util.List;

/**
 * @Description TODO
 * @date 2022/8/3 12:46
 * @Author wuxx
 */
public interface OperateLogService {
    Boolean insertOperateLog(String content);

    Long countOperateLog(OperateLogParam operateLogParam);

    List<OperateLog> listOperateLog(OperateLogParam operateLogParam);
}
