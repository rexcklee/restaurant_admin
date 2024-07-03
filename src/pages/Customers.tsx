import { useState, useEffect } from "react";
import CustomerAPI, { Customer } from "../apis/customer";
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
import CustomerTable from "../components/customerTable";

export default function Customers() {
  const [customersData, setCustomersData] = useState<Customer[] | null>(null);
  const [newCustomerData, setNewCustomerData] = useState<Customer | null>({
    customer_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    registration_date: null,
    last_login: null,
    payment_method: "",
  });

  const [tableUpdate, setTableUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const Customer = new CustomerAPI();

  const handleSubmit = () => {
    Customer.addCustomer(newCustomerData!).then(() => handleOpen());
  };

  const handleForceUpdate = () => {
    setTableUpdate((prev) => !prev); // Toggle the state to force re-render
  };

  useEffect(() => {
    Customer.customerList()
      .then((response) => {
        setCustomersData(response.data);
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
            <p className="text-3xl font-bold ">Customers</p>
            <div className="flex justify-center items-center">
              {customersData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">
                      Number of customer: {customersData.length}
                    </p>
                    <button
                      className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleOpen}
                    >
                      Add
                    </button>
                  </div>
                  <CustomerTable
                    customersData={customersData}
                    tableUpdate={handleForceUpdate}
                  />
                </div>
              )}
            </div>

            {/* Dialog for Customer */}
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full">
                <CardBody className="flex flex-col gap-4">
                  <Typography variant="h4" color="blue-gray">
                    Add Customer
                  </Typography>

                  <Input
                    label="First Name"
                    size="lg"
                    value={newCustomerData?.first_name || ""}
                    onChange={(e) =>
                      setNewCustomerData((prevUserData) => ({
                        ...prevUserData!,
                        first_name: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Last Name"
                    size="lg"
                    value={newCustomerData?.last_name || ""}
                    onChange={(e) =>
                      setNewCustomerData((prevUserData) => ({
                        ...prevUserData!,
                        last_name: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Phone Number"
                    size="lg"
                    value={newCustomerData?.phone_number || ""}
                    onChange={(e) =>
                      setNewCustomerData((prevUserData) => ({
                        ...prevUserData!,
                        phone_number: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Email"
                    size="lg"
                    type="email"
                    value={newCustomerData?.email || ""}
                    onChange={(e) =>
                      setNewCustomerData((prevUserData) => ({
                        ...prevUserData!,
                        email: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Password"
                    size="lg"
                    type="password"
                    onChange={(e) =>
                      setNewCustomerData((prevUserData) => ({
                        ...prevUserData!,
                        password_hash: e.target.value,
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
