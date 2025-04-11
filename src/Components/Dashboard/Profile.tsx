import React, { useEffect, useState } from "react";
import { auth, db } from "../FireBase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Button } from "../../CommonComponents";

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<DocumentData>({});
  const handleLogout = async () => {
    try {
      await auth.signOut();

      window.location.href = "/login";
      console.log("user logged out");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const userdoc = await getDoc(docRef);
        const userData = userdoc.data();
        if (userData) {
          console.log(typeof userData);

          setUserDetails(userData);
        }
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, [auth]);
  return (
    <div className="flex justify-center border p-2 rounded-md w-fit border-blue-200">
      {userDetails ? (
        <div className="">
          <div>{userDetails.userName}</div>
          <div>{userDetails.email}</div>
          <Button label="Logout" onClick={handleLogout} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
