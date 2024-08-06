import React from "react";
import PeriodStart from "./PeriodStart";
import PeriodEnd from "./PeriodEnd";
import dayjs from "dayjs";

function Period({ startDate, endDate, setStartDate, setEndDate, handleClick }) {
	const dateFormat = "YYYY-MM-DD";
	const date = dayjs(endDate);
	const dayCalc = () => {
		setStartDate(date.subtract(1, "day").format(dateFormat));
	};

	const weekCalc = () => {
		setStartDate(date.subtract(7, "day").format(dateFormat));
	};

	const monthCalc = () => {
		setStartDate(date.subtract(1, "month").format(dateFormat));
	};

	return (
		<div className="flex flex-col items-center space-y-4 w-full mt-3">
			<div className="flex w-full justify-center space-x-6">
				<PeriodStart
					setStartDate={setStartDate}
					startDate={startDate}
				/>
				<span>~</span>{" "}
				<PeriodEnd setEndDate={setEndDate} endDate={endDate} />
			</div>
			<div className="flex w-full justify-center space-x-4 px-4">
				<button
					className="flex-grow bg-gray-100 text-black py-2 px-4 rounded"
					onClick={dayCalc}
				>
					1일
				</button>
				<button
					className="flex-grow bg-gray-100 text-black py-2 px-4 rounded"
					onClick={weekCalc}
				>
					일주일
				</button>
				<button
					className="flex-grow bg-gray-100 text-black py-2 px-4 rounded"
					onClick={monthCalc}
				>
					한 달
				</button>
			</div>
		</div>
	);
}

export default Period;
