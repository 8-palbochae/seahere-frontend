import React from 'react';
import { Chart, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const FishChart = ({ data }) => {
    if (!data) return null;

    const sortedData = [...data].sort((a,b)=>b.price-a.price);


     const top5Data = sortedData.slice(0, 5);
     const otherData = sortedData.slice(5);
 

     const otherTotal = otherData.reduce((acc, item) => acc + item.price, 0);
 

     const finalData = [
         ...top5Data,
         { productName: "기타", price: otherTotal }
     ];
 
    const chartData = {
        labels: finalData.map(item => item.productName),
        datasets: [
            {
                data: finalData.map(item => item.price),
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(201,203,207)' 
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(201,203,207,1)'
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
                formatter: (value, context) => {
                    const dataset = context.chart.data.datasets[0];
                    const total = dataset.data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
            
                    return `${percentage}%`;
                },
                color: '#fff', 
                font: {
                    weight: 'bold',
                    size: 14,
                },
                anchor: 'end',
                align: 'start',
                offset: 5,
                borderRadius: 3,
        
            
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
