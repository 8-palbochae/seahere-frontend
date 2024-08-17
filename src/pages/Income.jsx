import React, { useEffect, useState } from 'react';
import IncomingInfo from '../components/incoming/IncomingInfo';
import { useParams } from "react-router-dom";
import { useHeaderText } from '../stores/headerText';
import { getProduct } from '../api/incoming/incomingApi';
import { useQuery } from '@tanstack/react-query';

const Income = () => {
    const { productId } = useParams();
    const { setHeaderText } = useHeaderText();

    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [isAmountValid, setIsAmountValid] = useState(false);
    const [isPriceValid, setIsPriceValid] = useState(false);

    const { data: selectedProduct, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProduct(productId),
        enabled: !!productId,
    });

    useEffect(() => {
        setHeaderText("입고 상품 추가");
    }, [setHeaderText]);

    // Check what is being returned
    useEffect(() => {
        if (selectedProduct) {
            console.log("Selected Product:", selectedProduct);
        }
    }, [selectedProduct]);

    const handleAmountChange = (value, valid) => {
        setAmount(value);
        setIsAmountValid(valid);
    };

    const handlePriceChange = (value, valid) => {
        setPrice(value);
        setIsPriceValid(valid);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.error('Failed to fetch product:', error);
        return <div>Error fetching product</div>;
    }

    return (
        <div className='overflow-y-auto'>
            {typeof selectedProduct === 'object' ? (
                <IncomingInfo
                    onAmountChange={handleAmountChange}
                    onPriceChange={handlePriceChange}
                    isAmountValid={isAmountValid}
                    isPriceValid={isPriceValid}
                    selectedProduct={selectedProduct}
                />
            ) : (
                <div>Product not found or incorrect data format</div>
            )}
        </div>
    );
};

export default Income;
