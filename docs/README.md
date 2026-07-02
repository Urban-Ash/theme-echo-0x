# Echo 0x 使用指南

本文档面向主题使用者，介绍安装方式、主要页面、后台配置和常见使用方式。

## 主题简介

Echo 0x 是一个为 Halo 2.25+ 设计的暗色终端风主题，适用于安全、AI、开发和技术写作场景。它强调统一的终端气质、数学公式背景和结构化排版，适合长文、索引页与独立页面共同使用。

## 适用版本

- Halo：`2.25.0+`
- 主题当前版本：`1.2.0`

## 安装方式

### 通过 Halo 后台上传

1. 下载 Release 中的主题压缩包，例如 `1.2.0.zip`
2. 进入 Halo 控制台的“主题”页面
3. 点击“安装主题”并上传压缩包
4. 安装完成后启用 `Echo 0x`

### 通过目录部署

1. 获取仓库源码
2. 将 `theme-echo-0x` 目录放入 Halo 的 `templates/themes` 目录
3. 返回控制台启用主题

## 页面与模板

### 默认页面

- 首页：终端风 Hero、数据概览、文章列表
- 文章页：封面、目录、元信息、相关文章流
- 标签页：终端风标签云与热度分布
- 分类页：树状分类索引
- 归档页：时间流式归档
- 作者页：作者资料与文章列表
- 错误页：`404` 和通用错误页

### 自定义页面模板

#### About

在 Halo 后台创建独立页面时选择 `About` 模板，可用于个人介绍、项目说明或履历展示。

#### Links

`Links` 模板支持两种模式：

1. 普通独立页：直接渲染编辑器正文内容
2. 插件友链页：若启用了友情链接插件并传入分组数据，会自动渲染终端风链接列表

## 后台配置说明

### 首页 `home`

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| 首页标题第一行 | Hero 主标题第一行 | `break things.` |
| 首页标题第二行 | Hero 主标题第二行 | `build systems` |
| 首页标题第三行 | Hero 主标题第三行 | `that learn.` |
| 首页副标题 | 首页简介文本 | 网安工程师 x AI 全栈开发... |
| 首页数据面板 | 最多 4 项，可排序，可清空 | `posts, visits, comments, categories` |

支持的数据项包括：`posts`、`visits`、`comments`、`categories`、`upvotes`、`halo`、`lang`、`title`、`url`、`registration`。

### 样式 `style`

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| 辅助色调 | 主题强调色 | `#e63946` |
| 明暗模式 | `system / light / dark` | `system` |
| 页面切换特效 | 是否启用 PJAX 切换动画 | `true` |
| 封面风格 | `random / ai / crypto / original` | `random` |

#### 封面风格说明

- `ai`：Sigmoid、神经网络、损失函数、注意力矩阵等图形
- `crypto`：XOR、哈希、Feistel 网络、密钥流等图形
- `original`：Lissajous 曲线、扫描线、几何分形等图形
- `random`：按标题哈希或默认索引自动选择风格

### 导航栏 `nav`

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| 显示时间 | 是否显示顶部时钟 | `true` |
| 显示访客 IP | 是否显示访客 IP | `false` |
| 访客 IP 查询接口 | 返回纯文本或 JSON 的接口 | `https://api.ipify.org?format=json` |
| 显示页面路径 | 是否显示当前路径 | `true` |
| 导航菜单 | 选择 Halo 菜单；为空时回退主菜单或默认导航 | 空 |

### 文章页 `post`

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| 显示章节导航 | 是否显示文章页目录 | `true` |

### 页脚 `footer`

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| 显示左侧 cat | 是否显示左侧提示文案 | `true` |
| 左侧 cat 文案 | 页脚左侧提示内容 | `CC BY-NC-SA 4.0` |
| 左侧 cat 跳转链接 | 点击提示后的链接 | CC 协议地址 |
| 显示 pause fx 按钮 | 是否显示背景动画暂停按钮 | `true` |
| 显示 RSS | 是否显示 RSS 链接 | `true` |
| RSS 显示文字 | 页脚 RSS 文案 | `rss` |
| RSS 链接 | RSS 地址 | `/rss.xml` |
| 显示 GitHub | 是否显示 GitHub 链接 | `true` |
| GitHub 显示文字 | GitHub 文案 | `github` |
| GitHub 链接 | GitHub 地址 | `https://github.com/` |
| 显示 Email | 是否显示 Email 链接 | `true` |
| Email 显示文字 | Email 文案 | `email` |
| Email 链接 | Email 地址 | `mailto:hello@example.com` |

## 使用建议

- 如果你希望统一页面风格，优先补齐标签、分类、归档、友情链接这些辅助页内容
- 如果你使用友情链接插件，建议为不同链接建立分组，以便 `Links` 页面展示筛选视图
- 如果你希望主题更轻，先从关闭访客 IP 和页面切换特效开始
- 升级版本后建议重新上传 ZIP，避免静态资源缓存影响效果

## 相关文档

- [项目总览](../README.md)
- [更新日志](./CHANGELOG.md)
- [1.2.0 发布说明](./RELEASE-1.2.0.md)
- [1.1.0 发布说明](./RELEASE-1.1.0.md)
- [开发指南](./development.md)
