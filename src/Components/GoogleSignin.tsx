import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../FireBase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const GoogleSignin = () => {
  const navigate = useNavigate();
  const googleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      //Prevents automatic signin if user already logged in browser with single account
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      if (result.user) {
        const userData = result.user;
        await setDoc(doc(db, "Users", userData.uid), {
          email: userData.email,
          userName: userData.displayName,
          password: "",
          photo: userData.photoURL,
        });
        navigate("/dashboard");
      }
      console.log("user logged in successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div
        onClick={googleSignin}
        className="flex border border-blue-800 gap-2 bg-blue-800 items-center rounded-[3px] cursor-pointer"
      >
        <img
          src="/google_logo.png
        "
          className="w-[20px] h-[20px] bg-white p-0.5 m-0.5"
        />
        <span className="text-sm text-white pr-0.5">Sign in with Google</span>
      </div>
    </div>
  );
};

export default GoogleSignin;
