import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import InventoryListItem from './InventoryListItem';
import { useInView } from 'react-intersection-observer';

const InventoryList = ({ companyId, size, searchOption }) => {
    const [products, setProducts] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currentSearchOption, setCurrentSearchOption] = useState(searchOption);

    const { ref, inView } = useInView();

    const fetchData = useCallback(async (reset = false) => {
        setLoading(true);
        try {
            const url = `http://localhost:8080/inventories?companyId=${companyId}&page=${reset ? 0 : pageNum}&size=${size}&search=${reset ? searchOption : currentSearchOption}`;
            const response = await axios.get(url);
            const newProducts = response.data.content.content;

            setProducts(prevProducts => reset ? newProducts : [...prevProducts, ...newProducts]);
            setHasMore(newProducts.length > 0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    }, [companyId, pageNum, size, currentSearchOption, searchOption]);

    useEffect(() => {
        if (searchOption !== currentSearchOption) {
            setCurrentSearchOption(searchOption);
            setPageNum(0);
            setProducts([]);
            fetchData(true); // Reset data for new search
        } else if (pageNum === 0) {
            fetchData(true); // Initial fetch
        } else {
            fetchData(); // Fetch for pagination
        }
    }, [searchOption, currentSearchOption, fetchData, pageNum]);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPageNum(prevPageNum => prevPageNum + 1);
        }
    }, [inView, hasMore, loading]);

    return (
        <div>
            {products.map(product => (
                <InventoryListItem
                    key={product.productId}
                    product={product}
                />
            ))}
            {loading && <p>Loading...</p>}
            <div ref={ref} style={{ height: '20px' }}></div>
        </div>
    );
};

export default InventoryList;
