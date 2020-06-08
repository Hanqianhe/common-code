const ua = navigator.userAgent;
const platform = {};

// return the IE version or -1
function getIeVersion() {
  let retVal = -1, ua, re;
  if (navigator.appName === 'Microsoft Internet Explorer') {
    ua = navigator.userAgent;
    re = new RegExp('MSIE ([0-9]{1,})');
    if (re.exec(ua) !== null) {
      retVal = parseInt(RegExp.$1);
    }
  }
  return retVal;
}

platform.ieVersion = getIeVersion();
platform.ie = platform.ieVersion !== -1;
platform.android = ua.match(/Android/i) === null ? false : true;
platform.iPhone = ua.match(/iPhone/i) === null ? false : true;
platform.iPad = ua.match(/iPad/i) === null ? false : true;
platform.iPod = ua.match(/iPod/i) === null ? false : true;
platform.winPhone = ua.match(/Windows Phone/i) === null ? false : true;
platform.IOS = platform.iPad || platform.iPhone;
platform.touchDevice = 'ontouchstart' in window;

export default platform;
