function createJSPath(js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("");
    ss.length = ss.length - 1;
    href = ss.join("");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "" + path;
    }
    return path;
}

function getAppPath() {
    var utilPath = createJSPath("vue-common.js");
    return utilPath.replace("/common/", "");
}

var appPath = getAppPath();
var commonPath = "/common/";

document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + commonPath + "vue-style.css\">");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + commonPath + "font-icon/iconfont.css\">");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + commonPath + "component/fileUpload/fileUpload.css\">");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + commonPath + "elementui/index.css\">");
document.write("<script src='" + appPath + commonPath + "jquery/jquery.min.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "jquery/jquery.base64.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "base64.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/vue.min.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/vue-i18n.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/dictionary/dictionary-common.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/dictionary/dictionary-dev.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/dictionary/dictionary-ah.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/dictionary/dictionary-hebei.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/dictionary/dictionary-shh.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/dictionary/dictionary-jx.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/dictionary/messages.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "elementui/index.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "crypto-js.min.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "vue-util.js?d=" + new Date().getTime() + "'><\/script>");
document.write("<script src='" + appPath + commonPath + "constants.js?d=" + new Date().getTime() + "'><\/script>");
document.write("<script src='" + appPath + commonPath + "upload/upload.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "statistics.js'><\/script>");
document.write("<script src='" + appPath + commonPath + "vue-logout.js'><\/script>");


Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 *  重写 toFixed 方法，解决，toFixed 精度不准确问题
 *
 * @author guol
 * @since 20191108
 */
Number.prototype.toFixed = function (n) {
    if (n > 20 || n < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    const number = this;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }

    if (typeof (n) == 'undefined' || n == 0) {
        return (Math.round(number)).toString();
    }

    let result = number.toString();
    const arr = result.split('.');

    // 整数的情况
    if (arr.length < 2) {
        result += '.';
        for (let i = 0; i < n; i += 1) {
            result += '0';
        }
        return result;
    }

    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (let i = 0; i < n - decimal.length; i += 1) {
            result += '0';
        }
        return result;
    }

    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);
    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
        const x = Math.pow(10, n);
        result = (Math.round((parseFloat(result) * x)) + 1) / x;
        result = result.toFixed(n);
    }

    return result;
};

/**
 * 添加全局遮罩
 * @param obj
 * @returns {*}
 * @author guol
 * @since 20171123
 */
function loadingMaskMethod(obj, text) {
    var options = {text: text || '请稍后，正在加载中...'};
    $("body").mLoading(options);
    obj.close = function () {
        $("body").mLoading('hide');
    };
    return obj;
}

/**
 * 字符串特殊字符 转义处理
 * SQL语句中通配符 % _ [ ]
 * @param str
 * @returns str
 * @author guol
 * @since 20190918
 */
function specialCharReplaceEscape(str) {
    if (str == null) {
        return str;
    }
    str = str.replace("", "/");
    str = str.replace("%", "%");
    str = str.replace("[", "[");
    str = str.replace("]", "]");
    str = str.replace("_", "_");
    return str;
}


/**
 * 从后端获取服务器当前时间
 * @returns {string}
 * @author guo
 * @since 20180907
 */
function getServerCurrentDate() {
    const params = arguments;
    const async = params.length > 0 && typeof params[0] == 'function';
    var currentTime;
    $.ajax({
        url: '/solidwaste/global/getServerCurrentDate',
        type: "POST",
        dataType: 'json',
        async: async,
        success: function (result) {
            //成功会返回服务器时间,失败,会从后端返回一个new Date()
            currentTime = result.obj;
            if (async) {
                params[0](currentTime);
            }
        },
        error: function () {
            console.log("ajax请求失败!");
        }
    });
    return currentTime;
}


var VUE_COMMON_CONFIG = {
    loading: false,
    width: {
        td_date: 100, // 日期
        td_datetime: 170, // 日期时间
        td_waste_code: 110, // 八位码
        td_operate_1: 66,
        td_operate_2: 110,
        td_status_storage: 66,
        td_type_waste: 110,
    },
    align: {
        th: 'center',
        td_fixed: 'center',
        td_number: 'right',
        td_operator: 'center',
    },
    size: {},
    type: {
        button_operator: 'text', // 列表操作列按钮
        button_search: 'primary', // 查询按钮
        button_main: 'primary', // 主要功能按钮
        button_seco: 'default', // 次要功能按钮, 如返回、取消等无关业务数据操作的按钮
    },
    option: {
        confirm: {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        },
    },
    tooltip: {
        overflow: true,
    },
    page: {
        current: 1,
        size: 10,
        sizes: [10, 50, 100],
        prevText: '上一页',
        nextText: '下一页',
    },
    title: {
        popover: '温馨提示',
    },
    shortcuts: [{
        text: '最近一周',
        onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }],
    regularVerifyPhone: {
        message: '请填入正确的手机号码！',
        pattern: /(^(1)\d{10}$)/,
        trigger: 'blur'
    },
    regularVerifyAreaCode: {
        message: '请填入正确的行政区划代码！',
        pattern: /^[1-8][1-7]\d{4}$/,
        trigger: 'blur'
    }
};
