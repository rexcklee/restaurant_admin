import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import type { TableColumnsType, TableProps } from "antd";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import { format } from "date-fns";
import moment from "moment";

import OrderAPI, { Order, OrderItem } from "../apis/order";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Order;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode;

  if (inputType === "number") {
    inputNode = <InputNumber />;
  } else if (dataIndex === "order_status") {
    inputNode = (
      <Select
        options={[
          { value: "pending", label: "pending" },
          { value: "finish", label: "finish" },
        ]}
      />
    );
  } else if (dataIndex === "payment_status") {
    inputNode = (
      <Select
        options={[
          { value: "pending", label: "pending" },
          { value: "completed", label: "completed" },
        ]}
      />
    );
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          //   rules={[
          //     {
          //       required: true,
          //       message: `Please Input ${title}!`,
          //     },
          //   ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function Orders() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [ordersData, setOrdersData] = useState<Order[] | null>(null);

  const [orderItemsData, setOrderItemsData] = useState<OrderItem[] | null>(
    null
  );

  const order = new OrderAPI();

  useEffect(() => {
    order
      .orderList()
      .then((response) => {
        if (response.code === 403) {
          setToken(null);
          navigate("/", { replace: true });
        }
        const updatedData = response.data.map((item: Order, index: number) => ({
          ...item,
          key: index.toString(),
        }));
        setOrdersData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });

    order
      .orderItemsList()
      .then((response) => {
        setOrderItemsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      title: "Order#",
      dataIndex: "order_number",
      key: "order_number",
      editable: false,
    },
    {
      title: "Customer",
      dataIndex: "first_name",
      key: "first_name",
      editable: false,
    },
    {
      title: "Date",
      dataIndex: "order_date",
      key: "order_date",
      editable: false,
      sorter: (a: any, b: any) =>
        moment(a.order_date).unix() - moment(b.order_date).unix(),
      render: (text: string) => format(new Date(text), "dd-MM-yyyy HH:mm"),
    },
    { title: "Amount", dataIndex: "total_amount", key: "total_amount" },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      editable: true,
    },
    {
      title: "Mobile",
      dataIndex: "phone_number",
      key: "phone_number",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "shipping_address",
      key: "shipping_address",
      editable: true,
    },
    {
      title: "Payment",
      dataIndex: "payment_status",
      key: "payment_status",
      editable: true,
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_: any, record: Order) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex">
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              <CheckCircleIcon className="h-5 w-5 text-green-300" />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>
                <XCircleIcon className="h-5 w-5 text-red-300" />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const expandedRowRender = (record: Order) => {
    const columns: TableColumnsType<OrderItem> = [
      { title: "Product#", dataIndex: "product_id", key: "product_id" },
      { title: "Product", dataIndex: "product_name", key: "product_name" },
      { title: "Qty.", dataIndex: "quantity", key: "quantity" },
      { title: "Unit Price", dataIndex: "unit_price", key: "unit_price" },
      { title: "Total Price", dataIndex: "total_price", key: "total_price" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={
          orderItemsData?.filter((item) => item.order_id === record.order_id)!
        }
        pagination={false}
      />
    );
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Order) => record.key === editingKey;

  const edit = (record: Partial<Order> & { key: React.Key }) => {
    form.setFieldsValue({
      order_status: "",
      shipping_address: "",
      payment_status: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Order;

      const newData = [...ordersData!];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];

        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        order
          .updateOrder(newData[index])
          .then(() => setOrdersData(newData))
          .catch((err) => console.log(err));

        setEditingKey("");
      } else {
        newData.push(row);
        //setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Order) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,

        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div className="flex h-screen bg-blue-gray-50">
        <Sidebar />
        {/* Table in a card on right */}
        <div className="p-4 w-full relative overflow-x-auto overflow-y-auto">
          <div className="bg-white p-4 shadow-md rounded-xl ">
            <p className="text-3xl font-bold ">Orders</p>
            <div className="flex justify-center items-center">
              {ordersData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between mb-4">
                    <p className="text-xl">
                      Number of orders: {ordersData.length}
                    </p>
                  </div>
                  <Form form={form} component={false}>
                    <Table
                      components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                      bordered
                      dataSource={ordersData}
                      expandable={{
                        expandedRowRender,
                      }}
                      columns={mergedColumns}
                      rowClassName="editable-row"
                      pagination={{
                        onChange: cancel,
                      }}
                    />
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
