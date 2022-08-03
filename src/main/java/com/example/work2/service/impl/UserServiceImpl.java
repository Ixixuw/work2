package com.example.work2.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.work2.dao.UserMapper;
import com.example.work2.entity.User;
import com.example.work2.model.UserParam;
import com.example.work2.service.OperateLogService;
import com.example.work2.service.UserService;
import com.example.work2.util.StrUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description TODO
 * @date 2022/8/2 16:29
 * @Author wuxx
 */
@Service
public class UserServiceImpl implements UserService {

    public static final String USER_NAME = "user_name";

    public static final String ID = "id";

    public static final String INSERT = "插入用户";

    public static final String UPDATE = "更新用户";

    public static final String DELETE = "删除用户";

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private OperateLogService operateLogService;

    /**
     *查询用户信息
     * @param userParam
     * @return
     */
    @Override
    public List<User> listUser(UserParam userParam) {
        QueryWrapper<User> ew = getRoleWrapper(userParam);
        Page<User> page = new Page<>(userParam.getCurrent(),userParam.getSize());
        Page<User> userPage = userMapper.selectPage(page,ew);
        return userPage.getRecords();
    }

    /**
     * 查询用户数量
     * @param userParam
     * @return
     */
    @Override
    public Long countUser(UserParam userParam) {
        QueryWrapper<User> ew = getRoleWrapper(userParam);
        return userMapper.selectCount(ew);
    }

    @Override
    public Boolean saveUser(User user) {
        int result;
        String content;
        if (StrUtil.isNullOrEmpty(user.getId())) {
            user.setDeleteFlag(StrUtil.VALID);
            result = userMapper.insert(user);
            content = INSERT + user.getId();
        } else {
            result = userMapper.updateById(user);
            content = UPDATE + user.getId();
        }
        operateLogService.insertOperateLog(content);
        return result >= 1;
    }

    @Override
    public Boolean deleteUser(String id) {
        UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq(ID, id);
        updateWrapper.set(StrUtil.DELETE_FLAG, StrUtil.IN_VALID);
        int result = userMapper.update(null, updateWrapper);
        operateLogService.insertOperateLog(DELETE+id);
        return result >= 1;
    }

    /**
     * 根据条件生成查询条件
     * @param userParam
     * @return
     */
    private QueryWrapper<User> getRoleWrapper(UserParam userParam) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if (!StrUtil.isNullOrEmpty(userParam.getUserName())) {
            queryWrapper.like(USER_NAME, userParam.getUserName());
        }
        queryWrapper.eq(StrUtil.DELETE_FLAG, StrUtil.VALID);
        return queryWrapper;
    }


}
