/**
 * 判断是否是一个可接受的 url 串
 *
 * @method isURL
 * @memberOf string
 *
 * @param {String} str 要检测的字符串
 * @return {Boolean} 如果是可接受的 url 则返回 true
 */
export const isURL = (str) => isURL.RE.test(str);

/**
 * @ignore
 */
isURL.RE = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;

/**
 * 分解 URL 为一个对象，成员为：scheme, user, pass, host, port, path, query, fragment
 *
 * @method parseURL
 * @param {String} str URL 地址
 * @return {Object} 如果解析失败则返回 null
 */
export const parseURL = (str) => {
  let ret = null;

  if (null !== (ret = parseURL.RE.exec(str))) {
    let specObj = {};
    for (let i = 0, j = parseURL.SPEC.length; i < j; i++) {
      const curSpec = parseURL.SPEC[i];
      specObj[curSpec] = ret[i + 1];
    }
    ret = specObj;
    specObj = null;
  }

  return ret;
};

/**
 * 将一个对象（成员为：scheme, user, pass, host, port, path, query, fragment）重新组成为一个字符串
 *
 * @method buildURL
 * @param {Object} obj URl 对象
 * @return {String} 如果是可接受的 url 则返回 true
 */
export const buildURL = (obj) => {
  let ret = '';

  // prefix & surffix
  let prefix = {},
    surffix = {};

  for (let i = 0, j = parseURL.SPEC.length; i < j; i++) {
    const curSpec = parseURL.SPEC[i];
    if (!obj[curSpec]) {
      continue;
    }
    switch (curSpec) {
      case 'scheme':
        surffix[curSpec] = '://';
        break;
      case 'pass':
        prefix[curSpec] = ':';
      case 'user':
        prefix['host'] = '@';
        break;
      //case 'host':
      case 'port':
        prefix[curSpec] = ':';
        break;
      //case 'path':
      case 'query':
        prefix[curSpec] = '?';
        break;
      case 'fragment':
        prefix[curSpec] = '#';
        break;
    }

    // rebuild
    if (curSpec in prefix) {
      ret += prefix[curSpec];
    }
    if (curSpec in obj) {
      ret += obj[curSpec];
    }
    if (curSpec in surffix) {
      ret += surffix[curSpec];
    }
  }

  prefix = null;
  surffix = null;
  obj = null;

  return ret;
};

/**
 * @ignore
 */
parseURL.SPEC = ['scheme', 'user', 'pass', 'host', 'port', 'path', 'query', 'fragment'];
parseURL.RE = /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/;
