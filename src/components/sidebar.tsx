import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

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
        <ListItem className="text-sm">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-3 w-3" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem
          className="text-sm"
          onClick={() => handleNavigation("/branches")}
        >
          <ListItemPrefix>
            <ShoppingBagIcon className="h-3 w-3" />
          </ListItemPrefix>
          Branches
        </ListItem>
        <ListItem
          className="text-sm"
          onClick={() => handleNavigation("/productCategories")}
        >
          <ListItemPrefix>
            <ShoppingBagIcon className="h-3 w-3" />
          </ListItemPrefix>
          Categories
        </ListItem>
        <ListItem
          className="text-sm"
          onClick={() => handleNavigation("/products")}
        >
          <ListItemPrefix>
            <ShoppingBagIcon className="h-3 w-3" />
          </ListItemPrefix>
          Products
        </ListItem>
        <ListItem
          className="text-sm"
          onClick={() => handleNavigation("/orders")}
        >
          <ListItemPrefix>
            <InboxIcon className="h-3 w-3" />
          </ListItemPrefix>
          Orders
          {/* <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix> */}
        </ListItem>
        <ListItem
          className="text-sm"
          onClick={() => handleNavigation("/adminUsers")}
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-3 w-3" />
          </ListItemPrefix>
          Admin Users
        </ListItem>
        <ListItem
          className="text-sm"
          onClick={() => handleNavigation("/customers")}
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-3 w-3" />
          </ListItemPrefix>
          Customers
        </ListItem>
        <ListItem className="text-sm" onClick={() => handleNavigation("/news")}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-3 w-3" />
          </ListItemPrefix>
          Blogs
        </ListItem>
        <ListItem className="text-sm" onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-3 w-3" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
