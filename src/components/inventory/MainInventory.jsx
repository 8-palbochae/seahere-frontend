import React, { useState, useEffect } from 'react';
import InventoryList from './InventoryList';
import InventorySearchInput from './itemcomponent/InventorySearchInput';
import { useHeaderText } from '../../stores/headerText';

const MainInventory = () => {

  const { setHeaderText } = useHeaderText();

    useEffect(() => {
        setHeaderText("재고 확인");
    }, [setHeaderText]);

  const [searchOption, setSearchOption] = useState("");
  const [size, setSize] = useState(calculateSize(window.innerHeight));

  const handleSearchChange = (value) => {
    setSearchOption(value);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize(calculateSize(window.innerHeight));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function calculateSize(height) {
    const itemHeight = 100;
    const headerHeight = 64;
    const footerHeight = 64;
    const searchInputHeight = 56;
    const availableHeight = height - headerHeight - footerHeight - searchInputHeight;
    return Math.floor(availableHeight / itemHeight);
  }

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto relative">
      <div className="sticky bg-white w-full z-10">
        <InventorySearchInput onSearchChange={handleSearchChange} />
      </div>
      <div className="flex-1 overflow-y-auto w-full mt-4">
        <InventoryList
          companyId={101}
          size={size}
          searchOption={searchOption}
        />
      </div>
    </div>
  );
};

export default MainInventory;
