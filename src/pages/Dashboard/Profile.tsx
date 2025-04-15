import { DocumentData } from "firebase/firestore";
import { Logout } from "../../Components";
import { useOutletContext } from "react-router-dom";
const Profile: React.FC = () => {
  const userDetails: DocumentData = useOutletContext();

  return (
    <div className="flex justify-center border p-2 rounded-md  border-blue-200 h-[50%] items-center w-[50%] ">
      {userDetails ? (
        <div className="">
          <div className="flex">
            <div className="">UserName:</div>
            {userDetails.userName}
          </div>
          <div className="flex">
            <div className="">Email:</div>
            {userDetails.email}
          </div>
          <div className="text-center p-5">
            <Logout />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
