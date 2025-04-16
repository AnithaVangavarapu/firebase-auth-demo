import { Button } from "../CommonComponents";
import { auth } from "../FireBase";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("isUserLoggedIn");
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
      classNames="rounded-[3px] font-medium"
    />
  );
};

export default Logout;
