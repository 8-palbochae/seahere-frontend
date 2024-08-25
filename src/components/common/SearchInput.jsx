import React, { useState, useEffect, useRef } from "react";
import { inventoryIcon } from "../../constants/inventory/inventory.image";
import { getProductList } from "../../api/incoming/incomingApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import QrScanner from 'qr-scanner';
import cancel from '../../assets/common/cancel.svg';
import CameraCaptureIcon from '../../assets/common/camera-capture.svg';
import CameraSwitchIcon from '../../assets/common/camera-switch.svg';

const SearchInput = ({value}) => {
	

	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const navigate = useNavigate();
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [isFacingModeUser, setIsFacingModeUser] = useState(true);
	const videoRef = useRef(null);


	
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["productList", query],
		queryFn: () => getProductList(query),
		enabled: query?.length > 0,
	});

	useEffect(() => {
		if (data && query.length > 0) {			
			setSuggestions(data);
		} else {
			setSuggestions([]);
		}
	}, [data, query]);

	if (isError) {
		console.error("Error fetching product list:", error);
	}


	const openCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: isFacingModeUser ? 'user' : 'environment',
					width: { ideal: 1280 },
					height: { ideal: 720 }
				}
			});
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		} catch (error) {
			console.error('Error accessing camera:', error);
		}
	};

	const extractQRCodeData = async (blob) => {
		return new Promise((resolve, reject) => {
			QrScanner.scanImage(blob, { returnDetailedScanResult: true })
				.then(result => resolve(result.data))
				.catch(err => reject(err));
		});
	};

	const handleScanClick = () => {
		setIsCameraOpen(true);
		openCamera();
	};

	const handleCapture = async () => {
		if (videoRef.current) {
			const canvas = document.createElement('canvas');
			canvas.width = videoRef.current.videoWidth;
			canvas.height = videoRef.current.videoHeight;
			const context = canvas.getContext('2d');
			context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(async (blob) => {
				try {
					const qrData = await extractQRCodeData(blob);
					const productData = JSON.parse(qrData);

					if (productData.productId) {
						navigate(`/incoming/${productData.productId}`);
					}
				} catch (error) {
					console.error("QR 코드를 처리하는 중 오류 발생:", error);
				} finally {
					setIsCameraOpen(false);
				}
			}, 'image/jpeg');
		}
	};



	const handleCancel = () => {
		setIsCameraOpen(false);
		if (videoRef.current && videoRef.current.srcObject) {
			let tracks = videoRef.current.srcObject.getTracks();
			tracks.forEach(track => track.stop());
		}
	};

	const handleSwitchCamera = () => {
		setIsFacingModeUser(prevMode => !prevMode);
		openCamera();
	};

	useEffect(() => {
		return () => {
			if (videoRef.current && videoRef.current.srcObject) {
				let tracks = videoRef.current.srcObject.getTracks();
				tracks.forEach(track => track.stop());
			}
		};
	}, []);


	return (
		<div>
			{isCameraOpen ? (
				<div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
					<video
						ref={videoRef}
						autoPlay
						playsInline
						style={{
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
					<div style={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						backgroundColor: 'white',
						borderTopLeftRadius: '20px',
						borderTopRightRadius: '20px',
						textAlign: 'center',
						padding: '20px',
						boxSizing: 'border-box',
						zIndex: 1,
					}}>
						<p style={{ marginBottom: '10px' }}>QR코드를 찍어주세요!</p>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
							<button onClick={handleCancel} style={{ border: 'none', background: 'none' }}>
								<img src={cancel} alt="Cancel" />
								<p>취소</p>
							</button>
							<button onClick={handleCapture} style={{ border: 'none', background: 'none' }}>
								<img src={CameraCaptureIcon} alt="Capture" />
							</button>
							<button onClick={handleCancel} style={{ border: 'none', background: 'none' }}>
								<p>직접 입력</p>
							</button>
						</div>
					</div>
					<button
						onClick={handleSwitchCamera}
						style={{
							position: 'absolute',
							bottom: '180px',
							left: '50%',
							transform: 'translateX(-50%)',
							border: 'none',
							background: 'none'
						}}>
						<img src={CameraSwitchIcon} alt="Switch Camera" style={{ width: '36px', height: '36px' }} />
					</button>
				</div>
			) : (
				<>
					<div className="flex h-11 bg-gray-100 justify-around items-center gap-3 m-2 rounded">
						<img
							className="w-8 object-cover ml-3 mr-2"
							src={inventoryIcon.searchIcon}
							alt=""
						/>
						<input
							className="w-4/5 h-8 p-2 bg-gray-200 rounded"
							type="text"
							placeholder="검색"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<img
							className="w-8 object-cover mr-3"
							src={inventoryIcon.scanIcon}
							alt=""
							onClick={handleScanClick}
						/>
					</div>
					{suggestions.length > 0 && query && (
						<div className="bg-white border border-gray-300 rounded mt-1">
							{suggestions.map((suggestion, index) => (
								<div
									key={index}
									className="p-2 cursor-pointer hover:bg-gray-200"
									onClick={() => {
										navigate(`/incoming/${suggestion.productId}`);
									}}
								>
									{suggestion.productName}
								</div>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default SearchInput;
