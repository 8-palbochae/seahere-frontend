import React from "react";
import MainImage from "../../../constants/main/main.image";
import { useNavigate } from "react-router-dom";

const Sales = () => {

	const navigate = useNavigate();
	const onClick = () => {
		navigate("/sales");
	};
	return (
		<div className="flex flex-col items-center justify-center p-3  shadow-lg rounded-[20px] gap-2"
		onClick={onClick}>
			<div className="flex">
				<div className=" border-r border-gray-300 pr-1">
					{"다 팔렸데이"}
				</div>
				<div className="pl-1">{"매출 확인"}</div>
			</div>
			<div>
				<img src={MainImage.graphIcon} alt="graph-icon" />
			</div>
		</div>
	);
};

export default Sales;
