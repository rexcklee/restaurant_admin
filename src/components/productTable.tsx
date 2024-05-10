import { useState } from "react";
import AdminUserAPI, { AdminUser } from "../apis/user";
import { Card, Checkbox, Typography } from "@material-tailwind/react";
import {
  DocumentCheckIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import ProductAPI, { Product } from "../apis/product";

const TABLE_HEAD = [
  "ID",
  "Product Name",
  "Product Description",
  "Price",
  "Category",
  "Action",
];

interface ProductTableComponentProps {
  productsData: Product[];
  tableUpdate: () => void; // Define tableUpdate as a function prop that takes no arguments and returns void
}

export default function ProductTable(props: ProductTableComponentProps) {
  const [editableProductId, setEditableProductId] = useState<number | null>(
    null
  );
  const [editableProductData, setEditableProductData] =
    useState<Product | null>(null);

  const product = new ProductAPI();

  const handleEditClick = (productData: Product) => {
    setEditableProductId(productData.product_id);
    setEditableProductData(productData);
  };

  const handleSaveClick = () => {
    product.updateProduct(editableProductData!);
    setEditableProductId(null);
    handleChildChange();
    // Add logic to save the edited data
  };

  const handleDeleteClick = (product_id: number) => {
    product.deleteProduct(product_id);

    handleChildChange();
    // Add logic to save the edited data
  };

  const handleChildChange = () => {
    // Perform actions that require re-render in the parent
    props.tableUpdate(); // Call the function passed down from the parent
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
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                    <input
                      className="w-32 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={
                        editableProductData!.category_id
                          ? editableProductData!.category_id
                          : 0
                      }
                      onChange={(e) => {
                        setEditableProductData((prevProductData) => ({
                          ...prevProductData!,
                          category_id: parseInt(e.target.value),
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.category_id}
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
    </Card>
  );
}
