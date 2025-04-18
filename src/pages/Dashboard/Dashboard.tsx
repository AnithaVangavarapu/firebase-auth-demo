import { DocumentData } from "firebase/firestore";
import { Logout } from "../../Components";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Profile from "./Profile";
export interface contextProps {
  userDetails: DocumentData;
  userId: string;
}
const Dashboard: React.FC = () => {
  const userData = useOutletContext<contextProps>();
  const userDetails: DocumentData = userData.userDetails;
  const initialLetter = userDetails.userName.charAt(0).toUpperCase();
  const [showProfile, setShowProfile] = useState<boolean>(true);
  return (
    <div className="border rounded-md border-blue-200 max-w-full p-1">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div
            className="container w-10 h-10 border rounded-full justify-center flex items-center cursor-pointer overflow-hidden"
            onClick={() => setShowProfile(!showProfile)}
          >
            {userDetails.photo ? (
              <img src={userDetails.photo} alt={initialLetter} className="" />
            ) : (
              initialLetter
            )}
          </div>
          <h2 className="">Welcome {userDetails.userName}</h2>
        </div>
        <div>
          <Logout />
        </div>
      </div>
      {showProfile && <Profile />}
    </div>
  );
};

export default Dashboard;
