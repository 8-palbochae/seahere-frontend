import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BrokerDeatil from './broker/BrokerDeatil';
import { useParams } from 'react-router-dom';

const TradeBrokerMain = () => {
  const { brokerId } = useParams(); 

  if (!brokerId) {
    return <p>Broker ID is missing</p>; 
  }

  return (
    <>
        <BrokerDeatil id={brokerId} />
    </>
  );
};

TradeBrokerMain.propTypes = {};

export default TradeBrokerMain;
