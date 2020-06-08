import dateFormat from './date-format';

export default function (start, end, format = 'YYYY-MM-DD') {
	const rs = [];
	let startTime = new Date(start).getTime();
	const endTime = new Date(end).getTime();

	while (startTime <= endTime) {
		rs.push(dateFormat(startTime, format));
		startTime += 24 * 60 * 60 * 1000;
	}
	return rs;
}
