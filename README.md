# oj3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### 文件清单

```
├─public
└─src
    ├─api
    ├─assets
    ├─common
    ├─components
    │  ├─admin
    │  └─oj
    │      └─common
    ├─router
    ├─store
    ├─utils
    └─views
        ├─admin
        └─oj
            ├─about
            ├─competition
            ├─discuss
            ├─evaluation
            ├─practice
            ├─problem
            ├─rank
            └─team
```



- 4/7 初此发布，实现了项目前端框架，封装了导航栏、代码编辑器等组件
- 4/8 更新了代码编辑器智能提示功能，改善了数据缓存方式
- 4/9 优化了初始加载速度，修复了路由跳转错误导致重新加载的问题
- 4/10 封装了接口调用函数，解决了跨域问题并能成功从远程后台获取数据
- 4/11 完成了题库及题描述页面，可实现代码的编辑、上传
- 4/12 部署了远程的开发环境方便前后数据测试，完善了页面样式内容
- 4/13 完成了添加题目功能，集成markdown编辑器
- 4/14 集成了邮箱验证功能实现用户注册登录
- 4/15 完成了管理系统界面框架，可对用户、题目、竞赛进行后台管理
