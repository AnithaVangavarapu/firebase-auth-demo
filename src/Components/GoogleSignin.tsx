import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "../CommonComponents";
import { auth, db } from "../FireBase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const GoogleSignin = () => {
  const navigate = useNavigate();
  const googleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
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
        });
        navigate("/profile");
      }
      console.log("user logged in successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center pb-2 pt-0">
      <p>-- Or--</p>
      <Button label="Google Signin" onClick={googleSignin} />
    </div>
  );
};

export default GoogleSignin;
