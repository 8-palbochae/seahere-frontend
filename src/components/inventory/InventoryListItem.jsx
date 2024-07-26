import React, { useState } from 'react';
import dayjs from 'dayjs';
import productImg from '../../assets/income/product.svg';
import './styles/InventoryItem.css';
import InventoryItemDetails from './InventoryItemDetails';

const InventoryListItem = ({ product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { productName, country, category, natural, totalQuantity, latestIncoming, detailData } = product;

    const handleToggle = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <div>
            <div
                className={`flex p-3 justify-around items-center cursor-pointer bg-white border border-gray-200 rounded-md shadow-sm
                            ${isExpanded ? 'rounded-b-none' : 'rounded-md'}`}
                onClick={handleToggle}
            >
                <div className='flex flex-col justify-center items-center gap-2'>
                    <img className='w-10 h-10 rounded-full object-cover' src={productImg} alt="Product" />
                    <span className="text-gray-800">{productName}</span>
                </div>
                <div className='text-center font-bold text-lg text-gray-800'>{category}</div>
                <div className='text-center text-lg text-gray-700'>{totalQuantity}kg</div>
                <div className='text-center text-sm text-gray-500'>{dayjs(latestIncoming).format('YYYY-MM-DD')}</div>
            </div>
            <div
                className={`transition-height overflow-hidden flex flex-col justify-center items-center ${isExpanded ? 'details-open' : 'details-closed'}`}
            >
                {isExpanded && detailData.map(detailProduct => (
                    <InventoryItemDetails
                        key={detailProduct.inventoryId}
                        detailData={detailProduct}
                        country={country}
                        natural={natural}
                    />
                ))}
            </div>
        </div>
    );
};

export default InventoryListItem;
