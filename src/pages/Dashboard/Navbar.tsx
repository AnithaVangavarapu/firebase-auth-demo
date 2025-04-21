import { DocumentData } from "firebase/firestore";
import { Logout } from "../../Components";

interface NavbarProps {
  userDetails: DocumentData;
}

const Navbar: React.FC<NavbarProps> = ({ userDetails }) => {
  const initialLetter = userDetails.userName.charAt(0).toUpperCase();

  return (
    <div className=" max-w-full p-1">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Welcome {userDetails.userName}</h2>
        <div className="flex relative group">
          <div className=" container w-10 h-10 border rounded-full justify-center flex items-center cursor-pointer overflow-hidden relative">
            {userDetails.photo ? (
              <img src={userDetails.photo} alt={initialLetter} className="" />
            ) : (
              initialLetter
            )}
          </div>
          <div className="absolute right-0 top-full hidden group-hover:flex  group-focus-within:flex flex-col">
            <Logout classNames="bg-black border-black rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
