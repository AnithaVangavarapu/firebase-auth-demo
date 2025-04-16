import { DocumentData } from "firebase/firestore";
import { Logout } from "../../Components";
import { useOutletContext } from "react-router-dom";
const Profile: React.FC = () => {
  const userDetails: DocumentData = useOutletContext();
  const initialLetter = userDetails.userName.charAt(0).toUpperCase();

  return (
    <div className=" border rounded-md  border-blue-200 w-[100%] h-[100%] p-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="container w-10 h-10 border rounded-full justify-center flex items-center">
            {initialLetter}
          </div>
          <h2 className="">Welcome {userDetails.userName}</h2>
        </div>{" "}
        <div className="">
          <Logout />
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className="">UserName:</div>
          {userDetails.userName}
        </div>
        <div className="flex">
          <div className="">Email:</div>
          {userDetails.email}
        </div>
      </div>
    </div>
  );
};

export default Profile;
