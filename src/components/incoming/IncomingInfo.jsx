import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductInfo from './ProductInfo';
import ButtonGroup from './ButtonGroup';
import MessageModal from './MessageModal';
import { saveIncomingData } from '../../api/incoming/incomingApi';

const IncomingInfo = ({ onAmountChange, onPriceChange, isAmountValid, isPriceValid, selectedProduct }) => {

    const [quantity, setQuantity] = useState('');
    const [incomingPrice, setIncomingPrice] = useState(0);
    const [countryDetail, setCountryDetail] = useState('');
    const [memo, setMemo] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const [selectedProductDetails, setSelectedProductDetails] = useState({
        country: '',
        category: '',
        natural: ''
    });

    const handleAmountChange = (e) => {
        let value = e.target.value;
        value = value.replaceAll(',', '');
        if (!isNaN(value) && value.trim() !== '') {
            const numericValue = Number(value);
            setQuantity(numericValue);
            const valid = numericValue !== 0;
            onAmountChange(numericValue, valid);
        }
        else {
            setQuantity(0);
            onAmountChange(0, false);
        }

    };
    const handlePriceChange = (e) => {
        let value = e.target.value;
        value = value.replaceAll(',', '');
        if (!isNaN(value) && value.trim() !== '') {
            const numericValue = Number(value);
            setIncomingPrice(numericValue);
            const valid = numericValue !== 0;
            onPriceChange(numericValue, valid);
        }
        else {
            setIncomingPrice(0);
            onPriceChange(0, false);
        }
    };

    const handleSubmit = async () => {
        const data = {

            ...selectedProductDetails,
            quantity,
            incomingPrice,
            countryDetail,
            memo,
            productId: selectedProduct.productId



        };

        try {
            const response = await saveIncomingData(data);
            if (!response.ok) {
                throw new Error("데이터 저장 실패");
            }
            else {
                setModalTitle('입고 등록');
                setModalMessage('입고 등록이 완료되었습니다');
                setShowModal(true);

            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div className='flex flex-col mt-1'>
            <ProductInfo selectedProduct={selectedProduct} setSelectedProductDetails={setSelectedProductDetails} />
            <div className='flex flex-col w-full items-center'>
                <div className='w-10/12 flex items-center'>
                    <div className='w-full font-bold text-2xl mt-3'>입고 정보 입력</div>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-3 shadow-md border border-gray-200 rounded-lg py-4 mx-4'>
                <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center justify-between'>
                        <div className='w-full font-bold text-xl flex items-center'>
                            입고량 *
                            {!isAmountValid && (
                                <span className='text-red-500 ml-2'>입고량을 입력해주세요</span>
                            )}
                            {isAmountValid && (
                                <span className='text-green-500 ml-2'>✔</span>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <input
                            className='border p-2 flex-grow rounded-xl'
                            type="text"
                            value={quantity === 0 ? '' : quantity.toLocaleString('ko-KR')}
                            onChange={handleAmountChange}
                        />
                        <span className='ml-2 font-bold text-lg'>Kg</span>
                    </div>
                </div>

                <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center justify-between'>
                        <div className='w-full font-bold text-xl flex items-center'>
                            입고 금액 *
                            {!isPriceValid && (
                                <span className='text-red-500 ml-2'>입고 금액을 입력해주세요</span>
                            )}
                            {isPriceValid && (
                                <span className='text-green-500 ml-2'>✔</span>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <input
                            className='border p-2 flex-grow rounded-xl'
                            type="text"
                            value={incomingPrice === 0 ? '' : incomingPrice.toLocaleString('ko-KR')}
                            onChange={handlePriceChange}
                        />
                        <span className='ml-2 font-bold text-lg'>원</span>
                    </div>
                </div>
                <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center'>
                        <div className='w-full font-bold text-xl'>원산지 세부사항</div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <input
                            className='border p-2 flex-grow rounded-xl'
                            type="text"
                            value={countryDetail}
                            onChange={(e) => setCountryDetail(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center'>
                        <div className='w-full font-bold text-xl'>기타 사항</div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <textarea
                            className='border p-2 flex-grow rounded-xl'
                            type="text"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <ButtonGroup
                quantity={quantity}
                incomingPrice={incomingPrice}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

IncomingInfo.propTypes = {
    onAmountChange: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    isAmountValid: PropTypes.bool.isRequired,
    isPriceValid: PropTypes.bool.isRequired,
    selectedProduct: PropTypes.object.isRequired,
};

export default IncomingInfo;
