const ots = Object.prototype.toString;
/**
 * 判断是否数组
 *
 * @name isArray
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否数组
 */
export const isArray = (o) => o && (o.constructor === Array || ots.call(o) === '[object Array]');

/**
 * 判断是否Object
 *
 * @name isObject
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否Object
 */

export const isObject = (o) => o && (o.constructor === Object || ots.call(o) === '[object Object]');

/**
 * 判断是否布尔类型
 *
 * @name isBoolean
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否布尔类型
 */
export const isBoolean = (o) => (o === false || o) && o.constructor === Boolean;

/**
 * 判断是否数值类型
 *
 * @name isNumber
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否数值类型
 */
export const isNumber = (o) => (o === 0 || o) && o.constructor === Number;

/**
 * 判断是否undefined
 *
 * @name isUndefined
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否undefined
 */
export const isUndefined = (o) => typeof o === 'undefined';

/**
 * 判断是否Null
 *
 * @name isNull
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否Null
 */
export const isNull = (o) => o === null;

/**
 * 判断是否function
 *
 * @name isFunction
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否function
 */
export const isFunction = (o) => o && o.constructor === Function;

/**
 * 判断是否字符串
 *
 * @name isString
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否字符串
 */
export const isString = (o) => (o === '' || o) && o.constructor === String;
