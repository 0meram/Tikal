import React from "react";

const urls = [
	"https://swapi.dev/api/people/",
	"https://swapi.dev/api/people/?page=2",
	"https://swapi.dev/api/people/?page=3",
	"https://swapi.dev/api/people/?page=4",
	"https://swapi.dev/api/people/?page=5",
	"https://swapi.dev/api/people/?page=6",
	"https://swapi.dev/api/people/?page=7",
	"https://swapi.dev/api/people/?page=8",
	"https://swapi.dev/api/people/?page=9",
	"https://swapi.dev/api/people/?page=10",
];

export const fetchData = async () => {
	try {
		const response = await Promise.all(
			urls.map((url) => fetch(url).then((res) => res.json()))
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

