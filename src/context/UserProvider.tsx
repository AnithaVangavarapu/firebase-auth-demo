import React, { createContext, useState, useEffect } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../FireBase";

export interface UserContextProps {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
  userDetails: DocumentData;
  email: string;
  fullName: string;
  setFullName: (val: string) => void;
  fullNameIntial: string;
  setFullNameIntial: (val: string) => void;
  setPhoto: (val: string) => void;
  photo: string;
  setUserDetails: (val: DocumentData) => void;
  setEmail: (val: string) => void;
  isGoogleSignIn: boolean;
  setIsGoogleSignIn: (val: boolean) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
}

interface UserProiderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({
  isAuth: false,
  setIsAuth: () => {},
  userDetails: {},
  email: "",
  fullName: "",
  setFullName: () => {},
  fullNameIntial: "",
  setFullNameIntial: () => {},
  setPhoto: () => {},
  photo: "",
  setUserDetails: () => {},
  setEmail: () => {},
  isGoogleSignIn: false,
  setIsGoogleSignIn: () => {},
  loading: false,
  setLoading: () => {},
});
export default UserContext;

export const UserProvider: React.FC<UserProiderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [fullNameIntial, setFullNameIntial] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [isGoogleSignIn, setIsGoogleSignIn] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isUserLoggedIn") === "true";
    if (authStatus) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  // Keep isAuth in sync with localStorage
  useEffect(() => {
    localStorage.setItem("isUserLoggedIn", String(isAuth));
  }, [isAuth]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && user.email !== null) {
        setEmail(user.email);
        const docRef = doc(db, "Users", user.email);
        const userdoc = await getDoc(docRef);
        const userData = userdoc.data();
        if (userData) {
          setUserDetails(userData);
          const FirstName = userData.firstName ? userData.firstName : "";
          const fInitial = userData.firstName
            ? userData.firstName?.charAt(0).toUpperCase()
            : "";
          const LastName = userData.lastName ? userData.lastName : "";
          const lIntial = userData.lastName
            ? userData.lastName?.charAt(0).toUpperCase()
            : "";
          const FullName = FirstName + " " + LastName;
          const FullNameIntial = fInitial + lIntial;
          setFullName(FullName);
          setFullNameIntial(FullNameIntial);
          if (userData.photo !== " ") {
            setPhoto(userData.photo);
          }
        }
      }
    });
  }, [auth]);

  return (
    <UserContext
      value={{
        isAuth,
        setIsAuth,
        userDetails,
        setUserDetails,
        email,
        setEmail,
        fullName,
        setFullName,
        fullNameIntial,
        setFullNameIntial,
        photo,
        setPhoto,
        isGoogleSignIn,
        setIsGoogleSignIn,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext>
  );
};
