import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  DocumentCheckIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import ProductCategoryAPI, { ProductCategory } from "../apis/product_category";

const TABLE_HEAD = ["ID", "Category Name", "Sort", "Action"];

interface ProductCategoryTableComponentProps {
  productCategoriesData: ProductCategory[];
  tableUpdate: () => void; // Define tableUpdate as a function prop that takes no arguments and returns void
}

export default function ProductCategoryTable(
  props: ProductCategoryTableComponentProps
) {
  const [editableCategoryId, setEditableCategoryId] = useState<number | null>(
    null
  );

  const [editableProductCategoryData, setEditableProductCategoryData] =
    useState<ProductCategory | null>(null);

  const productCategory = new ProductCategoryAPI();

  const handleEditClick = (productCategoryData: ProductCategory) => {
    setEditableCategoryId(productCategoryData.category_id);
    setEditableProductCategoryData(productCategoryData);
  };

  const handleSaveClick = () => {
    productCategory.updateProductCategory(editableProductCategoryData!);
    setEditableCategoryId(null);
    handleChildChange();
  };

  const handleDeleteClick = (category_id: number) => {
    productCategory.deleteProductCategory(category_id);
    handleChildChange();
  };

  // Perform actions that require re-render in the parent
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
          {props.productCategoriesData.map((category, index) => {
            const isLast = index === props.productCategoriesData.length - 1;
            const classes = isLast
              ? "h-20"
              : "h-20 border-b border-blue-gray-50";

            return (
              <tr key={category.category_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {category.category_id}
                  </Typography>
                </td>
                <td className={classes}>
                  {editableCategoryId === category.category_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableProductCategoryData!.category_name}
                      onChange={(e) => {
                        setEditableProductCategoryData((prevCategoryData) => ({
                          ...prevCategoryData!,
                          category_name: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {category.category_name}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableCategoryId === category.category_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="number"
                      min="0"
                      value={
                        editableProductCategoryData!.category_sort
                          ? editableProductCategoryData!.category_sort
                          : 0
                      }
                      onChange={(e) => {
                        setEditableProductCategoryData((prevCategoryData) => ({
                          ...prevCategoryData!,
                          category_sort: parseInt(e.target.value),
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {category.category_sort}
                    </Typography>
                  )}
                </td>
                <td className={`${classes} bg-blue-gray-50/50 `}>
                  <div className="flex justify-center items-center space-x-2">
                    {editableCategoryId === category.category_id ? (
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
                        onClick={() => handleEditClick(category)}
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
                      onClick={() => handleDeleteClick(category.category_id)}
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
