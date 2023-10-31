import { useEffect } from "react";
import { apiGet } from "../../data/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { ILoader, updateLoader } from "../../data/shareSlice";

export interface IGenericLoaderProps {
	code: string;
	label: string;
	endpoint: string;
	mapper: (item: any) => any;
}

export const GenericLoader = ({ code, label, endpoint,  mapper } : IGenericLoaderProps) => {
	const rootState = useSelector<RootState>((state) => state) as RootState;
	const { loginState, shareState } = rootState;
	const dispatch = useDispatch<any>();

 	const loader = (shareState as any)[code] as ILoader;
	const prDone = loader?.total ? (loader?.offset / loader?.total * 100) : 0;
	const prWidth = prDone.toFixed(0) + "%";
	const dsDone = prDone >= 100 ? "Done!" : "";

	useEffect(() => {
		const access_token = loginState?.auth?.access_token;
		if (!access_token) return;

		if (loader?.total && loader?.offset >= loader?.total) return;

		apiGet<any>(endpoint, { offset: loader?.offset || 0, access_token }).then(feed => {
			if (!feed) return;
			if (!feed.items) return;

			const newdata = feed.items.map(mapper);
			const newlist = [...(loader.list || []), ...newdata];
			const newoffset = feed.items.length + feed.offset;
			const newtotal = feed.total;

			const newloader = {total: newtotal, offset: newoffset, list: newlist};
			dispatch(updateLoader({ code, loader: newloader }))
		});

	}, [loginState, loader, dispatch, endpoint, mapper, code]);

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