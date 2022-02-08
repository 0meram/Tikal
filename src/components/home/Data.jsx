import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import axios from "axios";
import "./home.css";

const useStyles = makeStyles({
	root: {
		hight: 325,
		width: 550,
		margin: 10,
		padding: 10,
		overflow: "auto",
		textAlign: "left",
	},
	wrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default function Data() {
	const classes = useStyles();
	const [vehicleName, setVehicleName] = useState("");
	const [relatedPilots, setRelatedPilots] = useState([]);
	const [relatedPlanets, setRelatedPlanets] = useState([]);
	const [arr, setArr] = useState([]);

	const getVehicles = async () => {
		await axios.get(`https://swapi.dev/api/vehicles`).then(function (response) {
			// filterVehicles(response.data);
			response.data.results = response.data.results.filter((vehicle) => vehicle.pilots.length > 0);
			getPilots(response.data.results);
		});
	};

	// async function filterVehicles(res) {
	// 	res.results = res.results.filter((vehicle) => vehicle.pilots.length > 0);
	// 	await getPilots(res.results);
	// }

	const getPilots = async (vehiclesWithPilots) => {
		let related = [];
		console.log(vehiclesWithPilots);
		Object.keys(vehiclesWithPilots).map((i) => {
			const vehiclesName = vehiclesWithPilots[i].name;
			const pilotsUrl = vehiclesWithPilots[i].pilots;
			checkPopulationValue(pilotsUrl, vehiclesName);
			pilotsUrl.map((item) => {
				axios.get(`${item}`).then(function (response) {
					relatedPilots.push(response.data.name);
					const pilotsHomeWorldUrl = response.data.homeworld;
					axios.get(`${pilotsHomeWorldUrl}`).then(function (response) {
						related.push({
							planet: response.data.name,
							diameter: response.data.diameter,
						});
						setRelatedPlanets(() => [...related]);
					});
				});
			});
		});
	};

	const checkPopulationValue = (pilotsUrl, vehicleName) => {
		let separateUrl = [];

		separateUrl.push(pilotsUrl);
		for (let i = 0; i < separateUrl.length; i++) {
			separateUrl[i].map(async (item) => {
				await axios.get(`${item}`).then(async (res) => {
					await axios.get(`${res.data.homeworld}`).then((resUrl) => {
						let veObj = new Object();
						veObj.vehicleName = vehicleName;
						veObj.num = parseInt(resUrl.data.population);
						arr.push(veObj);
						Max(arr);
					});
				});
			});
		}
		return;
	};

	useEffect(() => {
		getVehicles();
	}, []);

	function Max(arr) {
		let holder = {};
		let obj2 = [];

		arr.forEach(function (d) {
			if (holder.hasOwnProperty(d.vehicleName)) {
				holder[d.vehicleName] = holder[d.vehicleName] + d.num;
			} else {
				holder[d.vehicleName] = d.num;
			}
		});

		for (let prop in holder) {
			obj2.push({ vehicleName: prop, num: holder[prop] });
		}

		const vehicleNameMax = obj2.reduce(function (prev, current) {
			return prev.num > current.num ? prev : current;
		});
		return setVehicleName(vehicleNameMax.vehicleName);
	}

	return (
		<div className={classes.wrap}>
			<Card className={classes.root}>
				<table>
					<tbody>
						<tr>
							<td>Vehicle name with the largest sum</td>
							<td>
								<b>{vehicleName}</b>
							</td>
						</tr>
						<tr>
							<td>Related home planets and their respective population</td>
							<td>
								<td>
									{Object.keys(relatedPlanets).map((insideValue, index) => {
										return (
											<b key={index}>
												<>
													{"  "}
													{relatedPlanets[insideValue].planet}:{" "}
												</>
												{relatedPlanets[insideValue].diameter}
											</b>
										);
									})}
								</td>
							</td>
						</tr>
						<tr>
							<td>Related pilot names</td>
							<td>
								{relatedPilots.map((item, i) => {
									return <b key={i}>{item} </b>;
								})}
							</td>
						</tr>
					</tbody>
				</table>
			</Card>
		</div>
	);
}
