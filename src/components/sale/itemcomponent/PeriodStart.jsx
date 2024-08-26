import React from "react";
import { DatePicker, Space, ConfigProvider } from "antd";
import ko_KR from "antd/es/locale/ko_KR";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const PeriodStart = ({ setStartDate, startDate }) => {
	const handleStartChange = (date) => {
		setStartDate(dayjs(date).format(dateFormat));
	};
	return (
		<ConfigProvider locale={ko_KR}>
			<Space direction="vertical" size={12}>
				<DatePicker
					format={dateFormat}
					onPanelChange={() => startDate}
					inputReadOnly={true} 
					onChange={handleStartChange}
					placeholder={startDate}
					disabled={true}
				/>
			</Space>
		</ConfigProvider>
	);
};

export default PeriodStart;
