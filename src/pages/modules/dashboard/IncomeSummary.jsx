import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomeStats, setIncomeFilters } from '../../../redux/slices/dashboardSlice';
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
  const dispatch = useDispatch();
  
  // Pull data and filter state from Redux
  const { incomeData, selectedMonth, selectedYear, chartLoading } = useSelector((state) => state.dashboard);

  // Fetch chart data whenever filters change
  useEffect(() => {
    dispatch(fetchIncomeStats({ month: selectedMonth, year: selectedYear }));
  }, [selectedMonth, selectedYear, dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setIncomeFilters({ [name]: value }));
  };

  const data = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Income',
        // Fallback to zeros if data is not yet loaded
        data: incomeData?.length > 0 ? incomeData : new Array(31).fill(0),
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
          pointStyle: 'line',
          color: '#606060',
          font: { family: "'Inter', sans-serif", size: 12 },
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
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#606060',
          font: { size: 12, family: "'Inter', sans-serif" },
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
          font: { size: 12, family: "'Inter', sans-serif" },
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
            name="year"
            value={selectedYear}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white cursor-pointer"
          >
            {["2023", "2024", "2025", "2026"].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          {/* Month Dropdown */}
          <select
            name="month"
            value={selectedMonth}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 appearance-none bg-white cursor-pointer"
          >
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white flex-grow rounded-lg p-4 relative">
        {/* Loading Overlay */}
        {chartLoading && (
           <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10 rounded-lg">
             <div className="w-8 h-8 border-4 border-[#8979FF] border-t-transparent rounded-full animate-spin"></div>
           </div>
        )}
        <div className="h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default IncomeSummary;