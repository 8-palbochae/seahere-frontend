import React from 'react';
import { Button, Flex } from 'antd';


const ButtonGroup = () => {
    return (
        <div className='mt-5 flex flex-row justify-around items-center mb-6'>
            <div className='w-11/12 flex flex-row gap-5'>
               <button className='w-full bg-gray-200 text-black font-bold py-2 px-4 rounded-lg'>취소</button>
               <button className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg  focus:ring-opacity-50'>
                    추가
                </button>
            </div>
        </div>
    );
};

export default ButtonGroup;