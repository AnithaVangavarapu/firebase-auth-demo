import { Link } from "react-router-dom";
import { Minus } from "lucide-react";
const Sidemenu = () => {
  return (
    <div className="text-[14px]">
      <div>
        <Link to={"/profile"} className={`flex items-center `}>
          <Minus style={{ transform: "rotate(90deg)" }} />
          Profile
        </Link>
      </div>
      <div>
        <Link to={"/dashboard"} className="flex items-center">
          <Minus style={{ transform: "rotate(90deg)" }} />
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Sidemenu;
