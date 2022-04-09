import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsClient = () => {
	const router = useRouter();
	useEffect(() => {
		if (!getCookie("CJWT")) {
			router.push("/login");
		}
	}, [router]);
};

export const useIsEmployee = () => {
	const router = useRouter();
	useEffect(() => {
		if (!getCookie("EJWT")) {
			router.push("/employee/login");
		}
	}, [router]);
};

export const useIsAuth = () => {
	const router = useRouter();
	useEffect(() => {
		if (getCookie("CJWT")) router.push("/dashboard");
		else if (getCookie("EJWT")) router.push("/employee/dashboard");
	}, [router]);
};

export const getCookie = (name: string) => {
	var cookieArr = document.cookie.split(";");
	for (var i = 0; i < cookieArr.length; i++) {
		var cookiePair = cookieArr[i].split("=");
		if (name == cookiePair[0].trim()) {
			return decodeURIComponent(cookiePair[1]);
		}
	}
	return null;
};
