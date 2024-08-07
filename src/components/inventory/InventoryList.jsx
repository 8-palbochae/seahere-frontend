import React, { useEffect, useState, useCallback } from 'react';
import InventoryListItem from './InventoryListItem';
import { useInView } from 'react-intersection-observer';
import { getInventoryList } from '../../api/inventory/inventoryApi';

const InventoryList = ({ size, searchOption }) => {
    const [products, setProducts] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currentSearchOption, setCurrentSearchOption] = useState(searchOption);

    const { ref, inView } = useInView();

    const fetchData = useCallback(async (page, searchOpt) => {
        setLoading(true);
        try {
            const newProducts = await getInventoryList(page, size, searchOpt);
            setProducts(prevProducts => page === 0 ? newProducts : [...prevProducts, ...newProducts]);
            setHasMore(newProducts.length > 0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    }, [size]);

    useEffect(() => {
        fetchData(0, searchOption);
    }, [fetchData, searchOption]);

    useEffect(() => {
        if (pageNum > 0) {
            fetchData(pageNum, currentSearchOption);
        }
    }, [pageNum, fetchData, currentSearchOption]);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPageNum(prevPageNum => prevPageNum + 1);
        }
    }, [inView, hasMore, loading]);

    return (
        <div className="h-full overflow-y-auto">
            {products.map((product, index) => (
                <InventoryListItem
                    key={`${product.productId}-${index}`}
                    product={product}
                />
            ))}
            {loading && <p>Loading...</p>}
            <div ref={ref} style={{ height: '20px' }}></div>
        </div>
    );
};

export default InventoryList;
