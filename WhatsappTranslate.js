// ==UserScript==
// @name         WhatsApp自动翻译/显示国家/当地时间
// @namespace    http://tampermonkey.net/
// @version      2025/6/10
// @description  根据电话区号查询国家语言和语言代码，显示国家信息和当地时间，支持消息翻译成中文。
// @author       zla5
// @match        https://web.whatsapp.com*
// @match        https://web.whatsapp.com/*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      translate.googleapis.com
// @connect      translation.googleapis.com
// @connect      serial.babyamy.store
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 创建样式
    GM_addStyle(`
        #originalTextInput::selection, #NumberTextInput::selection {
            background-color: #007bff;
            color: #fff;
        }
        .serial-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
        }
        .serial-popup input {
            width: 80%;
            padding: 8px;
            margin: 10px 0;
        }
        .serial-popup button {
            padding: 8px 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        .serial-popup button:hover {
            background-color: #45a049;
        }
        footer._3E8Fg.footer-added {
            background: #f6fafc;
        }
        .translate-btn.disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    `);


var _0x2aaa0c;let countryInfo={};_0x2aaa0c="kdcomo".split("").reverse().join("");let currentPhoneNumber='';var _0xfc0g2e;let isValidSubscription=false;_0xfc0g2e=730695^730689;let expiresAt=localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D']("\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u0041\u0074");let trialStart=localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D']("tratSlairt".split("").reverse().join(""));var _0x109f=(527412^527420)+(787558^787556);let trialEnd=localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064");_0x109f=(459837^459839)+(113788^113780);if(!trialStart){trialStart=new Date()['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']();localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("tratSlairt".split("").reverse().join(""),trialStart);trialEnd=new Date(new Date(trialStart)['\u0067\u0065\u0074\u0054\u0069\u006D\u0065']()+(141143^141136)*(194041^194017)*(670446^670418)*(615415^615371)*(967263^967095))['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']();localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064",trialEnd);console['\u006C\u006F\u0067'](`首次初始化试用期，trialStart: ${trialStart}`);console['\u006C\u006F\u0067'](`试用结束时间，trialEnd: ${trialEnd}`);}function checkSubscriptionStatus(){const _0x5d648g=new Date();let _0xce1fc=new Date(trialEnd);if(isNaN(_0xce1fc['\u0067\u0065\u0074\u0054\u0069\u006D\u0065']())){console['\u0077\u0061\u0072\u006E']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064\u0020\u65E0\u6548\uFF0C\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u503C");trialEnd=new Date(new Date(trialStart)['\u0067\u0065\u0074\u0054\u0069\u006D\u0065']()+(599478^599434)*(342314^342722))['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']();localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064",trialEnd);_0xce1fc=new Date(trialEnd);}console['\u006C\u006F\u0067']("\u8BA2\u9605\u72B6\u6001\u68C0\u67E5\u003A",{'\u0069\u0073\u0056\u0061\u006C\u0069\u0064\u0053\u0075\u0062\u0073\u0063\u0072\u0069\u0070\u0074\u0069\u006F\u006E':isValidSubscription,'\u006E\u006F\u0077':`${_0x5d648g['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']()} (JST: ${_0x5d648g['\u0074\u006F\u004C\u006F\u0063\u0061\u006C\u0065\u0053\u0074\u0072\u0069\u006E\u0067']("\u006A\u0061\u002D\u004A\u0050",{"timeZone":"\u0041\u0073\u0069\u0061\u002F\u0054\u006F\u006B\u0079\u006F"})})`,"trialStart":`${trialStart} (JST: ${new Date(trialStart)['\u0074\u006F\u004C\u006F\u0063\u0061\u006C\u0065\u0053\u0074\u0072\u0069\u006E\u0067']("\u006A\u0061\u002D\u004A\u0050",{'\u0074\u0069\u006D\u0065\u005A\u006F\u006E\u0065':"\u0041\u0073\u0069\u0061\u002F\u0054\u006F\u006B\u0079\u006F"})})`,'\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064':`${trialEnd} (JST: ${_0xce1fc['\u0074\u006F\u004C\u006F\u0063\u0061\u006C\u0065\u0053\u0074\u0072\u0069\u006E\u0067']("\u006A\u0061\u002D\u004A\u0050",{"timeZone":"\u0041\u0073\u0069\u0061\u002F\u0054\u006F\u006B\u0079\u006F"})})`});if(expiresAt&&new Date(expiresAt)>_0x5d648g){isValidSubscription=!![];}else if(_0x5d648g<_0xce1fc){isValidSubscription=!![];}else{isValidSubscription=false;}return isValidSubscription;}
function validateSerial(serial,callback){console['\u006C\u006F\u0067']("\u9A8C\u8BC1\u5E8F\u5217\u53F7\u003A",serial);GM_xmlhttpRequest({'\u006D\u0065\u0074\u0068\u006F\u0064':"\u0047\u0045\u0054","url":`http://serial.babyamy.store/validate?serial=${serial}`,"onload":function(response){try{var _0xabd5f=(242311^242309)+(193555^193557);const _0xa5fbfe=JSON['\u0070\u0061\u0072\u0073\u0065'](response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']);_0xabd5f=(353274^353278)+(822953^822959);console['\u006C\u006F\u0067']("\u5E8F\u5217\u53F7\u9A8C\u8BC1\u54CD\u5E94\u003A",_0xa5fbfe);if(_0xa5fbfe['\u0073\u0074\u0061\u0074\u0075\u0073']==="\u0076\u0061\u006C\u0069\u0064"&&_0xa5fbfe['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074']){localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("tAseripxe".split("").reverse().join(""),_0xa5fbfe['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074']);localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("laires".split("").reverse().join(""),_0xa5fbfe['\u0073\u0065\u0072\u0069\u0061\u006C']);expiresAt=_0xa5fbfe['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074'];trialEnd=_0xa5fbfe['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074'];localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("dnElairt".split("").reverse().join(""),trialEnd);isValidSubscription=new Date(expiresAt)>new Date();console['\u006C\u006F\u0067']("\u5E8F\u5217\u53F7\u9A8C\u8BC1\u6210\u529F\uFF0C\u8BA2\u9605\u6709\u6548\u81F3\u003A",expiresAt);console['\u006C\u006F\u0067']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064\u0020\u5DF2\u66F4\u65B0\u4E3A\u003A",trialEnd);callback(!![]);}else{console['\u0077\u0061\u0072\u006E']("\u65E0\u6548\u7684\u5E8F\u5217\u53F7\u54CD\u5E94\u003A",_0xa5fbfe);callback(false);}}catch(e){console['\u0065\u0072\u0072\u006F\u0072'](":\u8D25\u5931\u6790\u89E3\u8BC1\u9A8C\u53F7\u5217\u5E8F".split("").reverse().join(""),e,response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']);callback(false);}},'\u006F\u006E\u0065\u0072\u0072\u006F\u0072':function(error){console['\u0065\u0072\u0072\u006F\u0072']("\u5E8F\u5217\u53F7\u9A8C\u8BC1\u8BF7\u6C42\u5931\u8D25\u003A",error);callback(false);}});}
function showSerialPopup(){var _0x9c28f=(300637^300628)+(208518^208515);const _0x1603a=document['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("pupop-laires.".split("").reverse().join(""));_0x9c28f=301834^301836;if(_0x1603a)_0x1603a['\u0072\u0065\u006D\u006F\u0076\u0065']();const _0xa8b38f=document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("vid".split("").reverse().join(""));_0xa8b38f['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065']="pupop-laires".split("").reverse().join("");_0xa8b38f['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C']=`
            <p style="user-select: text;">您的试用期已经结束，请联系客服续费,微信:zla552200</p><br>
            <p style="user-select: text;">✨✨套餐:1年19元,2年35元✨✨</p>
            <input type="text" id="serialInput" placeholder="请输入序列号">
            <button id="submitSerial">提交</button>
        `;document['\u0062\u006F\u0064\u0079']['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](_0xa8b38f);_0xa8b38f['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("nwodesuom".split("").reverse().join(""),event=>{if(event['\u0074\u0061\u0072\u0067\u0065\u0074']['\u0074\u0061\u0067\u004E\u0061\u006D\u0065']==="\u0050"){event['\u0073\u0074\u006F\u0070\u0050\u0072\u006F\u0070\u0061\u0067\u0061\u0074\u0069\u006F\u006E']();}});var _0x2e_0x9c9=(237526^237534)+(121397^121396);const _0xbg4e7d=_0xa8b38f['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0023\u0073\u0075\u0062\u006D\u0069\u0074\u0053\u0065\u0072\u0069\u0061\u006C");_0x2e_0x9c9=(334528^334530)+(813830^813831);const _0xa7b1db=_0xa8b38f['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0023\u0073\u0065\u0072\u0069\u0061\u006C\u0049\u006E\u0070\u0075\u0074");_0xbg4e7d['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("kcilc".split("").reverse().join(""),()=>{const _0x8a2c0c=_0xa7b1db['\u0076\u0061\u006C\u0075\u0065']['\u0074\u0072\u0069\u006D']();if(_0x8a2c0c){validateSerial(_0x8a2c0c,isValid=>{if(isValid){_0xa8b38f['\u0072\u0065\u006D\u006F\u0076\u0065']();console['\u006C\u006F\u0067']("\u5E8F\u5217\u53F7\u9A8C\u8BC1\u6210\u529F");}else{alert("\u65E0\u6548\u7684\u5E8F\u5217\u53F7\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D\u83B7\u53D6\u6709\u6548\u5E8F\u5217\u53F7");}});}else{alert("\u8BF7\u8F93\u5165\u5E8F\u5217\u53F7");}});}
function refreshTranslateButtons(){console['\u006C\u006F\u0067']("\u5237\u65B0\u7FFB\u8BD1\u6309\u94AE\uFF0C\u5F53\u524D\u8BA2\u9605\u72B6\u6001\u003A",isValidSubscription);document['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']("\u002E\u0074\u0072\u0061\u006E\u0073\u006C\u0061\u0074\u0065\u002D\u0062\u0074\u006E")['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](btn=>btn['\u0072\u0065\u006D\u006F\u0076\u0065']());addTranslateButtons();}checkSubscriptionStatus();

    // 区号到语言和时区的映射（简化，仅包含部分示例）
    const areaCodeToCountry = {
    '+44': { language: '英国(United Kingdom)-英语(English)', timeZone: 'Europe/London', id: 'en', currency: 'GBP' }, // 英镑
    '+93': { language: '阿富汗(Afghanistan)-达里语、普什图语(Dari/Pashto)', timeZone: 'Asia/Kabul', id: 'ps', currency: 'AFN' }, // 阿富汗尼
    '+355': { language: '阿尔巴尼亚(Albania)-阿尔巴尼亚语(Albanian)', timeZone: 'Europe/Tirane', id: 'sq', currency: 'ALL' }, // 列克
    '+213': { language: '阿尔及利亚(Algeria)-阿拉伯语(Arabic)', timeZone: 'Africa/Algiers', id: 'ar', currency: 'DZD' }, // 阿尔及利亚第纳尔
    '+376': { language: '安道尔(Andorra)-加泰罗尼亚语(Catalan)', timeZone: 'Europe/Andorra', id: 'ca', currency: 'EUR' }, // 欧元
    '+244': { language: '安哥拉(Angola)-葡萄牙语(Portuguese)', timeZone: 'Africa/Luanda', id: 'pt', currency: 'AOA' }, // 宽扎
    '+1264': { language: '安圭拉(Anguilla)-英语(English)', timeZone: 'America/Anguilla', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+1268': { language: '安提瓜和巴布达(Antigua and Barbuda)-英语(English)', timeZone: 'America/Antigua', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+54': { language: '阿根廷(Argentina)-西班牙语(Spanish)', timeZone: 'America/Argentina/Buenos_Aires', id: 'es', currency: 'ARS' }, // 阿根廷比索
    '+374': { language: '亚美尼亚(Armenia)-亚美尼亚语(Armenian)', timeZone: 'Asia/Yerevan', id: 'hy', currency: 'AMD' }, // 德拉姆
    '+297': { language: '阿鲁巴(Aruba)-荷兰语、帕皮亚门托语(Dutch/Papiamento)', timeZone: 'America/Aruba', id: 'nl', currency: 'AWG' }, // 阿鲁巴弗罗林
    '+61': { language: '澳大利亚(Australia)-英语(English)', timeZone: 'Australia/Sydney', id: 'en', currency: 'AUD' }, // 澳元
    '+43': { language: '奥地利(Austria)-德语(German)', timeZone: 'Europe/Vienna', id: 'de', currency: 'EUR' }, // 欧元
    '+994': { language: '阿塞拜疆(Azerbaijan)-阿塞拜疆语(Azerbaijani)', timeZone: 'Asia/Baku', id: 'az', currency: 'AZN' }, // 马纳特
    '+1242': { language: '巴哈马(Bahamas)-英语(English)', timeZone: 'America/Nassau', id: 'en', currency: 'BSD' }, // 巴哈马元
    '+973': { language: '巴林(Bahrain)-阿拉伯语(Arabic)', timeZone: 'Asia/Bahrain', id: 'ar', currency: 'BHD' }, // 巴林第纳尔
    '+880': { language: '孟加拉国(Bangladesh)-孟加拉语(Bengali)', timeZone: 'Asia/Dhaka', id: 'bn', currency: 'BDT' }, // 塔卡
    '+1246': { language: '巴巴多斯(Barbados)-英语(English)', timeZone: 'America/Barbados', id: 'en', currency: 'BBD' }, // 巴巴多斯元
    '+375': { language: '白俄罗斯(Belarus)-白俄罗斯语、俄语(Belarusian/Russian)', timeZone: 'Europe/Minsk', id: 'be', currency: 'BYN' }, // 白俄罗斯卢布
    '+32': { language: '比利时(Belgium)-荷兰语、法语、德语(Dutch/French/German)', timeZone: 'Europe/Brussels', id: 'nl', currency: 'EUR' }, // 欧元
    '+501': { language: '伯利兹(Belize)-英语(English)', timeZone: 'America/Belize', id: 'en', currency: 'BZD' }, // 伯利兹元
    '+229': { language: '贝宁(Benin)-法语(French)', timeZone: 'Africa/Porto-Novo', id: 'fr', currency: 'XOF' }, // 西非法郎
    '+1441': { language: '百慕大(Bermuda)-英语(English)', timeZone: 'Atlantic/Bermuda', id: 'en', currency: 'BMD' }, // 百慕大元
    '+975': { language: '不丹(Bhutan)-宗卡语(Dzongkha)', timeZone: 'Asia/Thimphu', id: 'dz', currency: 'BTN' }, // 努尔特鲁姆
    '+591': { language: '玻利维亚(Bolivia)-西班牙语、克丘亚语、艾马拉语(Spanish/Quechua/Aymara)', timeZone: 'America/La_Paz', id: 'es', currency: 'BOB' }, // 玻利维亚诺
    '+387': { language: '波斯尼亚和黑塞哥维那(Bosnia and Herzegovina)-波斯尼亚语、克罗地亚语、塞尔维亚语(Bosnian/Croatian/Serbian)', timeZone: 'Europe/Sarajevo', id: 'bs', currency: 'BAM' }, // 可兑换马克
    '+267': { language: '博茨瓦纳(Botswana)-英语(English)', timeZone: 'Africa/Gaborone', id: 'en', currency: 'BWP' }, // 普拉
    '+55': { language: '巴西(Brazil)-葡萄牙语(Portuguese)', timeZone: 'America/Sao_Paulo', id: 'pt', currency: 'BRL' }, // 雷亚尔
    '+673': { language: '文莱(Brunei)-马来语(Malay)', timeZone: 'Asia/Brunei', id: 'ms', currency: 'BND' }, // 文莱元
    '+359': { language: '保加利亚(Bulgaria)-保加利亚语(Bulgarian)', timeZone: 'Europe/Sofia', id: 'bg', currency: 'BGN' }, // 列弗
    '+226': { language: '布基纳法索(Burkina Faso)-法语(French)', timeZone: 'Africa/Ouagadougou', id: 'fr', currency: 'XOF' }, // 西非法郎
    '+257': { language: '布隆迪(Burundi)-基隆迪语、法语(Kirundi/French)', timeZone: 'Africa/Bujumbura', id: 'rn', currency: 'BIF' }, // 布隆迪法郎
    '+855': { language: '柬埔寨(Cambodia)-高棉语(Khmer)', timeZone: 'Asia/Phnom_Penh', id: 'km', currency: 'KHR' }, // 瑞尔
    '+237': { language: '喀麦隆(Cameroon)-英语、法语(English/French)', timeZone: 'Africa/Yaounde', id: 'en', currency: 'XAF' }, // 中非法郎
    '+238': { language: '佛得角(Cape Verde)-葡萄牙语(Portuguese)', timeZone: 'Atlantic/Cape_Verde', id: 'pt', currency: 'CVE' }, // 佛得角埃斯库多
    '+1345': { language: '开曼群岛(Cayman Islands)-英语(English)', timeZone: 'America/Cayman', id: 'en', currency: 'KYD' }, // 开曼群岛元
    '+236': { language: '中非共和国(Central African Republic)-法语、桑戈语(French/Sango)', timeZone: 'Africa/Bangui', id: 'fr', currency: 'XAF' }, // 中非法郎
    '+235': { language: '乍得(Chad)-阿拉伯语、法语(Arabic/French)', timeZone: 'Africa/Ndjamena', id: 'ar', currency: 'XAF' }, // 中非法郎
    '+56': { language: '智利(Chile)-西班牙语(Spanish)', timeZone: 'America/Santiago', id: 'es', currency: 'CLP' }, // 智利比索
    '+86': { language: '中国(China)-汉语(Chinese)', timeZone: 'Asia/Shanghai', id: 'zh-CN', currency: 'CNY' }, // 人民币
    '+57': { language: '哥伦比亚(Colombia)-西班牙语(Spanish)', timeZone: 'America/Bogota', id: 'es', currency: 'COP' }, // 哥伦比亚比索
    '+269': { language: '科摩罗(Comoros)-阿拉伯语、法语(Arabic/French)', timeZone: 'Indian/Comoro', id: 'ar', currency: 'KMF' }, // 科摩罗法郎
    '+242': { language: '刚果(布)(Congo-Brazzaville)-法语(French)', timeZone: 'Africa/Brazzaville', id: 'fr', currency: 'XAF' }, // 中非法郎
    '+243': { language: '刚果(金)(Congo-Kinshasa)-法语(French)', timeZone: 'Africa/Kinshasa', id: 'fr', currency: 'CDF' }, // 刚果法郎
    '+682': { language: '库克群岛(Cook Islands)-英语、毛利语(English/Maori)', timeZone: 'Pacific/Rarotonga', id: 'en', currency: 'NZD' }, // 新西兰元
    '+506': { language: '哥斯达黎加(Costa Rica)-西班牙语(Spanish)', timeZone: 'America/Costa_Rica', id: 'es', currency: 'CRC' }, // 科朗
    '+385': { language: '克罗地亚(Croatia)-克罗地亚语(Croatian)', timeZone: 'Europe/Zagreb', id: 'hr', currency: 'EUR' }, // 欧元
    '+383': { language: '科索沃(Kosovo)-阿尔巴尼亚语、塞尔维亚语(Albanian/Serbian)', timeZone: 'Europe/Belgrade', id: 'sq', currency: 'EUR' }, // 欧元 (注意：这里修正了'+383'的国家为科索沃)
    '+53': { language: '古巴(Cuba)-西班牙语(Spanish)', timeZone: 'America/Havana', id: 'es', currency: 'CUP' }, // 古巴比索
    '+357': { language: '塞浦路斯(Cyprus)-希腊语、土耳其语(Greek/Turkish)', timeZone: 'Asia/Nicosia', id: 'el', currency: 'EUR' }, // 欧元
    '+420': { language: '捷克共和国(Czech Republic)-捷克语(Czech)', timeZone: 'Europe/Prague', id: 'cs', currency: 'CZK' }, // 捷克克朗
    '+45': { language: '丹麦(Denmark)-丹麦语(Danish)', timeZone: 'Europe/Copenhagen', id: 'da', currency: 'DKK' }, // 丹麦克朗
    '+253': { language: '吉布提(Djibouti)-阿拉伯语、法语(Arabic/French)', timeZone: 'Africa/Djibouti', id: 'ar', currency: 'DJF' }, // 吉布提法郎
    '+1767': { language: '多米尼克(Dominica)-英语(English)', timeZone: 'America/Dominica', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+1809': { language: '多米尼加共和国(Dominican Republic)-西班牙语(Spanish)', timeZone: 'America/Santo_Domingo', id: 'es', currency: 'DOP' }, // 多米尼加比索
    '+593': { language: '厄瓜多尔(Ecuador)-西班牙语(Spanish)', timeZone: 'America/Guayaquil', id: 'es', currency: 'USD' }, // 美元
    '+20': { language: '埃及(Egypt)-阿拉伯语(Arabic)', timeZone: 'Africa/Cairo', id: 'ar', currency: 'EGP' }, // 埃及镑
    '+503': { language: '萨尔瓦多(El Salvador)-西班牙语(Spanish)', timeZone: 'America/El_Salvador', id: 'es', currency: 'USD' }, // 美元
    '+240': { language: '赤道几内亚(Equatorial Guinea)-西班牙语、法语、葡萄牙语(Spanish/French/Portuguese)', timeZone: 'Africa/Malabo', id: 'es', currency: 'XAF' }, // 中非法郎
    '+291': { language: '厄立特里亚(Eritrea)-提格利尼亚语、阿拉伯语(Tigrinya/Arabic)', timeZone: 'Africa/Asmara', id: 'ti', currency: 'ERN' }, // 纳克法
    '+372': { language: '爱沙尼亚(Estonia)-爱沙尼亚语(Estonian)', timeZone: 'Europe/Tallinn', id: 'et', currency: 'EUR' }, // 欧元
    '+251': { language: '埃塞俄比亚(Ethiopia)-阿姆哈拉语(Amharic)', timeZone: 'Africa/Addis_Ababa', id: 'am', currency: 'ETB' }, // 比尔
    '+500': { language: '福克兰群岛(Falkland Islands)-英语(English)', timeZone: 'Atlantic/Stanley', id: 'en', currency: 'FKP' }, // 福克兰群岛镑
    '+298': { language: '法罗群岛(Faroe Islands)-法罗语(Faroese)', timeZone: 'Atlantic/Faroe', id: 'fo', currency: 'DKK' }, // 丹麦克朗
    '+679': { language: '斐济(Fiji)-英语、斐济语、印度语(English/Fijian/Hindi)', timeZone: 'Pacific/Fiji', id: 'en', currency: 'FJD' }, // 斐济元
    '+358': { language: '芬兰(Finland)-芬兰语、瑞典语(Finnish/Swedish)', timeZone: 'Europe/Helsinki', id: 'fi', currency: 'EUR' }, // 欧元
    '+33': { language: '法国(France)-法语(French)', timeZone: 'Europe/Paris', id: 'fr', currency: 'EUR' }, // 欧元
    '+689': { language: '法属波利尼西亚(French Polynesia)-法语(French)', timeZone: 'Pacific/Tahiti', id: 'fr', currency: 'XPF' }, // 太平洋法郎
    '+241': { language: '加蓬(Gabon)-法语(French)', timeZone: 'Africa/Libreville', id: 'fr', currency: 'XAF' }, // 中非法郎
    '+220': { language: '冈比亚(Gambia)-英语(English)', timeZone: 'Africa/Banjul', id: 'en', currency: 'GMD' }, // 达拉西
    '+995': { language: '格鲁吉亚(Georgia)-格鲁吉亚语(Georgian)', timeZone: 'Asia/Tbilisi', id: 'ka', currency: 'GEL' }, // 拉里
    '+49': { language: '德国(Germany)-德语(German)', timeZone: 'Europe/Berlin', id: 'de', currency: 'EUR' }, // 欧元
    '+233': { language: '加纳(Ghana)-英语(English)', timeZone: 'Africa/Accra', id: 'en', currency: 'GHS' }, // 塞地
    '+350': { language: '直布罗陀(Gibraltar)-英语(English)', timeZone: 'Europe/Gibraltar', id: 'en', currency: 'GIP' }, // 直布罗陀镑
    '+30': { language: '希腊(Greece)-希腊语(Greek)', timeZone: 'Europe/Athens', id: 'el', currency: 'EUR' }, // 欧元
    '+299': { language: '格陵兰(Greenland)-格陵兰语、丹麦语(Greenlandic/Danish)', timeZone: 'America/Nuuk', id: 'kl', currency: 'DKK' }, // 丹麦克朗
    '+1473': { language: '格林纳达(Grenada)-英语(English)', timeZone: 'America/Grenada', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+590': { language: '瓜德罗普(Guadeloupe)-法语(French)', timeZone: 'America/Guadeloupe', id: 'fr', currency: 'EUR' }, // 欧元
    '+1671': { language: '关岛(Guam)-英语、查莫罗语(English/Chamorro)', timeZone: 'Pacific/Guam', id: 'en', currency: 'USD' }, // 美元
    '+502': { language: '危地马拉(Guatemala)-西班牙语(Spanish)', timeZone: 'America/Guatemala', id: 'es', currency: 'GTQ' }, // 格查尔
    '+224': { language: '几内亚(Guinea)-法语(French)', timeZone: 'Africa/Conakry', id: 'fr', currency: 'GNF' }, // 几内亚法郎
    '+245': { language: '几内亚比绍(Guinea-Bissau)-葡萄牙语(Portuguese)', timeZone: 'Africa/Bissau', id: 'pt', currency: 'XOF' }, // 西非法郎
    '+592': { language: '圭亚那(Guyana)-英语(English)', timeZone: 'America/Georgetown', id: 'en', currency: 'GYD' }, // 圭亚那元
    '+509': { language: '海地(Haiti)-法语、海地克里奥尔语(French/Haitian Creole)', timeZone: 'America/Port-au-Prince', id: 'fr', currency: 'HTG' }, // 古德
    '+504': { language: '洪都拉斯(Honduras)-西班牙语(Spanish)', timeZone: 'America/Tegucigalpa', id: 'es', currency: 'HNL' }, // 伦皮拉
    '+852': { language: '香港(Hong Kong)-繁体、英语(Chinese/English)', timeZone: 'Asia/Hong_Kong', id: 'zh-TW', currency: 'HKD' }, // 港元
    '+36': { language: '匈牙利(Hungary)-匈牙利语(Hungarian)', timeZone: 'Europe/Budapest', id: 'hu', currency: 'HUF' }, // 福林
    '+354': { language: '冰岛(Iceland)-冰岛语(Icelandic)', timeZone: 'Atlantic/Reykjavik', id: 'is', currency: 'ISK' }, // 冰岛克朗
    '+91': { language: '印度(India)-印地语、英语(Hindi/English)', timeZone: 'Asia/Kolkata', id: 'en', currency: 'INR' }, // 卢比
    '+62': { language: '印度尼西亚(Indonesia)-印度尼西亚语(Indonesian)', timeZone: 'Asia/Jakarta', id: 'id', currency: 'IDR' }, // 卢比
    '+98': { language: '伊朗(Iran)-波斯语(Persian)', timeZone: 'Asia/Tehran', id: 'fa', currency: 'IRR' }, // 里亚尔
    '+964': { language: '伊拉克(Iraq)-阿拉伯语、库尔德语(Arabic/Kurdish)', timeZone: 'Asia/Baghdad', id: 'ar', currency: 'IQD' }, // 伊拉克第纳尔
    '+353': { language: '爱尔兰(Ireland)-英语、爱尔兰语(English/Irish)', timeZone: 'Europe/Dublin', id: 'en', currency: 'EUR' }, // 欧元
    '+972': { language: '以色列(Israel)-希伯来语、阿拉伯语(Hebrew/Arabic)', timeZone: 'Asia/Jerusalem', id: 'he', currency: 'ILS' }, // 新谢克尔
    '+39': { language: '意大利(Italy)-意大利语(Italian)', timeZone: 'Europe/Rome', id: 'it', currency: 'EUR' }, // 欧元
    '+225': { language: '科特迪瓦(Ivory Coast)-法语(French)', timeZone: 'Africa/Abidjan', id: 'fr', currency: 'XOF' }, // 西非法郎
    '+1876': { language: '牙买加(Jamaica)-英语(English)', timeZone: 'America/Jamaica', id: 'en', currency: 'JMD' }, // 牙买加元
    '+81': { language: '日本(Japan)-日语(Japanese)', timeZone: 'Asia/Tokyo', id: 'ja', currency: 'JPY' }, // 日元
    '+962': { language: '约旦(Jordan)-阿拉伯语(Arabic)', timeZone: 'Asia/Amman', id: 'ar', currency: 'JOD' }, // 约旦第纳尔
    '+7': { language: '哈萨克斯坦(Kazakhstan)-哈萨克语、俄语(Kazakh/Russian)', timeZone: 'Asia/Almaty', id: 'kk', currency: 'KZT' }, // 坚戈 (注：+7也用于俄罗斯，见下文处理)
    '+254': { language: '肯尼亚(Kenya)-英语、斯瓦希里语(English/Swahili)', timeZone: 'Africa/Nairobi', id: 'en', currency: 'KES' }, // 肯尼亚先令
    '+686': { language: '基里巴斯(Kiribati)-英语、吉尔伯特语(English/Gilbertese)', timeZone: 'Pacific/Tarawa', id: 'en', currency: 'AUD' }, // 澳元
    '+965': { language: '科威特(Kuwait)-阿拉伯语(Arabic)', timeZone: 'Asia/Kuwait', id: 'ar', currency: 'KWD' }, // 科威特第纳尔
    '+996': { language: '吉尔吉斯斯坦(Kyrgyzstan)-吉尔吉斯语、俄语(Kyrgyz/Russian)', timeZone: 'Asia/Bishkek', id: 'ky', currency: 'KGS' }, // 索姆
    '+856': { language: '老挝(Laos)-老挝语(Lao)', timeZone: 'Asia/Vientiane', id: 'lo', currency: 'LAK' }, // 基普
    '+371': { language: '拉脱维亚(Latvia)-拉脱维亚语(Latvian)', timeZone: 'Europe/Riga', id: 'lv', currency: 'EUR' }, // 欧元
    '+961': { language: '黎巴嫩(Lebanon)-阿拉伯语、法语(Arabic/French)', timeZone: 'Asia/Beirut', id: 'ar', currency: 'LBP' }, // 黎巴嫩镑
    '+266': { language: '莱索托(Lesotho)-英语、塞索托语(English/Sesotho)', timeZone: 'Africa/Maseru', id: 'en', currency: 'LSL' }, // 洛蒂
    '+231': { language: '利比里亚(Liberia)-英语(English)', timeZone: 'Africa/Monrovia', id: 'en', currency: 'LRD' }, // 利比里亚元
    '+218': { language: '利比亚(Libya)-阿拉伯语(Arabic)', timeZone: 'Africa/Tripoli', id: 'ar', currency: 'LYD' }, // 利比亚第纳尔
    '+423': { language: '列支敦士登(Liechtenstein)-德语(German)', timeZone: 'Europe/Vaduz', id: 'de', currency: 'CHF' }, // 瑞士法郎
    '+370': { language: '立陶宛(Lithuania)-立陶宛语(Lithuanian)', timeZone: 'Europe/Vilnius', id: 'lt', currency: 'EUR' }, // 欧元
    '+352': { language: '卢森堡(Luxembourg)-卢森堡语、法语、德语(Luxembourgish/French/German)', timeZone: 'Europe/Luxembourg', id: 'lb', currency: 'EUR' }, // 欧元
    '+853': { language: '澳门(Macao)-中文、葡萄牙语(Chinese/Portuguese)', timeZone: 'Asia/Macau', id: 'zh', currency: 'MOP' }, // 澳门元
    '+389': { language: '北马其顿(North Macedonia)-马其顿语(Macedonian)', timeZone: 'Europe/Skopje', id: 'mk', currency: 'MKD' }, // 第纳尔
    '+261': { language: '马达加斯加(Madagascar)-马尔加什语、法语(Malagasy/French)', timeZone: 'Indian/Antananarivo', id: 'mg', currency: 'MGA' }, // 阿里亚里
    '+265': { language: '马拉维(Malawi)-英语、齐切瓦语(English/Chichewa)', timeZone: 'Africa/Blantyre', id: 'en', currency: 'MWK' }, // 克瓦查
    '+60': { language: '马来西亚(Malaysia)-马来语(Malay)', timeZone: 'Asia/Kuala_Lumpur', id: 'ms', currency: 'MYR' }, // 林吉特
    '+960': { language: '马尔代夫(Maldives)-迪维希语(Dhivehi)', timeZone: 'Indian/Maldives', id: 'dv', currency: 'MVR' }, // 拉菲亚
    '+223': { language: '马里(Mali)-法语(French)', timeZone: 'Africa/Bamako', id: 'fr', currency: 'XOF' }, // 西非法郎
    '+356': { language: '马耳他(Malta)-马耳他语、英语(Maltese/English)', timeZone: 'Europe/Malta', id: 'mt', currency: 'EUR' }, // 欧元
    '+692': { language: '马绍尔群岛(Marshall Islands)-马绍尔语、英语(Marshallese/English)', timeZone: 'Pacific/Majuro', id: 'en', currency: 'USD' }, // 美元
    '+596': { language: '马提尼克(Martinique)-法语(French)', timeZone: 'America/Martinique', id: 'fr', currency: 'EUR' }, // 欧元
    '+222': { language: '毛里塔尼亚(Mauritania)-阿拉伯语(Arabic)', timeZone: 'Africa/Nouakchott', id: 'ar', currency: 'MRU' }, // 乌吉亚
    '+230': { language: '毛里求斯(Mauritius)-英语(English)', timeZone: 'Indian/Mauritius', id: 'en', currency: 'MUR' }, // 毛里求斯卢比
    '+262': { language: '马约特(Mayotte)-法语(French)', timeZone: 'Indian/Mayotte', id: 'fr', currency: 'EUR' }, // 欧元
    '+52': { language: '墨西哥(Mexico)-西班牙语(Spanish)', timeZone: 'America/Mexico_City', id: 'es', currency: 'MXN' }, // 墨西哥比索
    '+691': { language: '密克罗尼西亚联邦(Federated States of Micronesia)-英语(English)', timeZone: 'Pacific/Pohnpei', id: 'en', currency: 'USD' }, // 美元
    '+373': { language: '摩尔多瓦(Moldova)-罗马尼亚语(Romanian)', timeZone: 'Europe/Chisinau', id: 'ro', currency: 'MDL' }, // 摩尔多瓦列伊
    '+377': { language: '摩纳哥(Monaco)-法语(French)', timeZone: 'Europe/Monaco', id: 'fr', currency: 'EUR' }, // 欧元
    '+976': { language: '蒙古(Mongolia)-蒙古语(Mongolian)', timeZone: 'Asia/Ulaanbaatar', id: 'mn', currency: 'MNT' }, // 图格里克
    '+382': { language: '黑山(Montenegro)-塞尔维亚语、波斯尼亚语、克罗地亚语、阿尔巴尼亚语(Serbian/Bosnian/Croatian/Albanian)', timeZone: 'Europe/Podgorica', id: 'sr', currency: 'EUR' }, // 欧元
    '+1664': { language: '蒙特塞拉特(Montserrat)-英语(English)', timeZone: 'America/Montserrat', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+212': { language: '摩洛哥(Morocco)-阿拉伯语(Arabic)', timeZone: 'Africa/Casablanca', id: 'ar', currency: 'MAD' }, // 迪拉姆
    '+258': { language: '莫桑比克(Mozambique)-葡萄牙语(Portuguese)', timeZone: 'Africa/Maputo', id: 'pt', currency: 'MZN' }, // 梅蒂卡尔
    '+95': { language: '缅甸(Myanmar)-缅甸语(Burmese)', timeZone: 'Asia/Yangon', id: 'my', currency: 'MMK' }, // 缅元
    '+264': { language: '纳米比亚(Namibia)-英语(English)', timeZone: 'Africa/Windhoek', id: 'en', currency: 'NAD' }, // 纳米比亚元
    '+674': { language: '瑙鲁(Nauru)-英语、瑙鲁语(English/Nauruan)', timeZone: 'Pacific/Nauru', id: 'en', currency: 'AUD' }, // 澳元
    '+977': { language: '尼泊尔(Nepal)-尼泊尔语(Nepali)', timeZone: 'Asia/Kathmandu', id: 'ne', currency: 'NPR' }, // 尼泊尔卢比
    '+31': { language: '荷兰(Netherlands)-荷兰语(Dutch)', timeZone: 'Europe/Amsterdam', id: 'nl', currency: 'EUR' }, // 欧元
    '+687': { language: '新喀里多尼亚(New Caledonia)-法语(French)', timeZone: 'Pacific/Noumea', id: 'fr', currency: 'XPF' }, // 太平洋法郎
    '+64': { language: '新西兰(New Zealand)-英语、毛利语(English/Maori)', timeZone: 'Pacific/Auckland', id: 'en', currency: 'NZD' }, // 新西兰元
    '+505': { language: '尼加拉瓜(Nicaragua)-西班牙语(Spanish)', timeZone: 'America/Managua', id: 'es', currency: 'NIO' }, // 科多巴
    '+227': { language: '尼日尔(Niger)-法语(French)', timeZone: 'Africa/Niamey', id: 'fr', currency: 'XOF' }, // 西非法郎
    '+234': { language: '尼日利亚(Nigeria)-英语(English)', timeZone: 'Africa/Lagos', id: 'en', currency: 'NGN' }, // 奈拉
    '+683': { language: '纽埃(Niue)-英语、纽埃语(English/Niuean)', timeZone: 'Pacific/Niue', id: 'en', currency: 'NZD' }, // 新西兰元
    '+850': { language: '朝鲜(North Korea)-朝鲜语(Korean)', timeZone: 'Asia/Pyongyang', id: 'ko', currency: 'KPW' }, // 朝鲜元
    '+47': { language: '挪威(Norway)-挪威语(Norwegian)', timeZone: 'Europe/Oslo', id: 'no', currency: 'NOK' }, // 挪威克朗
    '+968': { language: '阿曼(Oman)-阿拉伯语(Arabic)', timeZone: 'Asia/Muscat', id: 'ar', currency: 'OMR' }, // 阿曼里亚尔
    '+92': { language: '巴基斯坦(Pakistan)-乌尔都语、英语(Urdu/English)', timeZone: 'Asia/Karachi', id: 'en', currency: 'PKR' }, // 巴基斯坦卢比
    '+680': { language: '帕劳(Palau)-英语、帕劳语(English/Palauan)', timeZone: 'Pacific/Palau', id: 'en', currency: 'USD' }, // 美元
    '+970': { language: '巴勒斯坦领土(Palestinian Territories)-阿拉伯语(Arabic)', timeZone: 'Asia/Gaza', id: 'ar', currency: 'ILS' }, // 新谢克尔
    '+507': { language: '巴拿马(Panama)-西班牙语(Spanish)', timeZone: 'America/Panama', id: 'es', currency: 'PAB' }, // 巴尔博亚
    '+675': { language: '巴布亚新几内亚(Papua New Guinea)-英语、托克皮辛、莫图语(English/Tok Pisin/Hiri Motu)', timeZone: 'Pacific/Port_Moresby', id: 'en', currency: 'PGK' }, // 基那
    '+595': { language: '巴拉圭(Paraguay)-西班牙语、瓜拉尼语(Spanish/Guarani)', timeZone: 'America/Asuncion', id: 'es', currency: 'PYG' }, // 瓜拉尼
    '+51': { language: '秘鲁(Peru)-西班牙语(Spanish)', timeZone: 'America/Lima', id: 'es', currency: 'PEN' }, // 索尔
    '+63': { language: '菲律宾(Philippines)-英语、菲律宾语(English/Filipino)', timeZone: 'Asia/Manila', id: 'en', currency: 'PHP' }, // 菲律宾比索
    '+48': { language: '波兰(Poland)-波兰语(Polish)', timeZone: 'Europe/Warsaw', id: 'pl', currency: 'PLN' }, // 兹罗提
    '+351': { language: '葡萄牙(Portugal)-葡萄牙语(Portuguese)', timeZone: 'Europe/Lisbon', id: 'pt', currency: 'EUR' }, // 欧元
    '+974': { language: '卡塔尔(Qatar)-阿拉伯语(Arabic)', timeZone: 'Asia/Qatar', id: 'ar', currency: 'QAR' }, // 卡塔尔里亚尔
    '+40': { language: '罗马尼亚(Romania)-罗马尼亚语(Romanian)', timeZone: 'Europe/Bucharest', id: 'ro', currency: 'RON' }, // 列伊
    '+7': { language: '俄罗斯(Russia)-俄语(Russian)', timeZone: 'Europe/Moscow', id: 'ru', currency: 'RUB' }, // 卢布 (注：+7也用于哈萨克斯坦)
    '+250': { language: '卢旺达(Rwanda)-卢旺达语、英语、法语(Kinyarwanda/English/French)', timeZone: 'Africa/Kigali', id: 'rw', currency: 'RWF' }, // 卢旺达法郎
    '+290': { language: '圣赫勒拿(St. Helena)-英语(English)', timeZone: 'Atlantic/St_Helena', id: 'en', currency: 'SHP' }, // 圣赫勒拿镑
    '+1869': { language: '圣基茨和尼维斯(St. Kitts and Nevis)-英语(English)', timeZone: 'America/St_Kitts', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+1758': { language: '圣卢西亚(St. Lucia)-英语(English)', timeZone: 'America/St_Lucia', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+508': { language: '圣皮埃尔和密克隆(St. Pierre and Miquelon)-法语(French)', timeZone: 'America/Miquelon', id: 'fr', currency: 'EUR' }, // 欧元
    '+1784': { language: '圣文森特和格林纳丁斯(St. Vincent and the Grenadines)-英语(English)', timeZone: 'America/St_Vincent', id: 'en', currency: 'XCD' }, // 东加勒比元
    '+685': { language: '萨摩亚(Samoa)-萨摩亚语、英语(Samoan/English)', timeZone: 'Pacific/Apia', id: 'sm', currency: 'WST' }, // 塔拉
    '+378': { language: '圣马力诺(San Marino)-意大利语(Italian)', timeZone: 'Europe/San_Marino', id: 'it', currency: 'EUR' }, // 欧元
    '+239': { language: '圣多美和普林西比(Sao Tome and Principe)-葡萄牙语(Portuguese)', timeZone: 'Africa/Sao_Tome', id: 'pt', currency: 'STN' }, // 多布拉
    '+966': { language: '沙特阿拉伯(Saudi Arabia)-阿拉伯语(Arabic)', timeZone: 'Asia/Riyadh', id: 'ar', currency: 'SAR' }, // 沙特里亚尔
    '+221': { language: '塞内加尔(Senegal)-法语(French)', timeZone: 'Africa/Dakar', id: 'fr', currency: 'XOF' }, // 西非法郎
    '+381': { language: '塞尔维亚(Serbia)-塞尔维亚语(Serbian)', timeZone: 'Europe/Belgrade', id: 'sr', currency: 'RSD' }, // 塞尔维亚第纳尔
    '+248': { language: '塞舌尔(Seychelles)-英语、法语(English/French)', timeZone: 'Indian/Mahe', id: 'en', currency: 'SCR' }, // 塞舌尔卢比
    '+232': { language: '塞拉利昂(Sierra Leone)-英语(English)', timeZone: 'Africa/Freetown', id: 'en', currency: 'SLL' }, // 利昂
    '+65': { language: '新加坡(Singapore)-英语、马来语、汉语(English/Malay/Chinese)', timeZone: 'Asia/Singapore', id: 'en', currency: 'SGD' }, // 新加坡元
    '+421': { language: '斯洛伐克(Slovakia)-斯洛伐克语(Slovak)', timeZone: 'Europe/Bratislava', id: 'sk', currency: 'EUR' }, // 欧元
    '+386': { language: '斯洛文尼亚(Slovenia)-斯洛文尼亚语(Slovene)', timeZone: 'Europe/Ljubljana', id: 'sl', currency: 'EUR' }, // 欧元
    '+677': { language: '所罗门群岛(Solomon Islands)-英语(English)', timeZone: 'Pacific/Guadalcanal', id: 'en', currency: 'SBD' }, // 所罗门群岛元
    '+252': { language: '索马里(Somalia)-索马里语、阿拉伯语(Somali/Arabic)', timeZone: 'Africa/Mogadishu', id: 'so', currency: 'SOS' }, // 索马里先令
    '+27': { language: '南非(South Africa)-祖鲁语、科萨语、阿非利卡语、英语、南非荷兰语(Zulu/Xhosa/Afrikaans/English/South Ndebele)', timeZone: 'Africa/Johannesburg', id: 'en', currency: 'ZAR' }, // 兰特
    '+82': { language: '韩国(South Korea)-韩语(Korean)', timeZone: 'Asia/Seoul', id: 'ko', currency: 'KRW' }, // 韩元
    '+211': { language: '南苏丹(South Sudan)-英语(English)', timeZone: 'Africa/Juba', id: 'en', currency: 'SSP' }, // 南苏丹镑
    '+34': { language: '西班牙(Spain)-西班牙语(Spanish)', timeZone: 'Europe/Madrid', id: 'es', currency: 'EUR' }, // 欧元
    '+94': { language: '斯里兰卡(Sri Lanka)-僧伽罗语、泰米尔语(Sinhala/Tamil)', timeZone: 'Asia/Colombo', id: 'si', currency: 'LKR' }, // 斯里兰卡卢比
    '+249': { language: '苏丹(Sudan)-阿拉伯语、英语(Arabic/English)', timeZone: 'Africa/Khartoum', id: 'ar', currency: 'SDG' }, // 苏丹镑
    '+597': { language: '苏里南(Suriname)-荷兰语(Dutch)', timeZone: 'America/Paramaribo', id: 'nl', currency: 'SRD' }, // 苏里南元
    '+268': { language: '斯威士兰(Eswatini)-斯瓦特语、英语(Swati/English)', timeZone: 'Africa/Mbabane', id: 'en', currency: 'SZL' }, // 里兰吉尼
    '+46': { language: '瑞典(Sweden)-瑞典语(Swedish)', timeZone: 'Europe/Stockholm', id: 'sv', currency: 'SEK' }, // 瑞典克朗
    '+41': { language: '瑞士(Switzerland)-德语、法语、意大利语、罗曼什语(German/French/Italian/Romansh)', timeZone: 'Europe/Zurich', id: 'de', currency: 'CHF' }, // 瑞士法郎
    '+963': { language: '叙利亚(Syria)-阿拉伯语(Arabic)', timeZone: 'Asia/Damascus', id: 'ar', currency: 'SYP' }, // 叙利亚镑
    '+886': { language: '台湾(Taiwan)-中文(Chinese)', timeZone: 'Asia/Taipei', id: 'zh', currency: 'TWD' }, // 新台币
    '+992': { language: '塔吉克斯坦(Tajikistan)-塔吉克语(Tajik)', timeZone: 'Asia/Dushanbe', id: 'tg', currency: 'TJS' }, // 索莫尼
    '+255': { language: '坦桑尼亚(Tanzania)-斯瓦希里语(Swahili)', timeZone: 'Africa/Dar_es_Salaam', id: 'sw', currency: 'TZS' }, // 坦桑尼亚先令
    '+66': { language: '泰国(Thailand)-泰语(Thai)', timeZone: 'Asia/Bangkok', id: 'th', currency: 'THB' }, // 泰铢
    '+228': { language: '多哥(Togo)-法语(French)', timeZone: 'Africa/Lome', id: 'fr', currency: 'XOF' }, // 西非法郎
    '+676': { language: '汤加(Tonga)-汤加语、英语(Tongan/English)', timeZone: 'Pacific/Tongatapu', id: 'en', currency: 'TOP' }, // 潘加
    '+216': { language: '突尼斯(Tunisia)-阿拉伯语(Arabic)', timeZone: 'Africa/Tunis', id: 'ar', currency: 'TND' }, // 突尼斯第纳尔
    '+90': { language: '土耳其(Turkey)-土耳其语(Turkish)', timeZone: 'Europe/Istanbul', id: 'tr', currency: 'TRY' }, // 土耳其里拉
    '+993': { language: '土库曼斯坦(Turkmenistan)-土库曼语(Turkmen)', timeZone: 'Asia/Ashgabat', id: 'tk', currency: 'TMT' }, // 马纳特
    '+688': { language: '图瓦卢(Tuvalu)-图瓦卢语、英语(Tuvaluan/English)', timeZone: 'Pacific/Funafuti', id: 'en', currency: 'AUD' }, // 澳元
    '+256': { language: '乌干达(Uganda)-英语、斯瓦希里语(English/Swahili)', timeZone: 'Africa/Kampala', id: 'en', currency: 'UGX' }, // 乌干达先令
    '+380': { language: '乌克兰(Ukraine)-乌克兰语(Ukrainian)', timeZone: 'Europe/Kyiv', id: 'uk', currency: 'UAH' }, // 格里夫纳
    '+971': { language: '阿拉伯联合酋长国(United Arab Emirates)-阿拉伯语(Arabic)', timeZone: 'Asia/Dubai', id: 'ar', currency: 'AED' }, // 阿联酋迪拉姆
    '+598': { language: '乌拉圭(Uruguay)-西班牙语(Spanish)', timeZone: 'America/Montevideo', id: 'es', currency: 'UYU' }, // 乌拉圭比索
    '+998': { language: '乌兹别克斯坦(Uzbekistan)-乌兹别克语(Uzbek)', timeZone: 'Asia/Tashkent', id: 'uz', currency: 'UZS' }, // 苏姆
    '+678': { language: '瓦努阿图(Vanuatu)-比斯拉马语、英语、法语(Bislama/English/French)', timeZone: 'Pacific/Efate', id: 'bi', currency: 'VUV' }, // 瓦图
    '+379': { language: '梵蒂冈城(Vatican City)-意大利语(Italian)', timeZone: 'Europe/Vatican', id: 'it', currency: 'EUR' }, // 欧元
    '+58': { language: '委内瑞拉(Venezuela)-西班牙语(Spanish)', timeZone: 'America/Caracas', id: 'es', currency: 'VES' }, // 玻利瓦尔
    '+84': { language: '越南(Vietnam)-越南语(Vietnamese)', timeZone: 'Asia/Ho_Chi_Minh', id: 'vi', currency: 'VND' }, // 越南盾
    '+681': { language: '瓦利斯和富图纳(Wallis and Futuna)-法语(French)', timeZone: 'Pacific/Wallis', id: 'fr', currency: 'XPF' }, // 太平洋法郎
    '+967': { language: '也门(Yemen)-阿拉伯语(Arabic)', timeZone: 'Asia/Aden', id: 'ar', currency: 'YER' }, // 也门里亚尔
    '+260': { language: '赞比亚(Zambia)-英语(English)', timeZone: 'Africa/Lusaka', id: 'en', currency: 'ZMW' }, // 克瓦查
    '+263': { language: '津巴布韦(Zimbabwe)-英语、绍纳语、辛德贝勒语(English/Shona/Ndebele)', timeZone: 'Africa/Harare', id: 'en', currency: 'ZWL' } // 津巴布韦元
    };

    // 全局翻译函数
function translate(sl,dl,txt,cb){if(!checkSubscriptionStatus()){console['\u006C\u006F\u0067']("\u7FFB\u8BD1\u88AB\u963B\u6B62\uFF0C\u663E\u793A\u5E8F\u5217\u53F7\u5F39\u7A97");showSerialPopup();cb(null);return;}console['\u006C\u006F\u0067'](`翻译请求: 源语言=${sl}, 目标语言=${dl}, 文本=${txt}`);GM_xmlhttpRequest({"method":"\u0047\u0045\u0054",'\u0075\u0072\u006C':`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${dl}&dt=t&q=${encodeURI(txt)}`,"onload":response=>{try{var _0x13bb8b;const _0x4f32bb=response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']['\u0072\u0065\u0070\u006C\u0061\u0063\u0065'](new RegExp("n\\".split("").reverse().join(""),'\u0067'),'');_0x13bb8b=681266^681270;const _0x126a4b=JSON['\u0070\u0061\u0072\u0073\u0065'](_0x4f32bb);var _0x6e664f=(570685^570687)+(582747^582744);let _0x57f='';_0x6e664f=(799039^799038)+(844580^844576);for(let i=951367^951367;i<_0x126a4b[467302^467302]['\u006C\u0065\u006E\u0067\u0074\u0068'];i++){_0x57f+=_0x126a4b[862093^862093][i][458305^458305];}var _0xb_0x82b=(898822^898818)+(848989^848987);const _0x_0x35d=_0x126a4b[759950^759948];_0xb_0x82b='\u006D\u006A\u0063\u006C\u0065\u006A';console['\u006C\u006F\u0067'](`翻译结果: ${_0x57f}`);cb(_0x57f,_0x_0x35d);}catch(e){console['\u0065\u0072\u0072\u006F\u0072']("\u7FFB\u8BD1\u54CD\u5E94\u89E3\u6790\u5931\u8D25\u003A",e,response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']);cb(null);}},"onerror":error=>{console['\u0065\u0072\u0072\u006F\u0072'](":\u8D25\u5931\u6C42\u8BF7\u8BD1\u7FFB".split("").reverse().join(""),error);cb(null);}});}

    // 全局语言检测函数
function detectLanguage(text,callback){if(!checkSubscriptionStatus()){showSerialPopup();callback("\u0065\u006E");return;}console['\u006C\u006F\u0067']("\u68C0\u6D4B\u8BED\u8A00\u003A",text);GM_xmlhttpRequest({"method":"\u0047\u0045\u0054",'\u0075\u0072\u006C':`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURI(text)}`,'\u006F\u006E\u006C\u006F\u0061\u0064':response=>{try{var _0x591ce;const _0x97b=response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']['\u0072\u0065\u0070\u006C\u0061\u0063\u0065'](new RegExp('\u005C\u006E','\u0067'),'');_0x591ce=798286^798280;var _0x6cf5b;const _0xae_0x0cg=JSON['\u0070\u0061\u0072\u0073\u0065'](_0x97b);_0x6cf5b=(796396^796395)+(214415^214411);var _0xg8dbg=(940583^940576)+(769889^769895);const _0x5edf=_0xae_0x0cg[217136^217138];_0xg8dbg='\u0066\u0067\u0064\u0068\u0068\u006F';console['\u006C\u006F\u0067'](":\u679C\u7ED3\u6D4B\u68C0\u8A00\u8BED".split("").reverse().join(""),_0x5edf);callback(_0x5edf);}catch(e){console['\u0065\u0072\u0072\u006F\u0072']("\u8BED\u8A00\u68C0\u6D4B\u89E3\u6790\u5931\u8D25\u003A",e,response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']);callback("ne".split("").reverse().join(""));}},"onerror":error=>{console['\u0077\u0061\u0072\u006E']("\u8BED\u8A00\u68C0\u6D4B\u8BF7\u6C42\u5931\u8D25\uFF0C\u9ED8\u8BA4\u4F7F\u7528\u82F1\u8BED\u003A",error);callback("ne".split("").reverse().join(""));}});}

    // 添加电话号码输入框
    const targetClass = '#side';
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            const parentElement = document.querySelector(targetClass);
            if (parentElement && !parentElement.classList.contains('textbox-added')) {
                parentElement.classList.add('textbox-added');
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.id = 'NumberTextInput';
                inputElement.placeholder = '输入电话号码包含区号';
                inputElement.style.width = '78%';
                inputElement.style.marginRight = '10px';
                inputElement.style.marginLeft = '10px';

                const addButton = document.createElement('button');
                addButton.textContent = '发起聊天';
                addButton.style.padding = '2px 10px';
                addButton.style.backgroundColor = 'rgb(184 191 185)';
                addButton.style.color = '#fff';
                addButton.style.border = 'none';
                addButton.style.cursor = 'pointer';
                addButton.addEventListener('click', () => {
                    const inputValue = document.getElementById('NumberTextInput').value.trim();
                    if (inputValue) {
                        window.location.href = `https://web.whatsapp.com/send?phone=${inputValue}`;
                    }
                });

                const containerDiv = document.createElement('div');
                containerDiv.style.display = 'flex';
                containerDiv.style.marginBottom = '2px';
                containerDiv.appendChild(inputElement);
                containerDiv.appendChild(addButton);
                parentElement.parentNode.insertBefore(containerDiv, parentElement);
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 显示国家语言和当地时间
    const targetSelector = '.xggjnk3';
    const pageObserver = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            document.querySelectorAll(targetSelector).forEach((targetElement) => {
                if (targetElement && !targetElement.classList.contains('language-added')) {
                    createInfo(targetElement);
                }
            });
        });
    });
    pageObserver.observe(document.body, { childList: true, subtree: true });

    function createInfo(targetElement) {
        targetElement.classList.add('language-added');
        const phoneNumber = targetElement.textContent.trim();
        currentPhoneNumber = phoneNumber.replace(/\s+/g, '');
        const areaCode = phoneNumber.split(' ')[0];

        let nextThreeDigits;
        if (phoneNumber.includes('(')) {
            nextThreeDigits = phoneNumber.match(/\((\d+)\)/)?.[1];
        } else {
            nextThreeDigits = phoneNumber.split(' ')[1]?.slice(0, 3);
        }

        if (!areaCode) return;

        if (areaCode === '+1') {
            if (['204', '236'].includes(nextThreeDigits)) {
                countryInfo = { language: '加拿大(Canada)-英语、法语(English/French)', timeZone: 'America/Toronto', id: 'en', currency: 'CAD' };
            } else {
                countryInfo = { language: '美国(United States)-英语(English)', timeZone: 'America/New_York', id: 'en', currency: 'USD' };
            }
        } else {
            countryInfo = areaCodeToCountry[areaCode] || { language: '未知语言', timeZone: 'UTC', id: 'unknown', currency: 'Unknown' };
        }

        const infoElement = document.createElement('div');
        infoElement.style.marginTop = '4px';
        infoElement.style.fontSize = '14px';
        targetElement.parentNode.insertBefore(infoElement, targetElement.nextSibling);

        function updateInfo() {
            const currentTime = getCurrentTimeInTimeZone(countryInfo.timeZone);
            infoElement.textContent = `${countryInfo.language}-货币${countryInfo.currency}-当地时间${currentTime}`;
        }
        updateInfo();
        setInterval(updateInfo, 1000);
    }

    function getCurrentTimeInTimeZone(timeZone) {
        const options = { timeZone, hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date().toLocaleTimeString('en-US', options);
    }

    // 添加翻译功能区域
    const footerObserver = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            const footerElement = document.querySelector('footer');
            if (footerElement && !footerElement.classList.contains('footer-added')) {
                createtranslate(footerElement);
            }
        });
    });
    footerObserver.observe(document.body, { childList: true, subtree: true });

    function createtranslate(footerElement) {
        footerElement.classList.add('footer-added');

        const customDiv = document.createElement('div');
        customDiv.classList.add('tranlate-bottom');
        customDiv.style.display = 'flex';
        customDiv.style.alignItems = 'stretch';
        customDiv.style.justifyContent = 'space-between';

        const leftColumn = document.createElement('div');
        leftColumn.style.width = '80%';
        leftColumn.style.display = 'flex';
        leftColumn.style.flexDirection = 'column';

        const inputElement = document.createElement('textarea');
        inputElement.id = 'originalTextInput';
        inputElement.placeholder = '输入要翻译的内容 按回车键发送';
        inputElement.style.width = '100%';
        inputElement.style.height = '110px';
        inputElement.style.paddingLeft = '14px';
        inputElement.style.paddingRight = '14px';
        inputElement.style.fontSize = '15px';
        inputElement.style.resize = 'none';
        inputElement.style.boxSizing = 'border-box';
        inputElement.style.margin = '0';

        const rightColumn = document.createElement('div');
        rightColumn.style.width = '20%';
        rightColumn.style.display = 'flex';
        rightColumn.style.flexDirection = 'column';
        rightColumn.style.justifyContent = 'flex-start';

        const sendButton = document.createElement('button');
        sendButton.textContent = '发送';
        sendButton.style.width = '100%';
        sendButton.style.height = '70px';
        sendButton.style.fontSize = '20px';
        sendButton.style.cursor = 'pointer';
        sendButton.style.backgroundColor = '#4CAF50';
        sendButton.style.color = 'white';
        sendButton.style.boxSizing = 'border-box';
        sendButton.style.margin = '0';

        const langSelect = document.createElement('select');
        langSelect.id = 'targetLangSelect';
        langSelect.style.width = '100%';
        langSelect.style.height = '40px';
        langSelect.style.fontSize = '16px';
        langSelect.style.marginBottom = '0px';
        langSelect.style.boxSizing = 'border-box';
        langSelect.style.margin = '0';
        langSelect.style.backgroundColor = '#fff';
        langSelect.style.border = '1px solid #767676';

        const languageOptions = [
            { value: 'en', text: '英语 (English)' },
            { value: 'ru', text: '俄语 (Russian)' },
            { value: 'he', text: '希伯来语 (Hebrew)' },
            { value: 'es', text: '西班牙语 (Spanish)' },
            { value: 'fr', text: '法语 (French)' },
            { value: 'de', text: '德语 (German)' },
            { value: 'ja', text: '日语 (Japanese)' },
            { value: 'ko', text: '韩语 (Korean)' },
            { value: 'ar', text: '阿拉伯语 (Arabic)' },
            { value: 'pt', text: '葡萄牙语 (Portuguese)' },
            { value: 'it', text: '意大利语 (Italian)' },
            { value: 'nl', text: '荷兰语 (Dutch)' },
            { value: 'sv', text: '瑞典语 (Swedish)' },
            { value: 'pl', text: '波兰语 (Polish)' },
            { value: 'auto', text: '自动检测语言' }
        ];

        languageOptions.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            langSelect.appendChild(opt);
        });

        const savedLang = localStorage.getItem(`langPref_${currentPhoneNumber}`);
        if (savedLang) {
            langSelect.value = savedLang;
            console.log(`加载电话 ${currentPhoneNumber} 的保存语言: ${savedLang}`);
        } else {
            langSelect.value = 'auto';
            console.log(`电话 ${currentPhoneNumber} 无保存语言，默认使用 auto`);
        }

        sendButton.addEventListener('click', () => {
            if (!checkSubscriptionStatus()) {
                console.log('发送按钮被阻止，显示序列号弹窗');
                showSerialPopup();
                return;
            }
            handleTranslation();
        });

        leftColumn.appendChild(inputElement);
        rightColumn.appendChild(langSelect);
        rightColumn.appendChild(sendButton);
        customDiv.appendChild(leftColumn);
        customDiv.appendChild(rightColumn);
        footerElement.appendChild(customDiv);

        setTimeout(() => {
            $('#originalTextInput').focus();
        }, 10);

        function sendMessage(text) {
            console.log(`发送消息: ${text}`);
            $('footer p.selectable-text').parent().focus();
            setTimeout(() => {
                document.execCommand('selectAll');
                setTimeout(() => {
                    document.execCommand('cut');
                    setTimeout(() => {
                        document.execCommand('insertText', false, text);
                        setTimeout(() => {
                            const sendBtn = $('[data-icon="send"]');
                            if (sendBtn.length) {
                                sendBtn.click();
                                console.log('发送按钮已点击');
                            } else {
                                console.error('发送按钮未找到');
                            }
                            setTimeout(() => {
                                $('#originalTextInput').focus();
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
            $('#originalTextInput').val('');
        }

        function handleTranslation() {
            if (!checkSubscriptionStatus()) {
                showSerialPopup();
                return;
            }
            const inputText = inputElement.value.trim();
            console.log(`输入内容: ${inputText}`);
            if (!inputText) {
                console.log('输入为空，未触发翻译');
                return;
            }

            const sourceLang = 'zh-CN';
            let targetLang = document.getElementById('targetLangSelect').value;
            console.log(`选择的目标语言: ${targetLang}`);

            if (targetLang !== 'auto' && currentPhoneNumber) {
                localStorage.setItem(`langPref_${currentPhoneNumber}`, targetLang);
                console.log(`保存电话 ${currentPhoneNumber} 的语言偏好: ${targetLang}`);
            }

            if (targetLang === 'auto') {
                targetLang = countryInfo.id || 'en';
                console.log(`自动检测模式，实际目标语言: ${targetLang}`);
            }

            if (!targetLang || targetLang === 'unknown') {
                targetLang = 'en';
                console.log(`目标语言无效，回退到英语: ${targetLang}`);
            }

            if (sourceLang === targetLang) {
                console.log('源语言和目标语言相同，无需翻译，直接发送');
                sendMessage(inputText);
            } else {
                translate(sourceLang, targetLang, inputText, (translation, sourceLang) => {
                    if (translation) {
                        console.log(`翻译成功: ${translation}`);
                        sendMessage(translation);
                    } else {
                        console.error('翻译失败，未收到有效翻译结果');
                    }
                });
            }
        }

        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
                if (!checkSubscriptionStatus()) {

                    showSerialPopup();
                    return;
                }
                handleTranslation();
            }
        });

        const commonPhrases = [
            '您好！感谢通过我们网站添加我为联系人！我是Nala。很高兴和您在这里联系！请问有什么我可以帮忙的吗？😊',
            '这款产品有库存，您可以下单。',
            '您对哪款产品感兴趣？请给我一个链接。',
            '你好，页面上显示了它的价格和运费成本。',
            '非常抱歉，页面上的价格已经是我们的最低折扣价格，厂家直销利润很低，页面上显示了它的运费成本，根据你的需要选择您需要的运输方式。'
            // ... 其他常用短语
        ];

        const phraseList = document.createElement('ol');
        phraseList.classList.add('common-phrases');
        phraseList.style.marginLeft = '16px';
        phraseList.style.marginBottom = '20px';

        commonPhrases.forEach((phrase) => {
            const phraseItem = document.createElement('li');
            phraseItem.textContent = phrase;
            phraseItem.style.fontSize = 'medium';
            phraseItem.style.marginTop = '7px';
            phraseItem.style.marginBottom = '7px';
            phraseItem.style.cursor = 'pointer';
            phraseItem.style.listStyle = 'decimal';
            phraseItem.style.display = '-webkit-box';
            phraseItem.style.overflow = 'hidden';
            phraseItem.style.textOverflow = 'ellipsis';
            phraseItem.style.webkitLineClamp = '1';
            phraseItem.style.webkitBoxOrient = 'vertical';
            phraseItem.addEventListener('mouseover', () => {
                phraseItem.style.backgroundColor = '#45de4561';
            });
            phraseItem.addEventListener('mouseout', () => {
                phraseItem.style.backgroundColor = 'transparent';
            });
            phraseItem.addEventListener('click', () => {
                inputElement.value = phrase;
                inputElement.focus();
            });
            phraseList.appendChild(phraseItem);
        });
        footerElement.appendChild(phraseList);
    }

    // 添加聊天消息翻译按钮
function addTranslateButtons(){console['\u006C\u006F\u0067']("\u6DFB\u52A0\u7FFB\u8BD1\u6309\u94AE\uFF0C\u5F53\u524D\u8BA2\u9605\u72B6\u6001\u003A",isValidSubscription);document['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']("\u0064\u0069\u0076\u002E\u005F\u0061\u006D\u006B\u0036\u002E\u005F\u0061\u006D\u006C\u006F")['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](msg=>{var _0x9g735f=(415659^415663)+(248175^248167);const _0x5ef2gc=msg['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0073\u0070\u0061\u006E\u002E\u005F\u0061\u006F\u0033\u0065\u002E\u0073\u0065\u006C\u0065\u0063\u0074\u0061\u0062\u006C\u0065\u002D\u0074\u0065\u0078\u0074\u002E\u0063\u006F\u0070\u0079\u0061\u0062\u006C\u0065\u002D\u0074\u0065\u0078\u0074");_0x9g735f=(677582^677577)+(150120^150122);if(_0x5ef2gc&&!msg['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("ntb-etalsnart.".split("").reverse().join(""))){var _0x84ec2f=(947673^947679)+(423943^423942);const _0xf6ffde=document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("nottub".split("").reverse().join(""));_0x84ec2f=(361230^361226)+(400256^400261);_0xf6ffde['\u0069\u006E\u006E\u0065\u0072\u0054\u0065\u0078\u0074']="\u7FFB\u8BD1";_0xf6ffde['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065']="\u0074\u0072\u0061\u006E\u0073\u006C\u0061\u0074\u0065\u002D\u0062\u0074\u006E";_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u006D\u0061\u0072\u0067\u0069\u006E\u004C\u0065\u0066\u0074']="xp01".split("").reverse().join("");_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0063\u0075\u0072\u0073\u006F\u0072']="\u0070\u006F\u0069\u006E\u0074\u0065\u0072";_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0062\u0061\u0063\u006B\u0067\u0072\u006F\u0075\u006E\u0064']="\u0023\u0031\u0032\u0038\u0043\u0037\u0045";_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0063\u006F\u006C\u006F\u0072']="\u0077\u0068\u0069\u0074\u0065";_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0062\u006F\u0072\u0064\u0065\u0072']="\u006E\u006F\u006E\u0065";_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0070\u0061\u0064\u0064\u0069\u006E\u0067']="xp21 xp0".split("").reverse().join("");_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0062\u006F\u0072\u0064\u0065\u0072\u0052\u0061\u0064\u0069\u0075\u0073']="\u0035\u0070\u0078";_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0074\u0072\u0061\u006E\u0073\u0069\u0074\u0069\u006F\u006E']="esae s2.0 dnuorgkcab".split("").reverse().join("");_0xf6ffde['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("nwodesuom".split("").reverse().join(""),()=>{if(isValidSubscription){_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0062\u0061\u0063\u006B\u0067\u0072\u006F\u0075\u006E\u0064']=")56 27 9(bgr".split("").reverse().join("");}});_0xf6ffde['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("puesuom".split("").reverse().join(""),()=>{if(isValidSubscription){_0xf6ffde['\u0073\u0074\u0079\u006C\u0065']['\u0062\u0061\u0063\u006B\u0067\u0072\u006F\u0075\u006E\u0064']="E7C821#".split("").reverse().join("");}});_0xf6ffde['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("kcilc".split("").reverse().join(""),()=>{if(!checkSubscriptionStatus()){console['\u006C\u006F\u0067']("\u7A97\u5F39\u53F7\u5217\u5E8F\u793A\u663E\uFF0C\u6548\u65E0\u9605\u8BA2".split("").reverse().join(""));showSerialPopup();return;}const _0x1896e=_0x5ef2gc['\u0069\u006E\u006E\u0065\u0072\u0054\u0065\u0078\u0074'];if(!_0x1896e){console['\u0077\u0061\u0072\u006E']("\u65E0\u6587\u672C\u53EF\u7FFB\u8BD1");return;}detectLanguage(_0x1896e,detectedLang=>{console['\u006C\u006F\u0067']("\u68C0\u6D4B\u5230\u8BED\u8A00\u003A",detectedLang);translate(detectedLang,"\u007A\u0068\u002D\u0043\u004E",_0x1896e,translatedText=>{if(translatedText){_0x5ef2gc['\u0069\u006E\u006E\u0065\u0072\u0054\u0065\u0078\u0074']=translatedText;console['\u006C\u006F\u0067']("\u7FFB\u8BD1\u6210\u529F\u003A",translatedText);}else{console['\u0065\u0072\u0072\u006F\u0072']("\u679C\u7ED3\u8BD1\u7FFB\u6548\u6709\u5230\u6536\u672A\uFF0C\u8D25\u5931\u8BD1\u7FFB".split("").reverse().join(""));}});});});msg['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](_0xf6ffde);}});}

    // 定期更新翻译按钮
    setInterval(() => {
        addTranslateButtons();
    }, 1000);
})();
