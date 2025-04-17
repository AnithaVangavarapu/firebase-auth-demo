import { DocumentData } from "firebase/firestore";
import { contextProps } from "./Dashboard";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../../CommonComponents";

const Profile: React.FC = () => {
  const userData = useOutletContext<contextProps>();
  const userDetails: DocumentData = userData.userDetails;
  const navigate = useNavigate();
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
        classNames="w-[15%] text-sm py-1 rounded-[3px]"
        onClick={() => {
          localStorage.setItem("ProfileUpdate", "true"),
            navigate("/profileUpdate");
        }}
      />
    </div>
  );
};

export default Profile;
