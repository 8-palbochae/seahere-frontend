import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const PeriodStart = ({ startDate, setStartDate }) => {
	const today = dayjs().format(dateFormat);
	return (
		<Space direction="vertical" size={12}>
			<DatePicker
				value={dayjs(today, dateFormat)}
				format={dateFormat}
				onPanelChange={() => startDate}
				placeholder={startDate}
				inputReadOnly={true}
				disabled={true}
			/>
		</Space>
	);
};

export default PeriodStart;
