/*!
 * 
 * 新固废前台定义的常数
 */

var returnCitySN = returnCitySN || {cid: '', cname: '', cip: ''};

//时间选择框是否可以手填 true 可以手填，false 不可以手填
var isCanEdit = true;
/**
 * 前端数据计算保留小数位数常量
 * @type {number}
 */
var REPORT_SCALE = 6;
var SCALE = 4;
/**
 * 重量单位 转换率常量
 * 以吨为基准
 * 1T = 1000Kg
 * 1T = 1000000G
 */
var CONVERSION_G = 1000000; //克
var CONVERSION_KG = 1000; //千克
var CONVERSION_T = 1; //吨/只

/**加载系统配置文件**/
var appSettings = {
    fileUploadUrl: '',
    dictionaryStorage: '',
};

Util.ajax({
    url: "/config/getConfigByKeysWithEncrypt?ticketId=" + (Util.getParam("ticketId") || ''),
    data: {
        'keys': $.base64.encode(Object.keys(appSettings).join(','))
    },
    dataType: 'json',
    type: 'POST',
    async: false,
    success: function (result) {
        var data = JSON.parse(strAnsi2Unicode(decode64(result.obj)));
        appSettings.uploadServer = data.fileUploadUrl;
        $.extend(true, appSettings, data);
    },
    error: function (er) {
    }
});
var dictionaryStorage = appSettings.dictionaryStorage || 'dev';

var i18n;
try {
    i18n = new VueI18n({
        locale: dictionaryStorage,
        fallbackLocale: 'dev',
        messages,
    });
} catch (e) {

}
var dialog = {
    _otip: null, //全局变量 判断是否存在div,
    show: function (param, callFn) {
        var id = param.id;
        var url = param.url;
        var mask = param.mask;
        var detail = "";
        var masklayout = $('<div id="masklayout" style="position:fixed;left:0;top:0;right:0;bottom:0;background-color: rgba(0, 0, 0, 0.4);filter:alpha(opacity=50);opacity:.3;display:block;overflow-x:hidden;overflow-y:auto;"></div>');

        if (mask == "1") {
            $("body").append(masklayout);
        }
        detail = '<div class="dialog-win" style="position:fixed;z-index:9999;">';
        if (id != null) {
            detail = detail + $(id).html();
        }
        if (param.content != null) {
            detail = detail + param.content;
        }
        if (url != null) {
            detail = detail + $.ajax({
                url: data,
                async: false
            }).responseText;
        }
        detail = detail + '</div>';


        var win = $(detail);
        if (param.width != null) {
            win.css('width', param.width);
        }
        if (param.height != null) {
            win.css('height', param.height);
        }

        win.find(".dialog").show();
        $("body").append(win);
        //设置对话框宽度和高度
        var x = parseInt($(window).width() - win.outerWidth()) / 2;
        var y = parseInt($(window).height() - win.outerHeight()) / 2;
        if (y <= 10) {
            y = "10"
        }
        win.css({
            "left": x,
            "top": y
        });

        $("#confimDialogBtn").click(function () {
            callFn && callFn();
            window.ajaxErrorFn && window.ajaxErrorFn();
            win.remove();
            $("body").mLoading('hide');
            $('#masklayout').remove();
        });

        masklayout.click(function () {
            callFn && callFn();
            window.ajaxErrorFn && window.ajaxErrorFn();
            win.remove();
            $(this).remove();
        });
    },
    alert: function (msg, callFn) {
        var resMsg = '填报数据：【' + htmlEscape(msg) + '】，存在特殊字符，请删除后再进行提交！';
        if (msg == 'error') {
            resMsg = '您输入的内容存在特殊字符，请删除后再进行提交！';
        }
        var content = '<div id="alert" xmlns="http://www.w3.org/1999/html">' +
            '<div class="dialog" style="padding:0; border:1px solid #ddd;box-shadow:0 3px 9px rgba(0, 0, 0, 0.5);border-radius:4px;background-color:#fff;z-index:11;display:none;">' +
            '<div class="dialog-head" style="padding:10px 20px;border-bottom:solid 1px #ddd;background-color:#f5f5f5;border-radius:4px 4px 0 0;"><span class="close" style="float:right;line-height:24px;"></span><strong style="font-size:16px;">信息提示</strong></div>' +
            '<div class="dialog-body" style="padding:35px 20px;">' + resMsg + '</div>' +
            '<div class="dialog-foot" style="padding:10px 20px;text-align:right;border-top:solid 1px #ddd;">' +
            '<button id="confimDialogBtn" style=" height: 35px;line-height: 35px;background: #238ccc;font-size: 16px; color: #fff;border: none; padding: 0 20px;">确认</button>' +
            '</div>' +
            '</div>' +
            '</div>';
        this.show({
            content: content,
            height: 300,
            width: 400,
            mask: '1'
        }, callFn);
    }
};

function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
        }
    });
}
