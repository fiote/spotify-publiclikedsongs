const BACKEND = "http://localhost:3110";

export const apiPost = <T = any>(endpoint: string, data?: any, headers?: any) => {
	return apiFetch<T>("POST", endpoint, data, headers);
}

export const apiGet = <T = any>(endpoint: string, data?: any, headers?: any)  => {
	return apiFetch<T>("GET", endpoint, data, headers);
};

export const apiFetch = <T = any>(method: string, endpoint: string, data?: any, headers?: any) : Promise<T | null> => {
	return new Promise(resolve => {
		const options : RequestInit = {
			method,
			headers:  {
				...headers,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		};

		if (method === "GET" && data) {
			const params = new URLSearchParams();
			Object.keys(data).forEach(key => params.append(key, data[key]));
			endpoint += "?"+params.toString();
		}

		if (method === "POST" && data) {
			options.body = JSON.stringify(data);
		}

		fetch(BACKEND+endpoint, options).then(async result => {
			const json = await result.json() as T;
			resolve(json);
		}).catch(err => {
			resolve(null);
		});
	});
};