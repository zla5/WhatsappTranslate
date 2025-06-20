// ==UserScript==
// @name         WhatsApp自动翻译/显示国家/当地时间-免费谷歌/Bing翻译
// @namespace    https://raw.githubusercontent.com/zla5/WhatsappTranslate/refs/heads/main/WhatsappTranslate.js
// @version      2025/6/21
// @description  根据电话区号查询国家语言和语言代码，显示国家信息和当地时间，支持消息翻译成中文(谷歌和Bing)。
// @author       zla5
// @match        https://web.whatsapp.com*
// @match        https://web.whatsapp.com/*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      translate.googleapis.com
// @connect      translation.googleapis.com
// @connect      serial.babyamy.store
// @connect      edge.microsoft.com
// @connect      api-edge.cognitive.microsofttranslator.com
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


var _0x9cd=(415262^415255)+(715289^715294);let countryInfo={};_0x9cd=443324^443322;var _0x59780a;let currentPhoneNumber='';_0x59780a=(301285^301293)+(757246^757243);var _0xg9daec;let isValidSubscription=false;_0xg9daec=(786958^786954)+(935608^935615);var _0x4b_0x812=(685455^685454)+(583904^583908);let expiresAt=localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D']("\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u0041\u0074");_0x4b_0x812=892856^892859;let trialStart=localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D']("tratSlairt".split("").reverse().join(""));var _0x3g52ec;let trialEnd=localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064");_0x3g52ec=126487^126487;if(!trialStart){trialStart=new Date()['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']();localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("tratSlairt".split("").reverse().join(""),trialStart);trialEnd=new Date(new Date(trialStart)['\u0067\u0065\u0074\u0054\u0069\u006D\u0065']()+(839086^839081)*(349057^349081)*(667391^667331)*(494793^494837)*(431386^431858))['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']();localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064",trialEnd);}function checkSubscriptionStatus(){const _0xdd19a=new Date();var _0xeac19c;let _0xgf746c=new Date(trialEnd);_0xeac19c=(323561^323560)+(681647^681647);if(isNaN(_0xgf746c['\u0067\u0065\u0074\u0054\u0069\u006D\u0065']())){trialEnd=new Date(new Date(trialStart)['\u0067\u0065\u0074\u0054\u0069\u006D\u0065']()+(541370^541373)*(934159^934167)*(958563^958559)*(976559^976531)*(807840^806984))['\u0074\u006F\u0049\u0053\u004F\u0053\u0074\u0072\u0069\u006E\u0067']();localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064",trialEnd);_0xgf746c=new Date(trialEnd);}if(expiresAt&&new Date(expiresAt)>_0xdd19a){isValidSubscription=!![];}else if(_0xdd19a<_0xgf746c){isValidSubscription=!![];}else{isValidSubscription=false;}return isValidSubscription;}function validateSerial(serial,callback){GM_xmlhttpRequest({'\u006D\u0065\u0074\u0068\u006F\u0064':'GET',"url":`https://serial.babyamy.store/validate?serial=${serial}`,'\u006F\u006E\u006C\u006F\u0061\u0064':function(response){try{const _0x6b233a=JSON['\u0070\u0061\u0072\u0073\u0065'](response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']);if(_0x6b233a['\u0073\u0074\u0061\u0074\u0075\u0073']==="\u0076\u0061\u006C\u0069\u0064"&&_0x6b233a['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074']){localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u0041\u0074",_0x6b233a['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074']);localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("\u0073\u0065\u0072\u0069\u0061\u006C",_0x6b233a['\u0073\u0065\u0072\u0069\u0061\u006C']);expiresAt=_0x6b233a['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074'];trialEnd=_0x6b233a['\u0065\u0078\u0070\u0069\u0072\u0065\u0073\u005F\u0061\u0074'];localStorage['\u0073\u0065\u0074\u0049\u0074\u0065\u006D']("\u0074\u0072\u0069\u0061\u006C\u0045\u006E\u0064",trialEnd);isValidSubscription=new Date(expiresAt)>new Date();callback(!![]);}else{callback(false);}}catch(e){callback(false);}},"onerror":function(error){callback(false);}});}function showSerialPopup(){const _0x6ee85a=document['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("pupop-laires.".split("").reverse().join(""));if(_0x6ee85a)_0x6ee85a['\u0072\u0065\u006D\u006F\u0076\u0065']();var _0x3c525a=(306108^306104)+(946883^946884);const _0x2317e=document['\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006C\u0065\u006D\u0065\u006E\u0074']("\u0064\u0069\u0076");_0x3c525a=565456^565464;_0x2317e['\u0063\u006C\u0061\u0073\u0073\u004E\u0061\u006D\u0065']="\u0073\u0065\u0072\u0069\u0061\u006C\u002D\u0070\u006F\u0070\u0075\u0070";_0x2317e['\u0069\u006E\u006E\u0065\u0072\u0048\u0054\u004D\u004C']=`
            <p style="user-select: text;">您的试用期已经结束，请联系客服续费,微信:zla552200</p><br>
            <p style="user-select: text;">✨✨套餐:1年19元,2年35元✨✨</p>
            <input type="text" id="serialInput" placeholder="请输入序列号">
            <button id="submitSerial">提交</button>
        `;document['\u0062\u006F\u0064\u0079']['\u0061\u0070\u0070\u0065\u006E\u0064\u0043\u0068\u0069\u006C\u0064'](_0x2317e);_0x2317e['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u006D\u006F\u0075\u0073\u0065\u0064\u006F\u0077\u006E",event=>{if(event['\u0074\u0061\u0072\u0067\u0065\u0074']['\u0074\u0061\u0067\u004E\u0061\u006D\u0065']==="\u0050"){event['\u0073\u0074\u006F\u0070\u0050\u0072\u006F\u0070\u0061\u0067\u0061\u0074\u0069\u006F\u006E']();}});const _0xfc87c=_0x2317e['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("laireStimbus#".split("").reverse().join(""));var _0x77ff4d=(958072^958073)+(792391^792385);const _0x0c_0x43c=_0x2317e['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072']("\u0023\u0073\u0065\u0072\u0069\u0061\u006C\u0049\u006E\u0070\u0075\u0074");_0x77ff4d=(116613^116611)+(777754^777747);_0xfc87c['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u0063\u006C\u0069\u0063\u006B",()=>{var _0xa8c51b;const _0x89890e=_0x0c_0x43c['\u0076\u0061\u006C\u0075\u0065']['\u0074\u0072\u0069\u006D']();_0xa8c51b="kehkmd".split("").reverse().join("");if(_0x89890e){validateSerial(_0x89890e,isValid=>{if(isValid){_0x2317e['\u0072\u0065\u006D\u006F\u0076\u0065']();}else{alert("\u65E0\u6548\u7684\u5E8F\u5217\u53F7\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D\u83B7\u53D6\u6709\u6548\u5E8F\u5217\u53F7");}});}else{alert("\u53F7\u5217\u5E8F\u5165\u8F93\u8BF7".split("").reverse().join(""));}});}function refreshTranslateButtons(){document['\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006C\u0065\u0063\u0074\u006F\u0072\u0041\u006C\u006C']("\u002E\u0074\u0072\u0061\u006E\u0073\u006C\u0061\u0074\u0065\u002D\u0062\u0074\u006E")['\u0066\u006F\u0072\u0045\u0061\u0063\u0068'](btn=>btn['\u0072\u0065\u006D\u006F\u0076\u0065']());addTranslateButtons();}checkSubscriptionStatus();


	
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

function translateWithGoogle(sl,dl,txt,cb){console['\u006C\u006F\u0067'](`Google 翻译请求: 源语言=${sl}, 目标语言=${dl}, 文本=${txt}`);GM_xmlhttpRequest({'\u006D\u0065\u0074\u0068\u006F\u0064':'GET',"url":`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${dl}&dt=t&q=${encodeURI(txt)}`,"onload":response=>{try{var _0x3fc=(351298^351298)+(360252^360245);const _0xdd_0xf0a=response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']['\u0072\u0065\u0070\u006C\u0061\u0063\u0065'](new RegExp("n\\".split("").reverse().join(""),'\u0067'),'');_0x3fc=215272^215279;var _0x1a417f=(585214^585206)+(470149^470157);const _0x531feb=JSON['\u0070\u0061\u0072\u0073\u0065'](_0xdd_0xf0a);_0x1a417f='\u006F\u006B\u0067\u0063\u0071\u006A';let _0x4afaff='';for(let i=281660^281660;i<_0x531feb[811205^811205]['\u006C\u0065\u006E\u0067\u0074\u0068'];i++){_0x4afaff+=_0x531feb[417097^417097][i][623662^623662];}const _0x2_0x56e=_0x531feb[458823^458821];console['\u006C\u006F\u0067'](`Google 翻译结果: ${_0x4afaff}`);cb(_0x4afaff,_0x2_0x56e);}catch(e){console['\u0065\u0072\u0072\u006F\u0072']("\u0047\u006F\u006F\u0067\u006C\u0065\u0020\u7FFB\u8BD1\u54CD\u5E94\u89E3\u6790\u5931\u8D25\u003A",e,response['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']);cb(null);}},'\u006F\u006E\u0065\u0072\u0072\u006F\u0072':error=>{console['\u0065\u0072\u0072\u006F\u0072'](":\u8D25\u5931\u6C42\u8BF7\u8BD1\u7FFB elgooG".split("").reverse().join(""),error);cb(null);}});}async function translateWithBing(sl,dl,txt,cb){if(dl==="NC-hz".split("").reverse().join("")||dl==="hz".split("").reverse().join(""))dl="\u007A\u0068\u002D\u0048\u0061\u006E\u0073";if(sl==="NC-hz".split("").reverse().join("")||sl==="hz".split("").reverse().join(""))sl="snaH-hz".split("").reverse().join("");if(dl==="\u007A\u0068\u002D\u0054\u0057")dl="tnaH-hz".split("").reverse().join("");if(sl==="\u007A\u0068\u002D\u0054\u0057")sl="\u007A\u0068\u002D\u0048\u0061\u006E\u0074";console['\u006C\u006F\u0067'](`Bing 翻译请求: 源语言=${sl}, 目标语言=${dl}, 文本=${txt}`);try{var _0xf9d7f;const _0x2ebfg="\u0068\u0074\u0074\u0070\u0073\u003A\u002F\u002F\u0065\u0064\u0067\u0065\u002E\u006D\u0069\u0063\u0072\u006F\u0073\u006F\u0066\u0074\u002E\u0063\u006F\u006D\u002F\u0074\u0072\u0061\u006E\u0073\u006C\u0061\u0074\u0065\u002F\u0061\u0075\u0074\u0068";_0xf9d7f=(454144^454151)+(712049^712053);const _0x52b47e={"\u0055\u0073\u0065\u0072\u002D\u0041\u0067\u0065\u006E\u0074":"\u004D\u006F\u007A\u0069\u006C\u006C\u0061\u002F\u0035\u002E\u0030\u0020\u0028\u0057\u0069\u006E\u0064\u006F\u0077\u0073\u0020\u004E\u0054\u0020\u0031\u0030\u002E\u0030\u003B\u0020\u0057\u0069\u006E\u0036\u0034\u003B\u0020\u0078\u0036\u0034\u0029\u0020\u0041\u0070\u0070\u006C\u0065\u0057\u0065\u0062\u004B\u0069\u0074\u002F\u0035\u0033\u0037\u002E\u0033\u0036\u0020\u0028\u004B\u0048\u0054\u004D\u004C\u002C\u0020\u006C\u0069\u006B\u0065\u0020\u0047\u0065\u0063\u006B\u006F\u0029\u0020\u0043\u0068\u0072\u006F\u006D\u0065\u002F\u0031\u0031\u0033\u002E\u0030\u002E\u0030\u002E\u0030\u0020\u0053\u0061\u0066\u0061\u0072\u0069\u002F\u0035\u0033\u0037\u002E\u0033\u0036\u0020\u0045\u0064\u0067\u002F\u0031\u0031\u0033\u002E\u0030\u002E\u0031\u0037\u0037\u0034\u002E\u0032\u0033",'Accept-Language':"\u007A\u0068\u002D\u0054\u0057\u002C\u007A\u0068\u003B\u0071\u003D\u0030\u002E\u0039\u002C\u006A\u0061\u003B\u0071\u003D\u0030\u002E\u0038\u002C\u007A\u0068\u002D\u0043\u004E\u003B\u0071\u003D\u0030\u002E\u0037\u002C\u0065\u006E\u002D\u0055\u0053\u003B\u0071\u003D\u0030\u002E\u0036\u002C\u0065\u006E\u003B\u0071\u003D\u0030\u002E\u0035"};const _0xf16d=await new Promise((resolve,reject)=>{GM_xmlhttpRequest({"method":"\u0047\u0045\u0054",'\u0075\u0072\u006C':_0x2ebfg,'\u0068\u0065\u0061\u0064\u0065\u0072\u0073':_0x52b47e,'\u006F\u006E\u006C\u006F\u0061\u0064':res=>res['\u0073\u0074\u0061\u0074\u0075\u0073']===(219540^219484)?resolve(res['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']):reject(`Bing Auth Error: ${res['\u0073\u0074\u0061\u0074\u0075\u0073']}`),'\u006F\u006E\u0065\u0072\u0072\u006F\u0072':err=>reject(`Bing auth request error: ${err}`)});});let _0xae_0x518=`https://api-edge.cognitive.microsofttranslator.com/translate?to=${dl}&api-version=3.0&includeSentenceLength=true`;if(sl!=="otua".split("").reverse().join("")){_0xae_0x518=`https://api-edge.cognitive.microsofttranslator.com/translate?from=${sl}&to=${dl}&api-version=3.0&includeSentenceLength=true`;}var _0x_0xb6a=(934547^934551)+(849375^849369);const _0x3_0x4f9={"\u0041\u0075\u0074\u0068\u006F\u0072\u0069\u007A\u0061\u0074\u0069\u006F\u006E":"\u0042\u0065\u0061\u0072\u0065\u0072\u0020"+_0xf16d,'Content-Type':'application/json',"\u0055\u0073\u0065\u0072\u002D\u0041\u0067\u0065\u006E\u0074":"\u004D\u006F\u007A\u0069\u006C\u006C\u0061\u002F\u0035\u002E\u0030\u0020\u0028\u0057\u0069\u006E\u0064\u006F\u0077\u0073\u0020\u004E\u0054\u0020\u0031\u0030\u002E\u0030\u003B\u0020\u0057\u0069\u006E\u0036\u0034\u003B\u0020\u0078\u0036\u0034\u0029\u0020\u0041\u0070\u0070\u006C\u0065\u0057\u0065\u0062\u004B\u0069\u0074\u002F\u0035\u0033\u0037\u002E\u0033\u0036\u0020\u0028\u004B\u0048\u0054\u004D\u004C\u002C\u0020\u006C\u0069\u006B\u0065\u0020\u0047\u0065\u0063\u006B\u006F\u0029\u0020\u0043\u0068\u0072\u006F\u006D\u0065\u002F\u0031\u0031\u0033\u002E\u0030\u002E\u0030\u002E\u0030\u0020\u0053\u0061\u0066\u0061\u0072\u0069\u002F\u0035\u0033\u0037\u002E\u0033\u0036\u0020\u0045\u0064\u0067\u002F\u0031\u0031\u0033\u002E\u0030\u002E\u0031\u0037\u0037\u0034\u002E\u0032\u0033"};_0x_0xb6a="fmlofl".split("").reverse().join("");const _0x971acb=JSON['\u0073\u0074\u0072\u0069\u006E\u0067\u0069\u0066\u0079']([{"\u0054\u0065\u0078\u0074":txt}]);const _0xd26b9c=await new Promise((resolve,reject)=>{GM_xmlhttpRequest({"method":"\u0050\u004F\u0053\u0054","url":_0xae_0x518,'\u0068\u0065\u0061\u0064\u0065\u0072\u0073':_0x3_0x4f9,'\u0064\u0061\u0074\u0061':_0x971acb,'\u006F\u006E\u006C\u006F\u0061\u0064':function(translateResponse){try{const _0x1badf=JSON['\u0070\u0061\u0072\u0073\u0065'](translateResponse['\u0072\u0065\u0073\u0070\u006F\u006E\u0073\u0065\u0054\u0065\u0078\u0074']);if(_0x1badf&&_0x1badf['\u006C\u0065\u006E\u0067\u0074\u0068']>(812426^812426)&&_0x1badf[639332^639332]['\u0074\u0072\u0061\u006E\u0073\u006C\u0061\u0074\u0069\u006F\u006E\u0073']&&_0x1badf[256806^256806]['\u0074\u0072\u0061\u006E\u0073\u006C\u0061\u0074\u0069\u006F\u006E\u0073']['\u006C\u0065\u006E\u0067\u0074\u0068']>(661912^661912)){resolve(_0x1badf[400031^400031]['\u0074\u0072\u0061\u006E\u0073\u006C\u0061\u0074\u0069\u006F\u006E\u0073'][566360^566360]['\u0074\u0065\u0078\u0074']);}else{reject(".tluser oN :deliaf noitalsnart gniB".split("").reverse().join(""));}}catch(e){reject(`Bing translation parse error: ${e}`);}},'\u006F\u006E\u0065\u0072\u0072\u006F\u0072':err=>reject(`Bing translation request error: ${err}`)});});console['\u006C\u006F\u0067'](`Bing 翻译结果: ${_0xd26b9c}`);cb(_0xd26b9c,null);}catch(error){console['\u0065\u0072\u0072\u006F\u0072'](error);cb(null);}}function translate(sl,dl,txt,cb){if(!checkSubscriptionStatus()){showSerialPopup();cb(null);return;}var _0xd2gabe=(915295^915290)+(180036^180038);const _0xce6b=localStorage['\u0067\u0065\u0074\u0049\u0074\u0065\u006D']("enignEnoitalsnart".split("").reverse().join(""))||"\u0067\u006F\u006F\u0067\u006C\u0065";_0xd2gabe=210620^210618;console['\u006C\u006F\u0067'](`使用 ${_0xce6b} 翻译引擎进行翻译`);if(_0xce6b==="gnib".split("").reverse().join("")){translateWithBing(sl,dl,txt,cb);}else{translateWithGoogle(sl,dl,txt,cb);}}

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
            if (['204', '236', '249', '250', '289', '306', '343', '365', '403', '416', '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587', '600', '604', '613', '639', '647', '705', '709', '742', '778', '780', '782', '807', '819', '825', '867', '873', '902', '905'].includes(nextThreeDigits)) {
                countryInfo = { language: '加拿大(Canada)-英语、法语(English/French)', timeZone: 'America/Toronto', id: 'en', currency: 'CAD' };
            } else if (['787', '939'].includes(nextThreeDigits)) {
                countryInfo = { language: '波多黎各(Puerto Rico)-英语(English)', timeZone: 'America/Puerto_Rico', id: 'en', currency: 'USD' };
            } else if (['671'].includes(nextThreeDigits)) {
                countryInfo = { language: '关岛(Guam)-英语(English)', timeZone: 'America/Guam', id: 'en', currency: 'USD' };
            } else if (['340'].includes(nextThreeDigits)) {
                countryInfo = { language: '美属维尔京群岛(US Virgin Islands)-英语(English)', timeZone: 'America/St_Thomas', id: 'en', currency: 'USD' };
            } else if (['684'].includes(nextThreeDigits)) {
                countryInfo = { language: '美属萨摩亚(American Samoa)-英语(English)', timeZone: 'Pacific/Pago_Pago', id: 'en', currency: 'USD' };
            } else if (['670'].includes(nextThreeDigits)) {
                countryInfo = { language: '北马里亚纳群岛(Northern Mariana Islands)-英语(English)', timeZone: 'Pacific/Saipan', id: 'en', currency: 'USD' };
            } else if (['868'].includes(nextThreeDigits)) {
                countryInfo = { language: '特立尼达和多巴哥(Trinidad and Tobago)-英语(English)', timeZone: 'America/Port_of_Spain', id: 'en', currency: 'TTD' };
            } else {
                countryInfo = { language: '美国(United States)-英语(English)', timeZone: 'America/New_York', id: 'en', currency: 'USD' };
            }
        } else {
            countryInfo = areaCodeToCountry[areaCode] || { language: '未知语言', timeZone: 'UTC', id: 'unknown', currency: '未知' };
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
        rightColumn.style.flexDirection = 'column';
        rightColumn.style.justifyContent = 'flex-start';

        const sendButton = document.createElement('button');
        sendButton.textContent = '发送';
        sendButton.style.width = '100%';
        sendButton.style.height = '74px';
        sendButton.style.fontSize = '18px';
        sendButton.style.cursor = 'pointer';
        sendButton.style.backgroundColor = '#4CAF50';
        sendButton.style.color = 'white';
        sendButton.style.boxSizing = 'border-box';
 


        const langSelect = document.createElement('select');
        langSelect.id = 'targetLangSelect';
        langSelect.style.width = '60%';
        langSelect.style.height = '35px';
        langSelect.style.fontSize = '16px';
        langSelect.style.marginBottom = '0px';
        langSelect.style.boxSizing = 'border-box';
        langSelect.style.padding = '5px';
        langSelect.style.backgroundColor = '#fff';
        langSelect.style.borderTop = '1px solid rgb(118, 118, 118)';


        const languageOptions = [
            { value: 'auto', text: '自动检测语言' },
            { value: 'en', text: '英语 (English)' },
            { value: 'zh', text: '中文 (Chinese)' },
            { value: 'es', text: '西班牙语 (Spanish)' },
            { value: 'hi', text: '印地语 (Hindi)' },
            { value: 'ar', text: '阿拉伯语 (Arabic)' },
            { value: 'pt', text: '葡萄牙语 (Portuguese)' },
            { value: 'bn', text: '孟加拉语 (Bengali)' },
            { value: 'ru', text: '俄语 (Russian)' },
            { value: 'ja', text: '日语 (Japanese)' },
            { value: 'de', text: '德语 (German)' },
            { value: 'fr', text: '法语 (French)' },
            { value: 'id', text: '印尼语 (Indonesian)' },
            { value: 'ms', text: '马来语 (Malay)' },
            { value: 'ur', text: '乌尔都语 (Urdu)' },
            { value: 'vi', text: '越南语 (Vietnamese)' },
            { value: 'ko', text: '韩语 (Korean)' },
            { value: 'tr', text: '土耳其语 (Turkish)' },
            { value: 'it', text: '意大利语 (Italian)' },
            { value: 'fa', text: '波斯语 (Persian)' },
            { value: 'th', text: '泰语 (Thai)' },
            { value: 'pl', text: '波兰语 (Polish)' },
            { value: 'uk', text: '乌克兰语 (Ukrainian)' },
            { value: 'nl', text: '荷兰语 (Dutch)' },
            { value: 'ro', text: '罗马尼亚语 (Romanian)' },
            { value: 'sv', text: '瑞典语 (Swedish)' },
            { value: 'cs', text: '捷克语 (Czech)' },
            { value: 'el', text: '希腊语 (Greek)' },
            { value: 'he', text: '希伯来语 (Hebrew)' },
            { value: 'hu', text: '匈牙利语 (Hungarian)' },
            { value: 'fi', text: '芬兰语 (Finnish)' },
            { value: 'no', text: '挪威语 (Norwegian)' },
            { value: 'da', text: '丹麦语 (Danish)' },
            { value: 'sk', text: '斯洛伐克语 (Slovak)' },
            { value: 'sl', text: '斯洛文尼亚语 (Slovenian)' },
            { value: 'hr', text: '克罗地亚语 (Croatian)' },
            { value: 'bg', text: '保加利亚语 (Bulgarian)' },
            { value: 'lt', text: '立陶宛语 (Lithuanian)' },
            { value: 'sr', text: '塞尔维亚语 (Serbian)' },
            { value: 'et', text: '爱沙尼亚语 (Estonian)' },
            { value: 'ta', text: '泰米尔语 (Tamil)' },
            { value: 'te', text: '泰卢固语 (Telugu)' },
            { value: 'ml', text: '马拉雅拉姆语 (Malayalam)' },
            { value: 'kn', text: '卡纳达语 (Kannada)' },
            { value: 'mr', text: '马拉地语 (Marathi)' },
            { value: 'gu', text: '古吉拉特语 (Gujarati)' },
            { value: 'pa', text: '旁遮普语 (Punjabi)' },
            { value: 'am', text: '阿姆哈拉语 (Amharic)' },
            { value: 'my', text: '缅甸语 (Burmese)' },
            { value: 'km', text: '高棉语 (Khmer)' },
            { value: 'lo', text: '老挝语 (Lao)' },
            { value: 'si', text: '僧伽罗语 (Sinhala)' },
            { value: 'ne', text: '尼泊尔语 (Nepali)' },
            { value: 'mn', text: '蒙古语 (Mongolian)' },
            { value: 'hy', text: '亚美尼亚语 (Armenian)' },
            { value: 'ka', text: '格鲁吉亚语 (Georgian)' },
            { value: 'az', text: '阿塞拜疆语 (Azerbaijani)' },
            { value: 'kk', text: '哈萨克语 (Kazakh)' },
            { value: 'uz', text: '乌兹别克语 (Uzbek)' },
            { value: 'tg', text: '塔吉克语 (Tajik)' },
            { value: 'ps', text: '普什图语 (Pashto)' }
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

        const engineSelect = document.createElement('select');
        engineSelect.id = 'translationEngineSelect';
        engineSelect.style.width = '40%';
        engineSelect.style.height = '35px';
        engineSelect.style.fontSize = '16px';
        engineSelect.style.boxSizing = 'border-box';
        engineSelect.style.padding = '5px';
        engineSelect.style.backgroundColor = '#fff';
        engineSelect.style.borderLeft = '1px solid #767676';
        engineSelect.style.borderTop = '1px solid rgb(118, 118, 118)';

        const engineOptions = [
            { value: 'google', text: '谷歌翻译' },
            { value: 'bing', text: 'Bing翻译' }
        ];

        engineOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            engineSelect.appendChild(opt);
        });

        const savedEngine = localStorage.getItem('translationEngine');
        if (savedEngine) {
            engineSelect.value = savedEngine;
        }

        engineSelect.addEventListener('change', () => {
            localStorage.setItem('translationEngine', engineSelect.value);
            console.log(`翻译引擎已切换为: ${engineSelect.value}`);
        });

sendButton['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u0063\u006C\u0069\u0063\u006B",()=>{if(!checkSubscriptionStatus()){showSerialPopup();return;}handleTranslation();});

        leftColumn.appendChild(inputElement);
        rightColumn.appendChild(langSelect);
        rightColumn.appendChild(engineSelect);
        rightColumn.appendChild(sendButton);
        customDiv.appendChild(leftColumn);
        customDiv.appendChild(rightColumn);
        footerElement.appendChild(customDiv);

        setTimeout(() => {
            $('#originalTextInput').focus();
        }, 10);

        function sendMessage(text) {
            //console.log(`发送消息: ${text}`);
            $('footer p.selectable-text').parent().focus();
            setTimeout(() => {
                document.execCommand('selectAll');
                setTimeout(() => {
                    document.execCommand('cut');
                    setTimeout(() => {
                        document.execCommand('insertText', false, text);
                        setTimeout(() => {
							const sendBtn = $('[data-icon="wds-ic-send-filled"]');
                            if (sendBtn.length) {
                                sendBtn.click();
                                //console.log('发送按钮已点击');
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

inputElement['\u0061\u0064\u0064\u0045\u0076\u0065\u006E\u0074\u004C\u0069\u0073\u0074\u0065\u006E\u0065\u0072']("\u006B\u0065\u0079\u0064\u006F\u0077\u006E",event=>{if(event['\u006B\u0065\u0079']==="retnE".split("").reverse().join("")&&!event['\u0073\u0068\u0069\u0066\u0074\u004B\u0065\u0079']&&!event['\u0063\u0074\u0072\u006C\u004B\u0065\u0079']&&!event['\u0061\u006C\u0074\u004B\u0065\u0079']){if(!checkSubscriptionStatus()){showSerialPopup();return;}handleTranslation();}});

        const commonPhrases = [
            '您好！感谢加我为联系人！我是Nala。很高兴和您在这里联系！请问有什么我可以帮忙的吗？😊',
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

    // IndexedDB缓存实现
    const DB_NAME = 'wa_translate_db';
    const DB_STORE = 'msg_cache';
    const DB_VERSION = 1;
    let dbInstance = null;

    function openDB() {
        return new Promise((resolve, reject) => {
            if (dbInstance) return resolve(dbInstance);
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = (e) => reject(e);
            request.onsuccess = (e) => {
                dbInstance = e.target.result;
                resolve(dbInstance);
            };
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(DB_STORE)) {
                    db.createObjectStore(DB_STORE);
                }
            };
        });
    }

    function getMsgCacheKey(text) {
        return 'wa_translate_cache_' + btoa(unescape(encodeURIComponent(text)));
    }

    async function getCache(key) {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction([DB_STORE], 'readonly');
            const store = tx.objectStore(DB_STORE);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(undefined);
        });
    }

    async function setCache(key, value) {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction([DB_STORE], 'readwrite');
            const store = tx.objectStore(DB_STORE);
            const req = store.put(value, key);
            req.onsuccess = () => resolve();
            req.onerror = () => resolve();
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function translateVisibleMessages() {
        document.querySelectorAll('div._amk6._amlo').forEach(async (msg) => {
            const textElement = msg.querySelector('span._ao3e.selectable-text.copyable-text');
            if (!textElement) return;
            if (msg.querySelector('.translated-text')) return;
            if (msg.getAttribute('data-translated') === '1') return;
            if (!isElementInViewport(msg)) return;
            const originalText = textElement.innerText;
            if (!originalText) return;
            msg.setAttribute('data-translated', '1');

            // 检查IndexedDB缓存
            const cacheKey = getMsgCacheKey(originalText);
            const cached = await getCache(cacheKey);
            if (cached) {
                const wrapper = document.createElement('div');
                wrapper.className = 'translated-text';
                wrapper.style.marginTop = '6px';
                wrapper.style.fontSize = '14px';
                wrapper.innerHTML =
				//如果你要修改译文的显示颜色，将下面的#333修改为其它值，如#999
                    '<div class="selectable-text copyable-text" style="user-select: text; border-top:1px dashed #bbb;margin:4px 0 0 0;padding:4px 0 0 0;white-space:pre-line;color:#333;">' +
                    cached +
                    '</div>';
                if (textElement.parentNode) {
                    textElement.parentNode.appendChild(wrapper);
                }
                return;
            }

            translate('auto', 'zh-CN', originalText, async (translatedText) => {
                if (translatedText) {
                    await setCache(cacheKey, translatedText);
                    const wrapper = document.createElement('div');
                    wrapper.className = 'translated-text';
                    wrapper.style.marginTop = '6px';
                    wrapper.style.fontSize = '14px';
                    wrapper.innerHTML =
				//如果你要修改译文的显示颜色，将下面的#333修改为其它值，如#999					
                        '<div class="selectable-text copyable-text" style="user-select: text; border-top:1px dashed #bbb;margin:4px 0 0 0;padding:4px 0 0 0;white-space:pre-line;color:#333;">' +
                        translatedText +
                        '</div>';
                    if (textElement.parentNode) {
                        textElement.parentNode.appendChild(wrapper);
                    }
                }
            });
        });
    }

    // 定期只翻译可见区域的消息
    setInterval(() => {
        translateVisibleMessages();
    }, 500);
})();
