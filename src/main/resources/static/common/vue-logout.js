//账号在其他地方退出登录后页面一直在加载中问题处理
$(document).ajaxComplete(function (event, xhr, options) {
    var sessionstatus = xhr.getResponseHeader("sessionstatus");//通过XMLHttpRequest取得响应头，sessionstatus，
    if (sessionstatus == "timeout") {  //如果超时就处理 ，指定要跳转的页面
        //各个页面需要单独处理
        // window.location.replace("/main/vue-logout.html");
    }
})