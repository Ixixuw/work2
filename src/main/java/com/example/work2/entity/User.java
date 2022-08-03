package com.example.work2.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @Description 数据库User实体类
 * @date 2022/8/2 15:39
 * @Author wuxx
 */
@Data
@ApiModel(value = "用户信息")
public class User {

    @ApiModelProperty(value = "用户id")
    private String id;

    @ApiModelProperty(value = "用户名")
    private String userName;

    @ApiModelProperty(value = "年龄")
    private String age;

    @ApiModelProperty(value = "性别")
    private String sex;

    @ApiModelProperty(value = "删除字段")
    private String deleteFlag;

    @ApiModelProperty(value = "邮箱")
    private String email;

    @ApiModelProperty(value = "电话")
    private String tel;
}
