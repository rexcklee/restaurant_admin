import React, { useState, useEffect } from "react";
import AdminUserAPI, { AdminUser } from "../apis/user";
import UserTable from "../components/userTable";

export default function Home() {
  const [usersData, setUserData] = useState<AdminUser[] | null>(null);

  const adminUser = new AdminUserAPI();

  useEffect(() => {
    // Run api.get when the component mounts
    adminUser
      .adminUserList()
      .then((response) => {
        // Handle the response here if needed
        setUserData(response.data);
        console.log(response);
      })
      .catch((error) => {
        // Handle errors here if needed
        console.error(error);
      });
  }, []);

  return (
    <div>
      <p className="text-3xl font-bold ">Home page</p>
      {usersData && (
        <div>
          <p>Number of admin: {usersData.length}</p>
          <UserTable usersData={usersData} />
        </div>
      )}
    </div>
  );
}
