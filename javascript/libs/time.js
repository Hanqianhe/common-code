import dateFormat from './date-format';

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
	const timeStr = String(timeStamp);
	return timeStr.length > 10;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => timeStamp < currentTime;


/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export default timeStamp => {
	// 判断当前传入的时间戳是秒格式还是毫秒
	const IS_MILLISECOND = isMillisecond(timeStamp);

	// 如果是毫秒格式则转为秒格式
	if (IS_MILLISECOND) Math.floor(timeStamp /= 1000);

	// 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
	timeStamp = Number(timeStamp);

	// 获取当前时间时间戳
	const currentTime = Math.floor(Date.now() / 1000);

	// 判断传入时间戳是否早于当前时间戳
	const IS_EARLY = isEarly(timeStamp, currentTime);

	// 获取两个时间戳差值
	let diff = currentTime - timeStamp;

	// 如果IS_EARLY为false则差值取反
	if (!IS_EARLY) diff = -diff;
	let resStr = '';
	const dirStr = IS_EARLY ? '前' : '后';

	if (diff <= 59) {
		// 少于等于59秒
		resStr = diff + '秒' + dirStr;
	} else if (diff > 59 && diff <= 3599) {
		// 多于59秒，少于等于59分钟59秒
		resStr = Math.floor(diff / 60) + '分钟' + dirStr;
	} else if (diff > 3599 && diff <= 86399) {
		// 多于59分钟59秒，少于等于23小时59分钟59秒
		resStr = Math.floor(diff / 3600) + '小时' + dirStr;
	} else if (diff > 86399 && diff <= 2623859) {
		// 多于23小时59分钟59秒，少于等于29天59分钟59秒
		resStr = Math.floor(diff / 86400) + '天' + dirStr;
	} else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) {
		// 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
		resStr = dateFormat(timeStamp, 'MM-DD HH:mm');
	} else {
		resStr = dateFormat(timeStamp);
	}
	return resStr;
};
