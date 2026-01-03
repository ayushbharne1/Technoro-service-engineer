
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const IncomeSummary = () => {
//   const data = {
//     labels: Array.from({ length: 31 }, (_, i) => i + 1),
//     datasets: [
//       {
//         label: 'Income',
//         data: [
//           8000, 7800, 6000, 8500, 8500, 7500, 8500, 6200, 5500, 7000, 9000, 8000, 4500, 5000, 2800,
//           8800, 3500, 10000, 8000, 3000, 4000, 2000, 9000, 7000, 4000, 0, 0, 0, 0, 0, 0,
//         ],
//         borderColor: '#8979FF',
//         borderWidth: 1.5,
//         fill: false,
//         tension: 0.4,
//         pointBackgroundColor: '#FFFFFF',
//         pointBorderColor: '#8979FF',
//         pointRadius: 4,
//         pointHoverRadius: 6,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         align: 'center',
//         labels: {
//           usePointStyle: true,
//           pointStyle: 'line', // line with circle
//           color: '#606060',
//           font: {
//             family: "'Inter', sans-serif",
//             size: 12,
//           },
//           padding: 20,
//           boxWidth: 20,
//           boxHeight: 8,
//           generateLabels: function (chart) {
//             const datasets = chart.data.datasets;
//             return datasets.map((dataset, i) => ({
//               text: dataset.label,
//               fillStyle: dataset.borderColor,
//               strokeStyle: dataset.borderColor,
//               lineWidth: 2,
//               hidden: !chart.isDatasetVisible(i),
//               datasetIndex: i,
//               pointStyle: 'line',
//             }));
//           },
//         },
//         onClick: (e, legendItem, legend) => {
//           const index = legendItem.datasetIndex;
//           const ci = legend.chart;
//           ci.setDatasetVisibility(index, !ci.isDatasetVisible(index));
//           ci.update();
//         },
//       },
//       title: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: {
//           color: '#606060',
//           font: {
//             size: 12,
//             family: "'Inter', sans-serif",
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: '#CACACA',
//           borderDash: [2, 4],
//           drawBorder: false,
//         },
//         ticks: {
//           color: '#606060',
//           font: {
//             size: 12,
//             family: "'Inter', sans-serif",
//           },
//           callback: (value) => (value >= 1000 ? `${value / 1000}k` : value),
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col gap-4 h-[350px]">
//       <div className="flex justify-between items-center">
//         <h3 className="font-semibold text-base text-[#263138]">Income Summary</h3>
//         <div className="flex items-center gap-2">
//           {/* Year Dropdown */}
//           <select
//             className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
//             defaultValue="2025"
//           >
//             <option value="2023">2023</option>
//             <option value="2024">2024</option>
//             <option value="2025">2025</option>
//             <option value="2026">2026</option>
//           </select>

//           {/* Month Dropdown */}
//           <select
//             className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
//             defaultValue="October"
//           >
//             <option value="January">January</option>
//             <option value="February">February</option>
//             <option value="March">March</option>
//             <option value="April">April</option>
//             <option value="May">May</option>
//             <option value="June">June</option>
//             <option value="July">July</option>
//             <option value="August">August</option>
//             <option value="September">September</option>
//             <option value="October">October</option>
//             <option value="November">November</option>
//             <option value="December">December</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white flex-grow rounded-lg p-4">
//         <div className="h-full">
//           <Line data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncomeSummary;

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IncomeSummary = () => {
  const data = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Income',
        data: [
          8000, 7800, 6000, 8500, 8500, 7500, 8500, 6200, 5500, 7000, 9000, 8000, 4500, 5000, 2800,
          8800, 3500, 10000, 8000, 3000, 4000, 2000, 9000, 7000, 4000, 0, 0, 0, 0, 0, 0,
        ],
        borderColor: '#8979FF',
        borderWidth: 1.5,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#8979FF',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          usePointStyle: true,
          pointStyle: 'line', // line with circle
          color: '#606060',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 20,
          boxWidth: 20,
          boxHeight: 8,
          generateLabels: function (chart) {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor,
              strokeStyle: dataset.borderColor,
              lineWidth: 2,
              hidden: !chart.isDatasetVisible(i),
              datasetIndex: i,
              pointStyle: 'line',
            }));
          },
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          ci.setDatasetVisibility(index, !ci.isDatasetVisible(index));
          ci.update();
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#606060',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: '#CACACA',
          borderDash: [2, 4],
          drawBorder: false,
        },
        ticks: {
          color: '#606060',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          callback: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },
      },
    },
  };

  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col gap-4 h-[350px]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-base text-[#263138]">Income Summary</h3>
        <div className="flex items-center gap-2">
          {/* Year Dropdown */}
          <select
            className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
            defaultValue="2025"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>

          {/* Month Dropdown */}
          <select
            className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white"
            defaultValue="October"
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>

      <div className="bg-white flex-grow rounded-lg p-4">
        <div className="h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default IncomeSummary;
