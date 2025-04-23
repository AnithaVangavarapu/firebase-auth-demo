import { DocumentData } from "firebase/firestore";
import { auth } from "../../FireBase";
import { Triangle, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
  userDetails: DocumentData;
}

const Navbar: React.FC<NavbarProps> = ({ userDetails }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  let initial;
  if (
    userDetails?.firstName !== undefined ||
    userDetails?.lastName !== undefined
  ) {
    initial =
      userDetails?.firstName.charAt(0).toUpperCase() +
      userDetails?.lastName.charAt(0).toUpperCase();
  }
  const initialLetter = initial
    ? initial
    : userDetails?.userName?.charAt(0).toUpperCase();
  const fullName = userDetails?.firstName + " " + userDetails?.lastName;
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
  return (
    <div className="max-w-full  mx-5 my-2 pr-5">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold pl-8">LOGO</h2>
        <div className="flex gap-2 items-center">
          <div
            className={` container w-5 h-5  rounded-full justify-center flex items-center overflow-hidden relative,${
              userDetails.photo ? "" : " text-black border"
            }`}
          >
            {userDetails.photo ? (
              <img src={userDetails.photo} alt={initialLetter} className="" />
            ) : (
              <div className="text-[10px]"> {initialLetter}</div>
            )}
          </div>

          <div className="text-sm ">
            {" "}
            {fullName !== "undefined undefined"
              ? fullName
              : userDetails.userName}
          </div>
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
