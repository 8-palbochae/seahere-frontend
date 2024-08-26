import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
    if (!data) return null;

    const chartData = {
        labels: data.map(item => {
            if (item.week !== undefined) {
                
                const [year, month, day] = item.commonDate.split('-');
                return `${month}-${day}`;
            } else {
               
                const month = item.month;
                return `${month}`;
            }
        }),
        datasets: [
            {

                data: data.map(item => item.commonPrice),
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
                display: false, 
            },
            tooltip: {
                
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw.toFixed(0)}원`;
                    },
                },
            },
            datalabels:{
                display:false,
            }
        },
        scales: {
            x: {
                
            },
            y: {
                suggestedMin: 0,
                ticks: {
                    stepSize: 100000,
                    callback: function(value) {
                        return `${(value / 10000).toFixed(0)}`; 
                    },
                },
            },
        },
    };

    return (
        <div style={{ height: '230px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;