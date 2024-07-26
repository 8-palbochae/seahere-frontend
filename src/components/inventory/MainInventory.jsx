import React, { useState } from 'react';
import SearchInput from '../common/SearchInput';
import InventoryList from './InventoryList';

const MainInventory = () => {
  const [searchOption, setSearchOption] = useState("");

  const handleSearchChange = (value) => {
    setSearchOption(value);
  };

  return (
    <>
      <SearchInput onSearchChange={handleSearchChange} />
      <InventoryList
        companyId={1}
        page={1}
        size={10}
        searchOption={searchOption}
      />
    </>
  );
};

export default MainInventory;
