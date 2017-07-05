# iotp-admin

iotp-admin 是基于 vue2 搭建的前端开发框架，集成了 vue2 + vue-router + vuex + axios + element-ui + loadash
等主要的组件/库，对axios等常用的库进行了二次封装，以便在未来的日子里变换相关库时达到最少改动目的，同时也为了方便使用。

特性有哪些？

* vue2 + vue-router + vuex 全家桶
* axios二次封装，全局错误拦截，常用的POST/GET/INPUT/DELETE方法
* 集成Element-UI
* 集成loadash
* 集成字体图标库：font-awsome, iconfont

## 开发规范

使用本框架开发，请遵循以下原则/规范：

### 命名规范

所有js、css、vue文件遵循前端命名规范：

* 全部采用小写方式，以下划线或"-"分隔


``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
