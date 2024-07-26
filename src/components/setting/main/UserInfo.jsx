import React from "react";
import { ReactComponent as RightArrow } from "../../../assets/setting/right-arrow-icon.svg";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate("/setting/users");
	};
	return (
		<>
			<div className="flex px-2 items-center relative w-full h-[123px] bg-white rounded-[10px] border border-solid border-[#d9d9d9]">
				<div className="flex items-center gap-5">
					<div className=" w-[76px] h-[76px]  bg-[#d9d9d9] rounded-[38px]" />
					<div className="flex flex-col">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center ">
								스파로스
							</div>
							<div>
								<RightArrow
									onClick={() => {
										onClick();
									}}
								/>
							</div>
						</div>
						<div className="flex items-center justify-start ">
							홍길동
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</>
	);
};
export default UserInfo;
