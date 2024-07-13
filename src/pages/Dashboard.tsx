import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import SummaryAPI, { Summary } from "../apis/summary";

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState<Summary | null>(null);
  const summary = new SummaryAPI();

  useEffect(() => {
    summary
      .getSummary()
      .then((response) => {
        setSummaryData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex h-screen bg-blue-gray-50">
      <Sidebar />
      {/* Table in a card on right */}
      <div className="p-4 w-full relative overflow-x-auto overflow-y-auto">
        <div className="bg-white p-4 shadow-md rounded-xl ">
          <p className="text-3xl font-bold ">Dashboard</p>
          <p>Number of customers: {summaryData?.customer_number}</p>
          <p>Total Amount of orders: {summaryData?.order_amount_total}</p>
          <p>Month: {summaryData?.order_amount_in_a_year[0].month}</p>
          <p>Amount: {summaryData?.order_amount_in_a_year[0].total_amount}</p>
          <p>Total number of Orders: {summaryData?.order_number_total}</p>
          <p>Month: {summaryData?.order_number_in_a_year[0].month}</p>
          <p>Orders: {summaryData?.order_number_in_a_year[0].order_no}</p>
          <p>Top 5 products:</p>
          <p>{summaryData?.top5_products[0].product_name}</p>
          <p>{summaryData?.top5_products[1].product_name}</p>
          <p>{summaryData?.top5_products[2].product_name}</p>
          <p>{summaryData?.top5_products[3].product_name}</p>
          <p>{summaryData?.top5_products[4].product_name}</p>
        </div>
      </div>
    </div>
  );
}
