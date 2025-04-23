import { useState, useEffect } from "react";
import { auth, db } from "../FireBase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar, Sidemenu } from "../pages/Dashboard";
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
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen flex-col bg-black">
        <img
          src="/loading.gif
    "
          className="w-[100px] h-[100px] p-0.5 m-0.5"
        />
        <p className=" text-white text-lg font-medium"> LOADING...</p>
      </div>
    );
  const contextData = {
    userDetails: userDetails,
    userId: uid,
  };

  return localStorage.getItem("isUserLoggedIn") ? (
    <div className="max-w-full ">
      <div className="">
        <Navbar userDetails={userDetails} />
      </div>
      <div className="grid grid-cols-12 max-w-full">
        <div className="bg-black text-white col-span-2">
          <Sidemenu />
        </div>
        <div className="col-span-10 ">
          <Outlet context={contextData} />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default ProtectedRoutes;
