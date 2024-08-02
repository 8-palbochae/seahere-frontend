import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import productImg from '../../assets/income/product.svg';
import InventoryItemDetails from './InventoryItemDetails';

const InventoryListItem = ({ product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [details, setDetails] = useState([]);
    const { companyId, name, category, totalQuantity, latestIncoming } = product;

    const handleToggle = () => {
        setIsExpanded(prevState => !(prevState));
    };

    useEffect(() => {
        if (isExpanded) {
            const fetchData = async () => {
                try {
                    const url = `http://localhost:8080/inventories/details?companyId=${companyId}&page=0&size=5&search=&name=${name}&category=${category}`;
                    const response = await axios.get(url);
                    setDetails(response.data.content.content);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [isExpanded, companyId, name, category]);

    return (
        <div>
            <div
                className={`flex p-3 justify-around items-center cursor-pointer bg-white border border-gray-200 rounded-md shadow-sm
                            ${isExpanded ? 'rounded-b-none' : 'rounded-md'}`}
                onClick={handleToggle}
            >
                <div className='flex flex-col justify-center items-center gap-2 w-1/5'>
                    <img className='w-10 h-10 rounded-full object-cover' src={productImg} alt="Product" />
                    <span className="text-gray-800">{name}</span>
                </div>
                <div className='w-1/5 text-center font-bold text-lg text-gray-800'>{category}</div>
                <div className='w-1/5 text-center text-lg text-gray-700'>{totalQuantity}kg</div>
                <div className='w-1/5 text-center text-sm text-gray-500 whitespace-nowrap'>{dayjs(latestIncoming).format('YYYY-MM-DD')}</div>
            </div>
            {isExpanded && (
                <div className="transition-height overflow-hidden details-open">
                    {details.map(detailProduct => (
                        <InventoryItemDetails
                            key={detailProduct.inventoryId}
                            detailData={detailProduct}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InventoryListItem;
