"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { AdminOrderControllerService, FinancialReportControllerService, OrderDTO } from "@/gen";
import { logger } from "@/util/logger";
import { UNIT } from "@/config/app-config";
import AdminMainCard from "@/app/components/card/admin-card";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
}
const EMPTY_CHART_VALUE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center border-">
    <div
      className={`w-20 h-20 rounded-full flex items-center justify-center mr-6 ${bgColor}`}
    >{icon}
    </div>
    <div>
      <div className="text-gray-600 text-2xl">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  </div>
);

const SalesChart: React.FC<{ year: number }> = ({ year }) => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<{
    revenue: number[];
    profit: number[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Gọi hai API để lấy dữ liệu doanh thu và lợi nhuận
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const revenueData = await FinancialReportControllerService.geFinancialReport(year)
        const profitData = await AdminOrderControllerService.getMonthlyRevenueInYear(year);
        // Chia dữ liệu cho 1 triệu để hiển thị dạng triệu VNĐ
        const formattedRevenue = revenueData.map(
          (value: number) => value / UNIT,
        );
        const formattedProfit = profitData.map(
          (value: number) => value / UNIT,
        );
        setChartData({
          revenue:
            formattedRevenue.length === 12
              ? formattedRevenue
              : EMPTY_CHART_VALUE,
          profit:
            formattedProfit.length === 12
              ? formattedProfit
              : EMPTY_CHART_VALUE,
        });
      } catch (error) {
        logger.error("Error fetching data:", error);
        // Hiển thị tất cả giá trị bằng 0 nếu API thất bại
        setChartData({
          revenue: EMPTY_CHART_VALUE,
          profit: EMPTY_CHART_VALUE,
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
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
              "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12",
            ],
            datasets: [
              {
                label: "Doanh thu",
                data: chartData.revenue,
                backgroundColor: "#f87171",
              },
              {
                label: "Lợi nhuận",
                data: chartData.profit,
                backgroundColor: "#fbbf24",
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
                  text: "Triệu VNĐ",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Tháng",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
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

  const [stats, setStats] = useState<OrderDTO>({} as OrderDTO);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);

  const years = [
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
  ];

  // Dữ liệu mẫu cho các chỉ số theo năm
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const resp = await AdminOrderControllerService.getYearlyOrder(selectedYear);
        setStats(resp)
      } catch (error) {
        logger.error(error);

      }
      setStatsLoading(false)

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
    <AdminMainCard title="Thống kê" goBack={false}>
      <div className="grid grid-cols-3 gap-8 mb-4">
        <StatCard
          title="Tổng đơn"
          value={String(stats.totalOrders || "??")}
          icon="📦"
          bgColor="bg-[#FFD700]/30"
        />
        <StatCard
          title="Đã giao hoàn thành"
          value={String(stats.finishOrders || "??")}
          icon="🚚"
          bgColor="bg-[#FFD700]/30"
        />
        <StatCard
          title="Đơn ở trạng thái khác"
          value={String(stats.otherOrders || "??")}
          icon="↩️"
          bgColor="bg-yellow-100"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-end items-center mb-4">
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

    </AdminMainCard>
    
  );
};

export default AdminDashboardPage;
