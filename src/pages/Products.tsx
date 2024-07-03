import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import ProductAPI, { Product } from "../apis/product";
import ProductTable from "../components/productTable";
import ProductCategoryAPI, { ProductCategory } from "../apis/product_category";

export default function Products() {
  const [productCategoriesData, setProductCategoriesData] = useState<
    ProductCategory[] | null
  >(null);
  const [productsData, setProductsData] = useState<Product[] | null>(null);
  const [newProductData, setNewProductData] = useState<Product | null>({
    product_id: 0,
    product_name: "",
    product_description: "",
    image_id: "",
    product_price: 0,
    category_id: 0,
    category_name: "",
  });
  const [tableUpdate, setTableUpdate] = useState(false);
  const [value, setValue] = useState<string>("1");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const productCategory = new ProductCategoryAPI();
  const product = new ProductAPI();

  const handleSubmit = () => {
    product.addProduct(newProductData!).then(() => {
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
        setProductCategoriesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    product
      .productList()
      .then((response) => {
        setProductsData(response.data);
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
            <p className="text-3xl font-bold ">Products</p>
            <div className="flex justify-center items-center">
              {productsData && productCategoriesData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">
                      Number of product: {productsData.length}
                    </p>

                    <button
                      className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleOpen}
                    >
                      Add
                    </button>
                  </div>
                  <ProductTable
                    productsData={productsData}
                    productCategoriesData={productCategoriesData}
                    tableUpdate={handleForceUpdate}
                  />
                </div>
              )}
            </div>

            {/* Dialog for Add Product */}
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
                    value={newProductData?.product_name || ""}
                    onChange={(e) =>
                      setNewProductData((prevProductData) => ({
                        ...prevProductData!,
                        product_name: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Product Description"
                    size="lg"
                    value={newProductData?.product_description || ""}
                    onChange={(e) =>
                      setNewProductData((prevProductData) => ({
                        ...prevProductData!,
                        product_description: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Price"
                    type="number"
                    size="lg"
                    value={newProductData?.product_price || 0}
                    onChange={(e) =>
                      setNewProductData((prevProductData) => ({
                        ...prevProductData!,
                        product_price: parseFloat(e.target.value),
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Select
                    label="Category"
                    value={value}
                    onChange={(val) => {
                      setValue(val!);
                      setNewProductData((prevProductData) => ({
                        ...prevProductData!,
                        category_id: parseInt(val!),
                      }));
                    }}
                  >
                    {productCategoriesData?.map((productCategory) => (
                      <Option value={productCategory.category_id.toString()}>
                        {productCategory.category_name}
                      </Option>
                    ))}
                  </Select>
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
