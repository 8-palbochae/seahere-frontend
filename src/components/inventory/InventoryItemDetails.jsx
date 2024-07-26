import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import useInventorySlide from '../../hooks/inventory/useInventorySlide';
import { inventoryIcon } from '../../constants/inventory/inventory.image';
import InventoryEditModal from './modal/InventoryEditModal';
import InventoryDeleteModal from './modal/InventoryDeleteModal';

const InventoryItemDetails = ({ country, natural, detailData }) => {
    const { isSlid, handleTouchStart, handleTouchMove, handleMouseDown, handleMouseMove } = useInventorySlide();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const { inventoryId, inventoryQuantity, price, date } = detailData;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const dayOver = dayjs().diff(dayjs(date), 'day');

    const openDeleteConfirm = () => setIsDeleteConfirmOpen(true);
    const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);

    const handleDelete = () => {
        console.log("Item deleted");
        closeDeleteConfirm();
    };

    return (
        <div
            className="relative w-full p-3 border-t border-gray-200 overflow-hidden cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        >
            <div className="flex">
                <div
                    className={`flex flex-col justify-center transition-transform duration-300 ${isSlid ? 'translate-x-[-140px]' : 'translate-x-0'}`}
                    style={{ flex: '1 0 auto', width: 'calc(100% - 140px)' }}
                >
                    <div className="flex justify-around items-center mb-2">
                        <span className="w-1/6 text-sm font-medium truncate text-center">{country}</span>
                        <span className="w-1/6 text-sm truncate text-center">{natural}</span>
                        <span className="w-1/6 text-sm font-semibold truncate text-center text-blue-600">{inventoryQuantity}
                            <span className='text-black'> Kg</span>
                        </span>
                        <span className="w-2/6 text-sm truncate overflow-hidden text-ellipsis text-center" title={`${price}원`}>
                            {price}
                            <span className='text-black'> 원</span>
                        </span>
                        <span className="w-1/6 text-xs truncate text-red-500 border-2 rounded-full items-center text-center p-1">+{dayOver}일</span>
                    </div>
                </div>

                <div
                    className={`absolute top-0 right-0 h-full flex flex-row bg-white border-l border-gray-200 transition-transform duration-300 ${isSlid ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{ width: '140px' }}
                >
                    <button className="flex-1 flex items-center justify-center p-0 bg-gray-400" onClick={openModal}>
                        <img src={inventoryIcon.editIcon} className='w-3/5 h-3/5 object-contain' alt="Edit" />
                    </button>
                    <button className="flex-1 flex items-center justify-center p-0 bg-red-500" onClick={openDeleteConfirm}>
                        <img src={inventoryIcon.deleteIcon} className='w-3/5 h-3/5 object-contain' alt="Delete" />
                    </button>
                </div>
            </div>

            <InventoryEditModal dayOver={dayOver} isOpen={isModalOpen} onClose={closeModal} />
            <InventoryDeleteModal
                isOpen={isDeleteConfirmOpen}
                onClose={closeDeleteConfirm}
                onConfirm={handleDelete}
            />
        </div>
    );
};

InventoryItemDetails.propTypes = {
    country: PropTypes.string.isRequired,
    natural: PropTypes.string.isRequired,
    detailData: PropTypes.shape({
        inventoryId: PropTypes.number.isRequired,
        inventoryQuantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired
    }).isRequired
};

export default InventoryItemDetails;
