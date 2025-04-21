import React from "react";
import { Button } from "../CommonComponents";
import { auth } from "../FireBase";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tw-merge";
import clsx from "clsx";
interface LogoutProps {
  classNames?: string;
}
const Logout: React.FC<LogoutProps> = ({ classNames }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // localStorage.removeItem("isUserLoggedIn");
      localStorage.clear();
      navigate("/signin");
      console.log("user logged out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      label="Logout"
      onClick={handleLogout}
      classNames={twMerge(clsx("rounded-[3px] font-medium", classNames))}
    />
  );
};

export default Logout;
