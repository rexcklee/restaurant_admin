import { useState } from "react";
import CustomerAPI, { Customer } from "../apis/customer";
import { Card, Checkbox, Typography } from "@material-tailwind/react";
import {
  DocumentCheckIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const TABLE_HEAD = [
  "ID",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Address",
  "Registration Date",
  "Last Login",
  "Payment",
  "Action",
];

interface CustomerTableComponentProps {
  customersData: Customer[];
  tableUpdate: () => void; // Define tableUpdate as a function prop that takes no arguments and returns void
}

export default function UserTable(props: CustomerTableComponentProps) {
  const [editableCustomerId, setEditableCustomerId] = useState<number | null>(
    null
  );
  const [editableCustomerData, setEditableCustomerData] =
    useState<Customer | null>(null);

  const Customer = new CustomerAPI();

  const handleEditClick = (customerData: Customer) => {
    setEditableCustomerId(customerData.customer_id);
    setEditableCustomerData(customerData);
  };

  const handleSaveClick = () => {
    console.log(editableCustomerData);
    Customer.updateCustomer(editableCustomerData!);
    setEditableCustomerId(null);
    handleChildChange();
    // Add logic to save the edited data
  };

  const handleDeleteClick = (customer_id: number) => {
    Customer.deleteCustomer(customer_id);

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
          {props.customersData.map((customer, index) => {
            const isLast = index === props.customersData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            const mysqlRegistrationDateTime = customer.registration_date
              ? customer.registration_date
              : "";
            const registrationDate = new Date(mysqlRegistrationDateTime);

            const mysqlLastLoginDateTime = customer.last_login
              ? customer.last_login
              : "";
            const lastLoginDate = new Date(mysqlLastLoginDateTime);

            return (
              <tr key={customer.customer_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {customer.customer_id}
                  </Typography>
                </td>
                <td className={classes}>
                  {editableCustomerId === customer.customer_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableCustomerData!.first_name}
                      onChange={(e) => {
                        setEditableCustomerData((prevUserData) => ({
                          ...prevUserData!,
                          first_name: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.first_name}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableCustomerId === customer.customer_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableCustomerData!.last_name}
                      onChange={(e) => {
                        setEditableCustomerData((prevUserData) => ({
                          ...prevUserData!,
                          last_name: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.last_name}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableCustomerId === customer.customer_id ? (
                    <input
                      className="w-32 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={
                        editableCustomerData!.email
                          ? editableCustomerData!.email
                          : ""
                      }
                      onChange={(e) => {
                        setEditableCustomerData((prevUserData) => ({
                          ...prevUserData!,
                          email: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.email}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableCustomerId === customer.customer_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:border-blue-500"
                      type="text"
                      value={
                        editableCustomerData!.phone_number
                          ? editableCustomerData!.phone_number
                          : ""
                      }
                      onChange={(e) => {
                        setEditableCustomerData((prevUserData) => ({
                          ...prevUserData!,
                          mobile: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.phone_number}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableCustomerId === customer.customer_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:border-blue-500"
                      type="text"
                      value={
                        editableCustomerData!.address
                          ? editableCustomerData!.address
                          : ""
                      }
                      onChange={(e) => {
                        setEditableCustomerData((prevUserData) => ({
                          ...prevUserData!,
                          address: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.address}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {customer.registration_date
                      ? registrationDate.toLocaleString()
                      : ""}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {customer.last_login ? lastLoginDate.toLocaleString() : ""}
                  </Typography>
                </td>
                <td className={classes}>
                  {editableCustomerId === customer.customer_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:border-blue-500"
                      type="text"
                      value={
                        editableCustomerData!.payment_method
                          ? editableCustomerData!.payment_method
                          : ""
                      }
                      onChange={(e) => {
                        setEditableCustomerData((prevUserData) => ({
                          ...prevUserData!,
                          payment_method: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.payment_method}
                    </Typography>
                  )}
                </td>

                <td
                  className={`${classes} bg-blue-gray-50/50 flex justify-center items-center`}
                >
                  <div className="flex space-x-2">
                    {editableCustomerId === customer.customer_id ? (
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
                        onClick={() => handleEditClick(customer)}
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
                      onClick={() => handleDeleteClick(customer.customer_id)}
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
