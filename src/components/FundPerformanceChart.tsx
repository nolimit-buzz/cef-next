"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

type ChartDataPoint = {
  period: string;
  nav: number;
  performance: number;
  dividend: number;
};

type PerformanceData = {
  '1Y': ChartDataPoint[];
  '3Y': ChartDataPoint[];
  '5Y': ChartDataPoint[];
};

// Sample dynamic data structure for backend/API use
// Note: This can easily be replaced by a fetch call to an API endpoint
// e.g., const { data } = await fetch('/api/fund/performance?timeframe=1Y')
const mockData: PerformanceData = {
  '1Y': [
    { period: 'Jan', nav: 102.5, performance: 2.5, dividend: 0 },
    { period: 'Feb', nav: 103.2, performance: 3.2, dividend: 0 },
    { period: 'Mar', nav: 104.8, performance: 4.8, dividend: 1.2 },
    { period: 'Apr', nav: 105.1, performance: 5.1, dividend: 0 },
    { period: 'May', nav: 106.5, performance: 6.5, dividend: 0 },
    { period: 'Jun', nav: 107.2, performance: 7.2, dividend: 1.5 },
    { period: 'Jul', nav: 108.9, performance: 8.9, dividend: 0 },
    { period: 'Aug', nav: 109.4, performance: 9.4, dividend: 0 },
    { period: 'Sep', nav: 110.1, performance: 10.1, dividend: 1.8 },
    { period: 'Oct', nav: 111.5, performance: 11.5, dividend: 0 },
    { period: 'Nov', nav: 112.8, performance: 12.8, dividend: 0 },
    { period: 'Dec', nav: 114.2, performance: 14.2, dividend: 2.1 },
  ],
  '3Y': [
    { period: 'Q1 21', nav: 95.0, performance: -5.0, dividend: 1.0 },
    { period: 'Q2 21', nav: 96.5, performance: -3.5, dividend: 1.1 },
    { period: 'Q3 21', nav: 98.2, performance: -1.8, dividend: 1.2 },
    { period: 'Q4 21', nav: 100.0, performance: 0.0, dividend: 1.5 },
    { period: 'Q1 22', nav: 101.5, performance: 1.5, dividend: 1.2 },
    { period: 'Q2 22', nav: 102.8, performance: 2.8, dividend: 1.4 },
    { period: 'Q3 22', nav: 104.1, performance: 4.1, dividend: 1.5 },
    { period: 'Q4 22', nav: 105.5, performance: 5.5, dividend: 1.8 },
    { period: 'Q1 23', nav: 107.2, performance: 7.2, dividend: 1.5 },
    { period: 'Q2 23', nav: 109.4, performance: 9.4, dividend: 1.8 },
    { period: 'Q3 23', nav: 111.8, performance: 11.8, dividend: 2.0 },
    { period: 'Q4 23', nav: 114.2, performance: 14.2, dividend: 2.1 },
  ],
  '5Y': [
    { period: '2019', nav: 85.0, performance: -15.0, dividend: 3.5 },
    { period: '2020', nav: 92.5, performance: -7.5, dividend: 4.2 },
    { period: '2021', nav: 100.0, performance: 0.0, dividend: 4.8 },
    { period: '2022', nav: 105.5, performance: 5.5, dividend: 5.9 },
    { period: '2023', nav: 114.2, performance: 14.2, dividend: 7.4 },
  ]
};

const makeCustomTooltip = (seriesPerformance: string) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-100 shadow-xl rounded-lg p-4 min-w-[200px]">
          <p className="text-sm font-bold text-[#0A1224] mb-3 border-b border-gray-100 pb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center py-1 gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-gray-600 font-medium">{entry.name}</span>
              </div>
              <span className="text-xs font-bold text-[#0A1224]">
                {entry.name === seriesPerformance ? `${entry.value}%` : `₦${entry.value}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  return CustomTooltip;
};

interface FundPerformanceChartProps {
  chartTitle?: string;
  chartSubtitle?: string;
  seriesNav?: string;
  seriesPerformance?: string;
  seriesDividend?: string;
}

export const FundPerformanceChart = ({
  chartTitle = "Historical Performance",
  chartSubtitle = "NAV growth, fund performance, and dividend distribution.",
  seriesNav = "NAV Growth",
  seriesPerformance = "Fund Performance",
  seriesDividend = "Dividend Distribution",
}: FundPerformanceChartProps = {}) => {
  const [timeframe, setTimeframe] = useState<'1Y' | '3Y' | '5Y'>('1Y');
  const data = mockData[timeframe];
  const CustomTooltip = makeCustomTooltip(seriesPerformance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm"
    >
      {/* Header & Toggles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h3 className="text-2xl font-medium text-[#0A1224] mb-2">{chartTitle}</h3>
          <p className="text-sm text-gray-500">{chartSubtitle}</p>
        </div>
        
        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
          {(['1Y', '3Y', '5Y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                timeframe === tf 
                  ? 'bg-white text-[#0A1224] shadow-sm border border-gray-200/50' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <defs>
              <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A1224" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0A1224" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="period" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `₦${value}`}
              dx={-10}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              dx={10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: '#4b5563', paddingBottom: '20px' }}
            />
            
            <Bar
              yAxisId="left"
              dataKey="dividend"
              name={seriesDividend}
              fill="#bfdbfe"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="nav"
              name={seriesNav}
              stroke="#0A1224"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorNav)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="performance"
              name={seriesPerformance}
              stroke="var(--color-accent-green)" 
              strokeWidth={3}
              dot={{ r: 4, fill: 'white', stroke: 'var(--color-accent-green)', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: 'var(--color-accent-green)', stroke: 'white', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
