import { Navigate, Outlet } from "react-router-dom";
import { Navbar, Sidemenu } from "../pages/Dashboard";
import { useContext } from "react";

import UserContext, { UserContextProps } from "../context/UserProvider";

const ProtectedRoutes = () => {
  const userContextData = useContext<UserContextProps>(UserContext);
  const { isAuth } = userContextData;

  return isAuth ? (
    <div className="max-w-full ">
      <div className="">
        <Navbar />
      </div>
      <div className="grid grid-cols-12 max-w-full border-t-[1px] rounded-r-lg border-gray-200">
        <div className="bg-black text-white col-span-2 lg:min-h-[849px] ">
          <Sidemenu />
        </div>
        <div className="col-span-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/signin"} replace />
  );
};

export default ProtectedRoutes;
