"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GraphicsProps {
  data: {
    name: string;
    uv: number | null;
    pv: number | null;
  }[];
}

export function Graphics({ data }: GraphicsProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height={200}
      className="p-4 rounded-3xl bg-white bg-opacity-75 backdrop-blur-sm "
    >
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#1e293b"
          activeDot={{ r: 8 }}
          name="Бесплатное"
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#3b82f6"
          name="С продвижением"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
