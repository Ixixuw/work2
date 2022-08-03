package com.example.work2.service;

import com.example.work2.entity.User;
import com.example.work2.model.UserParam;

import java.util.List;

/**
 * @Description 处理user相关服务
 * @date 2022/8/2 16:27
 * @Author wuxx
 */
public interface UserService {
    /**
     *查询用户信息
     * @param userParam
     * @return
     */
    List<User> listUser(UserParam userParam);

    /**
     * 查询用户数量
     * @param userParam
     * @return
     */
    Long countUser(UserParam userParam);

    Boolean saveUser(User user);

    Boolean deleteUser(String id);
}
