import React from "react";
import PropTypes from "prop-types";
import ProductInfo from '../components/incoming/ProductInfo';
import IncomingInfo from '../components/incoming/IncomingInfo';
import ButtonGroup from '../components/incoming/ButtonGroup';
import { useLocation } from "react-router-dom";

const Income = () => {
  
  const location = useLocation();
  const { selectedProduct } = location.state || {};

  return (
    <div className='overflow-y-auto'>
      <ProductInfo selectedProduct={selectedProduct}/>
      <IncomingInfo/>
      <ButtonGroup/>
    </div>
  );
};

Income.propTypes = {};

export default Income;
