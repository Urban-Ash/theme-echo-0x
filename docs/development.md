# 开发指南

## 前置条件

- Halo 2.25+ 环境
- 基本的 HTML/Thymeleaf、CSS、JavaScript 知识
- 了解 Halo 的主题开发体系（Finder、ThemeContext 等）

## 项目结构

```
theme-echo-0x/
├── theme.yaml        # 主题声明（必选）
├── settings.yaml     # 主题配置表单（必选）
├── README.md         # 项目简介
├── AGENTS.md         # 开发协作规范（必读）
├── docs/             # 主题文档
│   ├── README.md
│   ├── CHANGELOG.md
│   └── development.md
└── templates/        # Thymeleaf 模板
    ├── index.html    # 首页
    ├── post.html     # 文章页
    ├── page.html     # 独立页面
    ├── tags.html     # 标签列表页
    ├── tag.html      # 标签详情页
    ├── categories.html # 分类列表页
    ├── category.html # 分类详情页
    ├── archives.html # 归档页
    ├── author.html   # 作者页
    ├── about.html    # About 自定义页面
    ├── links.html    # Links 自定义页面
    ├── error/        # 错误页面
    │   ├── 404.html
    │   └── error.html
    ├── modules/      # 公共模板片段
    │   ├── head.html       # 头部（资源引用、元信息）
    │   ├── header.html     # 导航栏
    │   ├── footer.html     # 页脚
    │   ├── post-card.html  # 文章卡片
    │   ├── category-tree.html # 分类树
    │   └── pagination.html # 分页组件
    └── assets/       # 静态资源
        ├── css/
        │   └── style.css # 所有样式
        └── js/
            └── main.js  # 所有脚本
```

## 核心文件说明

### theme.yaml

主题的元信息和配置声明。

**重要字段：**
- `spec.version`：主题版本号，所有资源的缓存版本都以这个为准
- `spec.customTemplates`：自定义页面模板的声明（About、Links 等）
- `spec.requires`：最低 Halo 版本要求（目前是 2.25.0）
- `spec.settingName` 和 `spec.configMapName`：必须和主题名匹配

### settings.yaml

定义后台可以配置的项（使用 FormKit 规范），分为 home、style、nav、post、footer 几个组。

**注意：**
- 新增配置项时要给合理的默认值
- 模板中读取配置使用 `theme.config.[group].[key]`
- 如果配置为空要判断回退默认值

### head.html

所有页面都会引用的公共 head 片段。

**核心功能：**
- 元信息（标题、描述、favicon）
- 主题配置注入（颜色模式、强调色、封面风格等）
- 统一引用 CSS 和 JS（自动从 theme.yaml 读版本号）
- `themeVersion` 变量在这里统一计算

### main.js

主题所有脚本的入口，主要功能：

1. **动画封面**
   - `covers` 对象：各种风格的 SVG 生成函数（都接收 time 参数）
   - `coverGroups`：风格分组
   - `animatedCover(shape, time)`：加扫描线效果
   - `loadFormulaCover(img, fallbackIndex)`：初始化图片并开始动画
   - `hashText`：按文本内容哈希选择封面

2. **页面过渡**
   - PJAX 逻辑
   - 扫描线动画

3. **其他**
   - 时钟更新
   - 访客 IP 获取
   - 章节导航（TOC）
   - 数学背景动画
   - 暂停/恢复按钮

### style.css

所有样式，统一在这里管理，遵循：
- 根变量（`:root`）定义所有颜色、字体、间距
- `html[data-theme="light"]` 定义亮模式覆盖
- 使用 `var(--...)` 引用变量，不要直接写硬编码值
- 响应式媒体查询放在文件底部

## 封面开发指南

### 新增封面

1. 在 `main.js` 的 `covers` 对象中新增函数
2. 函数签名必须是 `function(time)`
3. 计算都基于 time 参数，不要用 Math.random()（除非是一次性初始化）
4. 返回 SVG 字符串（不要有 xmlns 重复，animatedCover 会处理）
5. 在 `coverGroups` 中放入合适的分组

示例：
```javascript
wave(time) {
  const t = (time / 1000) % 6.28; // 0~2π 循环
  const points = Array.from({length: 100}, (_, i) => {
    const x = i;
    const y = 50 + 40 * Math.sin(t + i * 0.1);
    return `${x*4},${y*3}`;
  }).join(' L ');
  return `<svg viewBox="0 0 400 300"><path d="M ${points}" stroke="#e63946" fill="none"/></svg>`;
}
```

### 封面匹配规则

在 `coverNameFromTitle(title)` 函数中，按关键词优先匹配，如果没命中则按文本哈希从可用风格中选。

## 主题配置读取

在 Thymeleaf 中读取配置：

```html
<!-- 如果配置可能为空，给默认值 -->
<th:block th:with="
  accent=${theme.config.style == null || #strings.isEmpty(theme.config.style.accentColor) ? '#e63946' : theme.config.style.accentColor}
">
```

在 JS 中读取配置（在 head.html 的内联脚本已经注入到 html.dataset 中）：

```javascript
const mode = document.documentElement.dataset.theme;
const coverStyle = document.documentElement.dataset.coverStyle;
const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-config');
```

## 打包主题

按以下步骤打包：

1. 确保没有临时文件（.DS_Store、._*、node_modules 等）
2. 更新 `theme.yaml` 的 `spec.version`（如果有修改）
3. 使用 ZIP 工具，把整个 `theme-echo-0x` 文件夹打包
4. 打包文件命名为 `<version>.zip`（如 `1.0.0.zip`）

**注意：** ZIP 里的根目录应该就是 `theme-echo-0x/`，不是平铺文件！

## 测试清单

- [ ] 首页加载正常，封面动画流畅
- [ ] 文章列表分页正常
- [ ] 文章页内容显示正常，TOC 正常
- [ ] 标签/分类/归档/作者页面正常
- [ ] About 页面正常
- [ ] Links 页面正常（如果用插件）
- [ ] 404 和错误页面正常
- [ ] 明暗模式切换正常
- [ ] 页面切换特效正常（开启/关闭）
- [ ] 后台配置修改后生效
- [ ] 响应式布局（移动端/平板/桌面）正常
- [ ] 导航栏时钟正常
- [ ] 访客 IP 正常（如果开启）
- [ ] 数学背景动画正常
- [ ] 暂停/恢复按钮正常
- [ ] 所有链接正常跳转

## 常见问题

**Q: 封面不动？**

A: 检查几个点：
1. 图片是否有 `data-cover-title` 或 `alt` 属性？
2. 是否可见？动画只有进入视口才运行
3. JS 是否加载成功？看控制台有没有报错
4. 使用的是最新版 `main.js` 吗？

**Q: 怎么调试封面动画？**

A: 可以在控制台测试 `animatedCover` 函数：
```javascript
// 比如测试 ai_sigmoid 风格
const svg = animatedCover('ai_sigmoid', performance.now());
console.log(svg);
// 或者把 SVG 插到页面里看
const div = document.createElement('div');
div.innerHTML = svg;
document.body.appendChild(div);
```
