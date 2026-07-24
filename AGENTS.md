# Echo 0x 协作规范 (For AI)

## 开发约束

### 1. 项目结构
- **主题名称**: `theme-echo-0x`，必须与文件夹名、`theme.yaml:metadata.name`一致
- **文件组织**
  - `theme.yaml`：Halo 主题声明，设置 `requires: 2.25.0`（必须≥ Halo 2.25）
  - `settings.yaml`：后台可配置项（分组：home、style、nav、plugin、post、footer）
  - `templates/`：Thymeleaf 模板
    - `templates/modules/`：公共片段
    - `templates/assets/`：静态资源
      - `css/style.css`：统一 CSS
      - `js/main.js`：主题 JS（封面、目录、状态检测、过渡动画、工具函数）
      - `js/plugin-widgets.js`：Halo 搜索、评论等插件组件的样式桥接
- **打包规则**
  - 排除 `.DS_Store`、`._*` 等 macOS 隐藏文件
  - 包名必须是版本号.zip（如 `1.0.0.zip`）
  - 根目录下直接是 `theme-echo-0x/`，里面放所有文件

### 2. 版本管理
- **版本号来源**：唯一由 `theme.yaml:spec.version` 定义，其他地方从这里引用
- **静态资源缓存**：所有 `th:href` 资源必须加上 `?v=${themeVersion}`，其中 `themeVersion` 是从 `theme.yaml` 读入的变量
- **资源引用统一方式**
  - 静态资源：统一用 `@{/assets/xxx}` + `?v=${themeVersion}`
  - 任何修改 JS/CSS 之后，都必须同步更新 `theme.yaml:spec.version`，或者用自动生成机制

### 3. 编码规范
- **编码格式**：所有文件 UTF-8 无 BOM
- **YAML 文件**：必须严格格式，空格缩进 2 个，不要 TAB
- **JS/CSS 换行**：LF，文件末尾空一行
- **注释**：开发注释保留，但最终打包里不要写冗余注释，核心逻辑要有简短说明
- **Thymeleaf 注释**：用 `<!--/* ... */-->` 来包裹开发阶段的临时代码，这样 Thymeleaf 会自动去掉

### 4. 技术栈
- **模板引擎**：Thymeleaf 3.x（Halo 2.x 自带）
- **动画**：JS 生成 SVG + `requestAnimationFrame`，不要硬转 CSS `transform: rotate()` 类的整体旋转，要公式实时算
- **交互**：PJAX 用 HTML5 History 实现（不要依赖额外的库，直接用 `data-pjax-root`）
- **主题切换**：明暗，用 CSS 变量控制，在 HTML 根节点加 `data-theme`（light/dark）
- **浏览器支持**：现代浏览器（Chrome ≥ 100, Safari ≥ 14.5, Firefox ≥ 100），不要写 IE 兼容

## 视觉规范

### 1. 颜色系统
- **根变量**（在 `style.css:root` 统一管理）
  - `--bg`：背景色 #0a0a0a（暗模式），light 模式 #f6f6f2
  - `--ink`：文字 #ededed，light 模式 #111111
  - `--red`：辅助色（可配置，默认 #e63946），通过 `--accent-config` 注入
  - `--mute`：静音文字 #6b6b6b
  - `--line`：分割线 #1f1f1f
- **调色板约束**：所有颜色必须通过变量引用，不要在元素上直接写 hex/rgb
- **明暗切换**：不要为亮模式单独写 CSS 类，统一用 `html[data-theme="light"] {...}`

### 2. 字体
- **代码/数字/路径**：JetBrains Mono → SF Mono → Menlo → Consolas → 系统 monospace
- **正文/标题**：Inter → PingFang SC → 系统 sans-serif
- **约束**：所有字体通过 CSS 变量 `--mono` / `--sans` 引用

### 3. 布局
- **最大宽度**：`--maxw: 1240px`，居中
- **边距**：左右留白统一（32px/48px），响应式缩小时合理
- **间距单位**：用 `gap` 或者 rem/em，保持一致性

### 4. 动画
- **过渡动画**：0.2s ～ 0.35s cubic-bezier 类的缓动，不要太长
- **封面动画**：**必须是实时计算的公式动画**（曲线/点阵/哈希随时间变化），不要只是旋转图片
- **扫描线**：`scan` 类，从上到下或者从左到右，0.4 ~ 0.5s 半透明划过，不要太晃眼
- **进入视口才动**：封面动画只有 `IntersectionObserver` 检测到在视口时才跑 RAF，节约性能

### 5. 交互反馈
- **hover**：辅助色高亮，不要太强烈
- **点击/激活**：小圆点（dot）闪烁或者颜色加深
- **PJAX**：切换时保持过渡流畅，不要白屏

## 功能说明（参考）

### 现有模块
- **封面选择**：后台配置 coverStyle（random/ai/crypto/original），根据标题关键词自动选择对应风格
- **首页统计**：最多选 4 项，可配置
- **导航栏**：可配置时钟、IP、路径、菜单
- **插件兼容**：可配置搜索、评论入口，并保留 Halo 页脚扩展点
- **页脚**：左侧提示、RSS、GitHub、Email、暂停特效按钮

### 新增功能规则
- 可配置项必须放在 `settings.yaml`，后台可修改，默认值在模板里 `theme.config.xxx == null ? defaultValue : ...`
- 新增 JS 动画尽量放在 `covers` 对象里，新增风格就在 `coverGroups` 加键值
- 新增自定义页面模板在 `theme.yaml:customTemplates.page` 里声明

## 更新原则

1. 最小改动原则：尽量复用现有代码结构，不要大面积重构
2. 配置优先原则：用户可改的东西，尽量不要写死在模板
3. 性能优先原则：动画只在可见区域跑，不要阻塞主线程
4. 规范优先原则：所有修改必须遵守上述开发约束和视觉规范
