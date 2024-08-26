import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const PeriodEnd = ({ endDate, setEndDate }) => {
	const handleEndChange = (date) => {
		setEndDate(dayjs(date).format(dateFormat));
	};
	return (
		<Space direction="vertical" size={12}>
			<DatePicker
				onPanelChange={() => endDate}
				placeholder={endDate}
				format={dateFormat}
				inputReadOnly={true} 
				onChange={(date) => handleEndChange(date)}
			/>
		</Space>
	);
};

export default PeriodEnd;
