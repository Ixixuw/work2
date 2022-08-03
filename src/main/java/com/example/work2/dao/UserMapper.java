package com.example.work2.dao;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.work2.entity.User;


/**
 * @Description 用户信息数据库操作
 * @date 2022/8/2 16:32
 * @Author wuxx
 */
@DS("db1")
public interface UserMapper extends BaseMapper<User> {

}
