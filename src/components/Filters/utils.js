export function split(left, right, parts) {
	var result = [],
		delta = (right - left) / (parts - 1);
	while (left < right) {
		result.push(parseFloat((Math.round(left * 100) / 100).toFixed(2)));
		left += delta;
	}
	result.push(parseFloat((Math.round(right * 100) / 100).toFixed(2)));
	return result;
}

export function decimalAdjust(value, exp) {
	// Si el exp no está definido o es cero...
	if (typeof exp === "undefined" || +exp === 0) {
		return Math.round(value);
	}
	value = +value;
	exp = +exp;
	// Si el valor no es un número o el exp no es un entero...
	if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split("e");
	value = Math.round(+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
	// Shift back
	value = value.toString().split("e");
	return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}
