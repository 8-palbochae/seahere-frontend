import React from "react";
import { Select } from 'antd';
import { country, natural, status } from '../../constants/income/ProductType';
import productImg from '../../assets/income/product.svg';

const ProductInfo = ({selectedProduct}) => {
  return  (
    <div className='shadow-md border border-gray-200 rounded-lg p-6 mt-6 mx-4'>
        <div className='flex justify-center'>
            <span className='text-black font-bold text-2xl mb-6'>{selectedProduct}</span>
        </div>
        <div className='flex justify-around '>
            <div className='w-36 h-36  flex justify-center items-center overflow-hidden rounded-xl'>
                <img src={productImg} alt="" className='w-36 h-36 object-cover'  />
            </div>
            <div className='w-3/5 flex flex-col pl-4 gap-4 justify-between'>
                <Select
                className='w-full h-full'
                showSearch
                placeholder="원산지"
                optionFilterProp="label"
                options={country}
                />
                <Select
                className='w-full h-full'
                showSearch
                placeholder="상태"
                optionFilterProp="label"
                options={status}
                />
                <Select
                className='w-full h-full'
                showSearch
                placeholder="양식 유무"
                optionFilterProp="label"
                options={natural}
                />
            </div>
        </div>
    </div>
  );
};

ProductInfo.propTypes = {};

export default ProductInfo;
