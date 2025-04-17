import { useOutletContext, useNavigate } from "react-router-dom";
import { Button, Input } from "../../CommonComponents";
import { useForm } from "react-hook-form";
import { contextProps } from "./Dashboard";
import { DocumentData, updateDoc, doc } from "firebase/firestore";
import { db } from "../../FireBase";
import { Logout } from "../../Components";

interface UpdateFormProps {
  skill?: string;
}
const ProfileUpdate = () => {
  const userData = useOutletContext<contextProps>();
  const userDetails: DocumentData = userData.userDetails;
  const userId: string = userData.userId;
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UpdateFormProps>();
  const handleUpdate = async (data: UpdateFormProps) => {
    console.log(data);
    const updatedData = {
      skill: data.skill,
    };
    const docRef = doc(db, "Users", userId);
    console.log(docRef);
    await updateDoc(docRef, updatedData).catch((error) => console.log(error));
  };
  const classNames = {
    maindiv: "flex flex-row ",
    label: "w-[10%]",
  };
  return (
    <div className="flex flex-col container items-center m-5 p-5 pl-[10%] border gap-2">
      <h1>Profile Update</h1>
      <div className="flex w-[100%]">
        <div className="w-[10%]">UserName:</div>
        {userDetails.userName}
      </div>
      <div className="flex w-[100%]">
        <div className="w-[10%]">Email:</div>
        {userDetails.email}
      </div>
      <form className="w-[100%]">
        <Input
          name="skill"
          label="Add Skill:"
          register={register}
          classnames={classNames}
        />
        <div className="text-center">
          <Button label="Go Back" onClick={() => navigate("/dashboard")} />
          <Button label="Update" onClick={handleSubmit(handleUpdate)} />
          <Logout />
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
