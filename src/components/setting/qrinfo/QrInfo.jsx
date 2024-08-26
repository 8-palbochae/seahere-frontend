import React, { useState, useEffect } from "react";
import SearchInputFilter from "../../common/SearchInputFilter";
import QrList from "./QrList";
import { getProductList } from "../../../api/incoming/incomingApi";
import { sendSelectedQR } from "../../../api/qr/qrApi";

const QrInfo = () => {
	const [checkedItems, setCheckedItems] = useState({});
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [isMainModalOpen, setIsMainModalOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getProductList("incoming");
				setProducts(response);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const handleCheckedChange = (productId, isChecked) => {
		setCheckedItems(prevState => {
			const newCheckedItems = { ...prevState };
			if (isChecked) {
				newCheckedItems[productId] = true;
			} else {
				delete newCheckedItems[productId];
			}
			return newCheckedItems;
		});
	};

	const handleSelectAll = (newCheckedItems) => {
		setCheckedItems(newCheckedItems);
	};

	useEffect(() => {
		const selected = products.filter(product => checkedItems[product.productId]);
		setSelectedProducts(selected);
	}, [checkedItems, products]);

	const handleMainModalOpen = () => {
		setIsMainModalOpen(true);
	};

	const handleMainModalClose = () => {
		setIsMainModalOpen(false);
	};

	const handleSendSelectedQR = async () => {
		const productIds = selectedProducts.map(product => product.productId);
		try {
			await sendSelectedQR(productIds);
		} catch (error) {
			console.error("다운로드 중 오류 발생:", error);
		}
		setIsMainModalOpen(false);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<div>
				<SearchInputFilter
					products={products}
					checkedItems={checkedItems}
					onCheckedChange={handleCheckedChange}
					selectedProducts={selectedProducts}
					onProductSelect={setSelectedProducts}
					onModalOpen={handleMainModalOpen}
				/>
			</div>
			<div>
				<QrList
					products={products}
					checkedItems={checkedItems}
					onCheckedChange={handleCheckedChange}
					onSelectAll={handleSelectAll}
					isMainModalOpen={isMainModalOpen}
					onModalClose={handleMainModalClose}
					onModalOpen={handleMainModalOpen}
					selectedProducts={selectedProducts}
					handleSendSelectedQR={handleSendSelectedQR}
				/>
			</div>
		</>
	);
};

export default QrInfo;
