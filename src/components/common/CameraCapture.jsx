import React, { useState, useRef, useEffect } from 'react';
import cancel from '../../assets/common/cancel.svg';
import CameraCaptureIcon from '../../assets/common/camera-capture.svg';

const CameraCapture = ({ onCapture, onCancel }) => {
    const videoRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    useEffect(() => {
        const openCamera = async () => {
            setIsCameraOpen(true);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        openCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                let tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                onCapture(blob);
            }, 'image/jpeg');
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1000 }}>
            {isCameraOpen && (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}
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
                <p style={{ marginBottom: '10px' }}>사업자 등록 번호를 찍어주세요</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button onClick={onCancel} style={{ border: 'none', background: 'none' }}>
                        <img src={cancel} alt="Cancel" />
                        <p>취소</p>
                    </button>
                    <button onClick={handleCapture} style={{ border: 'none', background: 'none' }}>
                        <img src={CameraCaptureIcon} alt="Capture" />
                    </button>
                    <button onClick={onCancel} style={{ border: 'none', background: 'none' }}>
                        <p>직접 입력</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraCapture;
