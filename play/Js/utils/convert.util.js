const CONVERT_HELPER = {
	NumberWithCommas(x, decimals = 3) {
		if (isNaN(x) == true) x = 0;
		x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
		x = parseFloat(x).toFixed(decimals);
		x = parseFloat(x).toString();
		x  = x.split(".");
		x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		x = x.join('.');
		return x;
	},
 	FormatBalance (labelValue, decimals = 2) {
		return Math.abs(Number(labelValue)) >= 1.0e+12
		    ? Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 100) / 100 + "T"
		    : Math.abs(Number(labelValue)) >= 1.0e+9
		        ? Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 100) / 100 + "B"
		        : Math.abs(Number(labelValue)) >= 1.0e+6
		            ? Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 100) / 100 + "M"
		            : Math.abs(Number(labelValue)) >= 1.0e+3
		                ? Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 100) / 100 + "K"
		                : core.numberWithCommas(labelValue, decimals);
	},
	ToBN(amount, tokenDecimal = 18) {
		amount = amount * 10 ** tokenDecimal;
		amount = Math.round(amount);
		amount = bigInt(amount).toString();
		return amount;
	},
	RoundDownFloat(value, decimals) {
		return Math.floor(value * decimals) / decimals;
	},
	ParseFloatNumber(value, decimals) {
	    return parseFloat(value.toFixed(decimals));
	},
};
export default CONVERT_HELPER;