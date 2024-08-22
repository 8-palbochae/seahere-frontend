import React, { useState, useEffect } from "react";
import settingIcon from "../../../constants/setting/setting.image";
import CompanyProfileSettingModal from "../userinfo/companyProfileSettingModal";
import { profileUrl } from '../../setting/profileUrl';

const CompanyInfo = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [profileImage, setProfileImage] = useState(data.profileImage || "");

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const updateProfileImage = (newImageUrl) => {
		setProfileImage(newImageUrl);
		setIsModalOpen(false);
	};

	const backgroundStyle = profileImage
		? {
			backgroundImage: `url(${profileUrl}${profileImage})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
		}
		: {
			backgroundColor: "#1E40AF",
		};

	return (
		<div
			className="flex flex-col justify-between w-full rounded-[20px] p-3 min-h-40 text-white relative"
			style={backgroundStyle}
		>
			<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-3 rounded-[20px]">
				<div className="self-end text-white">{data.companyName}</div>
				<hr />
				<div className="self-end text-white">{data.registrationNumber}</div>
			</div>

			<img
				className="w-[24px] cursor-pointer absolute top-2 left-2"
				src={settingIcon.cameraIcon}
				alt="camera-icon"
				onClick={openModal}
				style={{ filter: 'invert(100%)' }}
			/>

			{isModalOpen && (
				<CompanyProfileSettingModal onClose={closeModal} onUpdateProfileImage={updateProfileImage} />
			)}
		</div>
	);
};

export default CompanyInfo;
