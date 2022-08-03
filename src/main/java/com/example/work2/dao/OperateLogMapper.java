package com.example.work2.dao;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.work2.entity.OperateLog;

/**
 * @Description 操作日志数据库操作
 * @date 2022/8/3 12:48
 * @Author wuxx
 */
@DS("db1")
public interface OperateLogMapper extends BaseMapper<OperateLog> {
}
