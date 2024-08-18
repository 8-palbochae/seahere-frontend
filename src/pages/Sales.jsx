import { Outlet } from "react-router-dom";

const Sales = () => {
	return (
		<div className="flex flex-col justify-center">
			<Outlet />
		</div>
	);
};

export default Sales;
