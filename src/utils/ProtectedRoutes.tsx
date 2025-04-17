import { useState, useEffect } from "react";
import { auth, db } from "../FireBase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [uid, setUid] = useState<string>("");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid);
        console.log(user);
        localStorage.setItem("isUserLoggedIn", "true");
        const docRef = doc(db, "Users", user.uid);
        const userdoc = await getDoc(docRef);
        const userData = userdoc.data();
        if (userData) {
          setUserDetails(userData);
        }
      }
      setLoading(false);
    });
  }, [auth]);
  if (loading) return <div>Loading...</div>;
  const contextData = {
    userDetails: userDetails,
    userId: uid,
  };
  if (localStorage.getItem("isUserLoggedIn")) {
  }
  return localStorage.getItem("isUserLoggedIn") ? (
    <Outlet context={contextData} />
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default ProtectedRoutes;
