import React, { useState } from 'react';
import BrokerList from './broker/BrokerList';
import BrokerSearchInput from '../common/BrokerSearchInput ';

const TradeMain = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>      
      <BrokerSearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BrokerList searchQuery={searchQuery} />
    </>
  );
};

export default TradeMain;
