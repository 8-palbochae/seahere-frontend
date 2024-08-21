import React, { useState } from "react";
import settingIcon from "../../../constants/setting/setting.image";
import UserInfoList from "./UserInfoList";
import { useLocation } from "react-router-dom";
import defaultImage from '../../../assets/setting/user-profile-default.png';
import { profileUrl } from '../../setting/profileUrl';
import ProfileSettingModal from './profileSettingModal';

const UserInfoSetting = () => {
	const location = useLocation();
	const { userData } = location.state || {};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [profileImage, setProfileImage] = useState(userData.profileImg);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const updateProfileImage = (newImageUrl) => {
		setProfileImage(newImageUrl);
	};

	return (
		<div className="flex flex-col items-center gap-9 p-8 w-full">
			<div className="flex flex-col items-center">
				<div className='w-36 h-36 relative'>
					<img
						className='w-full h-full object-cover rounded-full'
						src={`${profileImage !== null ? profileUrl + profileImage + '?' + new Date().getTime() : defaultImage}`}
						alt=""
					/>
					<img
						className='absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full p-1 cursor-pointer'
						src={settingIcon.cameraBlackIcon}
						alt="camera-icon"
						onClick={openModal}
					/>
				</div>
			</div>

			{isModalOpen && (
				<ProfileSettingModal onClose={closeModal} onUpdateProfileImage={updateProfileImage} />
			)}

			<div className="border border-gray-300 rounded-md w-full mt-10 text-md">
				<UserInfoList data={userData} />
			</div>
		</div>
	);
};

export default UserInfoSetting;
