import React from "react";
import { AdminUser } from "../apis/user";
import { Card, Typography } from "@material-tailwind/react";

interface UserTableProps {
  usersData: AdminUser[];
}

const TABLE_HEAD = [
  "ID",
  "First Name",
  "Last Name",
  "Mobile",
  "Email",
  "Password",
  "Is admin",
  "Last Login",
  // "Token",
  // "Token expiry",
  "Action",
];

export default function UserTable(props: UserTableProps) {
  return (
    <Card className="overflow-x-auto w-full mt-4 mb-4">
      <table className="table-auto text-left">
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
          {props.usersData.map((user, index) => {
            const isLast = index === props.usersData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            const mysqlDateTime = user.last_login ? user.last_login : "";
            const date = new Date(mysqlDateTime);

            return (
              <tr key={user.admin_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.admin_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.first_name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.last_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.mobile}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.password_hash}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.is_superadmin ? "Yes" : "No"}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.last_login ? date.toLocaleString() : ""}
                  </Typography>
                </td>
                {/* <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.token}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.token_expiry ? user.token_expiry.toDateString() : ""}
                  </Typography>
                </td> */}
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
