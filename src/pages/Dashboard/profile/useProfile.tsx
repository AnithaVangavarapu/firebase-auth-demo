import { auth, db } from "../../../FireBase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DocumentData, getDoc, doc, updateDoc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
export interface contextProps {
  userDetails: DocumentData;
  userEmail: string;
  fullName: string;
  setFullName: (val: string) => void;
  fullNameIntial: string;
  setFullNameIntial: (val: string) => void;
  setPhoto: (val: string) => void;
  photo: string;
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
  div: "border-gray-200 rounded-lg p-1 ",
  label: "text-[12px] pb-1 text-gray-600 font-medium",
  input: "text-[14px] p-1 font-medium",
  error: "text-red-500 mt-0.5",
};
export const useProfile = () => {
  const { userEmail, fullName, fullNameIntial, setPhoto, photo } =
    useOutletContext<contextProps>();
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<ProfileUpdateProps>();
  const [showImagePopup, setShowImagePopup] = useState<boolean>(false);
  const new_password = watch("newPassword");
  const current_password = watch("currentPassword");

  const fetchUserDetails = async () => {
    const docRef = doc(db, "Users", userEmail);
    const userdoc = await getDoc(docRef);
    const userData = userdoc.data();
    if (userData) {
      setUserDetails(userData);
      const newDefaultValues: object = {
        firstName: userData.firstName ? userData.firstName : "",
        lastName: userData.lastName ? userData.lastName : "",
        email: userData.email ? userData.email : "",
        userName: userData.userName ? userData.userName : "",
      };
      reset(newDefaultValues);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [showImagePopup]);

  const initialLetter =
    fullNameIntial !== " "
      ? fullNameIntial
      : userDetails?.userName?.charAt(0).toUpperCase();

  const handleDataChange = async (data: ProfileUpdateProps) => {
    console.log("changed data", data);
    const docRef = doc(db, "Users", userEmail);
    try {
      console.log("currentPassword", data.currentPassword);
      if (data.currentPassword !== undefined) {
        if (data.currentPassword === data.newPassword) {
          // alert("Current and new password should not be same");
          toast.warning("Current and new password should not be same !", {
            position: "top-center",
            className: "text-sm",
          });
          return;
        } else {
          const user = auth.currentUser;
          if (user !== null && data.newPassword) {
            updatePassword(user, data.newPassword)
              .then(() => {
                const updateNewPassword = {
                  password: data.newPassword,
                };
                updateDoc(docRef, updateNewPassword);
              })
              .catch((error) => {
                // alert("Something went wrong while updating Password");
                toast.error("Something went wrong while updating Password !", {
                  position: "top-center",
                  className: "text-sm",
                });
                console.log(error);
                return;
              });
          }
        }
      }
      const updateData = {
        firstName: data.firstName,
        lastName: data.lastName,
      };
      await updateDoc(docRef, updateData)
        .then(() => {
          // alert("Data Updated");
          toast.success("Data updated Successfully !", {
            position: "top-center",
            className: "text-sm",
          });
          window.location.reload();
        })
        .catch((error) => {
          // alert("Something went wrong"),
          toast.error("Something went wrong !", {
            position: "top-center",
            className: "text-sm",
          });
          console.log(error);
        });
    } catch (error) {}
  };
  const handleRemovePicture = async () => {
    if (userDetails.photo) {
      if (window.confirm("Do you want to remove profile picture?")) {
        const docRef = doc(db, "Users", userEmail);
        const updatePhoto = {
          photo: "",
        };
        await updateDoc(docRef, updatePhoto)
          .then(() => {
            // alert("Profile picture removed");
            toast.success("Profile picture removed", {
              position: "top-center",
              className: "text-sm",
            });
            setPhoto("");
            // window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            // alert("Something went wrong");
            toast.error("Something went wrong !", {
              position: "top-center",
              className: "text-sm",
            });
          });
      } else {
        return;
      }
    } else {
      // alert("There is no profile picture to remove");
      toast.warning("There is no profile picture to remove !", {
        position: "top-center",
        className: "text-sm",
      });
    }
  };
  return {
    handleSubmit,
    handleDataChange,
    register,
    setShowImagePopup,
    userDetails,
    initialLetter,
    classNames,
    showImagePopup,
    new_password,
    current_password,
    errors,
    handleRemovePicture,
    fullName,
    setPhoto,
    isDirty,
    photo,
  };
};
