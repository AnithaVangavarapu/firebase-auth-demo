import { DocumentData, getDoc, doc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { Button, Input, InputPassword } from "../../CommonComponents";
import { db } from "../../FireBase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export interface contextProps {
  userDetails: DocumentData;
  userId: string;
}
export interface ProfileUpdateProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const classNames = {
  div: "border-gray-200 rounded-[2px] p-1",
  label: "text-[10px] pb-1 text-gray-500 font-medium",
  input: "text-[12px]",
};

const Profile: React.FC = () => {
  const userdata = useOutletContext<contextProps>();
  // const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const [defaultValues, setDefaultValues] = useState<object>({});
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileUpdateProps>({
    defaultValues: defaultValues,
  });
  const fetchUserDetails = async () => {
    const docRef = doc(db, "Users", userdata.userId);
    const userdoc = await getDoc(docRef);
    const userData = userdoc.data();
    if (userData) {
      console.log(userData);
      setUserDetails(userData);
      const newDefaultValues: object = {
        firstName: userData.firstName ? userData.first : "",
        lastName: userData.lastName ? userData.last : "",
        email: userData.email ? userData.email : "",
        userName: userData.userName ? userData.userName : "",
      };
      console.log(newDefaultValues);
      setDefaultValues(newDefaultValues);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const initialLetter = userDetails?.userName?.charAt(0).toUpperCase();

  const handleDataChange = (data: ProfileUpdateProps) => {
    console.log("changed data", data);
  };
  return (
    <div className="flex flex-col  border max-w-full m-5">
      <div>
        <p className="font-bold text-[18px]">My Profile</p>
        <p className="text-[12px] text-gray-400">
          Update your account information
        </p>
      </div>
      <div className="border rounded-lg flex items-center py-3 px-4 justify-between mt-5">
        <div className="flex items-center gap-3">
          <div className=" container w-12 h-12 border rounded-full justify-center flex items-center cursor-pointer overflow-hidden relative">
            {userDetails.photo ? (
              <img src={userDetails.photo} alt={initialLetter} className="" />
            ) : (
              <div className=""> {initialLetter}</div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[14px]">username</span>
            <span className="text-gray-400 text-[12px]">designation</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            label="Upload new picture"
            classNames="bg-black text-[12px] py-0.5 px-1 border-black font-light"
          />
          <Button
            label="Remove"
            classNames="bg-red-50 text-red-400 border-red-50 text-[12px] py-0.5 px-1 "
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleDataChange)}>
        <div className="border rounded-lg flex  py-3 px-4 mt-5 flex-col">
          <div className="flex flex-col">
            <span className="font-medium text-[14px]">
              Personal Information
            </span>
            <span className="text-gray-400 text-[12px]">
              Update your personal information
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-[60%] mt-4">
            <Input
              label="First Name"
              register={register}
              name="firstName"
              classnames={classNames}
            />
            <Input
              label="Last Name"
              register={register}
              name="lastName"
              classnames={classNames}
            />
            <Input
              label="Email"
              register={register}
              name="email"
              // readonly={true}
              classnames={classNames}
            />
            <Input
              label="Username"
              register={register}
              name="userName"
              readonly={true}
              classnames={classNames}
            />
          </div>
        </div>
        <div className="border rounded-lg flex  py-3 px-4 mt-5 flex-col">
          <div className="flex flex-col">
            <span className="font-medium text-[14px]">Change Password</span>
            <span className="text-gray-400 text-[12px]">
              Your new password length should be 8-10 letters
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-[60%] mt-4">
            <div className="col-span-2">
              <InputPassword
                label="Current Password"
                register={register}
                name="currentPassword"
                classnames={classNames}
                type="password"
                placeholder="Enter current Password"
              />
            </div>
            <InputPassword
              label="New Password"
              register={register}
              name="newPassword"
              classnames={classNames}
              type="password"
            />
            <InputPassword
              label="Confirm New Password"
              register={register}
              name="confirmNewPassword"
              classnames={classNames}
              type="password"
            />
          </div>
        </div>
        <Button
          label="Update Changes"
          classNames="my-5 bg-black text-[12px] py-0.5 px-1 border-black font-medium rounded-[2px] "
          type="submit"
        />
      </form>
    </div>
  );
};

export default Profile;
