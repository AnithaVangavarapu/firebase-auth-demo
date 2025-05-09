import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../FireBase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext, { UserContextProps } from "../context/UserProvider";

const GoogleSignin = () => {
  const userContextData = useContext<UserContextProps>(UserContext);
  const { setIsAuth, setIsGoogleSignIn } = userContextData;
  const navigate = useNavigate();

  const googleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      //Prevents automatic signin if user already logged in browser with single account
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const userData = result.user;
        if (userData.email !== null) {
          const getDocRef = await getDoc(doc(db, "Users", userData.email));

          if (getDocRef.exists()) {
            localStorage.setItem("isUserLoggedIn", "true");
            setIsAuth(true);
            setIsGoogleSignIn(true);
            navigate("/");
          } else {
            await setDoc(doc(db, "Users", userData.email), {
              email: userData.email,
              userName: userData.displayName,
              password: "",
              photo: userData.photoURL,
            });
            localStorage.setItem("isUserLoggedIn", "true");
            setIsAuth(true);
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    }
  };

  return (
    <div className="flex flex-col items-center m-1">
      <div
        onClick={googleSignin}
        className="flex border border-black gap-2 bg-black items-center rounded-lg cursor-pointer p-[7px] font-medium"
      >
        <img
          src="/google_logo.png
        "
          className="w-[20px] h-[20px] p-0.5 m-0.5"
        />
        <span className="text-sm text-white pr-0.5">Sign in with Google</span>
      </div>
    </div>
  );
};

export default GoogleSignin;
