import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
    if (!data) return null;

    const chartData = {
        labels: data.map(item => {
            const [year, month, day] = item.incomingDate.split('-');
            return `${month}-${day}`; 
        }),
        datasets: [
            {
                label: '입고액',
                data: data.map(item => item.incomingPrice),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
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
        <div className="p-4 mt-4" style={{ height: '250px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;
