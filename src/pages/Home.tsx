import React, { useState, useEffect } from "react";
import AdminUserAPI, { AdminUser } from "../apis/user";
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

export default function Home() {
  const [usersData, setUserData] = useState<AdminUser[] | null>(null);
  const [newUserData, setNewUserData] = useState<AdminUser | null>({
    admin_id: 0,
    first_name: "",
    last_name: "",
    last_login: null,
    email: "",
    password_hash: "",
    is_superadmin: 0,
    mobile: "",
  });
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [tableUpdate, setTableUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const adminUser = new AdminUserAPI();

  const handleSubmit = () => {
    adminUser.addAdminUser(newUserData!).then(() => handleOpen());
  };

  const handleForceUpdate = () => {
    setTableUpdate((prev) => !prev); // Toggle the state to force re-render
  };

  useEffect(() => {
    adminUser
      .adminUserList()
      .then((response) => {
        setUserData(response.data);
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
            <p className="text-3xl font-bold ">Admin Users</p>
            <div className="flex justify-center items-center">
              {usersData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">
                      Number of admin: {usersData.length}
                    </p>
                    <button
                      className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleOpen}
                    >
                      Add User
                    </button>
                  </div>
                  <UserTable
                    usersData={usersData}
                    tableUpdate={handleForceUpdate}
                  />
                </div>
              )}
            </div>

            {/* Dialog for Add User */}
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full overflow-scroll">
                <CardBody className="flex flex-col gap-4">
                  <Typography variant="h4" color="blue-gray">
                    Add User
                  </Typography>

                  <Input
                    label="First Name"
                    size="lg"
                    value={newUserData?.first_name || ""}
                    onChange={(e) =>
                      setNewUserData((prevUserData) => ({
                        ...prevUserData!,
                        first_name: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Last Name"
                    size="lg"
                    value={newUserData?.last_name || ""}
                    onChange={(e) =>
                      setNewUserData((prevUserData) => ({
                        ...prevUserData!,
                        last_name: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Mobile"
                    size="lg"
                    value={newUserData?.mobile || ""}
                    onChange={(e) =>
                      setNewUserData((prevUserData) => ({
                        ...prevUserData!,
                        mobile: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Email"
                    size="lg"
                    type="email"
                    value={newUserData?.email || ""}
                    onChange={(e) =>
                      setNewUserData((prevUserData) => ({
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
                      setNewUserData((prevUserData) => ({
                        ...prevUserData!,
                        password_hash: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <div className="-ml-2.5 -mt-3">
                    <Checkbox
                      label="Super admin"
                      checked={isSuperAdmin}
                      onChange={() => {
                        setIsSuperAdmin(
                          (prevIsSuperAdmin) => !prevIsSuperAdmin
                        );
                        setNewUserData((prevUserData) => ({
                          ...prevUserData!,
                          is_superadmin: isSuperAdmin == true ? 0 : 1,
                        }));
                      }}
                      crossOrigin={undefined}
                    />
                  </div>
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
