import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const FishChart = ({ data }) => {
    if (!data) return null;

    console.log("Chart Data:", data);

    const chartData = {
        labels: data.map(item => item.productName),        // 어종 이름
        datasets: [
            {
                data: data.map(item => item.price), // 어종별 판매량 데이터
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255, 0.2)',
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
                display:false,
            },
            datalabels: {
                color: '#000',
                display: true,
                formatter: (value, context) => {
                    return context.chart.data.labels[context.dataIndex];
                },
                font: {
                    weight: 'bold',
                    size: 14,
                },
                padding: 5,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderRadius: 3,
                align: 'center',
                anchor: 'center',
            },
        },
    };

    return (
        <div style={{ height: '230px' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default FishChart;
