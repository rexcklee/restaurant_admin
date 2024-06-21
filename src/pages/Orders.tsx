import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";

import type { TableColumnsType, TableProps } from "antd";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { format } from "date-fns";

import OrderAPI, { Order, OrderItem } from "../apis/order";

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
  const [ordersData, setOrdersData] = useState<Order[] | null>(null);

  const [orderItemsData, setOrderItemsData] = useState<OrderItem[] | null>(
    null
  );

  const [orderColumnsData, setOrderColumnsData] = useState<string[] | null>(
    null
  );

  //const [tableUpdate, setTableUpdate] = useState(false);

  //const [open, setOpen] = useState(false);
  //const handleOpen = () => setOpen((cur) => !cur);

  const order = new OrderAPI();

  const handleSubmit = () => {
    // order.createOrder(newOrderData!).then(() => {
    //   handleOpen();
    // });
  };

  //   const handleForceUpdate = () => {
  //     setTableUpdate((prev) => !prev); // Toggle the state to force re-render
  //   };

  useEffect(() => {
    order
      .orderList()
      .then((response) => {
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
      .orderTableColumns()
      .then((response) => {
        setOrderColumnsData(response.data);
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
      title: "order_number",
      dataIndex: "order_number",
      key: "order_number",
      editable: false,
    },
    {
      title: "customer_id",
      dataIndex: "customer_id",
      key: "customer_id",
      editable: false,
    },
    {
      title: "order_date",
      dataIndex: "order_date",
      key: "order_date",
      editable: false,
      render: (text: string) => format(new Date(text), "dd-MM-yyyy HH:mm"),
    },
    { title: "total_amount", dataIndex: "total_amount", key: "total_amount" },
    {
      title: "order_status",
      dataIndex: "order_status",
      key: "order_status",
      editable: true,
    },
    {
      title: "phone_number",
      dataIndex: "phone_number",
      key: "phone_number",
      editable: true,
    },
    {
      title: "shipping_address",
      dataIndex: "shipping_address",
      key: "shipping_address",
      editable: true,
    },
    {
      title: "billing_address",
      dataIndex: "billing_address",
      key: "billing_address",
      editable: true,
    },
    {
      title: "payment_method",
      dataIndex: "payment_method",
      key: "payment_method",
      editable: true,
    },
    {
      title: "payment_status",
      dataIndex: "payment_status",
      key: "payment_status",
      editable: true,
    },
    {
      title: "comments",
      dataIndex: "comments",
      key: "comments",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Order) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
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
      { title: "Item ID", dataIndex: "order_item_id", key: "order_item_id" },
      //   { title: "order_number", dataIndex: "order_number", key: "order_number" },
      { title: "product_id", dataIndex: "product_id", key: "product_id" },
      { title: "product_name", dataIndex: "product_name", key: "product_name" },
      { title: "quantity", dataIndex: "quantity", key: "quantity" },
      { title: "unit_price", dataIndex: "unit_price", key: "unit_price" },
      { title: "total_price", dataIndex: "total_price", key: "total_price" },
      {
        title: "Action",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            {/* <Dropdown menu={{ items }}>
              <a>
                More
              </a>
            </Dropdown> */}
          </Space>
        ),
      },
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
  //const [data, setData] = useState(ordersData);
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
        {/* Sidebar on left */}
        <div className="w-1/5 min-w-64">
          <Sidebar />
        </div>
        {/* Table in a card on right */}
        <div className="w-4/5 p-4 relative overflow-x-auto overflow-y-auto">
          <div className="bg-white p-4 shadow-md rounded-xl ">
            <p className="text-3xl font-bold ">Orders</p>
            <div className="flex justify-center items-center">
              {ordersData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">
                      Number of orders: {ordersData.length}
                    </p>

                    {/* <button
                      className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleAdd}
                    >
                      Add
                    </button> */}
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
