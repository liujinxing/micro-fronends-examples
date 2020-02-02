# 基于 React 实现的微前端架构实现示例

[微前端](https://martinfowler.com/articles/micro-frontends.html)类似微服务，是一种降低大型前端软件开发复杂度的架构。

大家可以查看下面一些文章，学习更多微前端架构理论部分：

- [技术雷达：微前端](https://www.thoughtworks.com/radar/techniques/micro-frontends)
- [Martin FLower: Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)
- [微前端](https://micro-frontends.org/)

## 团队采纳微前端架构的意图

所在团队之所以要采纳微前端架构，确实是因为在构建大型前端项目时遇到了极大地困难：

- 多个独立团队并行开发，但是却需要一起打包和部署。因为代码太大，打包速度非常缓慢。
- 有一个跨部门的项目，各个部门的团队采纳的开发技术不一样。
- 每个开发团队很难再针对自己开发的项目做编程优化、打包优化、运行优化。

## 架构实现概述

为每个模块提供一个单独的 React 运行环境，独立处理路由。提供一个总的运行时环境 app-shell，用来管理各个模块的加载、切换与消息交换。

### 模块加载与路由

1. [x] app-shell 根据路由加载模块
2. [x] 模块内部处理子路由
3. [x] 模块之间路由跳转和感知
4. [x] 路由与浏览器历史同步
5. [x] 确保只加载一次模块
6. [x] 模块销毁

### 公共的第三方依赖

采用 [webpack dll](https://webpack.js.org/plugins/dll-plugin) 的方式，将公共的第三方依赖（如 react、react-dom、react-router-dom、history 等）统一打包到 `vendor.js` 中。

采用这种方式还需要一些额外的处理：

- [ ] vendor.js 缓存（hash 化）

### 状态共享

app-shell 以及各特性模块之间需要彼此之间共享一些状态，包括但不限于：

- 主题定制
- 登录状态
- 导航信息
- 路由信息

本方案将采用 redux 来管理这些公共的共享状态。

### 难点 1：hmr
