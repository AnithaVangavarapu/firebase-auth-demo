import { useState, useEffect } from "react";
import { auth, db } from "../FireBase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar, Sidemenu } from "../pages/Dashboard";
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
const ProtectedRoutes = () => {
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [fullNameIntial, setFullNameIntial] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && user.email !== null) {
        setEmail(user.email);
        console.log(user);
        localStorage.setItem("isUserLoggedIn", "true");
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
  const contextData: contextProps = {
    userDetails: userDetails,
    userEmail: email,
    fullName: fullName,
    setFullName: setFullName,
    fullNameIntial: fullNameIntial,
    setFullNameIntial: setFullNameIntial,
    photo: photo,
    setPhoto: setPhoto,
  };

  return localStorage.getItem("isUserLoggedIn") ? (
    <div className="max-w-full ">
      <div className="">
        <Navbar
          userDetails={userDetails}
          fullName={fullName}
          fullNameIntial={fullNameIntial}
          photo={photo}
        />
      </div>
      <div className="grid grid-cols-12 max-w-full border-t-[1px] rounded-r-lg border-gray-200">
        <div className="bg-black text-white col-span-2 lg:min-h-[849px] ">
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
