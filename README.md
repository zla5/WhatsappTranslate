# WhatsApp 翻译插件 WhatsApp Translation


[![WhatsApp Web](https://img.shields.io/badge/WhatsApp-Web-green.svg)](https://web.whatsapp.com/)

这是一个为 WhatsApp Web 设计的插件，集成自动翻译、电话区号检测和电商客服常用功能。基于免费谷歌翻译 API，提供消息翻译、常用短语选择以及国家信息展示。

## 功能

- **消息自动翻译**：支持发送消息翻译为收件人语言（基于电话区号或手动选择），支持自动语言检测。
- **国家信息检测**：根据电话区号显示国家、语言、货币和实时当地时间。
- **自定义输入框**：在 WhatsApp Web 侧边栏添加电话号码输入框，快速发起聊天。
- **常用短语**：提供可点击的客服常用短语列表，提升效率。
- **消息翻译按钮**：为接收消息添加“翻译”按钮，自动检测源语言。
- **语言偏好保存**：针对每个客户的语言偏好可以单独设定。
- **响应式界面**：无缝集成 WhatsApp Web，界面友好且美观。
- **绝不封号**：本地翻译交互，并没有调用WhatsApp任何api，一切都是模拟手动消息的发送操作。作者我就是外贸老鸟，已经用了十几年。
  
![翻译演示](https://raw.githubusercontent.com/zla5/WhatsappTranslate/main/%E7%BF%BB%E8%AF%91%E6%BC%94%E7%A4%BA.gif)

## 安装方法

### 1. 360浏览器/360极速浏览器 插件安装 (暂时不支持chrome)
1. 下载本仓库中的 `WhatsAppTranslator.crx` 文件。
2. 拖动到以360浏览器/360极速浏览器中点击安装。


### 2. Tampermonkey 脚本安装
> 适合电脑/手机/平板用户，手机/平板用户可以安装Via浏览器，然后在设置-脚本中点击"+"号导入这个脚本。

1. **安装 Tampermonkey**：
   - Chrome: [Tampermonkey](https://www.tampermonkey.net/)
   - Firefox: [Tampermonkey](https://www.tampermonkey.net/)
   - Edge: [Tampermonkey](https://www.tampermonkey.net/)
   - Safari: [Tampermonkey](https://www.tampermonkey.net/)

2. **添加脚本**：
   - 点击 Tampermonkey 图标，选择“创建新脚本”。
   - 复制本仓库中 `WhatsAppTranslate.js` 的内容到编辑器。
   - 保存脚本（Ctrl+S 或 Cmd+S）。

3. **运行脚本**：
   - 打开 [WhatsApp Web](https://web.whatsapp.com/)，脚本将自动加载并显示自定义界面。

## 使用方法

### 发起聊天
1. 在侧边栏顶部输入框中输入电话号码（包含区号，如 `8617700000000`）。
2. 点击“发起聊天”按钮，跳转至对应聊天窗口。

### 查看国家信息
- 聊天界面显示号码时，自动展示国家、语言、货币和实时当地时间（每秒更新）。

### 发送翻译消息
1. 在聊天输入框中输入消息（默认源语言：中文 zh-CN）。
2. 从下拉菜单选择目标语言，或选择“自动”以基于区号检测语言。
3. 点击“发送”或按 Enter，消息将翻译后发送。
4. 手动选择的语言会按号码保存，方便后续使用。

### 使用常用短语
- 输入框下方显示编号的客服短语列表。
- 点击短语填充到输入框，可直接发送或编辑。

### 翻译接收消息
- 每条接收消息旁有“翻译”按钮，点击翻译，自动检测源语言。

## 贡献
欢迎提交 issue 或 pull request，共同改进脚本功能！
