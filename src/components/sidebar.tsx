import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { BsShop, BsLaptop, BsListCheck } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import {
  IoFastFoodOutline,
  IoPersonOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbBrandBlogger } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { useAuth } from "../provider/authProvider";
import { To, useNavigate } from "react-router-dom";

export function Sidebar() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (route: To) => {
    navigate(route); // Navigate to the specified route
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  return (
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
        <ListItem className="text-sm" onClick={() => handleNavigation("/news")}>
          <ListItemPrefix>
            <TbBrandBlogger className="h-3 w-3" />
          </ListItemPrefix>
          Blogs
        </ListItem>
        <ListItem className="text-sm" onClick={handleLogout}>
          <ListItemPrefix>
            <RiLogoutBoxRLine className="h-3 w-3" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
