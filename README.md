# Oregairu · 侍奉部

以《我的青春恋爱物语果然有问题》为灵感的非官方 Typora 主题。当前版本 **V0.0.3**。

保留安静的写作空间，用三位角色的配色、立绘与放学后合照增加一点陪伴。

| 主题 | 配色 | 角色 |
| --- | --- | --- |
| Oregairu Yukino | 冰蓝、冷白 | 雪之下雪乃 |
| Oregairu Yui | 暖粉、浅暖白 | 由比滨结衣 |
| Oregairu Hachiman | 灰绿、雾白 | 比企谷八幡 |

## 功能

- 居中的阅读区域，最大宽度 900px，文字左对齐。
- 正文 16px、代码 14px，标题层级清晰。
- 空文档显示渐隐合照与欢迎文字，开始写作后隐藏。
- 可选动态立绘扩展：右下角单人立绘，文字覆盖处柔和渐隐，空白处保留清晰度。
- V0.0.1、V0.0.2 独立保留，可按版本安装。

![侍奉部合照素材](oregairu/group-preview.png)

上图是主题使用的合照素材，不是实际界面截图。人物图片为 AI 生成的非官方同人图。

## 下载与安装

从 [Releases](https://github.com/sunyapeng-hub/typora-oregairu-theme/releases) 下载 **Oregairu-V0.0.3.zip**，或使用仓库内的 [安装包](releases/Oregairu-V0.0.3.zip)。

1. 解压安装包。
2. 打开 Typora「偏好设置 → 外观 → 打开主题文件夹」。
3. 将三个 `*-v0.0.3.css` 和整个 `oregairu/` 文件夹复制进去。CSS 直接放在主题根目录。
4. 完全退出并重新打开 Typora，在「主题」菜单选择对应角色的 V0.0.3。

```text
themes/
├── oregairu-yukino-v0.0.3.css
├── oregairu-yui-v0.0.3.css
├── oregairu-hachiman-v0.0.3.css
└── oregairu/
    ├── yukino.png
    ├── yui.png
    ├── hachiman.png
    └── group-preview.png
```

带版本号的 CSS 均可独立使用，不依赖根目录的 `oregairu.css`。

### 启用右下角动态立绘

**主题 CSS 本身不会执行脚本。** 没有配套扩展时显示左下角静态立绘；文字遮罩和右下角布局需要额外启用扩展。

1. 按 [Typora Community Plugin 官方说明](https://github.com/typora-community-plugin/typora-community-plugin/blob/main/docs/zh-cn/user-guide/1a-installation.md) 安装兼容的社区插件加载器。
2. 将安装包中的 `extension/local.oregairu-portrait/` 放入加载器的插件目录。不要覆盖已有的 `plugins.json`。
3. 在「已安装插件」中启用 **Oregairu 动态立绘**。笔记库使用独立配置时，也需要在该笔记库中启用。
4. 完全重启 Typora。

插件目录随加载器安装方式而异，参考其 [插件安装文档](https://github.com/typora-community-plugin/typora-community-plugin/blob/main/docs/zh-cn/user-guide/2-plugin-installation.md)。本项目不附带加载器，也不自动修改 Typora 程序文件。

## 兼容性与限制

已在作者的 Windows 环境中使用和调整，其他系统与 Typora 版本尚未完整验证。社区加载器本机版本为 2.10.21。字体使用本机字体回退，不同设备可能有差异。

空文档识别依赖 Typora 的页面结构和 `:has()` 支持。动态立绘通过读取文字行的位置生成遮罩，长文档的性能仍有优化空间。打印时隐藏合照和立绘；PDF 分页仍建议用实际导出文件检查。

## 目录

| 目录 | 用途 |
| --- | --- |
| `releases/` | 按版本打包的 ZIP |
| `versions/` | 各版本完整独立归档 |
| `extensions/oregairu-portrait/` | 动态立绘扩展源码 |
| `oregairu/` | 当前主题图片资源 |
| `examples/` | Markdown 排版示例 |
| `docs/` | 角色说明 |

根目录不带版本号的三个角色 CSS 是当前开发入口，需要与 `oregairu.css` 一起安装。建议日常使用下载包中的带版本号主题。

## 自定义与恢复

请先备份自己的主题。个人设置可写入对应名称的 `.user.css`，例如 `oregairu-yukino-v0.0.3.user.css`。

关闭社区插件管理中的 **Oregairu 动态立绘** 并重启，可恢复静态立绘。旧版主题可从 `versions/` 安装。升级或切换版本时，请保留其他主题共用的图片文件。

## 版本与许可

参见 [版本记录](VERSION.md) 和 [排版示例](examples/春物主题示例.md)。

主题 CSS 和扩展代码采用 [MIT License](LICENSE)。角色名称、原作设定及同人图片不包含在代码许可授权范围内。本项目与原作权利方、Typora 或社区加载器项目没有官方关联。
