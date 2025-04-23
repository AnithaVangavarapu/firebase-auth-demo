import { useProfile } from "./useProfile";
import { Button } from "../../../CommonComponents";
import { FileUpload } from "../../../Components";
const BasicProfileInfo = () => {
  const {
    showImagePopup,
    setShowImagePopup,
    userDetails,
    initialLetter,
    handleRemovePicture,
    fullName,
  } = useProfile();
  return (
    <div>
      <div>
        <p className="font-medium text-[24px] ">My Profile</p>
        <p className="text-[10px] text-gray-400 font-medium">
          Update your account information
        </p>
      </div>
      <div className="border rounded-lg flex items-center py-5 px-6 justify-between mt-5 border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className={` container w-12 h-12  rounded-full justify-center flex items-center cursor-pointer overflow-hidden relative,${
              userDetails.photo ? "" : " text-black border"
            }`}
          >
            {userDetails.photo ? (
              <img src={userDetails.photo} alt={initialLetter} className="" />
            ) : (
              <div className=""> {initialLetter}</div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[14px]">
              {fullName !== "undefined undefined"
                ? fullName
                : userDetails.userName}
            </span>
            <span className="text-gray-400 text-[12px] font-light">
              designation
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            label="Upload new picture"
            classNames="bg-black text-[10px] py-0.5 px-1 border-black font-medium"
            onClick={() => setShowImagePopup(true)}
          />
          <Button
            label="Remove"
            classNames="bg-red-50 text-red-400 border-red-50 text-[10px] py-0.5 px-1.5 font-medium"
            onClick={handleRemovePicture}
          />
        </div>
      </div>
      {showImagePopup && (
        <div className="border bg-white absolute w-[30%] h-[30%] top-10 left-[40%] p-2 flex justify-center items-center flex-col">
          <FileUpload setShowImagePopup={setShowImagePopup} />
        </div>
      )}
    </div>
  );
};

export default BasicProfileInfo;
