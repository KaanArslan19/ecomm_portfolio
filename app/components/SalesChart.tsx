"use client";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import formatPrice from "../utils/formatPrice";
interface Props {
  data: { day: string; sale: number }[];
}
export default function SalesChart({ data }: Props) {
  return (
    <LineChart
      width={600}
      height={400}
      data={data}
      id="test"
      margin={{ top: 20, left: 50 }}
    >
      <Line type="monotone" dataKey="sale" stroke="#03346E" />
      <XAxis dataKey="day" />
      <YAxis dataKey="sale" tickFormatter={(value) => formatPrice(value)} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Tooltip formatter={(value, name) => [formatPrice(+value), name]} />
    </LineChart>
  );
}
