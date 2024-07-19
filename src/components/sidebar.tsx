import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import { BsShop, BsLaptop, BsListCheck } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import {
  IoFastFoodOutline,
  IoPersonOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbBrandBlogger, TbPassword } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { useAuth } from "../provider/authProvider";
import { To, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminUserAPI, { UpdatedPassword } from "../apis/user";

export function Sidebar() {
  const { setToken, setCurrentUser, currentUser } = useAuth();
  const currentUserInfo =
    typeof currentUser === "object" ? currentUser : JSON.parse(currentUser);

  const navigate = useNavigate();
  const [updatedPassword, SetUpdatedPassword] =
    useState<UpdatedPassword | null>({
      old_password: null,
      new_password: null,
      admin_id: currentUserInfo ? currentUserInfo.admin_id : null,
    });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const handleOpen = () => setOpen((cur) => !cur);
  const adminUser = new AdminUserAPI();

  const handleNavigation = (route: To) => {
    navigate(route); // Navigate to the specified route
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/", { replace: true });
  };

  const handleSubmit = () => {
    const validationError = validatePassword(updatedPassword!.new_password!);
    if (validationError) {
      setError(validationError);
      return;
    }
    adminUser.updatePassword(updatedPassword!).then((res) => {
      if (res.code === 401) {
        alert(res.message);
      } else {
        handleOpen();
      }
    });
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Password must contain at least one letter.";
    }
    return "";
  };

  return (
    <>
      <Card className="h-full w-44 p-2 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Admin Page
          </Typography>
        </div>
        <List>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/dashboard")}
          >
            <ListItemPrefix>
              <BsLaptop className="h-3 w-3" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/branches")}
          >
            <ListItemPrefix>
              <BsShop className="h-3 w-3" />
            </ListItemPrefix>
            Branches
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/productCategories")}
          >
            <ListItemPrefix>
              <MdOutlineCategory className="h-3 w-3" />
            </ListItemPrefix>
            Categories
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/products")}
          >
            <ListItemPrefix>
              <IoFastFoodOutline className="h-3 w-3" />
            </ListItemPrefix>
            Products
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/orders")}
          >
            <ListItemPrefix>
              <BsListCheck className="h-3 w-3" />
            </ListItemPrefix>
            Orders
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/adminUsers")}
          >
            <ListItemPrefix>
              <GrUserAdmin className="h-3 w-3" />
            </ListItemPrefix>
            Admin Users
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/customers")}
          >
            <ListItemPrefix>
              <IoPersonOutline className="h-3 w-3" />
            </ListItemPrefix>
            Customers
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/homeSections")}
          >
            <ListItemPrefix>
              <IoHomeOutline className="h-3 w-3" />
            </ListItemPrefix>
            Home Sections
          </ListItem>
          <ListItem
            className="text-sm"
            onClick={() => handleNavigation("/news")}
          >
            <ListItemPrefix>
              <TbBrandBlogger className="h-3 w-3" />
            </ListItemPrefix>
            Blogs
          </ListItem>
          <ListItem className="text-sm" onClick={handleOpen}>
            <ListItemPrefix>
              <TbPassword className="h-3 w-3" />
            </ListItemPrefix>
            Update Password
          </ListItem>
          <ListItem className="text-sm" onClick={handleLogout}>
            <ListItemPrefix>
              <RiLogoutBoxRLine className="h-3 w-3" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      {/* Dialog for Add User */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update Password
            </Typography>

            <Input
              label="Current Password"
              size="lg"
              type="password"
              onChange={(e) =>
                SetUpdatedPassword((prevUpdatedPasswordData) => ({
                  ...prevUpdatedPasswordData!,
                  old_password: e.target.value,
                }))
              }
              crossOrigin={undefined}
            />

            <Input
              label="New Password"
              size="lg"
              type="password"
              onChange={(e) =>
                SetUpdatedPassword((prevUpdatedPasswordData) => ({
                  ...prevUpdatedPasswordData!,
                  new_password: e.target.value,
                }))
              }
              crossOrigin={undefined}
            />
            {error && (
              <Typography variant="h6" color="red">
                {error}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              Update
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
