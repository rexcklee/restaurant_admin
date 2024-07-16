import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import SummaryAPI, { Summary } from "../apis/summary";
import { Line } from "@ant-design/charts";

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState<Summary | null>(null);
  const summary = new SummaryAPI();
  const [orderAmountConfig, setOrderAmountConfig] = useState<{
    data: OrderAmountInAYear[] | null;
    height: number;
    xField: string;
    yField: string;
    point: {
      shapeField: string;
      sizeField: number;
    };
    interaction: {
      tooltip: {
        marker: boolean;
      };
    };
    style: {
      lineWidth: number;
    };
  }>({
    data: null,
    height: 300,
    xField: "month",
    yField: "total_amount",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  });

  const [orderNumberConfig, setOrderNumberConfig] = useState<{
    data: OrderNumberInAYear[] | null;
    height: number;
    xField: string;
    yField: string;
    point: {
      shapeField: string;
      sizeField: number;
    };
    interaction: {
      tooltip: {
        marker: boolean;
      };
    };
    style: {
      lineWidth: number;
    };
  }>({
    data: null,
    height: 300,
    xField: "month",
    yField: "order_no",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  });

  interface OrderAmountInAYear {
    year: string;
    total_amount: number;
  }

  interface OrderNumberInAYear {
    year: string;
    order_no: number;
  }

  useEffect(() => {
    summary
      .getSummary()
      .then((response) => {
        setSummaryData(response.data);
        console.log(response.data.order_amount_in_a_year);
        setOrderAmountConfig((prevConfig) => ({
          ...prevConfig,
          data: response.data.order_amount_in_a_year,
        }));
        setOrderNumberConfig((prevConfig) => ({
          ...prevConfig,
          data: response.data.order_number_in_a_year,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex h-screen bg-blue-gray-50">
      <Sidebar />
      {/* Table in a card on right */}
      <div className="p-4 w-full relative overflow-x-auto overflow-y-auto">
        <div className="bg-white p-4 shadow-md rounded-xl ">
          <h1 className="text-3xl font-bold mb-4 text">Dashboard</h1>
          <div className="card p-4 border rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3 mb-3">
            <h2 className="text-xl font-semibold">Top 5 Products</h2>
            {summaryData?.top5_products &&
              summaryData.top5_products.length > 0 && (
                <ul className="list-none flex justify-around p-2">
                  {summaryData.top5_products.map((product, index) => (
                    <li key={index}>{product.product_name}</li>
                  ))}
                </ul>
              )}
          </div>
          <div className="grid md:grid-cols-2 grid-flow-row grid-cols-1 gap-4 w-full mb-3">
            <div className="card p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Customers</h2>
              <p>Number of customers: {summaryData?.customer_number}</p>
            </div>
            <div className="card p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Orders in total</h2>
              <p>Number of orders: {summaryData?.order_number_total}</p>
              <p>Amount of orders: {summaryData?.order_amount_total}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 grid-flow-row gap-4 w-full mb-3">
            <div className="card p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Number of Orders</h2>
              {orderNumberConfig.data && <Line {...orderNumberConfig} />}
              {summaryData?.order_number_in_a_year &&
                summaryData.order_number_in_a_year.length > 0 && (
                  <>
                    <p>
                      {"Number of orders of this month: "}
                      {
                        summaryData.order_number_in_a_year[
                          summaryData.order_number_in_a_year.length - 1
                        ].order_no
                      }
                    </p>
                  </>
                )}
            </div>
            <div className="card p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Order amount</h2>
              {orderAmountConfig.data && <Line {...orderAmountConfig} />}
              {summaryData?.order_amount_in_a_year &&
                summaryData.order_amount_in_a_year.length > 0 && (
                  <>
                    <p>
                      {"Order amount of this month: "}
                      {
                        summaryData.order_amount_in_a_year[
                          summaryData.order_amount_in_a_year.length - 1
                        ].total_amount
                      }
                    </p>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
