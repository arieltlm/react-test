// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

// 其中的主要含义就是说在开发中，注册一个服务来为本地缓存提供服务。这使得应用程序在随后的访问中加载更快，并给出离线脱机的能力。但是，这也意味着开发人员将只看到部署在“N + 1”页面上的更新，因为以前缓存资源在后台更新。核心就是使用serviceWorker来进行缓存。

// 是否使用的 localhost
// 其实就是通过匹配当前地址段，然后将其强制转化成 Boolean 型常量来确定是否是本地环境
var isLocalhost = Boolean(
    window.location.hostname === 'localhost'
    // [::1] is the IPv6 localhost address.
    || window.location.hostname === '[::1]'
    // 127.0.0.1/8 is considered localhost for IPv4.
    || window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// 注册 service worker
export function register(config) {
    // 如果当前是产品环境且浏览器支持 service worker 那么就进行注册操作
    // 之所以要是产品环境是因为开发环境总是进行缓存那么开发者要频繁的清空缓存才能获取最新的内容，这样不利于快速开发
    // 如果浏览器不支持 service worker 那么巧妇难为无米之炊，只能放弃注册

    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    // 生成静态文件夹的路径，service worker 主要是用于缓存静态文件
    // 关于 URL 对象可以参考 https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
        if (publicUrl.origin !== window.location.origin) {
            // 如果静态文件与当前环境不是在同一个域下，那么注册没什么意义，那么直接返回
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }

        // 当页面加载完毕之后才执行 service worker 的一番操作，主要是为了避免阻塞页面的加载
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            // 如果是本地环境进行访问的，那么
            if (isLocalhost) {
                // 调用 checkValidServiceWorker 方法进行注册
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config);
                // 注册成功后控制台打出信息
                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'This web app is being served cache-first by a service '
              + 'worker. To learn more, visit https://goo.gl/SC7cgQ'
                    );
                });
            } else {
                // 如果不是本地地址，那么只注册 service worker
                // 这样做是因为此时已不再是开发环境了，开发者已经将其暴露在外网（网内网）环境中，其它用户已经可以对其进行访问了
                // Is not local host. Just register service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}


// 注册有效的 service worker
// 其中主要是通过注册 service worker 然后使用 service worker 提供的 API 来进行操作
// 比如发现有内容的更新，那么就会自动在后台进行安装，当安装结束之后再判断安装状态分别用用户进行提示
// 当然，也有异常处理，如果发生了异常，那么直接提示错误

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // At this point, the old content will have been purged and
                            // the fresh content will have been added to the cache.
                            // It's the perfect time to display a "New content is
                            // available; please refresh." message in your web app.
                            console.log('New content is available; please refresh.');

                            // Execute callback
                            if (config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error('Error during service worker registration:', error);
        });
}

// 检查 service worker 的状态
// 向 service worker 的后台服务申请资源，如果网络连接失败，或者没有获取到 javascript 那么当 service worker 状态就绪的时候取消其注册状态，并重新加载页面，如果申请到资源，那么就调用 registerValidSW 方法来进行加载。
function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl)
        .then((response) => {
            // Ensure service worker exists, and that we really are getting a JS file.
            if (
                response.status === 404
        || response.headers.get('content-type').indexOf('javascript') === -1
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

// 取消 service worker 的注册
export function unregister() {
    // 如果浏览器支持 service worker 且 service worker 处于就绪状态的时候，那么调用其提供的取消注册方法来进行操作 
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
}
