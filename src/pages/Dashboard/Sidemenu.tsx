import { Link } from "react-router-dom";
import { Minus } from "lucide-react";
import { useState } from "react";
const Sidemenu = () => {
  const [activeLink, setActiveLink] = useState("profile");
  return (
    <div className="text-[14px] py-15 flex flex-col gap-5">
      <div>
        <Link to={"/profile"} className="flex items-center flex-row gap-4">
          <div className="">
            <Minus
              style={{ transform: "rotate(90deg)" }}
              color={activeLink === "profile" ? "white" : "black"}
            />
          </div>
          <span onClick={() => setActiveLink("profile")} className="">
            Profile
          </span>
        </Link>
      </div>
      <div>
        <Link to={"/dashboard"} className="flex flex-row gap-4 items-center">
          <div className="">
            <Minus
              style={{ transform: "rotate(90deg)" }}
              color={activeLink === "dashboard" ? "white" : "black"}
            />
          </div>
          <span onClick={() => setActiveLink("dashboard")} className="">
            Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidemenu;
