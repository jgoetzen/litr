function sendBeacon(a,b){try{for(var c=[{trackEvt:"page_info",trackParams:{intl:INTL,vtestid:"yset_"+PARTNER_CODE+"_"+BROWSER+"_"+VTEST_EXP_ID,browser:BROWSER,pc:PARTNER_CODE,itype:"{itype}",pt:"{pt}",delc:"upsell"},useYLC:!1,trackSpaceID:EXT_SPACE_ID},{trackEvt:"click_info",trackParams:{intl:INTL,vtestid:"yset_"+PARTNER_CODE+"_"+BROWSER+"_"+VTEST_EXP_ID,browser:BROWSER,pc:PARTNER_CODE,sec:"{sec}",slk:"{slk}",gpos:"{gpos}",_p:"{_p}",delc:"upsell"},useYLC:!0,trackSpaceID:EXT_SPACE_ID}],d=c.length,e=0;e<d;e++){var f=c[e];if(f.trackSpaceID&&f.trackEvt.toLowerCase()===a.toLowerCase()){var g=f.trackParams||{},h={},i="";for(var j in g){var k=g[j];"{pt}"===k?k=b.params.pt?b.params.pt:null:"{itype}"===k?k=b.params.itype?b.params.itype:null:"{sec}"===k?k=b.params.sec:"{slk}"===k?k=b.params.slk:"{gpos}"===k?k=b.params.gpos:"{_p}"===k&&(k=b.params._p),k&&(h[j]=k)}if(f.useYLC)h[YAHOO.ULT.SRC_SPACEID_KEY]=f.trackSpaceID,i=YAHOO.ULT.beacon_click(h);else{h.s=f.trackSpaceID.toString(),i="https://geo.yahoo.com/p?t="+Math.random();for(var l in h)i+="&"+l+"="+h[l]}debugLog("Track url is "+i);(new Image).src=i;break}}}catch(a){debugLog("Tracker.sendBeacon error: "+a.message)}}function init(){var a=_isFirefox(),b=(_isOpera(),_isChrome()),c=_isIe();if(debugLog("isFirefox = "+a),debugLog("isChrome = "+b),debugLog("isIe = "+c),!b&&!a&&!c)return void debugLog("Browser not targeted");if(b){var d=window.RequestFileSystem||window.webkitRequestFileSystem;d&&d(window.TEMPORARY,100,function(){debugLog("Not Incognito"),detectProperty(a,b,c)},function(){debugLog("Incognito")})}else if(a){if(!window.indexedDB)return;var e=window.indexedDB.open("test");e.onerror=function(a){debugLog("Private browsing")},e.onsuccess=function(){debugLog("Not private browsing"),detectProperty(a,b,c)}}else if(c){if(!window.indexedDB&&(window.PointerEvent||window.MSPointerEvent))return void debugLog("Private browsing");detectProperty(a,b,c)}}function _checkStorage(){return!(!function(){var a,b=+new Date;try{return localStorage.setItem(b,b),a=localStorage.getItem(b)===b.toString(),localStorage.removeItem(b),a}catch(a){}}()||!localStorage)}function _isWindows(){return navigator&&navigator.platform&&"Win"===navigator.platform.substr(0,3)}function _isFirefox(){return"undefined"!=typeof InstallTrigger}function _isOpera(){return!!window.opera||navigator.userAgent.indexOf("OPR")>=0}function _isChrome(){return!!window.chrome&&!_isOpera()}function _isIe(){return-1!=navigator.userAgent.indexOf("Trident")&&-1==navigator.userAgent.indexOf("MSIE")}function detectProperty(a,b,c){var d=document.getElementById("yucs-meta"),e=null,f=null,g="";if(d&&(e=d.getAttribute("data-cobrand"),f=d.getAttribute("data-forcecobrand"),g=d.getAttribute("data-property")),"standard"===e||"standard"===f){if(debugLog("property = "+g),"news"!==g&&"answers"!==g&&"groups"!==g&&"shopping"!==g)return void debugLog(g+" is not targeted property");if(PARTNER_CODE=g,!_checkStorage())return void debugLog("Local Storage Check Failed");if(_isDSSCookieFresh())return void debugLog("Found valid DSS cookie");var h=_checkYSETUpsell();debugLog("localStorage offer:"+h),"show_nothing"!==h&&_isExtensionInstalled(a,b,c,function(a){var b=a.extInstalled;debugLog("extInstalled = "+b),debugLog("retVal = "+a),b||offerInterstitial(a.extName,g)})}}function _isExtensionInstalled(a,b,c,d){var e={extInstalled:!1,extName:""};setTimeout(function(){a?(e.extInstalled=document.body.classList.contains(FF_NEWTAB_EXT_EXISTS_CLASS)||document.body.classList.contains(SEARCH_SET_EXT_EXISTS_CLASS),e.extName="FF_Newtab",EXT_SPACE_ID=FIREFOX_NEWTAB_INTERSTITIAL_SPACE_ID,BROWSER="ff"):b?(e.extInstalled=document.body.classList.contains(CHR_NEWTAB_EXT_EXISTS_CLASS)||document.body.classList.contains(SEARCH_SET_EXT_EXISTS_CLASS),e.extName="Chr_Newtab",EXT_SPACE_ID=CHROME_NEWTAB_INTERSTITIAL_SPACE_ID,BROWSER="chr"):c&&(e.extName="Ie_Hpset",EXT_SPACE_ID=IE_HPSET_INTERSTITIAL_SPACE_ID,BROWSER="ie"),d(e)},300)}function offerInterstitial(a,b){debugLog("In offerInterstitial "+a),_setDidYSETUpsell();var c=Math.floor(10*Math.random()+1),d="exp0"+(c%2==0?"1":"2");if(window.VTEST_EXP_ID=d,debugLog("VTEST_EXP_ID="+window.VTEST_EXP_ID),"exp01"===d)showInterstitial(a);else{var e=!1;window.addEventListener("scroll",function(b){1!=e&&(e=!0,ShowOnScrollPromo(a))})}}function showInterstitial(a){debugLog("Inside showInterstitial with extName = "+a),window.OPTION="overlay";var b=document.createElement("div");b.setAttribute("id","yset-search-upsell-container"),document.body.style.overflow="hidden";var c=document.createElement("div");c.classList.add("yset-upsell-div"),b.appendChild(c);var d=document.createElement("div");d.setAttribute("id","closeButton"),d.onclick=closePromotion.bind(this,"mouse_click");var e=document.createElement("div");e.setAttribute("id","headline_newtab"),e.setAttribute("class","unselectable");var f=document.createElement("div");f.setAttribute("id","subHeading_newtab"),f.setAttribute("class","unselectable");var g=document.createElement("div");g.setAttribute("id","panels");var h=document.createElement("a");h.classList.add("extensionButton"),_isIe()?(c.setAttribute("id","yset-upsell-div_ie"),h.setAttribute("id","ie_extension_button")):(c.setAttribute("id","yset-upsell-div_chr_ff"),h.setAttribute("id","ff_chr_extension_button")),_isChrome()?(extDetails=CHR_NEWTAB_EXT_OVERLAY,window.CHROME_NEWTAB_EXT_URL=extDetails.url,h.onclick=showChromeExtension.bind(this,a,"interstitial")):_isFirefox()?(extDetails=FF_NEWTAB_EXT_OVERLAY,h.setAttribute("href",extDetails.url),h.onclick=showFirefoxExtension.bind(this,a,"interstitial")):_isIe()&&(extDetails=IE_HOMEPAGE_PROMO,h.setAttribute("href",extDetails.url),h.onclick=showIeExtension.bind(this,a,"interstitial")),h.textContent=extDetails.button,e.textContent=extDetails.heading,f.textContent=extDetails.subheading,g.onclick=function(){h.click()},c.appendChild(e),c.appendChild(g),c.appendChild(f),c.appendChild(h),c.appendChild(d),document.body.appendChild(b),window.onkeydown=function(a){27===a.keyCode&&closePromotion("escape")};var i={},j={};j.pt=a.toLowerCase()+"_ans_interstitial",i.params=j,sendBeacon("page_info",i)}function closePromotion(a){window.onkeydown=null;var b,c;if("onscroll"===OPTION?(b=document.getElementById("yset_search_onscroll"),c="onscroll"):(b=document.getElementById("yset-search-upsell-container"),c="interstitial"),b.style.display="none",document.body.style.overflow="",document.body.removeChild(b),a){var d={},e={};"escape"===a?(e.sec="yset_"+c+"_close_escapekey",e.slk="yset_"+c+"_close_escapekey",e._p=3):"timeout"===a?(e.sec="yset_"+c+"_close_timeout",e.slk="yset_"+c+"_close_timeout"):(e.sec="yset_"+c+"_close_mouseclick",e.slk="yset_"+c+"_close_mouseclick",e._p=2),e.gpos=1,d.params=e,sendBeacon("click_info",d)}}function showIeExtension(a){var b={},c={};closePromotion(),"onscroll"!==OPTION?(c.sec="yset_interstitial_get_extension",c.slk="yset_interstitial_get_extension",ptValue="_ans_interstitial"):(c.sec="yset_onscroll_get_extension",c.slk="yset_onscroll_get_extension",ptValue="_ans_onscroll"),showIeInstallModal(IE_INLINE_INSTALL_MODAL),c.gpos=1,c._p=1,c.itype="clicked",c.pt=a.toLowerCase()+ptValue,b.params=c,sendBeacon("click_info",b),sendBeacon("page_info",b),document.getElementById("yset_ie_inline-install-modal_container").onclick=function(a){closeInlineInstallModal()}}function showFirefoxExtension(a){var b={},c={};closePromotion(),"onscroll"!==OPTION?(c.sec="yset_interstitial_get_extension",c.slk="yset_interstitial_get_extension",ptValue="_ans_interstitial"):(c.sec="yset_onscroll_get_extension",c.slk="yset_onscroll_get_extension",ptValue="_ans_onscroll"),showInlineInstallModal(FF_INLINE_INSTALL_MODAL);var d=document.getElementById("yset-inline-install-modal"),e=document.getElementById("yset-inline-install-modal-icon");d.classList.add("ff"),e.classList.add("ff"),c.gpos=1,c._p=1,c.itype="clicked",c.pt=a.toLowerCase()+ptValue,b.params=c,sendBeacon("click_info",b),sendBeacon("page_info",b),setTimeout(function(){closeInlineInstallModal()},6e3)}function showInlineInstallModal(a){var b=document.createElement("div"),c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("div"),f=document.createElement("div");b.setAttribute("id","yset-inline-install-modal-container"),c.setAttribute("id","yset-inline-install-modal"),d.setAttribute("id","yset-inline-install-modal-icon"),_isWindows()&&(c.classList.add("win"),d.classList.add("win")),e.setAttribute("id","yset-inline-install-modal-heading"),e.textContent=a.heading,f.setAttribute("id","yset-inline-install-modal-subHeading"),f.textContent=a.subheading,c.appendChild(d),c.appendChild(e),c.appendChild(f),b.appendChild(c),document.body.appendChild(b),document.body.style.overflow="hidden"}function showIeInstallModal(a){var b=document.createElement("div"),c=document.createElement("div"),d=document.createElement("h1"),e=document.createElement("div"),f=document.createElement("img"),g=document.createElement("div"),h=document.createElement("a"),i=document.createElement("a"),j=document.createElement("span"),k=document.createElement("span");j.textContent=" and ",k.textContent=" apply ",b.setAttribute("id","yset_ie_inline-install-modal_container"),c.setAttribute("id","yset_ie_inline-install-modal"),d.setAttribute("id","heading"),e.setAttribute("id","subheading"),f.setAttribute("id","installerLightboxImg"),g.setAttribute("id","links"),h.setAttribute("id","terms"),i.setAttribute("id","policy"),d.textContent=a.heading,e.textContent=a.subheading,f.src=a.image,h.href=a.termsLink,h.text="Yahoo terms",i.href=a.PolicyLink,i.text="Policy",g.appendChild(h),g.appendChild(j),g.appendChild(i),g.appendChild(k),c.appendChild(d),c.appendChild(e),c.appendChild(f),c.appendChild(g),b.appendChild(c),document.body.appendChild(b),window.onkeydown=function(a){27===a.keyCode&&closeInlineInstallModal()}}function closeInlineInstallModal(){var a;a=_isIe()?document.getElementById("yset_ie_inline-install-modal_container"):document.getElementById("yset-inline-install-modal-container"),a.style.display="none",document.body.style.overflow="",document.body.removeChild(a)}function showChromeExtension(a){var b={},c={};closePromotion(),"onscroll"!==OPTION?(c.sec="yset_interstitial_get_extension",c.slk="yset_interstitial_get_extension",ptValue="_ans_interstitial"):(c.sec="yset_onscroll_get_extension",c.slk="yset_onscroll_get_extension",ptValue="_ans_onscroll"),c.gpos=1,c._p=1,b.params=c,sendBeacon("click_info",b);var d=document.createElement("link");d.rel="chrome-webstore-item",d.href=CHROME_NEWTAB_EXT_URL,document.head.appendChild(d),showInlineInstallModal(CHR_INLINE_INSTALL_MODAL),chrome.webstore.install(CHROME_NEWTAB_EXT_URL,function(d){debugLog("Installed"),closeInlineInstallModal(),c.itype="install",c.pt=a.toLowerCase()+ptValue,b.params=c,sendBeacon("page_info",b)},function(d){debugLog("Declined"),closeInlineInstallModal(),c.itype="reject",c.pt=a.toLowerCase()+ptValue,b.params=c,sendBeacon("page_info",b)})}function _setDidYSETUpsell(){if(debugLog("setting the YSET upsell in localstorage for both property"),localStorage){debugLog("check localstorage for this property:"+(localStorage.getItem("yset_upsell")||{})),localStorage.setItem("yset_upsell",JSON.stringify({tslo:(new Date).getTime()}))}}function _isDSSCookieFresh(){debugLog("checking the DSS cookie");var a,b,c,d,e,f,g=document.cookie.split(";");for(a=0;a<g.length;a++)if(b=g[a],b=b.trim(),0===b.indexOf("DSS=")){for(d=b.slice(4).split("&"),c=0;c<d.length;c++)if(e=d[c],0===e.indexOf("sdts=")&&(f=parseInt(e.slice(5)),f=13===f.toString().length?Math.round(f/1e3):f,!isNaN(f)&&_daysSinceTimestamp(f)<=20))return debugLog("Found DSS cookie (sdts timestamp) was updated within 20 days"),!0;break}return!1}function _checkYSETUpsell(a){debugLog("checking the YSET upsell");var b=localStorage?localStorage.getItem("yset_upsell"):"",c="show_nothing";if(b)try{b=JSON.parse(b),debugLog("Found yset in property localStorage:",b),b.tslo&&(debugLog("Found tslo value in property localStorage:"+b),_daysSinceTimestampInMS(_parseIntNoNaN(b.tslo))>30&&(c="show_interstitial"))}catch(a){}else c="show_interstitial";return c}function _daysSinceTimestamp(a){var b=(new Date).getTime();debugLog("timeNow = "+b),debugLog("timeStamp = "+a);var c=(b/1e3-a)/86400;return debugLog("_daysSinceTimestamp = "+c),c}function _daysSinceTimestampInMS(a){var b=(new Date).getTime();debugLog("timeNow = "+b),debugLog("timeStamp = "+a);var c=(b-a)/864e5;return debugLog("_daysSinceTimestampInMS = "+c),c}function _parseIntNoNaN(a){var b=parseInt(a);return"NaN"===b.toString()?0:b}function debugLog(a,b){DEBUG&&"undefined"!=typeof console&&console.log}function ShowOnScrollPromo(a){var b=document.createElement("div"),c=document.createElement("span"),d=document.createElement("div"),e=document.createElement("div"),f=document.createElement("a"),g=document.createElement("div"),h=document.createElement("div");window.OPTION="onscroll",b.setAttribute("id","yset_search_onscroll"),c.setAttribute("id","closeButton"),c.onclick=closePromotion.bind(this,"mouse_click"),d.setAttribute("id","yset_search_onscroll_heading"),e.setAttribute("id","yset_search_onscroll_subheading"),h.setAttribute("id","yset_search_onscroll_data"),f.setAttribute("id","extensionButton"),g.setAttribute("id","logo"),b.appendChild(c),b.appendChild(g),h.appendChild(d),h.appendChild(e),b.appendChild(h),b.appendChild(f),c.textContent="x",document.body.appendChild(b),_isChrome()?(extDetails=CHR_NEWTAB_EXT_ONSCROLL,window.CHROME_NEWTAB_EXT_URL=extDetails.url,f.onclick=showChromeExtension.bind(this,a,"onscroll")):_isFirefox()?(extDetails=FF_NEWTAB_EXT_ONSCROLL,f.setAttribute("href",extDetails.url),f.onclick=showFirefoxExtension.bind(this,a,"onscroll")):_isIe()&&(extDetails=IE_HOMEPAGE_PROMO,f.setAttribute("href",extDetails.url),f.onclick=showIeExtension.bind(this,a,"onscroll")),f.textContent=extDetails.button,d.textContent=extDetails.heading,e.textContent=extDetails.subheading,window.onkeydown=function(a){27===a.keyCode&&closePromotion("escape")};var i={},j={};j.pt=a.toLowerCase()+"_ans_onscroll",i.params=j,sendBeacon("page_info",i),setTimeout(function(){closePromotion()},25e3)}var DEBUG=!0,GET_EXTENSION="Add it now!",CANCEL_BUTTON="Cancel",FF_NEWTAB_EXT_EXISTS_CLASS="yahoo_firefox_newtab_ext_installed",CHR_NEWTAB_EXT_EXISTS_CLASS="yahoo_chrome_newtab_ext_installed",IE_NEWTAB_EXT_EXISTS_CLASS="yahoo_ie_newtab_ext_installed",SEARCH_SET_EXT_EXISTS_CLASS="yahoo_search_set_ext_installed",EXT_SPACE_ID="",CHROME_NEWTAB_INTERSTITIAL_SPACE_ID=151340124,FIREFOX_NEWTAB_INTERSTITIAL_SPACE_ID=151340125,IE_HPSET_INTERSTITIAL_SPACE_ID=151340135,CHR_INLINE_INSTALL_MODAL={heading:"You are almost done.",subheading:'Click on "Add extension" to finish installation'},FF_INLINE_INSTALL_MODAL={heading:"You are almost done.",subheading:'Click on "Allow" and then "Install" to finish installation'},IE_INLINE_INSTALL_MODAL={heading:"Set Homepage as Yahoo",subheading:'Click "Run" and you\'ll never miss a thing with Yahoo as your default homepage and new tab page across all browsers on your device',image:"https://s.yimg.com/os/ydownloads/ucs-yset-search/10/images/ieinstaller_lightbox.jpg",termsLink:"https://policies.yahoo.com/us/en/yahoo/terms/utos/index.htm",PolicyLink:"https://policies.yahoo.com/us/en/yahoo/privacy/index.htm"},FF_NEWTAB_EXT_OVERLAY={url:"https://addons.mozilla.org/en-US/firefox/downloads/latest/search-and-new-tab-by-yahoo/addon-689182-latest.xpi?src=external-oo",heading:"Enhance your New Tab experience",subheading:"Customize your New Tab with Yahoo search, Flickr photos, top sites & more.",button:"Add it now!"},CHR_NEWTAB_EXT_OVERLAY={url:"https://chrome.google.com/webstore/detail/lacoodkcmoakjngbaklcemiganjnbgae",heading:"Enhance your New Tab experience",subheading:"Customize your New Tab with Yahoo search, weather, Flickr photos, top sites & more.",button:"Add it now!"},FF_NEWTAB_EXT_ONSCROLL={url:"https://addons.mozilla.org/en-US/firefox/downloads/latest/search-and-new-tab-by-yahoo/addon-689182-latest.xpi?src=external-oo",heading:"Delight your eyes on every new tab!",subheading:"Open each new tab to a Flickr image, Yahoo search, top sites & more.",button:"Get it now"},CHR_NEWTAB_EXT_ONSCROLL={url:"https://chrome.google.com/webstore/detail/lacoodkcmoakjngbaklcemiganjnbgae",heading:"Delight your eyes on every new tab!",subheading:"Open each new tab to a Flickr image, Yahoo search, breaking news & more.",button:"Get it now"},IE_HOMEPAGE_PROMO={url:"https://sxh.yimg.com/jf/dyc/IEinstall/hpset_2017.09.01.01.exe",heading:"Make Yahoo Your Homepage",subheading:"Get breaking news, trending stories & more, every time you open your browser.",button:"Set Homepage"},INTL="us",BROWSER="",PARTNER_CODE="",VTEST_EXP_ID="exp01";"undefined"==typeof YAHOO&&(YAHOO={}),YAHOO.ULT||(YAHOO.ULT={}),YAHOO.ULT.BEACON||(YAHOO.ULT.BEACON="https://geo.yahoo.com/t"),YAHOO.ULT.SRC_SPACEID_KEY="_S",YAHOO.ULT.DEST_SPACEID_KEY="_s",YAHOO.ULT.YLC_LIBSRC=2,YAHOO.ULT.CTRL_C="",YAHOO.ULT.CTRL_D="",YAHOO.ULT.BASE64_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-",YAHOO.ULT.track_click=function(a,b){if(!a||!b)return a;b._r=YAHOO.ULT.YLC_LIBSRC;var c=[],d=0;for(var e in b){var f=b[e];if(void 0===f&&(f=b[e]=""),e.length<1)return a;if(e.length>8)return a;if(-1!==e.indexOf(" "))return a;if(YAHOO.ULT.has_ctrl_char(e)||YAHOO.ULT.has_ctrl_char(f))return a;c[d++]=e}c=c.sort();var g=[];for(d=0;d<c.length;d++)g[d]=c[d]+YAHOO.ULT.CTRL_C+b[c[d]];return g=g.join(YAHOO.ULT.CTRL_D),g.length<1||g.length>1024?a:(g=";_ylc="+YAHOO.ULT.encode64(g),d=a.indexOf("/*"),-1===d&&(d=a.indexOf("/?")),-1===d&&(d=a.indexOf("?")),-1===d?a+g:a.substr(0,d)+g+a.substr(d))},YAHOO.ULT.beacon_click=function(a,b){if(a){var c=YAHOO.ULT.track_click(YAHOO.ULT.BEACON,a);return c+="?t="+Math.random()}},YAHOO.ULT.has_ctrl_char=function(a){for(var b=0;b<a.length;b++)if(a.charCodeAt(b)<32)return!0;return!1},YAHOO.ULT.encode64=function(a){var b,c,d,e,f,g="",h="",i="",j=0;do{b=a.charCodeAt(j++),c=a.charCodeAt(j++),h=a.charCodeAt(j++),d=b>>2,e=(3&b)<<4|c>>4,f=(15&c)<<2|h>>6,i=63&h,isNaN(c)?f=i=64:isNaN(h)&&(i=64),g=g+YAHOO.ULT.BASE64_STR.charAt(d)+YAHOO.ULT.BASE64_STR.charAt(e)+YAHOO.ULT.BASE64_STR.charAt(f)+YAHOO.ULT.BASE64_STR.charAt(i),b=c=h="",d=e=f=i=""}while(j<a.length);return g},init();