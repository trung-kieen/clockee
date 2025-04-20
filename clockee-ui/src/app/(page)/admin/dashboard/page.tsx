"use client";

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${bgColor}`}>
      {icon}
    </div>
    <div>
      <div className="text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

const SalesChart: React.FC<{ year: number }> = ({ year }) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<{ revenue: number[]; profit: number[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Gọi hai API để lấy dữ liệu doanh thu và lợi nhuận
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [revenueResponse, profitResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/financial-report/by-year?year=${year}`),
          fetch(`http://localhost:8080/api/revenue/by-year?year=${year}`),
        ]);

        if (!revenueResponse.ok || !profitResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const revenueData = await revenueResponse.json();
        const profitData = await profitResponse.json();

        // Chia dữ liệu cho 1 triệu để hiển thị dạng triệu VNĐ
        const formattedRevenue = revenueData.map((value: number) => value / 1000000);
        const formattedProfit = profitData.map((value: number) => value / 1000000);

        setChartData({
          revenue: formattedRevenue.length === 12 ? formattedRevenue : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          profit: formattedProfit.length === 12 ? formattedProfit : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Hiển thị tất cả giá trị bằng 0 nếu API thất bại
        setChartData({
          revenue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          profit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]); // Gọi lại khi năm thay đổi

  // Vẽ biểu đồ khi có dữ liệu
  useEffect(() => {
    if (canvasRef.current && chartData) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Doanh thu',
                data: chartData.revenue,
                backgroundColor: '#f87171',
              },
              {
                label: 'Lợi nhuận',
                data: chartData.profit,
                backgroundColor: '#fbbf24',
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 400,
                title: {
                  display: true,
                  text: 'Triệu VNĐ',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Tháng',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]); // Cập nhật biểu đồ khi dữ liệu thay đổi

  if (loading) return <div className="text-center">Đang tải dữ liệu...</div>;

  return <canvas ref={canvasRef} className="w-full h-64" />;
};

const AdminDashboardPage: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
  const [selectedYear, setSelectedYear] = useState<number>(currentYear); // Mặc định là năm hiện tại
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [stats, setStats] = useState<{ totalOrders: number; delivered: number; returned: number }>({
    totalOrders: 0,
    delivered: 0,
    returned: 0,
  });
  const [statsLoading, setStatsLoading] = useState<boolean>(true);

  const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];

  // Dữ liệu mẫu cho các chỉ số theo năm
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/api/revenue/order-by-year?year=${selectedYear}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats({
          totalOrders: data.totalOrders || 0,
          delivered: data.finishOrders || 0,
          returned: data.otherOrders || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Đặt tất cả giá trị bằng 0 nếu API thất bại
        setStats({
          totalOrders: 0,
          delivered: 0,
          returned: 0,
        });
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [selectedYear]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-2xl font-bold">Dashboard</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Tổng đơn"
          value={stats.totalOrders.toString()}
          icon="📦"
          bgColor="bg-yellow-100"
        />
        <StatCard
          title="Đã giao hoàn thành"
          value={stats.delivered.toString()}
          icon="🚚"
          bgColor="bg-gray-100"
        />
        <StatCard
          title="Đơn ở trạng thái khác"
          value={stats.returned.toString()}
          icon="↩️"
          bgColor="bg-yellow-100"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">Báo cáo doanh thu và lợi nhuận theo tháng</div>
          <div className="relative">
            <div
              className="flex items-center border border-gray-300 rounded px-3 py-1 cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="mr-2">{selectedYear}</span>
              <span className="text-red-500">▼</span>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                {years.map((year) => (
                  <div
                    key={year}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <SalesChart year={selectedYear} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;