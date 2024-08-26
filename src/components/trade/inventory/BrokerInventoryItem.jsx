import React from 'react';
import PropTypes from 'prop-types';
import { tradeIcon } from '../../../constants/trade/trade.image';

const BrokerInventoryItem = ({ inventory }) => {
    return (
        <div className='flex flex-row justify-between items-center w-full border-b-2 border-gray-200 rounded-md'>
            <div className='w-1/5 flex flex-col items-center text-center p-2 '>
                <div className='relative w-14 h-14'>
                    <img 
                        src={inventory.imgUrl} 
                        className='w-full h-full object-cover rounded-md' 
                        alt="Trade Icon" 
                    />
                </div>
            </div>
            <div className='w-2/5 flex flex-col items-center text-center border-gray-300 p-2'>
                <div className='text-lg font-bold'>{inventory.name}</div>
                <div className='font-semibold text-gray-500'>{`재고 : ${inventory.quantity}`}<span>Kg</span></div>
            </div>
            <div className='w-1/5 flex flex-col items-center text-center border-gray-300 p-2'>
                <div className='text-md'>{inventory.category}</div>
                <div className='text-md'>{inventory.country}</div>
                <div className='text-md'>{inventory.naturalStatus}</div>
            </div>
        </div>
    );
};

BrokerInventoryItem.propTypes = {
    inventory: PropTypes.shape({
        inventoryId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imgUrl: PropTypes.string,
        category: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        naturalStatus: PropTypes.string.isRequired,
    }).isRequired,
};

export default BrokerInventoryItem;
