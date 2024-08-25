// src/components/gestionnaireCommercial/ChartComponent.js
import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, PointElement, ArcElement);

const ChartComponent = ({ type }) => {
  // Exemple de données pour les graphiques
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Ventes',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: type === 'line',
        backgroundColor: type === 'line' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      default:
        return <Line data={data} options={options} />;
    }
  };

  return <div className="chart">{renderChart()}</div>;
};

export default ChartComponent;
