import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FishChart = ({ data }) => {
    if (!data) return null;

    const chartData = {
        labels: data.map(item => item.productName),
        datasets: [
            {
                data: data.map(item => item.price),
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    font: {
                        size: 14,
                    },
                    boxWidth: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const dataset = context.dataset;
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);
                        const value = context.raw.toLocaleString(); 
                        const percentage = ((context.raw / total) * 100).toFixed(2);

                        return `${context.label}: ${value} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                display: false,
            }
        },
    };

    return (
        <div style={{ height: '230px' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default FishChart;
