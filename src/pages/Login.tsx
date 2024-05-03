import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import AuthAPI from "../apis/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const authUser = new AuthAPI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here (mock or real)
    // setToken("this is a test token");
    // navigate("/", { replace: true });
    authUser.login(email, password).then((res) => {
      if (res.code === 200) {
        // const data = res.data;
        console.log(res.data);
        setToken(res.data);
        navigate("/", { replace: true });
      } else {
        setError("Invalid email or password");
        console.log(res.message);
      }
    });
    // if (email === "abc@abc.com" && password === "password") {
    //   // Successful login
    //   console.log("Login successful");
    // } else {
    //   setError("Invalid email or password");
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full min-w-130"
      >
        <div className="mb-4">
          <EnvelopeIcon className="h-6 w-6 text-blue-500" />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <KeyIcon className="h-6 w-6 text-blue-500" />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
