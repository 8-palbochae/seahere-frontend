import React, { useState, useRef, useEffect } from 'react';
import cancel from '../../assets/common/cancel.svg';
import CameraCaptureIcon from '../../assets/common/camera-capture.svg';
import CameraSwitchIcon from '../../assets/common/camera-switch.svg';

const CameraCapture = ({ onCapture, onCancel }) => {
    const videoRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const requestMediaId = useRef(0);
    const [isFacingModeUser, setIsFacingModeUser] = useState(true);

    const playStream = () => {
        requestMediaId.current++;
        const myRequestMediaId = requestMediaId.current;

        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: isFacingModeUser ? 'user' : 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        }).then(stream => {
            if (myRequestMediaId !== requestMediaId.current) {
                stopStream(stream);
            } else {
                mediaStreamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    console.log('Camera started');
                }
            }
        }).catch(error => {
            console.error('Error accessing camera:', error);
        });
    };

    const stopStream = (stream) => {
        if (stream) {
            stream.getTracks().forEach(track => {
                stream.removeTrack(track);
                track.stop();
            });
            console.log('Camera stopped');
        }
    };

    useEffect(() => {
        playStream();

        return () => {
            if (mediaStreamRef.current) {
                stopStream(mediaStreamRef.current);
            }
        };
    }, [isFacingModeUser]);

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                onCapture(blob);
                stopStream(mediaStreamRef.current);
            }, 'image/jpeg');
        }
    };

    const handleSwitchCamera = () => {
        setIsFacingModeUser(prevMode => !prevMode);
    };

    const handleCancel = () => {
        stopStream(mediaStreamRef.current);
        onCancel();
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1000 }}>
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
                <p style={{ marginBottom: '10px' }}>사업자 등록 번호를 찍어주세요!</p>
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
    );
};

export default CameraCapture;
