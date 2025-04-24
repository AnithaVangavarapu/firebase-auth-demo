import { useForm } from "react-hook-form";
import Button from "../CommonComponents/Button";
import Input from "../CommonComponents/Input";
import { useOutletContext } from "react-router-dom";
import { contextProps } from "../pages/Dashboard/profile/useProfile";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../FireBase";
import { toast } from "react-toastify";
interface FileUploadFields {
  photo: Array<File>;
}
interface FileUploadProps {
  setShowImagePopup: (val: boolean) => void;
  setPhoto: (val: string) => void;
}

const FileUpload = ({ setShowImagePopup, setPhoto }: FileUploadProps) => {
  const { register, handleSubmit } = useForm<FileUploadFields>();

  const userData = useOutletContext<contextProps>();
  const userId: string = userData.userEmail;

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
        // alert("Profile picture updated successfully");
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
            "border rounded-lg file:bg-black text-[14px] file:text-white file:p-2 ",
          div: "border-none p-0",
          label: "text-center pb-6 text-[20px] font-medium ",
        }}
      />
      <div className="flex gap-3 mt-3 mx-3">
        <Button
          label="Cancel"
          type="button"
          onClick={() => setShowImagePopup(false)}
          classNames="w-full text-sm  rounded-lg p-[5px] bg-black border-none mt-5 font-medium"
        />
        <Button
          label="Upload"
          type="submit"
          classNames="w-full text-sm  rounded-lg p-[5px] bg-black border-none mt-5 font-medium"
        />
      </div>
    </form>
  );
};

export default FileUpload;
