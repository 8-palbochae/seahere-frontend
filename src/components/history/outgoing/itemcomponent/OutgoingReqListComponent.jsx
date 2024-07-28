import React, { useRef, useCallback } from "react";
import OutgoingReqListItem from "./OutgoingReqListItem";

const OutgoingReqListComponent = ({
	data,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}) => {
	const observer = useRef();
	const lastItemRef = useCallback(
		(node) => {
			if (isFetchingNextPage) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});
			if (node) observer.current.observe(node);
		},
		[isFetchingNextPage, hasNextPage, fetchNextPage]
	);

	return (
		<div className="w-full flex flex-col items-center px-2 gap-2 overflow-auto max-h-[70vh] ">
			{data?.pages?.map((page, pageIndex) => (
				<React.Fragment key={pageIndex}>
					{page.content.map((item, itemIndex) => {
						if (
							pageIndex === data.pages.length - 1 &&
							itemIndex === page.content.length - 1
						) {
							return (
								<OutgoingReqListItem
									ref={lastItemRef}
									outgoingReqItem={item}
									key={item.outgoingId}
								/>
							);
						} else {
							return (
								<OutgoingReqListItem
									outgoingReqItem={item}
									key={item.outgoingId}
								/>
							);
						}
					})}
				</React.Fragment>
			))}
			{isFetchingNextPage && <div>Loading more...</div>}
			{!hasNextPage && !isFetchingNextPage && <div>No more results</div>}
		</div>
	);
};

export default OutgoingReqListComponent;
