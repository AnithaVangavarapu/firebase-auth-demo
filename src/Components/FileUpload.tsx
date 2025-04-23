import { useForm } from "react-hook-form";
import Button from "../CommonComponents/Button";
import Input from "../CommonComponents/Input";
import { useOutletContext } from "react-router-dom";
import { contextProps } from "../pages/Dashboard/profile/useProfile";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../FireBase";

interface FileUploadFields {
  photo: Array<File>;
}
interface FileUploadProps {
  setShowImagePopup: (val: boolean) => void;
}
const FileUpload = ({ setShowImagePopup }: FileUploadProps) => {
  const { register, handleSubmit } = useForm<FileUploadFields>();

  const userData = useOutletContext<contextProps>();
  const userId: string = userData.userId;

  const handleUploadFile = async (data: FileUploadFields) => {
    // console.log(data.photo);
    // const imageRef = data.photo[0].name;
    console.log(URL.createObjectURL(data.photo[0]));
    const imageURL = window.URL.createObjectURL(data.photo[0]);

    const updatePhoto = {
      photo: imageURL,
    };
    const docRef = doc(db, "Users", userId);
    console.log(docRef);
    await updateDoc(docRef, updatePhoto)
      .then(() => {
        alert("Profile picture updated successfully");
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
        classnames={{ input: "" }}
      />
      <div className="flex gap-3 mt-4">
        <Button
          label="Cancel"
          type="button"
          onClick={() => setShowImagePopup(false)}
          classNames="bg-black border-black text-[10px] font-medium rounded-[2px]"
        />
        <Button
          label="Upload"
          type="submit"
          classNames="bg-black border-black text-[10px] font-medium rounded-[2px]"
        />
      </div>
    </form>
  );
};

export default FileUpload;
