import React from "react";
import "./home.css";

const Chart = ({ children, width, height }) => (
	<svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
		{children}
	</svg>
);

const Bar = ({ x, y, width, height, value, num }) => (
	<>
		<rect x={x} y={y} width={width} height={height} />
		<text x={x} y={y - 25} font-size="15">
			{value}
		</text>
		<text x={x} y={y - 10} font-size="15">
			{num / 0.00000025}
		</text>
	</>
);

export const Charts = ({ data }) => {
	const itemWidth = 110;
	const itemMargin = 0;
	const dataLength = data.length;

	const massagedData = data.map((datum) =>
		Object.assign({}, datum, { repos: datum.repos * 0.00000025 })
	);

	const mostRepos = massagedData.reduce((acc, cur) => {
		const { repos } = cur;
		return repos > acc ? repos : acc;
	}, 0);

	const chartHeight = mostRepos - 600;

	return (
		<div>
			<h1>Charts</h1>
			<Chart width={dataLength * (itemWidth + itemMargin)} height={chartHeight}>
				{massagedData.map((datum, index) => {
					const itemHeight = datum.repos * 0.4;
					return (
						<Bar
							key={datum.name}
							x={index * (itemWidth + itemMargin)}
							y={chartHeight - itemHeight}
							width={itemWidth}
							height={itemHeight}
							value={datum.name}
							num={datum.repos}
						/>
					);
				})}
			</Chart>
		</div>
	);
};
