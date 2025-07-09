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
  
![自动翻译演示](https://github.com/zla5/WhatsappTranslate/blob/edee77a23dc79349c8ab68623c2f014ddc5ac6ae/%E8%87%AA%E5%8A%A8%E7%BF%BB%E8%AF%91%E6%BC%94%E7%A4%BA.gif)
![输入文字自动翻译演示](https://github.com/zla5/WhatsappTranslate/blob/edee77a23dc79349c8ab68623c2f014ddc5ac6ae/%E8%BE%93%E5%85%A5%E6%96%87%E5%AD%97%E8%87%AA%E5%8A%A8%E7%BF%BB%E8%AF%91%E6%BC%94%E7%A4%BA.gif)

## 安装方法
### 1. Tampermonkey 脚本安装方法
> 适合电脑用户。

1. **浏览器安装 Tampermonkey**：
   - Chrome: [Tampermonkey](https://www.tampermonkey.net/)
   - Firefox: [Tampermonkey](https://www.tampermonkey.net/)
   - Edge: [Tampermonkey](https://www.tampermonkey.net/)
   - Safari: [Tampermonkey](https://www.tampermonkey.net/)

2. **Tampermonkey添加脚本**：
   - 点击 Tampermonkey 图标，选择“创建新脚本”。
   - 复制本仓库中 `WhatsAppTranslate.js` 的内容到编辑器。
   - 保存脚本（Ctrl+S 或 Cmd+S）。

3. **运行脚本**：
   - 打开 [WhatsApp Web](https://web.whatsapp.com/)，脚本将自动加载并显示自定义界面。
     
### 2. 360浏览器/360极速浏览器 插件安装方法
1. 下载本仓库中的 `WhatsAppTranslator.crx` 文件。
2. 拖动到以360浏览器/360极速浏览器中点击安装。
3. 打开 [WhatsApp Web](https://web.whatsapp.com/)，脚本将自动加载并显示自定义界面。

### 3. Chrome 插件安装方法(已经无法在最新版本chrome中安装)
1. 下载本仓库中的 `WhatsAppTranslator.crx` 文件。
2. 进入chrome扩展程序页面chrome://extensions/
3. 点击启用右上角开发者模式，刷新当前页面，否则会报错“程序包无效”无法安装。
4. 拖动到Chrome中点击安装,安装成功后显示Chrome 无法验证此扩展程序的来源，点击后面的3个小点，选择保留此扩展。
5. 打开 [WhatsApp Web](https://web.whatsapp.com/)，脚本将自动加载并显示自定义界面。



### 4. 安卓手机/平板 插件安装方法
1. 下载本仓库中的 `WhatsAppTranslate.js` 文件到手机上，看视频 https://youtube.com/shorts/6FUX2mCjCXs?feature=share
2. 安装[Via浏览器](https://res.viayoo.com/v1/via-release-cn.apk)，然后在Via浏览器的设置-脚本中点击"+"号导入，找到这个脚本导入即可。
3. 使用Via浏览器打开 [WhatsApp Web](https://web.whatsapp.com/)，会提示“通过你的电脑上的浏览器访问”，解决办法，打开Via浏览器→设置→通用→网站设定→所有网站→点击+号，新建一个web.whatsapp.com,点击确定，然后启用这个设定，将标识设置为“Windows(chrome)”,电脑模式打开，返回Via浏览器，访问 [WhatsApp Web](https://web.whatsapp.com/)，和网页版一样扫码就可以登陆WhatsAPP(如果本台手机不方便扫码，可以使用另一台手机将二维码拍照，然后扫描拍下的照片), 开始使用吧。

### 5. 苹果手机/平板 插件安装方法
1. 下载本仓库中的 `WhatsAppTranslate.js` 文件到手机上
2. 安装[Via浏览器](https://apps.apple.com/us/app/via-browser/id1639085829)，然后在Via浏览器的设置-脚本中点击"+"号导入，找到这个脚本导入即可。
3. 使用Via浏览器打开 [WhatsApp Web](https://web.whatsapp.com/)，会提示“通过你的电脑上的浏览器访问”，解决办法，打开Via浏览器→设置→通用→网站设定→所有网站→点击+号，新建一个web.whatsapp.com,点击确定，然后启用这个设定，将标识设置为“Windows(chrome)”,电脑模式打开，返回Via浏览器，访问 [WhatsApp Web](https://web.whatsapp.com/)，和网页版一样扫码就可以登陆WhatsAPP(如果本台手机不方便扫码，可以使用另一台手机将二维码拍照，然后扫描拍下的照片), 开始使用吧。

   
   
![via浏览器演示](https://github.com/zla5/WhatsappTranslate/blob/bbab064b8ba93436bffb8520d8c1642f672f1342/%E6%89%8B%E6%9C%BAvia%E6%B5%8F%E8%A7%88%E5%99%A8%E6%BC%94%E7%A4%BA.jpg)



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
