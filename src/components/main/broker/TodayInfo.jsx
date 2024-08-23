import React, { useState, useEffect } from "react";
import { getHistoryList } from "../../../api/history/historyApi";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const TodayInfo = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		incoming: 0,
		outgoing: 0,
		total: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const today = dayjs().format("YYYY-MM-DD");
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const result = await getHistoryList({
					startDate: dayjs().format("YYYY-MM-DD"),
					endDate: dayjs().format("YYYY-MM-DD"),
					page: 0,
				});

				if (result.content.length == 0) {
					setData({
						incoming: 0,
						outgoing: 0,
						total: 0,
					});
				} else {
					setData({
						incoming: result.content[0].incomingCount || 0,
						outgoing: result.content[0].outgoingCount || 0,
						total:
							(result.content[0].incomingCount || 0) +
							(result.content[0].outgoingCount || 0),
					});
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex flex-col items-center w-full gap-2 p-3 rounded-[20px] bg-blue-600">
			<div className="flex self-start gap-2 items-center">
				<div className="text-white font-bold text-2xl">{"오늘"}</div>
				<div className="text-white">{dayjs().format("YYYY-MM-DD")}</div>
			</div>
			<div
				className="grid gap-2 w-full text-white p-2"
				style={{
					gridTemplateColumns: "1fr 1fr 1fr",
				}}
			>
				<div
					className="flex flex-col border-r border-white pr-2 gap-2"
					onClick={() => navigate("/histories")}
				>
					<div>{"총거래"}</div>
					<div className="self-center text-2xl">{data.total}</div>
				</div>
				<div
					className="flex flex-col border-r border-white pr-2 gap-2"
					onClick={() => navigate(`/histories/incomings/${today}`)}
				>
					<div>{"입고"}</div>
					<div className="self-center text-2xl">{data.incoming}</div>
				</div>
				<div
					className="flex flex-col pr-2 gap-2"
					onClick={() => navigate(`/histories/outgoings/${today}`)}
				>
					<div>{"출고"}</div>
					<div className="self-center text-2xl">{data.outgoing}</div>
				</div>
			</div>
		</div>
	);
};

export default TodayInfo;
