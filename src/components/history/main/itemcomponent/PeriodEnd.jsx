import React from "react";
import { DatePicker, Space, ConfigProvider } from "antd";
import dayjs from "dayjs";
import ko_KR from "antd/es/locale/ko_KR";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/ko";
dayjs.locale("ko");

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const PeriodEnd = ({ setEndDate, endDate }) => {
	const handleStartChange = (date) => {
		setEndDate(dayjs(date).format(dateFormat));
	};
	return (
		<ConfigProvider locale={ko_KR}>
			<Space direction="vertical" size={12}>
				<DatePicker
					format={dateFormat}
					onPanelChange={() => endDate}
					inputReadOnly={true} // 자판 비활성화
					onChange={(date) => handleStartChange(date)}
					placeholder={endDate}
				/>
			</Space>
		</ConfigProvider>
	);
};

export default PeriodEnd;
