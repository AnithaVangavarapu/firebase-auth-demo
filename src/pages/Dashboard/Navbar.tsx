import { auth } from "../../FireBase";
import { Triangle, LogOut } from "lucide-react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext, { UserContextProps } from "../../context/UserProvider";

const Navbar: React.FC = () => {
  const userContextData = useContext<UserContextProps>(UserContext);
  const { userDetails, fullName, fullNameIntial, photo, setIsAuth } =
    userContextData;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [initialLetter, setInitialLetter] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const letters =
      fullNameIntial && fullNameIntial !== " "
        ? fullNameIntial
        : userDetails?.userName?.charAt(0).toUpperCase();
    setInitialLetter(letters);
  }, [userDetails, fullNameIntial]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
      setIsAuth(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="max-w-full   px-10 py-1.5 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold pl-8">LOGO</h2>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
          ref={dropdownRef}
        >
          <div
            className={` container w-5 h-5  rounded-full justify-center flex items-center overflow-hidden relative,${
              photo !== " " && " border-black border"
            }`}
          >
            {photo ? (
              <img src={photo} alt={initialLetter} className="" />
            ) : (
              <div className="text-[10px]"> {initialLetter}</div>
            )}
          </div>
          <div className="text-sm ">{fullName}</div>
          <Triangle
            width={8}
            fill="black"
            style={{
              transform: `${showDropdown ? "none" : "rotate(180deg)"}`,
            }}
          />
          {showDropdown && (
            <div className="border w-[20%] h-10 absolute right-[35px] flex items-center p-2 justify-between bg-white border-gray-200 shadow-sm mt-1 cursor-pointer top-10 rounded-lg">
              <div
                onClick={() => {
                  handleLogout();
                }}
                className="flex justify-between flex-row w-full"
              >
                <span className=" text-[12px]">Logout</span>
                <LogOut width={12} className="stroke-3" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
