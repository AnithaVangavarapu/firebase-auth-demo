import { useState } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../FireBase";
import { contextProps } from "../../../utils/ProtectedRoutes";

export const useBasicProfileInfo = () => {
  const [showImagePopup, setShowImagePopup] = useState<boolean>(false);
  const { userDetails, userEmail, fullName, fullNameIntial, setPhoto, photo } =
    useOutletContext<contextProps>();

  const initialLetter =
    fullNameIntial !== " "
      ? fullNameIntial
      : userDetails?.userName?.charAt(0).toUpperCase();

  //Remove profile picture
  const handleRemovePicture = async () => {
    if (photo) {
      if (window.confirm("Do you want to remove profile picture?")) {
        const docRef = doc(db, "Users", userEmail);
        const updatePhoto = {
          photo: "",
        };
        await updateDoc(docRef, updatePhoto)
          .then(() => {
            toast.success("Profile picture removed", {
              position: "top-right",
              className: "text-sm",
            });
            setPhoto("");
          })
          .catch((error) => {
            console.log(error);

            toast.error("Something went wrong !", {
              position: "top-right",
              className: "text-sm",
            });
          });
      } else {
        return;
      }
    } else {
      toast.warning("There is no profile picture to remove !", {
        position: "top-right",
        className: "text-sm",
      });
    }
  };

  return {
    showImagePopup,
    setShowImagePopup,
    handleRemovePicture,
    fullName,
    fullNameIntial,
    photo,
    setPhoto,
    initialLetter,
  };
};
