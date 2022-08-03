package com.example.work2.controller;

import com.example.work2.entity.User;
import com.example.work2.model.UserParam;
import com.example.work2.service.UserService;
import com.example.work2.util.JsonResult;
import com.example.work2.util.cache.Cache;
import com.example.work2.util.cache.DeleteCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * @Description 处理user相关请求
 * @date 2022/8/2 15:48
 * @Author wuxx
 */
@RestController
@RequestMapping("user")
@Api(value = "user相关controller层")
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "listUser", method = RequestMethod.POST)
    @Cache(expire = 5 * 60 * 1000, name = "listUser")
    @ApiOperation(value = "查询用户")
    public JsonResult<User> listUser(@RequestBody UserParam userParam) {
        JsonResult<User> jsonResult = new JsonResult<>();
        jsonResult.setSuccess(true);
        jsonResult.setTotal(userService.countUser(userParam));
        if (jsonResult.getTotal() > 0L) {
            jsonResult.setData(userService.listUser(userParam));
        }
        return jsonResult;
    }

    @ResponseBody
    @RequestMapping(value = "saveUser", method = RequestMethod.POST)
    @ApiOperation(value = "新增和修改用户信息")
    @DeleteCache
    public Boolean saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @ResponseBody
    @RequestMapping(value = "deleteUser", method = RequestMethod.POST)
    @ApiOperation(value = "删除用户信息")
    @DeleteCache
    public Boolean deleteUser(@RequestBody @ApiParam(value = "用户id") String id){
        return userService.deleteUser(id);
    }
}
