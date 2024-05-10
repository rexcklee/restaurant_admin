import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import AuthAPI from "../apis/auth";
import { Card } from "@material-tailwind/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const authUser = new AuthAPI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    authUser.login(email, password).then((res) => {
      if (res.code === 200) {
        setToken(res.data);
        console.log(res.data);
        navigate("/", { replace: true });
      } else {
        setError("Invalid email or password");
        console.log(res.message);
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-gray-50">
      <Card className="overflow-x-auto w-1/4 min-w-96">
        <form
          onSubmit={handleSubmit}
          className=" bg-white-500 shadow-md px-8 pt-8 pb-10 w-full"
        >
          <div className="mb-4">
            <div className="flex items-center justify-start">
              <EnvelopeIcon className="h-6 w-6 text-blue-500" />

              <label
                className="block text-gray-700 text-sm font-bold p-2"
                htmlFor="email"
              >
                Email
              </label>
            </div>
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
          <div className="mb-12">
            <div className="flex items-center">
              <KeyIcon className="h-6 w-6 text-blue-500" />
              <label
                className="block text-gray-700 text-sm font-bold p-2"
                htmlFor="password"
              >
                Password
              </label>
            </div>
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
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
