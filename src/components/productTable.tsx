import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  DocumentCheckIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import ProductAPI, { Product } from "../apis/product";
import GoogleAPI from "../apis/google";
import { ProductCategory } from "../apis/product_category";

const TABLE_HEAD = [
  "ID",
  "Product Name",
  "Product Image",
  "Product Description",
  "Price",
  "Category",
  "Action",
];

interface ProductTableComponentProps {
  productsData: Product[];
  productCategoriesData: ProductCategory[];
  tableUpdate: () => void; // Define tableUpdate as a function prop that takes no arguments and returns void
}

export default function ProductTable(props: ProductTableComponentProps) {
  const [editableProductId, setEditableProductId] = useState<number | null>(
    null
  );

  const [editableProductData, setEditableProductData] =
    useState<Product | null>(null);

  const product = new ProductAPI();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const google = new GoogleAPI();
  const handleOpen = (productData: Product) => {
    setEditableProductData(productData);
    setOpen((cur) => !cur);
  };

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
      console.log(editableProductData);
      product.updateProductImage({
        image_id: response.data.image_id,
        product_id: editableProductData?.product_id!,
      });
      handleChildChange();
      setOpen((cur) => !cur);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleEditClick = (productData: Product) => {
    setEditableProductId(productData.product_id);
    setEditableProductData(productData);
  };

  const handleSaveClick = () => {
    product.updateProduct(editableProductData!);
    setEditableProductId(null);
    handleChildChange();
  };

  const handleDeleteClick = (product_id: number) => {
    product.deleteProduct(product_id);
    handleChildChange();
  };

  const handleDeleteImage = (currentProduct: Product) => {
    google.deleteImage(currentProduct.image_id).then((response) => {
      console.log(response.data);
      product.updateProductImage({
        image_id: "",
        product_id: currentProduct.product_id!,
      });
      handleChildChange();
    });
  };

  const handleChildChange = () => {
    props.tableUpdate();
  };

  return (
    <Card className="overflow-x-auto w-full mt-4 mb-4">
      <table className="text-center table-auto w-full">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.productsData.map((product, index) => {
            const isLast = index === props.productsData.length - 1;
            const classes = isLast
              ? "h-20"
              : "h-20 border-b border-blue-gray-50";
            return (
              <tr key={product.product_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.product_id}
                  </Typography>
                </td>
                <td className={classes}>
                  {editableProductId === product.product_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableProductData!.product_name}
                      onChange={(e) => {
                        setEditableProductData((prevProductData) => ({
                          ...prevProductData!,
                          product_name: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.product_name}
                    </Typography>
                  )}
                </td>

                <td className="text-center">
                  {product.image_id != "" ? (
                    <div className="flex items-center">
                      <img
                        className="m-auto block"
                        src={`https://drive.google.com/thumbnail?id=${product.image_id}&sz=w120`}
                        alt="Network Image"
                      />
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        onClick={() => handleDeleteImage(product)}
                      >
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      </Typography>
                    </div>
                  ) : (
                    <button
                      className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={() => handleOpen(product)}
                    >
                      Add Image
                    </button>
                  )}
                </td>
                <td className={classes}>
                  {editableProductId === product.product_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableProductData!.product_description}
                      onChange={(e) => {
                        setEditableProductData((prevProductData) => ({
                          ...prevProductData!,
                          product_description: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.product_description}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableProductId === product.product_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:border-blue-500"
                      type="text"
                      value={
                        editableProductData!.product_price
                          ? editableProductData!.product_price
                          : 0
                      }
                      onChange={(e) => {
                        setEditableProductData((prevProductData) => ({
                          ...prevProductData!,
                          product_price: parseFloat(e.target.value),
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.product_price}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableProductId === product.product_id ? (
                    <Select
                      label="Category"
                      value={
                        editableProductData!.category_id.toString()
                          ? editableProductData!.category_id.toString()
                          : "0"
                      }
                      onChange={(val) => {
                        //setValue(val!);
                        setEditableProductData((prevProductData) => ({
                          ...prevProductData!,
                          category_id: parseInt(val!),
                        }));
                      }}
                    >
                      {props.productCategoriesData?.map((productCategory) => (
                        <Option value={productCategory.category_id.toString()}>
                          {productCategory.category_name}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.category_name}
                    </Typography>
                  )}
                </td>

                <td
                  className={`${classes} bg-blue-gray-50/50 flex justify-center items-center`}
                >
                  <div className="flex space-x-2">
                    {editableProductId === product.product_id ? (
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        onClick={handleSaveClick}
                      >
                        <DocumentCheckIcon className="h-5 w-5 text-green-300" />
                      </Typography>
                    ) : (
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        onClick={() => handleEditClick(product)}
                      >
                        <PencilIcon className="h-5 w-5 text-blue-500" />
                      </Typography>
                    )}
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={() => handleDeleteClick(product.product_id)}
                    >
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </Typography>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Dialog for Upload Image */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Upload Image
            </Typography>

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
    </Card>
  );
}
