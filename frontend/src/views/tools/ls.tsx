export const getLsInt = (key: string, defvalue: number = 0) => {
	const rawvalue = localStorage.getItem(key);
	if (!rawvalue) return defvalue;
	return parseInt(rawvalue);
};

export const getLsIntList = (key: string, defvalue: number[] = []) => {
	const rawvalue = localStorage.getItem(key);
	if (!rawvalue) return defvalue;
	return JSON.parse(rawvalue).map((x: any) => parseInt(x));
}

export const getLsList = <T = any>(key: string, defvalue: T[] = []) => {
	const rawvalue = localStorage.getItem(key);
	if (!rawvalue) return defvalue;
	return JSON.parse(rawvalue) as T[];
}