package com.example.work2.model;

import com.example.work2.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @Description TODO
 * @date 2022/8/2 15:54
 * @Author wuxx
 */
@Data
public class UserParam extends User {

    @ApiModelProperty(value = "总数量")
    private Integer totalRecord;

    @ApiModelProperty(value = "当前页数")
    private Integer current;

    @ApiModelProperty(value = "每页数量")
    private Integer size;
}
