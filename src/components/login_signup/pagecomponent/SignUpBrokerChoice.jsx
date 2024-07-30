import { useEffect } from 'react';
import MainLogo from '../../../assets/common/MainLogo.svg';
import background from '../../../assets/common/background.svg';
import back from '../../../assets/login_signup/backbutton.svg';
import useUserTypeStore from '../../../stores/signupType';
import Background from '../itemcomponent/Background';
import ChoiceBox from '../itemcomponent/ChoiceBox';

const SignUpBrokerChoice = () => {
  const { userType, setUserType } = useUserTypeStore((state) => ({
    userType: state.userType,
    setUserType: state.setUserType,
  }));

  const handleOnClickUserType = (type) => {
    setUserType(type);
  }

  useEffect(() => {
    console.log(userType);
  }, [userType]);


  return (
    <Background backgroundSrc={background} logoSrc={MainLogo} backButtonSrc={back} backLink={"/signup/choice"}>
      <div className="absolute w-full h-full top-[436px] flex flex-col items-center space-y-6 mt-4">
        <ChoiceBox to="/signup/broker" onClick={() => handleOnClickUserType('ceo')}>신규 사업자 등록</ChoiceBox>
        <ChoiceBox to="/signup" onClick={() => handleOnClickUserType('broker')}>신규 직원 등록</ChoiceBox>
      </div>
    </Background>
  );
};

export default SignUpBrokerChoice;
