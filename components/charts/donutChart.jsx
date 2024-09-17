import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ labels, data, backgroundColors, borderColors, title }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 13,
                    },
                },
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default DonutChart;