import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import DaumPostcode from 'react-daum-postcode';
import MainLogo from '../../../assets/common/MainLogo.svg';
import background from '../../../assets/common/background.svg';
import back from '../../../assets/login_signup/backbutton.svg';
import camera from '../../../assets/login_signup/camera.svg';
import Background from '../itemcomponent/Background';
import InputField from '../itemcomponent/InputField';
import SubmitButton from '../itemcomponent/SubmitButton';
import BrokerCheckModal from '../itemcomponent/BrokerCheckModal';
import { certifyCompany } from '../../../api/broker/brokerCertificationApi';
import { useDatePicker } from '../../../hooks/signup/useDatePicker';
import { useAddress } from '../../../hooks/signup/useAddress';
import { useCertifyModal } from '../../../hooks/signup/useCertifyModal';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

const SignUpBroker = () => {
  const { isModalOpen, openModal, closeModal } = useCertifyModal();
  const { date: issueDate, handleDateChange } = useDatePicker();
  const { isPostcodeOpen, postCode, address, detailAddress, setDetailAddress, openPostcode, closePostcode, handleComplete } = useAddress();
  const [isBrokerCheckSuccess, setIsBrokerCheckSuccess] = useState(null);
  const [representativeName, setRepresentativeName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const certification = await certifyCompany(businessNumber, representativeName, issueDate.format('YYYYMMDD'));
    console.log(certification);
    setIsBrokerCheckSuccess(certification);
    openModal();
  };

  const onSuccessClick = () => {
    console.log('Representative Name:', representativeName);
    console.log('Business Number:', businessNumber);
    console.log('Issue Date:', issueDate ? issueDate.format(dateFormat) : null);
    console.log(postCode);
    console.log(address);
    console.log(detailAddress);
  };

  return (
    <Background backgroundSrc={background} logoSrc={MainLogo} backButtonSrc={back} backLink="/signup/broker-choice">
      <div className="absolute top-[350px] left-1/2 transform -translate-x-1/2 w-full max-w-[276px] text-center">
        <div className="mb-4">
          <img className="mx-auto" src={camera} alt="Camera" />
        </div>
        <form className="relative w-full space-y-4" onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="companyName"
            placeholder="회사 이름"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <InputField
            type="text"
            name="representativeName"
            placeholder="대표자 성명"
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
          />
          <InputField
            type="text"
            name="businessNumber"
            placeholder="사업자 등록번호"
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value)}
          />
          <InputField
            type="text"
            name="address"
            placeholder="주소 입력"
            value={address}
            onClick={openPostcode}
            readOnly
            className="cursor-pointer"
          />
          <InputField
            type="text"
            name="detailAddress"
            placeholder="상세 주소"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
          <div className="relative">
            <DatePicker
              format={dateFormat}
              inputReadOnly
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
          onSuccessClick={onSuccessClick}
        />
      )}

      {isPostcodeOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg max-w-[500px] w-full">
            <DaumPostcode onComplete={handleComplete} />
            <button
              className="mt-2 w-full py-2 bg-red-600 text-white rounded-md"
              onClick={closePostcode}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </Background>
  );
};

export default SignUpBroker;
