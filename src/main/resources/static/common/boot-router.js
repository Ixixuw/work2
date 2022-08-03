if (!window.isBootloaded) {
    __CreateJSPath = function (js) {
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
        var ss = href.split("/");
        ss.length = ss.length - 1;
        href = ss.join("/");
        if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
            path = href + "/" + path;
        }
        return path;
    }

    var bootPATH = __CreateJSPath("boot-router.js");
    bootPATH = bootPATH.replace("common/", "");
    var appPath = bootPATH;
    // var appPath = 'http://192.168.253.145:8088';
    // var appPath = 'http://192.168.253.236:8787';
    document.write('<link href="' + bootPATH + 'common/elementui/index.css" rel="stylesheet" />');
    document.write('<link href="' + bootPATH + 'common/font-icon/iconfont.css" rel="stylesheet" />');
    document.write('<script src="' + bootPATH + 'common/jquery/jquery.min.js"></script>');
    document.write('<script src="' + bootPATH + 'common/vue/vue.js"></script>');
    document.write('<script src="' + bootPATH + 'common/vue/vuex.min.js"></script>');
    document.write('<script src="' + bootPATH + 'common/vue/vue-router.js"></script>');
    document.write('<script src="' + bootPATH + 'common/elementui/index.js"></script>');
    document.write('<script src="' + bootPATH + 'common/moment/moment.js"></script>');
    document.write('<script src="' + bootPATH + 'common/seajs/sea2.3.js"></script>');
    document.write('<script src="' + bootPATH + 'common/seajs/seajs-text.js"></script>');
    document.write('<script src="' + bootPATH + 'common/seajs/seajs-css.js"></script>');
    document.write('<script src="' + bootPATH + 'common/vue-util.js"></script>');
    window.console = window.console || (function () {
        var c = {};
        c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () {};
        return c;
    })();
    window.isBootloaded = true;


};