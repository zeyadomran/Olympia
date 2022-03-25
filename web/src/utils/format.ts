export const formatPhoneNumber = (phoneNumber: string): string => {
	let result = "(";
	let i = 0;
	while (i < 3 && i < phoneNumber.length) {
		result += phoneNumber[i];
		i++;
	}
	if (i < 3) return result;
	result += ") ";
	while (i < 6 && i < phoneNumber.length) {
		result += phoneNumber[i];
		i++;
	}
	if (i < 6) return result;
	result += "-";
	while (i < 10 && i < phoneNumber.length) {
		result += phoneNumber[i];
		i++;
	}
	return result;
};

export const formatMembershipType = (membershipType: string): string => {
	switch (membershipType) {
		case "DAY_PASS":
			return "1 Day Pass";
		case "WEEK_PASS":
			return "1 Week Pass";
		case "30_DAY_PASS":
			return "Monthly Pass";
		case "90_DAY_PASS":
			return "3 Months Pass";
		case "180_DAY_PASS":
			return "6 Months Pass";
		case "YEAR_PASS":
			return "Yearly Pass";
	}
	return "";
};
