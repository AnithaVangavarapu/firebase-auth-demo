import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
interface RegisterErrors {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const useRegister = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const navigate = useNavigate();
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    if (isUserLoggedIn) navigate("/profile");
  }, []);
  const validateInputs = (
    userName: string,
    password: string,
    email: string,
    confirmPassword: string
  ) => {
    const pushErrors: RegisterErrors = {};
    if (!userName.trim()) {
      pushErrors.userName = "Enter username";
    } else if (!/^[a-z0-9._%+-]+@[a-z]+\.[a-z]{2,}$/i.test(email.trim())) {
      pushErrors.email = "Enter valid email";
    } else if (!password.trim()) {
      pushErrors.password = "Enter password";
    } else if (password.length < 8 || password.length > 10) {
      pushErrors.password = "Password should contain 6 to 8 characters";
    } else if (password !== confirmPassword) {
      pushErrors.confirmPassword = "Password don't match";
    }
    return pushErrors;
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalErrors = validateInputs(
      userName,
      password,
      email,
      confirmPassword
    );
    setErrors(totalErrors);
    if (Object.keys(totalErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = auth.currentUser;
        console.log(currentUser);
        if (currentUser) {
          await setDoc(doc(db, "Users", currentUser.uid), {
            email: currentUser.email,
            userName: userName,
            password: password,
          });
          navigate("/profile");
        }
        console.log("user registered successfully");
      } catch (error: any) {
        toast.error(String(error), { position: "top-center" });
        console.log(error);
      }
    }
  };
  return {
    userName,
    email,
    password,
    confirmPassword,
    errors,
    setUserName,
    setEmail,
    setPassword,
    setconfirmPassword,
    handleRegister,
  };
};
