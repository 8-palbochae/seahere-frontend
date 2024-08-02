import React, { useState } from 'react';
import InventoryList from './InventoryList';
import InventorySearchInput from './itemcomponent/InventorySearchInput';

const MainInventory = () => {
  const [searchOption, setSearchOption] = useState("");

  const handleSearchChange = (value) => {
    setSearchOption(value);
  };

  return (
    <div className="flex flex-col h-screen">
      <InventorySearchInput onSearchChange={handleSearchChange} />
      <div className="flex-1 overflow-auto mt-16">
        <InventoryList
          companyId={101}
          size={4}
          searchOption={searchOption}
        />
      </div>
    </div>
  );
};

export default MainInventory;
