import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
    if (!data) return null;

    const chartData = {
        labels: data.map(item => item.incomingDate),
        datasets: [
            {
                label: '입고액',
                data: data.map(item => item.incomingPrice),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // 이 옵션을 추가하여 차트의 비율을 고정하지 않음
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw.toLocaleString()}원`;
                    },
                },
            },
        },
        scales: {
            x: {
                // 추가 설정이 필요하면 여기에서 설정합니다.
            },
            y: {
                suggestedMin: 0,
                ticks: {
                    stepSize: 10000,
                    callback: function(value) {
                        return `${value.toLocaleString()}원`;
                    },
                },
            },
        },
    };

    return (
        <div className="p-4 mt-4" style={{ height: '250px' }}> {/* height 값을 조정하여 차트의 높이를 키움 */}
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;
