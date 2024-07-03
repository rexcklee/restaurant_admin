import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import type { TableProps } from "antd";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Switch,
  Table,
  Typography,
  Select,
} from "antd";
import { format } from "date-fns";

import NewsAPI, { News } from "../apis/news";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
} from "@material-tailwind/react";
import GoogleAPI from "../apis/google";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

// Custom toolbar configuration
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: News;
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
  const { TextArea } = Input;

  if (inputType === "number") {
    inputNode = <InputNumber min="0" />;
  } else if (dataIndex === "isshow") {
    inputNode = <Switch size="small" />;
  } else if (dataIndex === "news_content") {
    //inputNode = <TextArea rows={4} />;
    inputNode = (
      <ReactQuill
        modules={modules}
        //formats={formats}
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

export default function Blog() {
  const [newsData, setNewsData] = useState<News[] | null>(null);

  const news = new NewsAPI();

  const handleSubmit = () => {
    news.createNews(newBlogData!).then(() => {
      handleOpenAddBlog();
    });
  };
  const [files, setFiles] = useState<FileList | null>(null);
  const [open, setOpen] = useState(false);
  const [openAddBlog, setOpenAddBlog] = useState(false);
  const handleOpenAddBlog = () => setOpenAddBlog((cur) => !cur);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const google = new GoogleAPI();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };
  const handleDeleteImage = (currentNews: News) => {
    google.deleteImage(currentNews.image_id).then((response) => {
      console.log(response.data);
      news.updateNewsImage({
        image_id: "",
        news_id: currentNews.news_id!,
      });
    });
  };
  const handleOpen = (news_id: number) => {
    setEditingNewsId(news_id);
    setOpen((cur) => !cur);
  };

  const [newBlogData, setNewBlogData] = useState<News>({
    key: "0",
    news_id: 0,
    news_title: "",
    news_content: "",
    image_id: "",
    create_date: null,
    isshow: false,
    sort: 0,
  });
  // const [count, setCount] = useState(0);
  // const handleAdd = () => {
  //   const newData: News = {
  //     key: count,
  //     news_id: 0,
  //     news_title: "",
  //     news_content: "",
  //     image_id: "",
  //     create_date: null,
  //     isshow: false,
  //     sort: 0,
  //   };
  //   setNewsData([...newsData!, newData]);
  //   setCount(count + 1);
  // };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!files) return;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    console.log(files);

    google.uploadImage(formData).then((response) => {
      console.log(response.data.image_id);

      news.updateNewsImage({
        image_id: response.data.image_id,
        news_id: editingNewsId!,
      });

      setOpen((cur) => !cur);
    });
  };
  useEffect(() => {
    news
      .newsList()
      .then((response) => {
        const updatedData = response.data.map((item: News, index: number) => ({
          ...item,
          key: index.toString(),
        }));
        setNewsData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "news_id",
      key: "news_id",
      editable: false,
    },
    {
      title: "Title",
      dataIndex: "news_title",
      key: "news_title",
      editable: true,
    },
    {
      title: "Content",
      dataIndex: "news_content",
      key: "news_content",
      editable: true,
      render: (news_content: string) => (
        <ReactQuill value={news_content} readOnly={true} theme={"bubble"} />
      ),
    },
    {
      title: "Image",
      dataIndex: "image_id",
      key: "image_id",
      editable: false,
      render: (image_id: string, record: News) =>
        image_id != "" ? (
          <div className="flex items-center">
            <img
              className="m-auto block"
              src={`https://drive.google.com/thumbnail?id=${image_id}&sz=w120`}
              alt="Network Image"
            />
            <Typography
              color="blue-gray"
              onClick={() => handleDeleteImage(record)}
            >
              <XCircleIcon className="h-5 w-5 text-red-500" />
            </Typography>
          </div>
        ) : (
          <button
            className="w-26 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => {
              handleOpen(record.news_id);
            }}
          >
            Add Image
          </button>
        ),
    },
    {
      title: "Date",
      dataIndex: "create_date",
      key: "create_date",
      editable: false,
      render: (text: string) => format(new Date(text), "dd-MM-yyyy HH:mm"),
    },
    {
      title: "Show",
      dataIndex: "isshow",
      key: "isshow",
      editable: true,
      render: (text: boolean) =>
        text === false ? (
          <XCircleIcon className="h-5 w-5 text-red-300" />
        ) : (
          <CheckCircleIcon className="h-5 w-5 text-green-300" />
        ),
    },
    {
      title: "Sort",
      dataIndex: "sort",
      key: "sort",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_: any, record: News) => {
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

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: News) => record.key === editingKey;

  const edit = (record: Partial<News> & { key: React.Key }) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as News;

      const newData = [...newsData!];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];

        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        news
          .updateNews(newData[index])
          .then(() => setNewsData(newData))
          .catch((err) => console.log(err));

        setEditingKey("");
      } else {
        newData.push(row);
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
      onCell: (record: News) => ({
        record,
        inputType: col.dataIndex === "sort" ? "number" : "text",
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
            <p className="text-3xl font-bold ">Blogs</p>
            <div className="flex justify-center items-center">
              {newsData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">Number of blog: {newsData.length}</p>
                    <button
                      className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleOpenAddBlog}
                    >
                      Add
                    </button>
                  </div>

                  {/* <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{ marginBottom: 16 }}
                  >
                    Add a row
                  </Button> */}
                  <Form form={form} component={false}>
                    <Table
                      components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                      bordered
                      dataSource={newsData}
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
      {/* Dialog for Upload Image */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography color="blue-gray">Upload Image</Typography>

            <form
              id="uploadForm"
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
            >
              <div className="flex items-center justify-center">
                <input
                  type="file"
                  name="file"
                  id="fileInput"
                  // multiple
                  onChange={handleFileChange}
                />
                <Button type="submit" disabled={!files}>
                  Upload
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Dialog>
      {/* Dialog for Add Blogs */}
      <Dialog
        size="xs"
        open={openAddBlog}
        handler={handleOpenAddBlog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-1">
            <Typography color="blue-gray">Add Blog</Typography>

            <Input
              placeholder="Title"
              size="large"
              value={newBlogData?.news_title || ""}
              onChange={(e) =>
                setNewBlogData((prevNewBlogData) => ({
                  ...prevNewBlogData!,
                  news_title: e.target.value,
                }))
              }
            />

            {/* <TextArea
              placeholder="Content"
              rows={4}
              size="large"
              value={newBlogData?.news_content || ""}
              onChange={(e) =>
                setNewBlogData((prevNewBlogData) => ({
                  ...prevNewBlogData!,
                  news_content: e.target.value,
                }))
              }
            /> */}
            <div className="h-72">
              <ReactQuill
                className="h-44"
                value={newBlogData?.news_content}
                onChange={(e) =>
                  setNewBlogData((prevNewBlogData) => ({
                    ...prevNewBlogData!,
                    news_content: e,
                  }))
                }
                modules={modules}
                //formats={formats}
              />
            </div>

            <Switch
              checkedChildren="Show"
              unCheckedChildren="Hide"
              onChange={(value) =>
                setNewBlogData((prevNewBlogData) => ({
                  ...prevNewBlogData!,
                  isshow: value,
                }))
              }
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              Add
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
