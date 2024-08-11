// ChartComponent.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
    if (!data) return null;

    const chartData = {
        labels: data.map(item => item.incomingDate),
        datasets: [
            {
                label: '매출',
                data: data.map(item => item.incomingPrice),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw}원`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '날짜'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '매출'
                }
            }
        }
    };

    return (
        <div className="p-4 mt-4">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Chart;
