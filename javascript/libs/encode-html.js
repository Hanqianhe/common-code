/**
 * html正文编码：对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
 *  */
export default const encodeHtml = function (sStr) {
  sStr = sStr.replace(/&/g, '&amp;');
  sStr = sStr.replace(/>/g, '&gt;');
  sStr = sStr.replace(/</g, '&lt;');
  sStr = sStr.replace(/"/g, '&quot;');
  sStr = sStr.replace(/'/g, '&#39;');
  return sStr;
};
