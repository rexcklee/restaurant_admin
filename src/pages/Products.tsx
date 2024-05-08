import React, { useState, useEffect } from "react";
import AdminUserAPI, { AdminUser } from "../apis/user";
import UserTable from "../components/userTable";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export default function Products() {
  //const [usersData, setUserData] = useState<AdminUser[] | null>(null);

  //const adminUser = new AdminUserAPI();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     adminUser
  //       .adminUserList()
  //       .then((response) => {
  //         setUserData(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  return (
    <>
      <div className="flex">
        {/* Sidebar on left */}
        <div className="w-1/5">
          <Sidebar />
        </div>
        {/* Table in a card on right */}
        <div className="w-4/5 p-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <p className="text-3xl font-bold ">Products</p>
          </div>
        </div>
      </div>
    </>
  );
}
