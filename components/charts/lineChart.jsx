import React from "react";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar los elementos específicos para el gráfico de líneas
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Ejemplo mensual',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo para el área bajo la línea
            borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
            borderWidth: 2, 
            fill: true, 
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    backgroundColor: 'black' // Color de fondo para las etiquetas de la leyenda
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ width: '1200px', height: '800px' }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;