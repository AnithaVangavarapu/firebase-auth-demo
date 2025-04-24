import { DocumentData } from "firebase/firestore";
import { auth } from "../../FireBase";
import { Triangle, LogOut } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
  userDetails: DocumentData;
  fullName: string;
  fullNameIntial: string;
  photo: string;
}

const Navbar: React.FC<NavbarProps> = ({
  userDetails,
  fullName,
  fullNameIntial,
  photo,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialLetter =
    fullNameIntial !== " "
      ? fullNameIntial
      : userDetails?.userName?.charAt(0).toUpperCase();

  console.log("fullName", fullName);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
      navigate("/signin");
      console.log("user logged out");
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
    <div className="max-w-full   px-10 py-1.5">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold pl-8">LOGO</h2>
        <div className="flex gap-2 items-center">
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
          <div className="cursor-pointer">
            <Triangle
              width={6}
              fill="black"
              style={{
                transform: `${showDropdown ? "none" : "rotate(180deg)"}`,
              }}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div
                className="border w-25 h-6 absolute right-[20px] flex items-center p-2 justify-between bg-white border-gray-200 shadow-sm mt-1 cursor-pointer "
                onClick={handleLogout}
                ref={dropdownRef}
              >
                <span className=" text-[12px]">Logout</span>
                <LogOut width={12} className="stroke-3" />
                {/* <Logout classNames="bg-black border-black rounded-md" /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
