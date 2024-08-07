import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import ProductCategoryAPI, { ProductCategory } from "../apis/product_category";
import ProductCategoryTable from "../components/productCategoryTable";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

export default function ProductCategories() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [productCategoriesData, setProductCategoriesData] = useState<
    ProductCategory[] | null
  >(null);

  const [newProductCategoryData, setNewProductCategoryData] =
    useState<ProductCategory | null>({
      category_id: 0,
      category_name: "",
      category_sort: 0,
    });
  const [tableUpdate, setTableUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const productCategory = new ProductCategoryAPI();

  const handleSubmit = () => {
    productCategory.addProductCategory(newProductCategoryData!).then(() => {
      handleOpen();
    });
  };

  const handleForceUpdate = () => {
    setTableUpdate((prev) => !prev); // Toggle the state to force re-render
  };

  useEffect(() => {
    productCategory
      .productCategoryList()
      .then((response) => {
        if (response.code === 403) {
          setToken(null);
          navigate("/", { replace: true });
        }
        setProductCategoriesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [open, tableUpdate]);

  return (
    <>
      <div className="flex h-screen bg-blue-gray-50">
        <Sidebar />
        {/* Table in a card on right */}
        <div className="p-4 w-full relative overflow-x-auto overflow-y-auto">
          <div className="bg-white p-4 shadow-md rounded-xl ">
            <p className="text-3xl font-bold ">Product Categories</p>
            <div className="flex justify-center items-center">
              {productCategoriesData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">
                      Number of category: {productCategoriesData.length}
                    </p>

                    <button
                      className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleOpen}
                    >
                      Add
                    </button>
                  </div>
                  <ProductCategoryTable
                    productCategoriesData={productCategoriesData}
                    tableUpdate={handleForceUpdate}
                  />
                </div>
              )}
            </div>

            {/* Dialog for Add Category */}
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full ">
                <CardBody className="flex flex-col gap-4">
                  <Typography variant="h4" color="blue-gray">
                    Add Product
                  </Typography>

                  <Input
                    label="Product Name"
                    size="lg"
                    value={newProductCategoryData?.category_name || ""}
                    onChange={(e) =>
                      setNewProductCategoryData((prevCategoryData) => ({
                        ...prevCategoryData!,
                        category_name: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" onClick={handleSubmit} fullWidth>
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
