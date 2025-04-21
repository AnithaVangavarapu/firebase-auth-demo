import { DocumentData, getDoc, doc } from "firebase/firestore";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../../CommonComponents";
import { db } from "../../FireBase";
import { useEffect, useState } from "react";
export interface contextProps {
  userDetails: DocumentData;
  userId: string;
}
const Profile: React.FC = () => {
  const userdata = useOutletContext<contextProps>();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const fetchUserDetails = async () => {
    const docRef = doc(db, "Users", userdata.userId);
    const userdoc = await getDoc(docRef);
    const userData = userdoc.data();
    if (userData) {
      setUserDetails(userData);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="flex flex-col m-10 gap-2 items-center">
      <div className="flex w-[100%]">
        <div className="w-[10%]">UserName:</div>
        {userDetails.userName}
      </div>
      <div className="flex w-[100%]">
        <div className="w-[10%]">Email:</div>
        {userDetails.email}
      </div>
      {userDetails.skill && (
        <div className="flex w-[100%]">
          <div className="w-[10%]">Skill:</div>
          {userDetails.skill}
        </div>
      )}
      <Button
        label="Update Profile"
        classNames="w-[15%] text-sm py-1 rounded-md bg-black border-black font-medium"
        onClick={() => {
          localStorage.setItem("ProfileUpdate", "true"),
            navigate("/profileUpdate");
        }}
      />
    </div>
  );
};

export default Profile;
