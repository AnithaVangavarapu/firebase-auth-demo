import { Link } from "react-router-dom";
import { Minus } from "lucide-react";
const Sidemenu = () => {
  return (
    <div className="text-[14px] py-15">
      <div>
        <Link to={"/profile"} className={`flex items-center gap-2`}>
          <Minus style={{ transform: "rotate(90deg)" }} />
          <span>Profile</span>
        </Link>
      </div>
      <div>
        <Link to={"/dashboard"} className="flex items-center gap-2">
          <Minus style={{ transform: "rotate(90deg)" }} />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidemenu;
