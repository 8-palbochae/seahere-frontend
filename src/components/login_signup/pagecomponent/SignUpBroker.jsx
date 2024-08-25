import React, { useEffect, useState } from "react";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DaumPostcode from "react-daum-postcode";
import MainLogo from "../../../assets/common/MainLogo.svg";
import background from "../../../assets/common/background.svg";
import back from "../../../assets/login_signup/backbutton.svg";
import camera from "../../../assets/login_signup/camera.svg";
import Background from "../itemcomponent/Background";
import InputField from "../itemcomponent/InputField";
import SubmitButton from "../itemcomponent/SubmitButton";
import BrokerCheckModal from "../itemcomponent/BrokerCheckModal";
import CameraCapture from "../../common/CameraCapture";
import { uploadImageForOCR } from "../../../api/ocr/ocrApi";
import { certifyCompany } from "../../../api/broker/brokerCertificationApi";
import { useDatePicker } from "../../../hooks/signup/useDatePicker";
import { useAddress } from "../../../hooks/signup/useAddress";
import { useCertifyModal } from "../../../hooks/signup/useCertifyModal";
import { postCompany } from "../../../api/broker/companyApi";
import Company from "../../../types/Company";
import useUserTypeStore from "../../../stores/signupType";
import "dayjs/locale/ko";
import ko_KR from "antd/es/locale/ko_KR";
import { duplicateCompany } from "../../../api/broker/brokerDuplicateApi";
import CompanyDuplicateModal from "../itemcomponent/CompanyDuplicateModal";
import OCRCheckModal from "../itemcomponent/OCRCheckModal";

dayjs.locale("ko");
dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const SignUpBroker = () => {
    const { isModalOpen, openModal, closeModal } = useCertifyModal();
    const { date: openDate, handleDateChange, setDate } = useDatePicker();
    const {
        isPostcodeOpen,
        postCode,
        address,
        detailAddress,
        setDetailAddress,
        openPostcode,
        closePostcode,
        handleComplete,
    } = useAddress();
    const [isBrokerCheckSuccess, setIsBrokerCheckSuccess] = useState(null);
    const [representativeName, setRepresentativeName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
    const [isOCRCheckModalOpen, setIsOCRCheckModalOpen] = useState(false);
    const [ocrSuccess, setOcrSuccess] = useState(false);
    const { setCompanyId } = useUserTypeStore.getState();

    useEffect(() => {
        console.log(isDuplicateModalOpen);
    }, [isDuplicateModalOpen]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!openDate || !dayjs(openDate).isValid()) {
            alert("유효한 개업 일자를 선택해 주세요.");
            return;
        }
        try {
            const duplicateData = await duplicateCompany(businessNumber);
            if (duplicateData === 409) {
                setIsDuplicateModalOpen(true);
                return;
            }
            const certification = await certifyCompany(
                businessNumber,
                representativeName,
                dayjs(openDate).format("YYYYMMDD")
            );
            setIsBrokerCheckSuccess(certification);
            openModal();
        } catch (error) {
            console.error("Error during certification:", error);
        }
    };

    const onSuccessClick = async () => {
        const company = new Company(
            companyName || "",
            representativeName || "",
            businessNumber || "",
            postCode || "",
            address || "",
            detailAddress || ""
        );
        try {
            const response = await postCompany(company);
            setCompanyId(response);
        } catch (error) {
            console.error("Error during company post:", error);
        }
    };

    const handleOpenCamera = () => {
        setIsCameraOpen(true);
    };

    const handleCapture = async (imageDataUrl) => {
        try {
            const ocrResult = await uploadImageForOCR(imageDataUrl);
            if (ocrResult && (ocrResult.companyName || ocrResult.businessNumber || ocrResult.representativeName || ocrResult.address)) {
                setOcrSuccess(true);
                setCompanyName(ocrResult.companyName || "");
                setBusinessNumber(ocrResult.businessNumber.replace(/-/g, "") || "");
                setRepresentativeName(ocrResult.representativeName || "");
                setDetailAddress(ocrResult.address || "");
                const formattedOpenDate = dayjs(ocrResult.openDate || "", "YYYY 년 MM 월 DD 일").format("YYYY-MM-DD");
                setDate(formattedOpenDate);
                setIsOCRCheckModalOpen(false);
            } else {
                setOcrSuccess(false);
                setIsOCRCheckModalOpen(true);
            }
        } catch (error) {
            setOcrSuccess(false);
            setIsOCRCheckModalOpen(true);
            console.error("Error during OCR processing:", error);
        } finally {
            setIsCameraOpen(false);
        }
    };

    const handleRetake = () => {
        setIsOCRCheckModalOpen(false);
        setIsCameraOpen(true);
    };

    const handleCancel = () => {
        setIsCameraOpen(false);
    };

    return (
        <Background
            backgroundSrc={background}
            logoSrc={MainLogo}
            backButtonSrc={back}
            backLink="/signup/broker-choice"
        >
            <div className="absolute top-[350px] left-1/2 transform -translate-x-1/2 w-full max-w-[276px] text-center">
                <div className="mb-4">
                    <img
                        className="mx-auto"
                        src={camera}
                        alt="Camera"
                        onClick={handleOpenCamera}
                    />
                </div>
                <form
                    className="relative w-full space-y-4"
                    onSubmit={handleSubmit}
                >
                    <InputField
                        type="text"
                        name="companyName"
                        placeholder="회사 이름"
                        value={companyName || ""}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <InputField
                        type="text"
                        name="representativeName"
                        placeholder="대표자 성명"
                        value={representativeName || ""}
                        onChange={(e) => setRepresentativeName(e.target.value)}
                    />
                    <InputField
                        type="text"
                        name="businessNumber"
                        placeholder="사업자 등록번호"
                        value={businessNumber || ""}
                        onChange={(e) => setBusinessNumber(e.target.value)}
                    />
                    <InputField
                        type="text"
                        name="address"
                        placeholder="주소 입력"
                        value={address || ""}
                        onClick={openPostcode}
                        readOnly
                        className="cursor-pointer"
                    />
                    <InputField
                        type="text"
                        name="detailAddress"
                        placeholder="상세 주소"
                        value={detailAddress || ""}
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                    <div className="relative">
                        <ConfigProvider locale={ko_KR}>
                            <DatePicker
                                format={dateFormat}
                                inputReadOnly
                                onChange={(date, dateString) => {
                                    setDate(dateString);
                                    handleDateChange(date);
                                }}
                                placeholder="개업 일자"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md font-normal text-black leading-normal"
                                value={openDate ? dayjs(openDate, dateFormat) : null}
                            />
                        </ConfigProvider>
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
            {isDuplicateModalOpen && (
                <CompanyDuplicateModal
                    isOpen={isDuplicateModalOpen}
                    onClose={() => setIsDuplicateModalOpen(false)}
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
            {isCameraOpen && (
                <div className="absolute top-0 left-0 w-full h-full z-50">
                    <CameraCapture
                        onCapture={handleCapture}
                        onCancel={handleCancel}
                    />
                </div>
            )}
            {isOCRCheckModalOpen && !ocrSuccess && (
                <OCRCheckModal
                    onClose={() => setIsOCRCheckModalOpen(false)}
                    onRetakeClick={handleRetake}
                />
            )}
        </Background>
    );
};

export default SignUpBroker;