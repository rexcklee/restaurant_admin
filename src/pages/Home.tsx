import React, { useState, useEffect } from "react";
import AdminUserAPI, { AdminUser } from "../apis/user";
import UserTable from "../components/userTable";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [usersData, setUserData] = useState<AdminUser[] | null>(null);

  const adminUser = new AdminUserAPI();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    adminUser
      .adminUserList()
      .then((response) => {
        setUserData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <p className="text-3xl font-bold ">Home page</p>
      <div className="flex justify-center items-center">
        {usersData && (
          <div>
            <p>Number of admin: {usersData.length}</p>
            <UserTable usersData={usersData} />
          </div>
        )}
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  );
}
