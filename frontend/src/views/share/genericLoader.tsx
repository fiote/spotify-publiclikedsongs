import { useEffect } from "react";
import { apiGet } from "../../data/api";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { ILoader } from "../../data/shareSlice";

export interface IGenericLoaderProps {
	label: string;
	endpoint: string;
	loader: ILoader;
	mapper: (item: any) => any;
}

export const GenericLoader = ({ label, endpoint, loader, mapper } : IGenericLoaderProps) => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState } = rootState;

	const prDone = loader?.total ? (loader?.offset / loader?.total * 100) : 0;
	const prWidth = prDone.toFixed(0) + "%";
	const dsDone = prDone >= 100 ? "Done!" : "";

	useEffect(() => {
		const access_token = loginState?.auth?.access_token;
		if (!access_token) return;

		console.log('generic loader ready to load', loader);

		if (loader?.total && loader?.offset >= loader?.total) return;

		apiGet<any>(endpoint, { offset: loader?.offset, access_token }).then(feed => {
			console.log('got feed', feed);
			if (!feed) return;
			if (!feed.items) return;

			const newdata = feed.items.map(mapper);
			const newlist = [...loader.list, ...newdata];
			const newoffset = feed.items.length + feed.offset;
			const newtotal = feed.total;

			console.log({ newoffset, newtotal, newlist });

			// loader.setOffset(newoffset); localStorage.setItem(loader.offsetKey, newoffset.toString());
			// loader.setTotal(newtotal); localStorage.setItem(loader.totalKey, newtotal.toString());
			// loader.setList(newlist); localStorage.setItem(loader.listKey, JSON.stringify(newlist));
		});

	}, [endpoint, loader, loginState?.auth?.access_token, mapper]);

	return (
		<>
			<h3>Loading {label}... {dsDone}</h3>
			<div className="ui indicating progress" data-percent={prDone}>
				<div className="bar" style={{ width: prWidth }}></div>
				<div className="label">{loader?.offset} / {loader?.total} ({prWidth})</div>
			</div>
		</>
	);
}