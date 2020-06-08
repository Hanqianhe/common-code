// QueryString
// ---------------
// This module provides utilities for dealing with query strings.
//
// Thanks to:
//  - http://nodejs.org/docs/v0.4.7/api/querystring.html
//  - http://developer.yahoo.com/yui/3/api/QueryString.html
//  - https://github.com/lifesinger/dew/tree/master/lib/querystring
// Helpers

const {
	toString,
	hasOwnProperty
} = Object.prototype;
const isArray = Array.isArray || (val => toString.call(val) === '[object Array]');
/**
 * Checks to see if an object is a plain object (created using "{}" or
 * "new Object()" or "new FunctionClass()").
 */
function isPlainObject(o) {
	/**
	 * NOTES:
	 * isPlainObject(node = document.getElementById("xx")) -> false
	 * toString.call(node):
	 *   ie678 === '[object Object]', other === '[object HTMLElement]'
	 * 'isPrototypeOf' in node:
	 *   ie678 === false, other === true
	 */
	return o &&
		toString.call(o) === '[object Object]' &&
		'isPrototypeOf' in o;
}

/**
 * If the type of o is null, undefined, number, string, boolean,
 * return true.
 */
function isPrimitive(o) {
	return o !== Object(o);
}

const QueryString = {};

// The escape/unescape function used by stringify/parse, provided so that it
// could be overridden if necessary. This is important in cases where
// non-standard delimiters are used, if the delimiters would not normally be
// handled properly by the built-in (en|de)codeURIComponent functions.
QueryString.escape = encodeURIComponent;

QueryString.unescape = s => decodeURIComponent(s.replace(/\+/g, ' '));

/**
 * Serialize an object to a query string. Optionally override the default
 * separator and assignment characters.
 *
 * stringify({foo: 'bar'})
 *   // returns 'foo=bar'
 *
 * stringify({foo: 'bar', baz: 'bob'}, ';', ':')
 *   // returns 'foo:bar;baz:bob'
 */
QueryString.stringify = (obj, sep, eq, arrayKey) => {
	if (!isPlainObject(obj)) return '';

	sep = sep || '&';
	eq = eq || '=';
	arrayKey = arrayKey || false;

	const buf = [];
	let key;
	let val;
	const {
		escape
	} = QueryString;
	for (key in obj) {
		if (hasOwnProperty.call(obj, key)) {
			val = obj[key];
			key = QueryString.escape(key);

			if (isPrimitive(val)) {
				// val is primitive value
				buf.push(key, eq, escape(`${val}`), sep);
			} else if (isArray(val) && val.length) {
				// val is not empty array
				for (let i = 0; i < val.length; i++) {
					if (isPrimitive(val[i])) {
						buf.push(key, (arrayKey ? escape('[]') : '') + eq, escape(`${val[i]}`), sep);
					}
				}
			} else {
				// ignore other cases, including empty array, Function, RegExp, Date etc.
				buf.push(key, eq, sep);
			}
		}
	}
	buf.pop();
	return buf.join('');
};

/**
 * Deserialize a query string to an object. Optionally override the default
 * separator and assignment characters.
 *
 * parse('a=b&c=d')
 *   // returns {a: 'b', c: 'c'}
 */
QueryString.parse = (str, sep, eq) => {
	if (typeof str === 'undefined' && typeof document !== 'undefined') {
		str = document.location.search;
	}
	const ret = {};

	if (typeof str !== 'string' || str.trim().length === 0) {
		return ret;
	}

	// remove ^?
	str = str.replace(/^\?/, '');

	const pairs = str.split(sep || '&');
	eq = eq || '=';
	const {
		unescape
	} = QueryString;

	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split(eq);
		let key = unescape(pair[0].trim());
		const val = unescape(pair.slice(1).join(eq).trim());

		const m = key.match(/^(\w+)\[\]$/);
		if (m && m[1]) {
			[, key] = m;
		}
		if (hasOwnProperty.call(ret, key)) {
			if (!isArray(ret[key])) {
				ret[key] = [ret[key]];
			}
			ret[key].push(val);
		} else {
			ret[key] = m ? [val] : val;
		}
	}

	return ret;
};

export default QueryString;
