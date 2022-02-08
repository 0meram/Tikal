import React, { useState, useEffect } from "react";
import axios from "axios";
import Data from "./Data";
import ClipLoader from "react-spinners/ClipLoader";
import { Charts } from "./Charts";
import "./home.css";

export default function Home() {
	const [loading, setLoading] = useState(false);
	// const [cardList, setCardList] = useState([]);
	const [dataList, setDataList] = useState([]);

	// useEffect(() => {
		
	// 	axios
	// 		.get(`https://swapi.dev/api/people/?page=2`, {})
	// 		.then(function (response) {
	// 			// setCardList(response.data.results);
				
	// 		});
	// }, []);

	useEffect(() => {
		setLoading(true);
		axios.get(`https://swapi.dev/api/planets`, {}).then(function (response) {
			setDataList([
				{
					name: response.data.results[0].name,
					repos: parseInt(response.data.results[0].population),
				},
				{
					name: response.data.results[1].name,
					repos: parseInt(response.data.results[1].population),
				},
				{
					name: response.data.results[5].name,
					repos: parseInt(response.data.results[5].population),
				},
				{
					name: response.data.results[6].name,
					repos: parseInt(response.data.results[6].population),
				},
				{
					name: response.data.results[7].name,
					repos: parseInt(response.data.results[7].population),
				},
			]);
			setLoading(false);
		});
	}, []);

	return (
		<div>
			<h1 className="title">Tikal star wars data</h1>
			{loading && <ClipLoader color="black" loading={true} css="" size={160} />}
			<Data />
			<Charts data={dataList} />
		</div>
	);
}
