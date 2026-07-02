# 开发指南

本文档面向主题维护者，聚焦目录结构、关键约束、开发流程和发布注意事项。

## 开发前提

- Halo `2.25.0+`
- 熟悉 HTML、Thymeleaf、CSS、JavaScript
- 了解 Halo 主题开发中的模板、Finder 和主题配置读取方式

## 目录结构

```text
theme-echo-0x/
├── theme.yaml
├── settings.yaml
├── build.py
├── README.md
├── AGENTS.md
├── docs/
│   ├── README.md
│   ├── CHANGELOG.md
│   ├── RELEASE-1.0.0.md
│   ├── RELEASE-1.1.0.md
│   └── development.md
└── templates/
    ├── index.html
    ├── post.html
    ├── page.html
    ├── about.html
    ├── links.html
    ├── tags.html
    ├── tag.html
    ├── categories.html
    ├── category.html
    ├── archives.html
    ├── author.html
    ├── error/
    ├── modules/
    └── assets/
```

## 核心文件

### `theme.yaml`

- 定义主题元信息、版本号、最低 Halo 版本和自定义模板
- `spec.version` 是唯一版本源，CSS/JS 资源缓存依赖它
- `spec.logo` 需要使用主题资源相对路径形式

### `settings.yaml`

- 定义后台表单项，当前分为 `home`、`style`、`nav`、`post`、`footer` 五组
- 模板里读取配置时，要为可空项设置回退值
- 新增配置时优先保持命名直接、默认值明确

### `templates/assets/css/style.css`

- 全站样式入口，页面专属样式也统一放这里
- 页面定制样式尽量加专属前缀，避免污染全局组件
- 响应式规则统一收口在文件后部

### `templates/assets/js/main.js`

- 负责封面动画、数学背景、PJAX、TOC、时钟、访客 IP 等前端行为
- 新增视觉动画时，优先保证可重复计算，不依赖一次性随机值

### `templates/modules/*.html`

- `head.html` 管理页面元信息和资源引用
- `header.html`、`footer.html` 是全站共享骨架
- `pagination.html`、`post-card.html`、`category-tree.html` 是复用片段

## 当前页面体系

### 共用骨架

- 全站通过 `header + [data-pjax-root] + footer` 组织主体结构
- `[data-pjax-root]` 需要保持 `flex: 1` 和 `width: 100%`
- `#contact` 页脚需要保持透明背景，避免出现底部黑块

### 辅助页体系

以下页面已经统一到 `aux-page-*` 设计体系：

- `tags.html`
- `categories.html`
- `archives.html`
- `links.html`

开发这些页面时，优先复用：

- `aux-page-shell`
- `aux-page-frame`
- `aux-page-kicker`
- `aux-page-head`
- `aux-page-title`
- `aux-page-lead`
- `aux-page-stats`

## 开发约束

- 不要把页面样式拆回模板内联，优先维护 `style.css`
- 不要破坏全局共享骨架，尤其是 PJAX 容器尺寸和页脚透明度
- 编写 Thymeleaf 表达式时尽量保守，避免依赖不稳定的方法调用
- 导航和页面链接优先使用 Halo 提供的上下文变量，减少硬编码路径
- 修改资源后记得同步版本号，避免缓存导致的“改了没生效”假象

## 配置读取示例

### Thymeleaf

```html
<th:block th:with="
  accent=${theme.config.style == null || #strings.isEmpty(theme.config.style.accentColor) ? '#e63946' : theme.config.style.accentColor}">
</th:block>
```

### JavaScript

```javascript
const mode = document.documentElement.dataset.theme;
const coverStyle = document.documentElement.dataset.coverStyle;
const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-config');
```

## 打包与发布

### 本地打包

```bash
python3 build.py
```

打包规则：

- 先更新 `theme.yaml` 中的 `spec.version`
- 执行 `build.py`
- 产物输出到仓库上级目录，文件名为 `<version>.zip`

### 发布建议

1. 确认模板与样式改动已在 Halo 中实测
2. 更新 `README.md`、`docs/README.md`、`docs/CHANGELOG.md`
3. 如有阶段性版本，补充对应 `docs/RELEASE-<version>.md`
4. 提交代码并推送到 GitHub
5. 上传 ZIP 到 Release 或用于后台安装测试

## 测试清单

- [ ] 首页封面和数据面板正常
- [ ] 文章页 TOC、分页、相关推荐正常
- [ ] 标签、分类、归档、友情链接页正常
- [ ] About 与普通独立页渲染正常
- [ ] 404 和错误页可访问
- [ ] 明暗模式切换正常
- [ ] PJAX 过渡正常
- [ ] 数学背景与暂停按钮正常
- [ ] 移动端和桌面端布局正常
- [ ] Halo 后台配置改动能即时生效

## 相关文档

- [项目总览](../README.md)
- [用户指南](./README.md)
- [更新日志](./CHANGELOG.md)
