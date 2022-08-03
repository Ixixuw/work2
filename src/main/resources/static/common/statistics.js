<!-- 百度统计-->
var _hmt = _hmt || [];
(function() {
    var key = 'key_' + appSettings.appCode;
    if(!appSettings.appStatisticsConfig){
        return;
    }
    var keyMap = eval('('+appSettings.appStatisticsConfig+')');
    if (keyMap[key]) {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?" + keyMap[key];
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }
})();