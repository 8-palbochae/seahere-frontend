import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryListItem from './InventoryListItem';
import inventoryMockup from './mockupdatas/inventoryMockup';

const InventoryList = ({ companyId, page, size, searchOption = "" }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const url = `http://localhost:8090/App/inventories?companyId=${companyId}&page=${page}&size=${size}&search=${searchOption}`;
                // const response = await axios.get(url);
                // setProducts(response.data.products);

                setProducts(inventoryMockup.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [companyId, page, size, searchOption]);

    return (
        <div>
            {products.map(product => (
                <InventoryListItem
                    key={product.productId}
                    product={product}
                />
            ))}
        </div>
    );
};

export default InventoryList;
