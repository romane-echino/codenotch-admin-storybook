import React from 'react';
import Chart from "react-apexcharts";
import { Box, IBoxProps } from '../layouts/Box';


interface IBarchartProps extends IBoxProps {
	Source?: any;
}


export const Barchart: React.FC<IBarchartProps> = (props) => {

	return (
		<Box {...props}>
			<div className="max-w-full overflow-x-auto custom-scrollbar">
				<div id="chartOne"
					className="-ml-5 h-full min-w-[690px] pl-2 xl:min-w-full"
					style={{ minHeight: '195px' }}>

					<Chart
						options={{
							chart: {
								id: "basic-bar",
								fontFamily: 'Outfit, sans-serif',
								toolbar: {
									show: false,
								},
								zoom: {
									enabled: false,
								},
							},
							xaxis: {
								categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
							},
							fill: {
								colors: ["#465fff"],
							},
							plotOptions: {
								bar: {
									horizontal: false,
									borderRadius: 4,
									borderRadiusApplication: 'end',
									columnWidth: "35%",
									barHeight: "70%",
								},
							},
							dataLabels: {
								enabled: false,
							},
						}}
						series={[{
							name: 'sales',
							data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112]
						}]}
						type="bar"
						height={180}
						width="100%"
					/>
				</div>

			</div>

		</Box>
	)
}