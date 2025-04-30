import { auth, db } from "../../../FireBase";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import UserContext, { UserContextProps } from "../../../context/UserProvider";
import { useNavigate } from "react-router-dom";
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
  const userContextData = useContext<UserContextProps>(UserContext);
  const [initialLetter, setInitialLetter] = useState<string>("");
  const {
    userDetails,
    email,
    fullName,
    fullNameIntial,
    setPhoto,
    photo,
    isAuth,
    isGoogleSignIn,
  } = userContextData;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<ProfileUpdateProps>();
  const navigate = useNavigate();

  const new_password = watch("newPassword");
  const current_password = watch("currentPassword");

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [isAuth]);

  useEffect(() => {
    const newDefaultValues: object = {
      firstName: userDetails.firstName ? userDetails.firstName : "",
      lastName: userDetails.lastName ? userDetails.lastName : "",
      email: userDetails.email ? userDetails.email : "",
      userName: userDetails.userName ? userDetails.userName : "",
    };
    reset(newDefaultValues);
  }, [userDetails]);

  useEffect(() => {
    const letters =
      fullNameIntial && fullNameIntial !== " "
        ? fullNameIntial
        : userDetails?.userName?.charAt(0).toUpperCase();
    setInitialLetter(letters);
  }, [userDetails, fullNameIntial]);

  //Submitting updated data
  const handleDataChange = async (data: ProfileUpdateProps) => {
    const docRef = doc(db, "Users", email);
    try {
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
                toast.success("Password updated !", {
                  position: "top-right",
                  className: "text-sm",
                });
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
          setTimeout(() => {
            window.location.reload();
          }, 4000);
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
    isGoogleSignIn,
  };
};
