import React from 'react';
import PropTypes from 'prop-types';
import BrokerInfo from './BrokerInfo';

const brokers = [
    { id: '1', name: '여보소 수산', address: '부산 해운대구 APEC로 17 센텀리더스마크', details: '우동 1514' },
    { id: '2', name: '브로커2', address: '주소2', details: '상세정보2' },
    { id: '3', name: '브로커3', address: '주소3', details: '상세정보3' },
    // Add more brokers here
];

const BrokerList = () => {
    return (
        <div className='flex flex-col items-center my-2 w-11/12'>
            {brokers.map(broker => (
                <BrokerInfo key={broker.id} id={broker.id} name={broker.name} address={broker.address} details={broker.details} />
            ))}
        </div>
    );
};

BrokerList.propTypes = {};

export default BrokerList;
