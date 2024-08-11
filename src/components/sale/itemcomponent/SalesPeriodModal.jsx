import React, { useState } from "react";
import './SalesPeriodModal.css'; // 모달에 대한 스타일을 별도의 CSS 파일로 관리

const SalesPeriodModal = ({ isOpen, onClose }) => {
    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-header">
                    <h3>조회기간</h3>
                </div>
                <div className="modal-body">
                    <div className="period-buttons">
                        <button className="period-button">1주일</button>
                        <button className="period-button">3개월</button>
                        <button className="period-button">6개월</button>
                    </div>
                    <div className="date-selector">
                        {/* 날짜를 선택하는 입력 필드 추가 */}
                        <input type="date" />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="submit-button">조회</button>
                </div>
            </div>
        </div>
    );
};

export default SalesPeriodModal;
