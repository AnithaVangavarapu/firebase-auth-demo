import { auth, db } from "../../../FireBase";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { contextProps } from "../../../utils/ProtectedRoutes";
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
  label: "pb-1 text-gray-600 font-medium",
  input: "p-1 font-medium",
  error: "text-red-500 mt-0.5",
};

export const useProfile = () => {
  const { userDetails, userEmail, fullName, fullNameIntial, setPhoto, photo } =
    useOutletContext<contextProps>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<ProfileUpdateProps>();

  const new_password = watch("newPassword");
  const current_password = watch("currentPassword");

  useEffect(() => {
    const newDefaultValues: object = {
      firstName: userDetails.firstName ? userDetails.firstName : "",
      lastName: userDetails.lastName ? userDetails.lastName : "",
      email: userDetails.email ? userDetails.email : "",
      userName: userDetails.userName ? userDetails.userName : "",
    };
    reset(newDefaultValues);
  }, []);

  const initialLetter =
    fullNameIntial !== " "
      ? fullNameIntial
      : userDetails?.userName?.charAt(0).toUpperCase();

  //Submitting updated data
  const handleDataChange = async (data: ProfileUpdateProps) => {
    console.log("changed data", data);
    const docRef = doc(db, "Users", userEmail);
    try {
      console.log("currentPassword", data.currentPassword);
      if (data.currentPassword !== undefined) {
        if (data.currentPassword === data.newPassword) {
          toast.warning("Current and new password should not be same !", {
            position: "top-right",
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
                toast.error("Something went wrong while updating Password !", {
                  position: "top-right",
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
          toast.success("Data updated Successfully !", {
            position: "top-right",
            className: "text-sm",
          });
          window.location.reload();
        })
        .catch((error) => {
          toast.error("Something went wrong !", {
            position: "top-right",
            className: "text-sm",
          });
          console.log(error);
        });
    } catch (error) {}
  };

  return {
    handleSubmit,
    handleDataChange,
    register,
    userDetails,
    initialLetter,
    classNames,
    new_password,
    current_password,
    errors,
    fullName,
    setPhoto,
    isDirty,
    photo,
  };
};
