var Util = {
    //除法函数，⽤来得到精确的除法结果
    //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会⽐较明显。这个函数返回较为精确的除法结果。
    //调⽤：accDiv(arg1,arg2)
    //返回值：arg1除以arg2的精确结果
    accDiv(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {}
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        if (r2 == 0) {
            return Infinity;
        } else {
            return (r1 / r2) * Math.pow(10, t2 - t1);
        }
    },
    //乘法函数，⽤来得到精确的乘法结果
    //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会⽐较明显。这个函数返回较为精确的乘法结果。
    //调⽤：accMul(arg1,arg2)
    //返回值：arg1乘以arg2的精确结果
    accMul(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {}
        try {
            m += s2.split(".")[1].length
        } catch (e) {}

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    //加法函数，⽤来得到精确的加法结果
    //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会⽐较明显。这个函数返回较为精确的加法结果。
    //调⽤：accAdd(arg1,arg2)
    //返回值：arg1加上arg2的精确结果
    accAdd(arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },
    //减法函数
    accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //last modify by deeka
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg2 * m - arg1 * m) / m).toFixed(n);
    },
    /**
     * 获取通过conversion转换后的值  1.001000001 ==>1.001
     * @param value 值
     * @param toFixedNum 需要保留的小数位 除以 后超出的会被舍弃 最多支持6位小数
     * @param conversion 转换率
     */
    getValueByConversion: function (value, toFixedNum, conversion) {
        let float = parseFloat(Util.scienceNumberToTrans(value / conversion));
        if (float.toString().includes('e-')) {
            return "0";
        } else {
            return float.toFixed(toFixedNum);;
        }
    },
    // 科学计数发转换成字符串
    scienceNumberToTrans: function (val) {
        const e = String(val)
        let rex = /^([0-9])\.?([0-9]*)e-([0-9])/
        if (!rex.test(e)) return val
        const numArr = e.match(rex)
        const n = Number('' + numArr[1] + (numArr[2] || ''))
        const num = '0.' + String(Math.pow(10, Number(numArr[3]) - 1)).substr(1) + n;
        if (numArr.input && numArr.input.includes('e-')) {
            const a = numArr.input.substring(numArr.input.indexOf("e-") + 2, numArr.input.length)
            if (a > 9) {
                return '0'
            }
        }
        return num.replace(/0*$/, '') // 防止可能出现0.0001540000000的情况
    },

    getParam: function (paraName) {
        var search = document.location.search,
            reg = new RegExp("[?&]+" + paraName + "=([^&]+)");
        if (search && reg.test(search)) {
            return decodeURIComponent(RegExp['$1']).replace(/\+/g, " ");
        }
        return null;
    },
    request(options) {

        return new Promise((resolve, reject) => {
            if (options.contentType == 'application/json') {
                options.data = JSON.stringify(options.data);
            }
            $.ajax({
                url: appPath + options.url + '?mobileFlag=1&ticketId=' + Util.getParam('ticketId'),
                data: options.data,
                dataType: 'json',
                type: options.method || 'get',
                contentType: options.contentType || 'application/x-www-form-urlencoded',
                success: (res) => {
                    resolve(res);
                },
                error: (error) => {
                    reject(error);
                }
            })
        })

    },
    clone(obj) {
        if (Array.isArray(obj)) {
            var arr = [];
            for (var i = 0; i < obj.length; i++) {
                if (typeof obj[i] !== 'object') {
                    arr.push(obj[i]);
                } else {
                    arr.push(this.clone(obj[i]));
                }
            }
            return arr;
        } else {
            var o = {};
            for (var i in obj) {
                o[i] = obj[i];
            }
            return o;
        }
    },
    ajax: function (options) {
        var ajaxData = {};
        ajaxData['type'] = options['type'] || 'post';
        if (options['url'].indexOf('/mlsc-webupload/') == -1) {
            ajaxData['url'] = appPath + options['url'];
        } else {
            ajaxData['url'] = options['url'];
        }
        if (options['data']) {
            ajaxData['data'] = options['data'];
        }
        ajaxData['dataType'] = 'json';
        if (options['contentType']) {
            ajaxData['contentType'] = options['contentType'];
        }
        ajaxData['async'] = options['async'] === 'undefined' ? true : options['async'];
        ajaxData['success'] = function (data) {
            if (data != null && !data.success) {
                data.msg && console.error(data.msg);
            }
            options['success'] && options['success'](data);
        }
        ajaxData['error'] = function (error) {
            if (options['error']) {
                options['error'](error);
            } else {
                //身份验收失败跳转页面
                if (error.responseJSON.success == false && error.responseJSON.loginUrl) {
                    window.location.href = error.responseJSON.loginUrl;
                }
                console.error(error.status, error.responseText);

            }
        }
        $.ajax(ajaxData);
    },
    /*
   放回area数据结构
   area:{"areaCode":"360000","areaName":"江西省","projectUrl":"http://58.210.204.106:18088","fileUploadUrl":"http://58.210.204.106:18088/mlsc-webupload/service/sys/file/upload"}
    */
    getGMAreaApplyConfigByAreaCode: function (areaCode) {
        var area;
        $.ajax({
            url: '/crossProvince/config/getAreaApplyConfig',
            dataType: 'json',
            type: 'post',
            async: false,
            data: {
                configKey: "areaApplyConfig",
            },
            success: function (result) {
                if (result.success == true) {
                    if (result.data != null && result.data.length > 0) {
                        result.data.forEach(function (e) {
                            if (e.areaCode.substring(0, 2) == areaCode.substring(0, 2)) {
                                area = e;
                            }
                        });
                    }
                } else {
                    area = result.msg;
                }
            }
        });
        return area;
    },
    /*
  放回areaList数据结构
  areaList:[
  {"areaCode":"350000","areaName":"福建省","projectUrl":"http://58.210.204.106:28080","fileUploadUrl":"http://58.210.204.106:18091/mlsc-webupload/service/sys/file/upload"},
  {"areaCode":"360000","areaName":"江西省","projectUrl":"http://58.210.204.106:18088","fileUploadUrl":"http://58.210.204.106:18088/mlsc-webupload/service/sys/file/upload"}]
   */
    getGMAreaApplyConfigList: function () {
        var areaList;
        $.ajax({
            url: '/crossProvince/config/getAreaApplyConfig',
            dataType: 'json',
            type: 'post',
            async: false,
            data: {
                configKey: "areaApplyConfig",
            },
            success: function (result) {
                if (result.success) {
                    if (result.data != null && result.data.length > 0) {
                        for (var i = 0; i < result.data.length; i++) {
                            if (appSettings.areaCode == result.data[i].areaCode) {
                                areaList = result.data;
                                break;
                            }
                        }
                    }
                }
            }
        });
        return areaList;
    },

    /**
     * 获取所有赣闽平台地址
     * @returns {*}
     */
    getAllGMAreaApplyConfigList: function () {
        var areaList;
        $.ajax({
            url: '/crossProvince/config/getAreaApplyConfig',
            dataType: 'json',
            type: 'post',
            async: false,
            data: {
                configKey: "areaApplyConfig",
            },
            success: function (result) {
                if (result.success) {
                    if (result.data != null && result.data.length > 0) {
                        areaList = result.data;
                    }
                }
            }
        });
        return areaList;
    },


    timeFormat: function (data, formatSytle, defaultValue) {
        if (data == null || data == '') return "";
        formatSytle = formatSytle || "YYYY-MM-DD HH:mm:ss";
        if (defaultValue == null || defaultValue == '') {
            return moment(data).format(formatSytle);
        } else {
            return moment(data).add(defaultValue, 'days').format(formatSytle);
        }
    },
    pageOpen: function (pageConfig) {
        var layType = 2;
        switch (pageConfig.type) {
            case 'page':
                layType = 2;
                break;
            case 'div':
                layType = 1;
                break;
            default: {
                console.log('层类型选择有误');
                return;
            }
            break;
        }

        var settings = {
            url: "",
            title: "未定义标题",
            width: "100%",
            height: "100%"
        };
        $.extend(settings, pageConfig);

        var a = layer.open({
            type: layType, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
            title: pageConfig.title,
            shadeClose: pageConfig.shadeClose == false ? false : true,
            shift: 2,
            maxmin: pageConfig.maxmin == true ? true : false,
            // maxmin: true,
            shade: 0.3,
            closeBtn: pageConfig.closeBtn,
            area: [settings.width, settings.height],
            content: (layType == 2) ? settings.url : settings.content,
            scrollbar: false, // 父页面 滚动条 禁止
            //阻止 弹层开启后 Enter回车 遮罩层无限弹
            success: function () {
                $(':focus').blur(); //去焦
            },
        });
        // layer.full(a);
    },
    pageClose: function () {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    },
    numberCheck: function (str) { //校验是否为数字
        var reg = /^[+-]?\d*\.?\d{0,4}$/;
        if (reg.test(str) == true) {
            return str;
        } else {
            return '';
        }
    },
    numberCheckProp: function (rule, value, callback) { //校验是否为数字(包括空数据)
        var reg = /^[+-]?\d*\.?\d{0,4}$/;
        var defaultMessage = "请填写正确的数字";
        if (reg.test(value) == true || value == null) {
            return callback();
        } else {
            if (rule.message === null || rule.message === undefined || rule.message === '') {
                return callback(new Error(defaultMessage));
            } else {
                return callback(new Error(rule.message));
            }
        }
    },
    decimalCheck: function (str, zeroFlag) { //校验是否为长度12的decimal,zeroFlag判断0是否合法 true 允许填0 默认或者false 不允许为0
        var reg = /^(0\.(?!0+$)\d{1,4}|^[1-9][0-9]{0,7}(\.\d{0,4})?)$/;
        if (zeroFlag && str == "0") {
            return str;
        }
        if (reg.test(str) == true) {
            return str;
        } else {
            return '';
        }
    },
    /**
     *校验是否为长度16的decimal
     *
     * zeroFlag  判断0是否合法 true: 允许填0 false: 不允许为0
     * zeroFlag 字段可不传值，不传时 默认允许输入0
     * @author guol
     * @since 20200415
     */
    decimalCheckForSixteen: function (str, zeroFlag) {
        // 整数最多12位，最多保留4位小数
        var reg = /^(0\.(?!0+$)\d{1,4}|^[1-9][0-9]{0,11}(\.\d{0,4})?)$/;
        if (zeroFlag && str == "0") {
            return str;
        }
        if (reg.test(str) == true) {
            return str;
        } else {
            return '';
        }
    },

    isBlankOrNull: function (val) {
        if (val === '' || val == null || val == undefined || val.toString().trim().length == 0) {
            return true;
        }
        return false;
    },
    checkInt: function (val) { //校验正整数
        var reg = /^[0-9]*[1-9][0-9]*$/;
        if (reg.test(val) == true) {
            if (Number(val) > 9999999) {
                return "";
            }
            return val;
        } else {
            return '';
        }
    },
    checkIntIncludeZero: function (val) {
        var reg = /^[0-9][0-9]*$/;
        if (reg.test(val)) {
            if (Number(val) > 99999999) {
                return "";
            }
            return val;
        } else {
            return '';
        }
    },
    validatephaohoneNum: function (rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入手机号!'));
        } else if (!phoneNumReg1.test(value)) {
            callback(new Error('手机号码只能以数字1开头!'));
        } else if (!phoneNumReg2.test(value)) {
            callback(new Error('手机号码只能是数字!'));
        } else if (!phoneNumReg3.test(value)) {
            callback(new Error('手机号码必须是11位数字!'));
        } else {
            callback();
        }
    },
    checkPhone: function (rule, value, callback) { //校验电话+手机 新增的手机号段199/198/166 还有188
        var reg = new RegExp('(^(1)\\d{10}$)');
        var defaultMessage = "请填写正确手机号码";
        if (reg.test(value) == true) {
            return callback();
        } else {
            if (rule.message === null || rule.message === undefined || rule.message === '') {
                return callback(new Error(defaultMessage));
            } else {
                return callback(new Error(rule.message));
            }
        }
    },
    checkEmail: function (rule, value, callback) { //校验邮箱
        if (rule.canEmpty && (value === undefined || value === "" || value === null)) {
            return callback();
        }
        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var defaultMessage = "请填写正确的邮箱";
        if (reg.test(value) == true) {
            return callback();
        } else {
            if (rule.message === null || rule.message === undefined || rule.message === '') {
                return callback(new Error(defaultMessage));
            } else {
                return callback(new Error(rule.message));
            }
        }
    },
    checkCommonNumber: function (rule, value, callback) {
        if (value === undefined || value === "" || value === null) {
            if (rule.canEmpty) {
                return callback();
            } else {

                return callback(new Error(rule.nvlMessage));
            }
        }

        if (rule.canZero && value + "" === "0") {
            return callback();
        }

        var reg = /^(0\.(?!0+$)\d{1,4}|^[1-9][0-9]{0,7}(\.\d{0,4})?)$/;
        if (!reg.test(value)) {
            return callback(new Error(rule.formatMessage));
        }

        return callback();
    },
    /**
     * 校验6位数字邮政编码
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    checkZipCode: function (rule, value, callback) {
        if (value === undefined || value === "" || value === null) {
            if (rule.canEmpty) {
                return callback();
            } else {
                return callback(new Error(rule.nvlMessage));
            }
        }

        var reg = /\d{6}/;
        if (!reg.test(value)) {
            return callback(new Error(rule.formatMessage));
        }

        return callback();
    },
    checkLargeNumber: function (rule, value, callback) {
        if (value === undefined || value === "" || value === null) {
            return callback(new Error(rule.nvlMessage));
        }

        if (rule.canZero && value + "" === "0") {
            return callback();
        }

        var reg = /^(0\.(?!0+$)\d{1,4}|^[0-9]{0,15}(\.\d{0,4})?)$/;
        if (!reg.test(value)) {
            return callback(new Error(rule.formatMessage));
        }

        return callback();
    },
    checkMedicalRegistrationNo: function (rule, value, callback) {
        if (!value) {
            return callback(new Error('请填写医疗机构登记号'));
        }
        var reg = /(^[A-Za-z0-9]{18}$)|(^[A-Za-z0-9]{22}$)|(^[A-Za-z0-9]{24}$)/;
        msg = "医疗机构登记号常见为18、22、24位数字字母结合"
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error(msg));
        }
    },

    checkInstCode: function (rule, value, callback) {
        if (!value) {
            return callback(new Error('请输入统一社会信用代码'));
        }
        var rebase = /^[0-9A-Z-]{1,}$/g;
        msg = "统一社会信用代码常见为18位（数字，大写字母）!";
        if ((rebase.test(value)) &&
            (value.length == 18)) {
            callback();
        } else {
            if (rule.message === null || rule.message === undefined || rule.message === '') {
                callback(new Error(msg));
            } else {
                return callback(new Error(rule.message));
            }
        }
    },
    checkInstCodeBySh: function (rule, value, callback) {
        if (!value) {
            return callback(new Error('请输入统一社会信用代码'));
        }
        var rebase = /^[0-9a-zA-Z-]{1,}$/g;
        var msg = "单位代码为9位,11位,12位,15位,18位,20位,22位或23位（数字，字母）!";
        if (appSettings.areaCode == "350000") {
            rebase = /^[0-9A-Z-]{1,}$/g;
            msg = "单位代码为9位,11位,12位,15位,18位,20位,22位或23位（数字，大写字母）!"
        }
        if ((rebase.test(value)) &&
            (value.length == 9 || value.length == 11 || value.length == 12 || value.length == 15 || value.length == 18 ||
                value.length == 20 || value.length == 22 || value.length == 23)) {
            callback();
        } else {
            callback(new Error(msg));
        }
    },
    checkInstCodeByXMYL: function (rule, value, callback) {
        var rebase = /^[0-9a-zA-Z-]{1,}$/g;
        var msg = "统一社会信用代码或医疗机构执业许可证登记号为数字，字母!"
        if (!value) {
            msg = '请输入统一社会信用代码或医疗机构执业许可证登记号'
        }
        if ((rebase.test(value))) {
            callback();
        } else {
            callback(new Error(msg));
        }
    },


    regVadidate: function (rule, value, callback) {
        if (!value) {
            return callback(new Error(rule.nvlMessage));
        }

        if (rule.dataType && typeof value !== rule.dataType) {
            return callback(new Error(rule.formatMessage));
        }

        if (rule.regPattern) {
            var reg = eval(rule.regPattern);
            if (!reg.test(value)) {
                return callback(new Error(rule.formatMessage));
            }
        }

        return callback();
    },
    checkBlankOrNull: function (rule, value, callback) {
        if (Util.isBlankOrNull(value)) {
            return callback(new Error(rule.formatMessage));
        }
        return callback();
    },
    getCurrentMonthFirst: function () {
        var date = new Date();
        date.setDate(1);
        return date;
    },
    getMonthFirst: function (date) {
        date.setDate(1);
        return date;
    },
    getCurrentMonthLast: function () {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    },
    getMonthLast: function (date) {
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    },
    isIMGForVueUpload: function (file, fileList) {
        var imgType = file.type || file.raw.type;
        if (!/.(jpg|jpeg|png|gif)$/.test(imgType)) {
            fileList.splice(fileList.length - 1, 1);
            return false;
        }
        return true;
    },
    isTextFileVueUpload: function (file, fileList) {
        var textType = file.name;
        if (!/.(doc|docx|pdf)$/.test(textType)) {
            fileList.splice(fileList.length - 1, 1);
            return false;
        }
        return true;
    },
    isPDFFileVueUpload: function (file, fileList) {
        var textType = file.name;
        if (!/.(pdf)$/.test(textType)) {
            fileList.splice(fileList.length - 1, 1);
            return false;
        }
        return true;
    },
    //判断文件为pdf跟图片格式
    isPDFOrIMGFileVueUpload: function (file, fileList) {
        var textType = file.name;
        if (!/.(pdf|jpg|jpeg|png|gif)$/.test(textType)) {
            fileList.splice(fileList.length - 1, 1);
            return false;
        }
        return true;
    },
    cancelPageDelForVueUpload: function (file, fileList) {
        fileList.push(file);
        // array sort can triggers view update
        fileList.sort(function (o, p) {
            return o.uid > p.uid;
        });
    },
    pagePseudoDelForVueUpload: function (file, fileList) {
        $.each(fileList, function (i) {
            if (this.uid === file.uid) {
                fileList.splice(i, 1);
                return false;
            }
        });
    },
    /**
     * 校验element-ui form表单 无效性
     * @return 有效 返回 false
     *         无效 返回 true
     */
    isInValiditionForVueForm: function (formRef, vue) {
        var flag = true;
        vue.$refs[formRef].validate(function (valid) {
            if (valid) {
                flag = false;
            }
        });
        return flag;
    },
    /**
     * 序列化为无引用的JSON对象
     * @return 返回一个非引用的JSON对象
     */
    serializeToJsonForNotRef: function (json) {
        return JSON.parse(JSON.stringify(json));
    },
    /**
     * element-ui 动态表格合并行
     */
    spanMethodForRowSpan: function (option) {
        if (!$.isPlainObject(option)) {
            throw new Error('option expected is object, but is not');
        }

        if (!option.columnIndexs.some(function (columnIndex) {
                return option.currentRow.columnIndex == columnIndex;
            })) {
            return;
        }

        var rowspanBy = option.rowspanBy[String(option.currentRow.columnIndex)];
        var len = option.dataSource.filter(function (row) {
            return row[rowspanBy] == option.dataSource[option.currentRow.rowIndex][rowspanBy];
        }).length;

        if (len <= 1) {
            return;
        }

        if (option.currentRow.rowIndex === 0 ||
            option.dataSource[option.currentRow.rowIndex][rowspanBy] !=
            option.dataSource[option.currentRow.rowIndex - 1][rowspanBy]) {
            return {
                rowspan: len,
                colspan: 1
            };
        } else {
            return {
                rowspan: 0,
                colspan: 0
            };
        }
    },
    /**
     * 行政区化列表使用Cascader 级联选择器代替树型结构的通过areaCode数组获取到相对应的arealevel
     */
    getLevelByareaCode: function (defaultAreaCodeArray) {
        if (defaultAreaCodeArray.length == 1 && defaultAreaCodeArray[defaultAreaCodeArray.length - 1] != '000000') {
            if (defaultAreaCodeArray[0].substring(2, 6) == '0000') {
                return '1';
            } else if (defaultAreaCodeArray[0].substring(4, 6) == '00') {
                return '2';
            } else {
                return '3';
            }

        } else if (defaultAreaCodeArray.length == 1 && defaultAreaCodeArray[defaultAreaCodeArray.length - 1] == '000000') {
            return '0';
        } else if (defaultAreaCodeArray.length == 2) {
            if (defaultAreaCodeArray[0] == '000000') {
                return '1';
            } else if (defaultAreaCodeArray[0].substring(2, 6) == '0000') {
                return '2';
            } else if (defaultAreaCodeArray[0].substring(4, 6) == '00') {
                return '3'
            }
        } else if (defaultAreaCodeArray.length == 3 && defaultAreaCodeArray[0] != '000000') {
            return '3'
        } else if (defaultAreaCodeArray.length == 3 && defaultAreaCodeArray[0] == '000000') {
            return '2'
        } else if (defaultAreaCodeArray.length == 4) {
            return '3';
        }
    },
    initDefaultArea: function (areaCode, ticketId) { //行政区划默认值
        var areaCodeArr = [];
        var requestData = {
            ticketId: ticketId,
            areaCode: areaCode
        };
        $.ajax({
            url: '/enterpriseExtended/getCountryEntFullCodeAndName',
            dataType: 'json',
            type: 'post',
            data: requestData,
            async: false,
            success: function (result) {
                if (result.success) {
                    areaCodeArr = result.obj.areaFullCode.split(",");
                }
            }
        });
        return areaCodeArr;
    },
    singleAdd: function (a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (Util.floatMul(a, e) + Util.floatMul(b, e)) / e;
    },
    floatAdd: function () {
        var result = 0;
        if (arguments.length > 0) {
            for (var index = 0; index < arguments.length; index++) {
                result = Util.singleAdd(result, arguments[index])
            }
        }
        return result;
    },
    floatSub: function (a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (Util.floatMul(a, e) - Util.floatMul(b, e)) / e;
    },
    floatMul: function (a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },
    floatDiv: function (a, b) {
        var c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch (g) {}
        try {
            f = b.toString().split(".")[1].length;
        } catch (g) {}
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), Util.floatMul(c / d, Math.pow(10, f - e));
    },
    checkParamIsEmpty: function () {
        var result = false;
        if (arguments.length > 0) {
            for (var index = 0; index < arguments.length; index++) {
                if (Util.isBlankOrNull(arguments[index])) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    },

    checkNumberDecimal: function (rule, value, callback) {
        if (value === "" || value === null) {
            return callback(new Error(rule.formatMessage));
        } else {
            if (value.split(".")[0].length > 12) {
                var reg = /^(0|[1-9][0-9]{0,14})(\.\d{1,1})?$/;
                if (!reg.test(value)) {
                    return callback(new Error(rule.formatMessageFirst));
                }
            } else {
                var reg = /^(0|[1-9][0-9]{0,11})(\.\d{1,4})?$/;
                if (!reg.test(value)) {
                    return callback(new Error(rule.formatMessageSecond));
                }
            }
            return callback();
        }
    },
    showConfirmDialog: function (self, content, confirmFunc, cancelFunc) {
        self.$confirm(content, "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showClose: true,
            closeOnClickModal: false,
            closeOnPressEscape: true,
            dangerouslyUseHTMLString: true,
            type: 'warning'
        }).then(confirmFunc).catch(cancelFunc);
        //取消确认按钮的焦点
        setTimeout(function () {
            $(':focus').blur();
        }, 10);
    },
    //校验字符串中是否包含单引号和双引号
    checkString: function (rule, value, callback) {
        var defaultMessage = "请填写正确的格式，不能包含单引号和双引号";
        if (value.indexOf('\'') > -1 || value.indexOf('\"') > -1) {
            if (rule.message === null || rule.message === undefined || rule.message === '') {
                return callback(new Error(defaultMessage));
            } else {
                return callback(new Error(rule.message));
            }
        } else {
            return callback();
        }
    },
    //第一步就是在提交的时候需要控制上传文件的状态，一个一个的提交，先将第一个设置为ready，其余的设置为waiting，只有ready状态才会上传
    changeStatusByStepOne: function (self, listName, type) {
        var j = 0;
        //var list = self[listName];
        var list = self.$refs[listName].uploadFiles;
        if (list.length > 1) {
            for (var i = 0; i < list.length; i++) {
                var t = list[i];
                if (t.status === 'ready') {
                    j = i;
                    break;
                }
            }
            for (var k = j + 1; k < list.length; k++) {
                var t = list[k];
                if (t.status === 'ready') {
                    if ((type == '' || type == null || type == undefined)) {
                        list[k].status = 'waiting';
                    } else {
                        if (k != list.length - 1) {
                            list[k].status = 'waiting';
                        }
                    }

                }
            }
            self.$refs[listName].uploadFiles = list;
        }
    },
    getUploadElementType: function (file, uploadName, vm) {
        var type = '';
        var newArr = [];
        for (var i = uploadName.length - 1; i >= 0; i--) {
            if (vm.uploadFileLen[uploadName[i].replace(/upload/, "")] > 0) {
                newArr.push(uploadName[i]);
            }
        }
        for (var i = newArr.length - 1; i >= 0; i--) {
            for (var j = vm.$refs[newArr[i]].uploadFiles.length - 1; j >= 0; j--) {
                if (file.uid == vm.$refs[newArr[i]].uploadFiles[j].uid) {
                    if (vm.$refs[newArr[i]].uploadFiles[j].response.success == "false" ||
                        !vm.$refs[newArr[i]].uploadFiles[j].response.success) {
                        vm.$refs[newArr[i]].uploadFiles[j].status = 'ready';
                    }
                    type = newArr[i];
                    return type;
                }
            }
        }

    },
    /**
     * 配合审计，根据stockModifyDateLimit固化数据
     * @param value
     * @param vm
     * @returns {boolean}
     */
    curingData: function (value, vm, msg) {
        var str = '配合审计截止' + appSettings.stockModifyDateLimit + '的数据不允许进行该操作！';
        if (msg) {
            str = msg;
        }
        if (value <= appSettings.stockModifyDateLimit) {
            vm.$message({
                message: str,
                type: 'error'
            });
            return true;
        }
        return false;
    },

    timeInterval: function (beginDate, endDate) {
        return ((Date.parse((endDate).replace(/-/g, "/")) - Date.parse(beginDate.replace(/-/g, "/")))) / (1 * 24 * 60 * 60 * 1000) + 1;
    },

    isLeapYear: function (year) {
        return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
    },

    //校验对象中是否含有特殊字符(只检查字符串)，校验成功返回空，否则返回有特殊字符的数据
    checkSpecialCharacter: function (obj) {
        if (Object.prototype.toString.call(obj) === '[object String]') {
            return this.checkCharacter(obj);
        }
        if (Object.prototype.toString.call(obj) === '[object Object]') {
            for (var key in obj) {
                if (Object.prototype.toString.call(obj[key]) === '[object String]') {
                    var tempStr = this.checkCharacter(obj[key]);
                    if (tempStr != '') {
                        return tempStr;
                    }
                }
                if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
                    var temp2 = this.checkSpecialCharacter(obj[key]);
                    if (temp2 != '') {
                        return temp2;
                    }
                }

                if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
                    for (var arr in obj[key]) {
                        var temp3 = this.checkSpecialCharacter(obj[key][arr]);
                        if (temp3 != '') {
                            return temp3;
                        }
                    }
                }
            }
        }
        return '';
    },
    checkCharacter: function (s) {
        var regEn = /[`@#$^&*"{}']/im,
            regCn = /[#￥——“”‘]/im;

        if (regEn.test(s) || regCn.test(s)) {
            return s;
        }
        return '';
    },
    /**
     * Ajax已POST方式请求服务
     * @param url       请求服务地址 (必须)
     * @param data      请求参数数据
     * @param callFn    服务响应成功回调函数，ajax的success函数
     * @param async     是否是异步请求
     * @param errorFn   服务响应失败回调函数，ajax的error函数
     * @returns {*}
     */
    post: function (url, data, callFn, async, errorFn, timeout) {
        return this.ajaxExcute(url, data, callFn, async, "POST", errorFn, null, timeout);
    },
    postEncrypt: function (url, data, callFn, async, errorFn, timeout) {
        return this.ajaxExcute(url, data, callFn, async, "POST", errorFn, null, timeout, true);
    },
    /**
     * 设置ajax的contentType="application/json; charset=UTF-8"， 同时将data转成json字符JSON.stringify(data)
     * @param url       请求服务地址 (必须)
     * @param data      请求参数数据
     * @param callFn    服务响应成功回调函数，ajax的success函数
     * @param async     是否是异步请求
     * @param errorFn   服务响应失败回调函数，ajax的error函数
     * @returns {*}
     */
    postJson: function (url, data, callFn, async, errorFn, timeout) {
        return this.ajaxExcute(url, JSON.stringify(data), callFn, async, "POST", errorFn, "application/json; charset=UTF-8", timeout);
    },
    postJsonEncrypt: function (url, data, callFn, async, errorFn, timeout) {
        return this.ajaxExcute(url, data, callFn, async, "POST", errorFn, "application/json; charset=UTF-8", timeout, true);
    },
    /**
     * Ajax已GET方式请求服务
     * @param url       请求服务地址 (必须)
     * @param data      请求参数数据
     * @param callFn    服务响应成功回调函数，ajax的success函数
     * @param async     是否是异步请求
     * @param errorFn   服务响应失败回调函数，ajax的error函数
     * @returns {*}
     */
    get: function (url, data, callFn, async, errorFn, timeout) {
        return this.ajaxExcute(url, data, callFn, async, "GET", errorFn, null, timeout);
    },
    getEncrypt: function (url, data, callFn, async, errorFn, timeout) {
        return this.ajaxExcute(url, data, callFn, async, "GET", errorFn, null, timeout, true);
    },
    decrypt: function (word, key) { //解密方法
        if (word) {
            key = key || CryptoJS.enc.Utf8.parse(appSettings['aesSecurityKey']);
            var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
            var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
            var decrypt = CryptoJS.AES.decrypt(srcs, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            return decryptedStr.toString();
        } else {
            return word;
        }
    },
    encrypt: function (word, key) { //加密方法
        if (word) {
            key = key || CryptoJS.enc.Utf8.parse(appSettings['aesSecurityKey']);
            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.ciphertext.toString().toUpperCase();
        } else {
            return word;
        }
    },
    ajaxExcute: function (url, data, callFn, async, type, errorFn, contentType, timeout, encrypt) {
        if (!url) {
            return;
        }
        var encryptKey = "";
        var jsonResult = {};
        var ticketId = Util.getParam("ticketId");
        var ajaxUrl = (url.indexOf('http://') != -1 || url.indexOf('https://') != -1) ? url : appSettings.webSiteRoot + url;
        if (encrypt) {
            encryptKey = CryptoJS.enc.Utf8.parse(appSettings['aesSecurityKey']);
            data = Util.encrypt(JSON.stringify(data), encryptKey);
            contentType = "application/json; charset=UTF-8";
        }
        var ajaxRequest = $.ajax({
            url: ajaxUrl + ((url.indexOf('?') == -1) ? "?" : "&") + (ticketId ? "ticketId=" + ticketId : ''),
            // dataType: 'json',
            type: type || 'POST',
            timeout: timeout || 30000,
            async: async ===false ? false : true,
            contentType: contentType || "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            success: function (result) {
                if (ajaxUrl.indexOf("/checkLoginStatus") == -1) {
                    if (encrypt) {
                        if (typeof result === 'object') {
                            result.obj = result.obj ? JSON.parse(Util.decrypt(result.obj, encryptKey)) : result.obj;
                            result.data = result['dataStr'] ? JSON.parse(Util.decrypt(result['dataStr'], encryptKey)) : result.data;
                            result['dataStr'] = '';
                        } else if (!result['success']) {
                            result = JSON.parse(Util.decrypt(result, encryptKey));
                        }
                    } else if (typeof result === "string") {
                        result = JSON.parse(result);
                    }
                    result.data = result.data || [];
                    jsonResult = result;
                }
                if (typeof callFn === 'function') {
                    callFn(result);
                }
            },
            error: function (jqXHR, textStatus, errorMsg) { // 出错时默认的处理函数
                ajaxRequest.abort();
                if (typeof errorFn === "function") {
                    errorFn(jqXHR, textStatus, errorMsg);
                } else {
                    ajaxError(jqXHR, textStatus);
                }
            },
        });
        return jsonResult;
    },
    viewBatteryEntDetail(entId, type, entName) {
        let entType;
        if (type == "CF_ENT") {
            entType = "viewProduceEnt"
        } else if (type == "WD") {
            entType = "viewEntWD"
        } else {
            entType = "viewDisposeEnt"
        }
        let pageUrl = `/main/view/enterprise/register/inside/${entType}.html?ticketId=${Util.getParam('ticketId')}&entId=${entId}&isOtherProvince=0&enterpriseStatus=2&openedBy=batEpaView`;
        var configs = {
            url: pageUrl,
            type: 'page',
            title: entName + "详情"
        };
        Util.pageOpen(configs);
    }
};
/**
 * 根据列表需要的状态进行转换
 * 全局：【s0 编辑 s1 有效 s2 无效】
 * @param s
 * @returns {string}
 */
function getIconCSS(s, type) {
    if (type == 'erp_bill') {
        switch (s) {
            case '0':
                return 's0';
            case '1':
                return 's1';
            case '2':
                return 's2';
            case '3':
                return 's5';
            case '4':
                return 's2';
            case '5':
                return 's8';
            case '6':
                return 's6';
            case '7':
                return 's9';
            case '8':
                return 's2';
            default:
                return '';
        }
    }
    if (type == 'transferManifest') {
        switch (s) {
            case '1':
                return 's1';
            case '0':
                return 's2';
            case '9':
                return 's9';
            default:
                return '';
        }
    }
    if (type == 'wasteProduceDetail') {
        switch (s) {
            case '0':
                return 's0';
            case '2':
                return 's3';
            case '3':
                return 's1';
            case '4':
                return 's6';
            default:
                return '';
        }
    }
    if (type == 'bill') {
        switch (s) {
            case '0':
                return 's1';
            case '1':
                return 's2';
            case '2':
                return 's0';
            case '3':
                return 's3';
            case '4':
                return 's4';
            default:
                return '';
        }
    }
    if (type == 'managementPlan') {
        switch (s) {
            case 'INEDIT':
                return 's0';
            case 'WORKED':
                return 's1';
            case 'INRECORD':
                return 's3';
            case 'RECORDED':
                return 's7';
            case 'RETURNED':
                return 's8';
            case 'ONFILE':
                return 's9';
            case 'FIRSTAUDIT':
                return 's3';
            case 'SECONDAUDIT':
                return 's3';
            case 'THIRDAUDIT':
                return 's3';
            default:
                return '';
        }
    }
    if (type == 'storage') {
        switch (s) {
            case '0':
                return 's0'
            case '2':
                return 's3';
            case '3':
                return 's1';
            default:
                return '';
        }
    }
    if (type === 'xkzcx') {
        switch (s) {
            case '0':
                return 's7';
            case '1':
                return 's1';
            case '2':
                return 's2';
            case '3':
                return 's3';
            case '4':
                return 's8';
            case '8':
                return 's9';
            default:
                return '';
        }
    }
    if (type === 'listShHbj') {
        switch (s) {
            case '0':
                return 's9';
            case '1':
                return 's1';
            case '2':
                return 's2';
            default:
                return '';
        }
    }
    if (type === 'normSystem') {
        switch (s) {
            case 'EDITING':
                return 's7';
            case 'EFFECTIVE':
                return 's1';
            case 'HISTORY':
                return 's8';
            default:
                return '';
        }
    }
    if (type === 'collecting') {
        switch (s) {
            case '0':
                return 's1';
            case '1':
                return 's2';
            case '2':
                return 's3';
            case '3':
                return 's0';
            default:
                return '';
        }
    }
    if (type === 'drill') {
        switch (s) {
            case 'edit':
                return 's0';
            case 'effect':
                return 's1';
            case 'invalid':
                return 's2';
            default:
                return '';
        }
    }
    if (type === 'customsapply') {
        switch (s) {
            case 'edit':
                return 's0';
            case 'recorded':
                return 's1';
            case 'recordBack':
                return 's2';
            case 'recording':
                return 's3';
            default:
                return '';
        }
    }
    if (type === 'manifest') {
        switch (s) {
            case '1':
                return 's8';
            case '2':
                return 's9';
            case '3':
                return 's1';
            case '4':
                return 's3';
            case '5':
                return 's2';
            case 'a':
                return 's5';
            case 'c':
                return 's6';
            case 'd':
                return 's7';
            default:
                return '';
        }
    }
    return 's' + s;
}

function getStatusIcon(s, type) {
    return "<i class='iconfont icon-status " + getIconCSS(s, type) + "'></i>"
}

function checkNumber(event) {
    if (event.keyCode != 46 && event.keyCode < 48 || event.keyCode > 57)
        event.returnValue = false;
}

var Ajax = {
    async: {
        jsonPost: function (config) {
            $.ajax({
                url: config.url,
                type: 'post',
                data: JSON.stringify(config.data),
                contentType: 'application/json',
                dataType: 'json',
                success: config.success
            })
        },
    },
    sync: {}
};

function ajaxError(jqXHR, textStatus) {

}

var ResUtil = {
    post: function (url, resCode, jsonParam, certCode) {
        var existJsonParam = (jsonParam != null && jsonParam != '' && jsonParam != {} && jsonParam != undefined);
        var jsonResult = {};
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {
                "resVer": 1,
                "resCode": resCode,
                "certCode": certCode || 'sc-res-18888888888',
                "current": existJsonParam ? jsonParam.current : '',
                "size": existJsonParam ? jsonParam.size : '',
                "jsonParam": existJsonParam ? JSON.stringify(jsonParam) : '',
            },
            success: function (result) {
                jsonResult = result;
            }
        });
        return jsonResult;
    },
    asyncPost: function (url, resCode, jsonParam, callFn, certCode) {
        var existJsonParam = (jsonParam != null && jsonParam != '' && jsonParam != {} && jsonParam != undefined);
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            data: {
                "resVer": 1,
                "resCode": resCode,
                "certCode": certCode || 'sc-res-18888888888',
                "current": existJsonParam ? jsonParam.current : '',
                "size": existJsonParam ? jsonParam.size : '',
                "jsonParam": existJsonParam ? JSON.stringify(jsonParam) : '',
            },
            success: function (result) {
                callFn(result);
            }
        });
    },
    get: function (url, resCode, jsonParam, certCode) {
        var existJsonParam = (jsonParam != null && jsonParam != '' && jsonParam != {} && jsonParam != undefined);
        var jsonResult = {};
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            async: false,
            data: {
                "resVer": 1,
                "resCode": resCode,
                "certCode": certCode || 'sc-res-18888888888',
                "current": existJsonParam ? jsonParam.current : '',
                "size": existJsonParam ? jsonParam.size : '',
                "jsonParam": existJsonParam ? JSON.stringify(jsonParam) : '',
            },
            success: function (result) {
                jsonResult = result;
            }
        });
        return jsonResult;
    },
    asyncGet: function (url, resCode, jsonParam, callFn, certCode) {
        var existJsonParam = (jsonParam != null && jsonParam != '' && jsonParam != {} && jsonParam != undefined);
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            data: {
                "resVer": 1,
                "resCode": resCode,
                "certCode": certCode || 'sc-res-18888888888',
                "current": existJsonParam ? jsonParam.current : '',
                "size": existJsonParam ? jsonParam.size : '',
                "jsonParam": existJsonParam ? JSON.stringify(jsonParam) : '',
            },
            success: function (result) {
                callFn(result);
            }
        });
    },
};

//强密码校验返回结果
function getValidResult(psw) {
    var validResult = '';
    if (appSettings.isLoginCheckPassword && "true" === appSettings.isLoginCheckPassword) {
        if (isDigital.test(appSettings.passwordMinLength)) {
            if (parseInt(appSettings.passwordMinLength) <= 8 && psw.length < parseInt(appSettings.passwordMinLength)) {
                if (passwordLengthMinReg.test(psw)) {
                    validResult = passwordLengthMinMsg;
                    return validResult;
                }
            } else if (parseInt(appSettings.passwordMinLength) > 8) {
                var minRegStr = "(^.{" + parseInt(appSettings.passwordMinLength) + ",50}$)";
                var minMsg = "密码长度不能小于" + appSettings.passwordMinLength + "位";
                var minReg = new RegExp(minRegStr);
                if (minReg.test(psw)) {
                    validResult = minMsg;
                    return validResult;
                }
            }
        } else {
            if (passwordLengthMinReg.test(psw)) {
                validResult = passwordLengthMinMsg;
                return validResult;
            }
        }
        if (isDigital.test(appSettings.passwordMaxLength)) {
            if (parseInt(appSettings.passwordMaxLength) <= 20 && psw.length > parseInt(appSettings.passwordMaxLength)) {
                if (passwordLengthMaxReg.test(psw)) {
                    validResult = passwordLengthMaxMsg;
                    return validResult;
                }
            } else if (parseInt(appSettings.passwordMaxLength) > 20) {
                var maxRegStr = "(^.{" + parseInt(appSettings.passwordMaxLength) + ",50}$)";
                var maxMsg = "密码长度不能大于" + appSettings.passwordMaxLength + "位";
                var maxReg = new RegExp(maxRegStr);
                if (maxReg.test(psw)) {
                    validResult = maxMsg;
                    return validResult;
                }
            }
        } else {
            if (passwordLengthMaxReg.test(psw)) {
                validResult = passwordLengthMaxMsg;
                return validResult;
            }
        }
        if (isDigital.test(appSettings.passwordNotAllowedConsecutiveNumber)) {
            if (parseInt(appSettings.passwordNotAllowedConsecutiveNumber) !== 0) {
                if (parseInt(appSettings.passwordNotAllowedConsecutiveNumber) === 3) {
                    if (checkSeqThree(psw)) {
                        validResult = passwordCheckSeqMsg3;
                        return validResult;
                    }
                } else if (parseInt(appSettings.passwordNotAllowedConsecutiveNumber) === 4) {
                    if (checkSeqFour(psw)) {
                        validResult = passwordCheckSeqMsg4;
                        return validResult;
                    }
                }
            }
        } else {
            if (checkSeqFour(psw)) {
                validResult = passwordCheckSeqMsg4;
                return validResult;
            }
        }
        if (isDigital.test(appSettings.passwordCombinationType)) {
            if (parseInt(appSettings.passwordCombinationType) === 1) {
                if (!(digitalReg.test(psw) ||
                        upperCaseReg.test(psw) ||
                        lowerCaseReg.test(psw) ||
                        specialReg.test(psw))) {
                    validResult = passwordComplexOneMsg;
                    return validResult;
                }
            } else if (parseInt(appSettings.passwordCombinationType) === 2) {
                if (!(digitalAndUpperCaseReg.test(psw) ||
                        digitalAndLowerCaseReg.test(psw) ||
                        digitalAndSpecialReg.test(psw) ||
                        upperAndLowerCaseReg.test(psw) ||
                        upperAndSpecialReg.test(psw) ||
                        lowerAndSpecialReg.test(psw))) {
                    validResult = passwordComplexTwoMsg;
                    return validResult;
                }
            } else if (parseInt(appSettings.passwordCombinationType) === 3) {
                if (!(digitalAndUpperAndLowerReg.test(psw) ||
                        digitalAndUpperAndSpecialReg.test(psw) ||
                        upperAndLowerAndSpecialReg.test(psw))) {
                    validResult = passwordComplexThreeMsg;
                    return validResult;
                }
            } else {
                if (!digitalAndUpperAndLowerAndSpecialReg.test(psw)) {
                    validResult = passwordComplexFourMsg;
                    return validResult;
                }
            }
        } else {
            if (!digitalAndUpperAndLowerAndSpecialReg.test(psw)) {
                validResult = passwordComplexFourMsg;
                return validResult;
            }
        }
    }
    return validResult;
};