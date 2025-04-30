import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../FireBase";
import UserContext, { UserContextProps } from "../../../context/UserProvider";

export const useBasicProfileInfo = () => {
  const [showImagePopup, setShowImagePopup] = useState<boolean>(false);
  const [initialLetter, setInitialLetter] = useState<string>("");
  const userContextData = useContext<UserContextProps>(UserContext);
  const { userDetails, email, fullName, fullNameIntial, setPhoto, photo } =
    userContextData;

  useEffect(() => {
    const letters =
      fullNameIntial && fullNameIntial !== " "
        ? fullNameIntial
        : userDetails?.userName?.charAt(0).toUpperCase();
    setInitialLetter(letters);
  }, [userDetails, fullNameIntial]);

  //Remove profile picture
  const handleRemovePicture = async () => {
    if (photo) {
      if (window.confirm("Do you want to remove profile picture?")) {
        const docRef = doc(db, "Users", email);
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
