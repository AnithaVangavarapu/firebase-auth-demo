import { useBasicProfileInfo } from "./useBasicProfileInfo";
import { Button } from "../../../CommonComponents";
import { FileUpload } from "../../../Components";

const BasicProfileInfo = () => {
  const {
    showImagePopup,
    setShowImagePopup,
    initialLetter,
    handleRemovePicture,
    fullName,
    setPhoto,
    photo,
  } = useBasicProfileInfo();

  return (
    <div className="">
      <div>
        <p className="font-medium text-[20px] ">My Profile</p>
        <p className="text-[12px] text-gray-400 font-medium">
          Update your account information
        </p>
      </div>
      <div className="border-[1px] bg-white rounded-lg flex items-center py-5 px-6 justify-between mt-5 border-gray-200">
        <div className="flex items-center gap-3">
          <div
            className={` container w-12 h-12  rounded-full justify-center flex items-center cursor-pointer overflow-hidden relative,${
              photo !== " " && " border-black border"
            }`}
          >
            {photo ? (
              <img src={photo} alt={initialLetter} className="" />
            ) : (
              <div className=""> {initialLetter}</div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium text-[14px]">{fullName}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            label="Upload new picture"
            classNames="bg-black text-[10px] p-1.5 border-black font-medium rounded-lg"
            onClick={() => setShowImagePopup(true)}
          />
          <Button
            label="Remove"
            classNames="bg-red-50 text-red-400 border-red-50 text-[10px] p-1.5 font-medium rounded-lg"
            onClick={handleRemovePicture}
          />
        </div>
      </div>
      {showImagePopup && (
        <div className="bg-[rgba(0,0,0,0.5)] top-0 left-0 z-9 w-[100vw] h-[100vh] fixed">
          <div className="border bg-white  fixed top-0 bottom-0 left-0 right-0 m-auto  w-fit h-fit p-8 border-white rounded-lg shadow-md">
            <FileUpload
              setShowImagePopup={setShowImagePopup}
              setPhoto={setPhoto}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicProfileInfo;
