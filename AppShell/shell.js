/*
 *
 *	统一处理应用壳的事件
 *
 *
 **/

var indexUrls = ['/weather/index.html', '/news/index.html', '/other/index.html'];
var btns = [].slice.call(document.getElementsByClassName("toolbar__Item__Button"));
btns.forEach(function(v, i) { //v==value　为arr项，i==index　为arr索引

    v.onclick = function() {

        var pathname = window.location.pathname;
        var target = indexUrls[this.getAttribute('tag')];

        if (pathname != target) {
            window.location.href = target;
        }
        console.log(target);
    };
});

/*
 *	注册serviceWorker
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

/*
 *	当执行”添加到主屏幕“的操作时，内部会触发相应的事件beforinstallprompt
 */
window.addEventListener('beforeinstallprompt', function(e) {
    e.userChoice.then(function(result) {
        if (result.outcome == 'dismissed') {
            // 发送数据进行分析
            // 用户取消了
        } else {
            // 发送数据进行分析
            // 用户注册了
        }
    })
})