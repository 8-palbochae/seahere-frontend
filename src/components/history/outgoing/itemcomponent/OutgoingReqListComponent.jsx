import React from "react";
import OutgoingReqListItem from "./OutgoingReqListItem";
const OutgoingReqListComponent = ({
	data,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}) => {
	return (
		<div className="w-full flex flex-col items-center px-2 gap-2 overflow-auto max-h-[70vh] ">
			{data?.pages?.map((page, index) => (
				<React.Fragment key={index}>
					{page.content.map((item) => (
						<OutgoingReqListItem
							outgoingReqItem={item}
							key={item.outgoingId}
						/>
					))}
				</React.Fragment>
			))}
			<button
				onClick={() => fetchNextPage()}
				disabled={!hasNextPage || isFetchingNextPage}
			>
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
					? "Load More"
					: "No more results"}
			</button>
		</div>
	);
};

export default OutgoingReqListComponent;
