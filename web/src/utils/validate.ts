export const validateEmail = (email: string): string => {
	if (!email) {
		return "Please provide an email.";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
		return "Invalid email address.";
	}
	return "";
};

export const validatePassword = (password: string): string => {
	if (!password) {
		return "Please provide a password.";
	} else if (password.length < 6) {
		return "Password must be at least 8 characters.";
	}
	return "";
};

export const validateGymId = (gymId: string): string =>
	!gymId ? "Please provide a gym id." : "";

export const validatePhoneNumber = (phoneNumber: string): string => {
	if (!phoneNumber) {
		return "Please provide a phone number.";
	} else if (phoneNumber.length !== 10) {
		return "Invalid phone number.";
	}
	return "";
};

export const validateDOB = (dob: string): string => {
	if (!dob) {
		return "Please provide a date of birth.";
	} else if (dob.length < 9) {
		return "Invalid date of birth.";
	}
	return "";
};

export const validateDefault = (value: string, name: string): string => {
	if (!value) return `Please provide a ${name}.`;
	return "";
};
