import OrderModel from "@/app/models/orderModel";
import React from "react";
import dateFormat from "dateformat";
import SalesChart from "@/app/components/SalesChart";
import GridView from "@/app/components/ui/GridView";
import formatPrice from "@/app/utils/formatPrice";
import startDb from "@/app/lib/db";
const sevenDaysSalesHistory = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const dateList: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    dateList.push(date.toISOString().split("T")[0]);
  }
  console.log(dateList);
  await startDb();
  const last7DaysSales: { _id: string; totalAmount: number }[] =
    await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
  const sales = dateList.map((date) => {
    const matchedSale = last7DaysSales.find((sale) => sale._id === date);
    return {
      day: dateFormat(date, "ddd"),
      sale: matchedSale ? matchedSale.totalAmount : 0,
    };
  });
  const totalSales = last7DaysSales.reduce((prevValue, { totalAmount }) => {
    return (prevValue += totalAmount);
  }, 0);
  return { sales, totalSales };
};
export default async function Sales() {
  const salesData = await sevenDaysSalesHistory();
  console.log(salesData);
  return (
    <div>
      <GridView>
        <div className="bg-blue-500 p-4 rounded space-y-4">
          <h1 className="font-semibold text-3xl text-white">
            {formatPrice(salesData.totalSales)}
          </h1>
          <div className="text-white">
            <p>Total Sales</p>
            <p>Last 7 Days</p>
          </div>
        </div>
      </GridView>
      <div className="mt-10">
        <h1 className="font-semibold text-3xl mb-4">Last 7 days History</h1>
        <SalesChart data={salesData.sales} />
      </div>
    </div>
  );
}
