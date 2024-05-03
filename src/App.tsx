import React from "react";
//import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes> */}
    </div>
  );
};

export default App;
