import { Link } from "react-router-dom";
import { Minus } from "lucide-react";
import { useState } from "react";
const Sidemenu = () => {
  const [activeLink, setActiveLink] = useState("profile");
  return (
    <div className="text-[12px] py-15 flex flex-col gap-5">
      <div>
        <Link to={"/profile"} className="grid grid-cols-4 items-center">
          <div className="col-span-1">
            {activeLink === "profile" && (
              <Minus style={{ transform: "rotate(90deg)" }} />
            )}
          </div>
          <span onClick={() => setActiveLink("profile")} className="col-span-3">
            Profile
          </span>
        </Link>
      </div>
      <div>
        <Link to={"/dashboard"} className="grid grid-cols-4 items-center">
          <div className="col-span-1">
            {activeLink === "dashboard" && (
              <Minus style={{ transform: "rotate(90deg)" }} />
            )}
          </div>
          <span
            onClick={() => setActiveLink("dashboard")}
            className="col-span-3"
          >
            Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidemenu;
