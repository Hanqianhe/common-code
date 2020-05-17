/**
 * Usage:
 * getAbsoluteUrl('/something'); // https://davidwalsh.name/something
 *  */
export const getAbsoluteUrl = (function () {
  let a;
  return function (url) {
    if (!a) a = document.createElement('a');
    a.href = url;

    return a.href;
  };
})();

/**
Usage:
var canOnlyFireOnce = once(function() {
	console.log('Fired!');
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // nada
 *  */
export const once = (fn, context) => {
  var result;

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
};
