import Period from "../itemcomponent/Period";
import HistoryList from "../itemcomponent/HistoryList";
import { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { getHistoryList } from "../../../../api/history/historyApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useHeaderText } from "../../../../stores/headerText";



const getCurrentDate = () => {
	return dayjs().format("YYYY-MM-DD");
};

const History = () => {

	const { setHeaderText } = useHeaderText();

    useEffect(() => {
        setHeaderText("거래 내역");
    }, [setHeaderText]);

	const [startDate, setStartDate] = useState(getCurrentDate);
	const [endDate, setEndDate] = useState(getCurrentDate);
	const loadMoreRef = useRef(null);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: ["historyList", { startDate, endDate }],
			queryFn: ({ pageParam = 0 }) =>
				getHistoryList({
					startDate,
					endDate,
					page: pageParam,
				}),
			getNextPageParam: (lastPage) =>
				lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
		});
	const handleObserver = (entities) => {
		const target = entities[0];
		if (target.isIntersecting && hasNextPage) {
			fetchNextPage();
		}
	};
	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "20px",
			threshold: 1.0,
		};
		const observer = new IntersectionObserver(handleObserver, options);
		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}
		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [loadMoreRef.current, hasNextPage]);

	return (
		<div className="flex flex-col gap-3 w-full ">
			<div className=" w-full">
				<Period
					startDate={startDate}
					endDate={endDate}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
				/>
			</div>
			<div className="w-full">
				<HistoryList
					list={data?.pages.flatMap((page) => page.content) || []}
				/>
				<div
					ref={loadMoreRef}
					className="h-10 flex justify-center items-center"
				>
					{isFetchingNextPage && <p>Loading more...</p>}
				</div>
			</div>
		</div>
	);
};

export default History;
