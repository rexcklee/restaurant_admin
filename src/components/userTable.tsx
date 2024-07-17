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

const TABLE_HEAD = [
  "ID",
  "First Name",
  "Last Name",
  "Mobile",
  "Email",
  "Is admin",
  "Last Login",
  "Action",
];

interface UserTableComponentProps {
  usersData: AdminUser[];
  tableUpdate: () => void; // Define tableUpdate as a function prop that takes no arguments and returns void
}

export default function UserTable(props: UserTableComponentProps) {
  const [editableUserId, setEditableUserId] = useState<number | null>(null);
  const [editableUserData, setEditableUserData] = useState<AdminUser | null>(
    null
  );

  const adminUser = new AdminUserAPI();

  const handleEditClick = (userData: AdminUser) => {
    setEditableUserId(userData.admin_id);
    setEditableUserData(userData);
  };

  const handleSaveClick = () => {
    console.log(editableUserData);
    adminUser.updateAdminUser(editableUserData!);
    setEditableUserId(null);
    handleChildChange();
    // Add logic to save the edited data
  };

  const handleDeleteClick = (admin_id: number) => {
    adminUser.deleteAdminUser(admin_id);

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
                  {editableUserId === user.admin_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableUserData!.first_name}
                      onChange={(e) => {
                        setEditableUserData((prevUserData) => ({
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
                      {user.first_name}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableUserId === user.admin_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableUserData!.last_name}
                      onChange={(e) => {
                        setEditableUserData((prevUserData) => ({
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
                      {user.last_name}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableUserId === user.admin_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1 focus:border-blue-500"
                      type="text"
                      value={
                        editableUserData!.mobile ? editableUserData!.mobile : ""
                      }
                      onChange={(e) => {
                        setEditableUserData((prevUserData) => ({
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
                      {user.mobile}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editableUserId === user.admin_id ? (
                    <input
                      className="w-32 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={
                        editableUserData!.email ? editableUserData!.email : ""
                      }
                      onChange={(e) => {
                        setEditableUserData((prevUserData) => ({
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
                      {user.email}
                    </Typography>
                  )}
                </td>
                <td className={`${classes}`}>
                  {editableUserId === user.admin_id ? (
                    <Checkbox
                      // label="Auto"
                      checked={editableUserData?.is_superadmin ? true : false}
                      onChange={() =>
                        setEditableUserData((prevUserData) => ({
                          ...prevUserData!,
                          is_superadmin:
                            prevUserData!.is_superadmin == 0 ? 1 : 0,
                        }))
                      }
                      className="checked:bg-green-300 checked:border-orange-500 border-orange-300 border-2"
                      crossOrigin={undefined}
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      {user.is_superadmin ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-300" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  )}
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

                <td className={`${classes} bg-blue-gray-50/50 `}>
                  <div className="flex justify-center items-center space-x-2">
                    {editableUserId === user.admin_id ? (
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
                        onClick={() => handleEditClick(user)}
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
                      onClick={() => handleDeleteClick(user.admin_id)}
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
