import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import MainLogo from '../../../assets/common/MainLogo.svg';
import background from '../../../assets/common/background.svg';
import back from '../../../assets/login_signup/backbutton.svg';
import camera from '../../../assets/login_signup/camera.svg';
import Background from '../itemcomponent/Background';
import InputField from '../itemcomponent/InputField';
import SubmitButton from '../itemcomponent/SubmitButton';
import BrokerCheckModal from '../itemcomponent/BrokerCheckModal';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY/MM/DD';

const SignUpBroker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrokerCheckSuccess, setIsBrokerCheckSuccess] = useState(null);
  const [issueDate, setIssueDate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsBrokerCheckSuccess(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date) => {
    setIssueDate(date);
    console.log('Selected Date: ', date ? date.format(dateFormat) : null);
  };

  return (
    <Background backgroundSrc={background} logoSrc={MainLogo} backButtonSrc={back} backLink={"/signup/broker-choice"}>
      <div className="absolute top-[418px] left-1/2 transform -translate-x-1/2 w-full max-w-[276px] text-center">
        <div className="mb-4">
          <img className="mx-auto" src={camera} alt="Camera" />
        </div>
        <form className="relative w-full space-y-4" onSubmit={handleSubmit}>
          <InputField type="text" name="representativeName" placeholder="대표자 성명" />
          <InputField type="text" name="businessNumber" placeholder="사업자 등록번호" />
          <div className="relative">
            <DatePicker
              format={dateFormat}
              inputReadOnly={true} // 자판 비활성화
              onChange={handleDateChange}
              placeholder="발급 일자"
              className="w-full px-4 py-2 border border-gray-300 rounded-md font-normal text-black leading-normal"
              style={{ width: '100%' }}
            />
          </div>
          <SubmitButton>진위 여부 확인</SubmitButton>
        </form>
      </div>
      {isModalOpen && (
        <BrokerCheckModal
          onClose={closeModal}
          success={isBrokerCheckSuccess}
        />
      )}
    </Background>
  );
};

export default SignUpBroker;
