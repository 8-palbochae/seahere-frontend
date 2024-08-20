import React, { useEffect, useRef, useCallback } from "react";
import AlarmInfo from "./AlarmInfo";
import { useHeaderText } from "../../../stores/headerText";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAlarmHistoryListSlice } from "../../../api/setting/alarmApi";
const AlarmHistory = () => {
	const { setHeaderText } = useHeaderText();
	const observerRef = useRef(null);
	useEffect(() => {
		setHeaderText("알림");
	}, [setHeaderText]);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: ["alarmHistory"],
			queryFn: ({ pageParam = 0 }) =>
				getAlarmHistoryListSlice({
					page: pageParam,
				}),
			getNextPageParam: (lastPage) => {
				return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
			},
		});
	console.log(data);

	const lastAlarmElementRef = useCallback(
		(node) => {
			if (isFetchingNextPage) return;
			if (observerRef.current) observerRef.current.disconnect();

			observerRef.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				} else {
					console.log(
						"Not fetching next page. isIntersecting:",
						entries[0].isIntersecting,
						"hasNextPage:",
						hasNextPage
					);
				}
			});

			if (node) {
				observerRef.current.observe(node);
			}
		},
		[isFetchingNextPage, fetchNextPage, hasNextPage]
	);

	if (status === "loading") {
		return (
			<div className="flex flex-col gap-4 items-center m-5">
				<div>잠시 기다려 주세요...</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 items-center m-5">
			{data?.pages.map((page, pageIndex) => (
				<React.Fragment key={pageIndex}>
					{page.content.map((alarm, index) => {
						if (
							pageIndex === data.pages.length - 1 &&
							index === page.content.length - 1
						) {
							// 마지막 요소에 ref를 연결하여 관찰 시작
							return (
								<AlarmInfo
									ref={lastAlarmElementRef}
									key={alarm.id}
									alarm={alarm}
								/>
							);
						} else {
							return <AlarmInfo key={alarm.id} alarm={alarm} />;
						}
					})}
				</React.Fragment>
			))}
			{isFetchingNextPage && (
				<div className="flex flex-col gap-4 items-center m-5">
					<div>로딩 중...</div>
				</div>
			)}
		</div>
	);
};

export default AlarmHistory;
