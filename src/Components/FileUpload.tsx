import { useForm } from "react-hook-form";
import { Button, Input } from "../CommonComponents";
import UserContext, { UserContextProps } from "../context/UserProvider";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../FireBase";
import { toast } from "react-toastify";
import { useContext } from "react";
interface FileUploadFields {
  photo: Array<File>;
}
interface FileUploadProps {
  setShowImagePopup: (val: boolean) => void;
  setPhoto: (val: string) => void;
}

const FileUpload = ({ setShowImagePopup, setPhoto }: FileUploadProps) => {
  const { register, handleSubmit } = useForm<FileUploadFields>();
  const userContextData = useContext<UserContextProps>(UserContext);
  const { email } = userContextData;
  const userId: string = email;

  //store and update profilepicture
  const handleUploadFile = async (data: FileUploadFields) => {
    const imageURL = window.URL.createObjectURL(data.photo[0]);

    const updatePhoto = {
      photo: imageURL,
    };
    const docRef = doc(db, "Users", userId);

    await updateDoc(docRef, updatePhoto)
      .then(() => {
        toast.success("Profile picture updated successfully", {
          position: "top-center",
          className: "text-sm",
        });
        setPhoto(imageURL);
        setShowImagePopup(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit(handleUploadFile)}>
      <Input
        label="Select Image"
        register={register}
        name="photo"
        type="file"
        accept="image/*"
        classnames={{
          input:
            "border rounded-lg file:bg-black text-[14px] file:text-white file:p-1.5 font-medium file:mr-4",
          div: "border-none p-0",
          label: "text-left pb-6 text-[18px] font-medium ",
        }}
      />
      <div className="flex gap-3 mt-3 ml-14 text-right">
        <Button
          label="Cancel"
          type="button"
          onClick={() => setShowImagePopup(false)}
          classNames="w-full text-[14px]  rounded-lg p-[5px] bg-red-50 border-none mt-5 font-medium text-red-400 border-red-100"
        />
        <Button
          label="Upload"
          type="submit"
          classNames="w-full text-[14px]  rounded-lg p-[5px] bg-black border-none mt-5 font-medium"
        />
      </div>
    </form>
  );
};

export default FileUpload;
