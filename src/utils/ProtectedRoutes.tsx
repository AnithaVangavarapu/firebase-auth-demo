import { useState, useEffect } from "react";
import { auth, db } from "../FireBase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const [isUser, setIsUser] = useState<boolean>(false);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const userdoc = await getDoc(docRef);
        const userData = userdoc.data();
        if (userData) {
          console.log(typeof userData);
          setIsUser(true);
          setUserDetails(userData);
        } else {
          setIsUser(false);
          setUserDetails({});
        }
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, [auth]);
  console.log(isUser);

  return isUser ? <Outlet context={userDetails} /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
