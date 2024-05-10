import React, { useState, useEffect } from "react";
import UserTable from "../components/userTable";
import { Sidebar } from "../components/sidebar";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import ProductAPI, { Product } from "../apis/product";
import ProductTable from "../components/productTable";

export default function Products() {
  const [productsData, setProductsData] = useState<Product[] | null>(null);
  const [newProductData, setNewProductData] = useState<Product | null>({
    product_id: 0,
    product_name: "",
    product_description: "",
    product_price: 0,
    category_id: 0,
  });
  //const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [tableUpdate, setTableUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const product = new ProductAPI();

  const handleSubmit = () => {
    product.addProduct(newProductData!).then(() => handleOpen());
  };

  const handleForceUpdate = () => {
    setTableUpdate((prev) => !prev); // Toggle the state to force re-render
  };

  useEffect(() => {
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
        {/* Sidebar on left */}
        <div className="w-1/5 min-w-64">
          <Sidebar />
        </div>
        {/* Table in a card on right */}
        <div className="w-4/5 p-4 relative overflow-x-auto overflow-y-auto">
          <div className="bg-white h-full p-4 shadow-md rounded-xl ">
            <p className="text-3xl font-bold ">Products</p>
            <div className="flex justify-center items-center">
              {productsData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">
                      Number of product: {productsData.length}
                    </p>
                    <button
                      className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleOpen}
                    >
                      Add Product
                    </button>
                  </div>
                  <ProductTable
                    productsData={productsData}
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
              <Card className="mx-auto w-full overflow-scroll">
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

                  <Input
                    label="Category"
                    size="lg"
                    value={newProductData?.category_id || ""}
                    onChange={(e) =>
                      setNewProductData((prevProductData) => ({
                        ...prevProductData!,
                        category_id: parseInt(e.target.value),
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
