# Echo 0x

> A Halo theme with a dark terminal aesthetic for security, AI, and technical writing.

Echo 0x 是一个面向 Halo 2.25+ 的暗色终端风主题，适合安全研究、AI 记录、工程实践与技术博客场景。主题围绕终端感、数学公式背景和秩序化版式展开，同时保留 Halo 原生模板能力与后台配置灵活性。

<p align="center">
  <img src="docs/assets/echo-0x-icon.svg" alt="Echo 0x icon" width="120">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Halo-2.25%2B-e63946?style=flat-square" alt="Halo 2.25+">
  <img src="https://img.shields.io/badge/Version-1.2.0-1f1f1f?style=flat-square" alt="Version 1.2.0">
  <img src="https://img.shields.io/badge/License-MIT-6b6b6b?style=flat-square" alt="MIT License">
</p>

<p align="center">
  <img src="docs/assets/echo-0x-cover.svg" alt="Echo 0x Cover">
</p>

## 项目概览

- 适配 Halo `2.25.0+`
- 内置深色终端风视觉和可切换明暗模式
- 提供实时计算的数学公式封面与背景动画
- 覆盖首页、文章、标签、分类、归档、作者和独立页面模板
- 支持 About / Links 自定义页面，以及插件模式友情链接页
- 支持 PJAX 页面切换、文章 TOC、顶部信息栏与可配置页脚
- `tags / categories / archives / links` 已统一到一套辅助页设计系统

## 当前状态

- 当前版本：`1.2.0`
- 主题入口声明见 [theme.yaml](theme.yaml)
- 后台设置项定义见 [settings.yaml](settings.yaml)
- 更新记录见 [docs/CHANGELOG.md](docs/CHANGELOG.md)
- 最新发布说明见 [docs/RELEASE-1.2.0.md](docs/RELEASE-1.2.0.md)

## 页面覆盖

- 首页：终端风 Hero、数据面板、文章流
- 文章页：封面、元信息、目录导航、终端风代码块与阅读流
- 辅助页：标签云、分类树、时间归档、友情链接终端列表
- 独立页面：通用页面模板、About 模板、Links 模板
- 错误页：`404` 与通用错误页

## 安装

### 方式一：通过 Halo 后台上传

1. 在 [GitHub Releases](https://github.com/Urban-Ash/theme-echo-0x/releases) 下载最新安装包，例如 `1.2.0.zip`
2. 进入 Halo 后台，打开“主题”
3. 选择“安装主题”并上传 ZIP 文件
4. 安装完成后启用 `Echo 0x`

### 方式二：通过目录部署

1. 克隆或下载当前仓库
2. 将 `theme-echo-0x` 目录放入 Halo 的 `templates/themes` 目录
3. 返回 Halo 后台启用主题

## 配置概览

当前主题主要提供 5 组后台设置：

- `home`：首页三行标题、副标题、数据面板
- `style`：强调色、明暗模式、封面风格、页面切换特效
- `nav`：时钟、访客 IP、页面路径、导航菜单
- `post`：文章页目录开关
- `footer`：页脚提示、暂停特效按钮、RSS、GitHub、Email

详细说明见 [docs/README.md](docs/README.md)。

## 开发与打包

开发约束与协作规范见：

- [docs/development.md](docs/development.md)
- [AGENTS.md](AGENTS.md)

本地打包命令：

```bash
python3 build.py
```

打包结果会输出到仓库上级目录，命名格式为 `<version>.zip`。

## 文档导航

- [用户使用指南](docs/README.md)
- [更新日志](docs/CHANGELOG.md)
- [1.2.0 发布说明](docs/RELEASE-1.2.0.md)
- [1.1.0 发布说明](docs/RELEASE-1.1.0.md)
- [1.0.0 发布说明](docs/RELEASE-1.0.0.md)
- [开发指南](docs/development.md)

## License

MIT
