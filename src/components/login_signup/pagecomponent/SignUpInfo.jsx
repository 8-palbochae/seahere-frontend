import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import MainLogo from '../../../assets/common/MainLogo.svg';
import background from '../../../assets/common/background.svg';
import back from '../../../assets/login_signup/backbutton.svg';
import Background from '../itemcomponent/Background';
import InputField from '../itemcomponent/InputField';
import SubmitButton from '../itemcomponent/SubmitButton';
import useUserTypeStore from '../../../stores/signupType';
import { postUser } from '../../../api/user/userApi';
import { useNavigate } from 'react-router-dom';

const SignUpInfo = () => {
  const { userType } = useUserTypeStore((state) => ({
    userType: state.userType,
  }));
  const navigate =useNavigate();
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  // 필드 상태를 하나의 객체로 관리
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작을 막습니다.

    if (formValues.password !== formValues.confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const userInfo = {
        "username": formValues.name,
        "email": formValues.email,
        "password": formValues.password,
        "address" : {
          "postCode" : postCode,
          "mainAddress": address,
          "subAddress": detailAddress,
        }
      }

    const response = await postUser(userInfo,userType);
      if(response.status===201){
        navigate("/login");
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setPostCode(data.zonecode);
    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <Background backgroundSrc={background} logoSrc={MainLogo} backButtonSrc={back} backLink={"/login"}>
      <div className="absolute top-[400px] left-1/2 transform -translate-x-1/2 w-full max-w-[276px]">
        <form className="relative w-full max-w-[276px]" onSubmit={handleSubmit}>
          <div className="mt-2">
            <InputField
              type="text"
              name="name"
              placeholder="이름"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <InputField
              type="email"
              name="email"
              placeholder="이메일"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <InputField
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <InputField
              type="text"
              name="address"
              placeholder="주소 입력"
              value={address}
              onClick={() => setIsPostcodeOpen(true)}
              readOnly
              className="cursor-pointer"
            />
          </div>
          <div className="mt-2">
            <InputField
              type="text"
              name="detailAddress"
              placeholder="상세 주소"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <SubmitButton>시작하기</SubmitButton>
          </div>
        </form>
      </div>
      {isPostcodeOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg max-w-[500px] w-full">
            <DaumPostcode onComplete={handleComplete} />
            <button
              className="mt-2 w-full py-2 bg-red-600 text-white rounded-md"
              onClick={() => setIsPostcodeOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </Background>
  );
};

export default SignUpInfo;
