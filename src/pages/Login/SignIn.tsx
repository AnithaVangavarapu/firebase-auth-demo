import { useForm } from "react-hook-form";
import { Button, Input, InputPassword } from "../../temporaryRename";
import { SignInProps, useSignIn } from "./useSignIn";
import { GoogleSignin } from "../../Components";

const classNames = {
  label: "text-[12px] text-gray-600 pt-4 pb-1",
  div: "border-gray-300 rounded-lg py-[5px]",
  input: "text-[14px] p-1 font-medium",
  error: "text-red-500 mt-0.5",
};

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInProps>();
  const { handleLogin, authError, Link, loading } = useSignIn();

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="border border-gray-200 rounded-[20px] flex flex-col justify-evenly shadow-md  lg:w-[25%]  py-8 px-6 bg-white">
        <h1 className="text-lg font-medium">Sign In</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
          {authError && (
            <p className="text-sm text-red-700 text-center ">{authError}</p>
          )}
          <Input
            register={register}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z]+\.[a-z]{2,}$/i,
                message: "Enter valid email",
              },
            }}
            label="Email"
            classnames={classNames}
            error={errors.email?.message}
            placeholder="Email"
          />
          <InputPassword
            register={register}
            name="password"
            rules={{
              required: "Password is required",
            }}
            label="Password"
            classnames={classNames}
            error={errors.password?.message}
            type="password"
            placeholder="Password"
          />
          <div className="text-end text-[12px] underline mt-1">
            Forget Password?
          </div>
          <Button
            label={loading ? "Loading" : "Sign In"}
            classNames={`w-full text-sm  rounded-lg p-[10px] bg-black border-none mt-5 font-medium `}
            disable={loading}
          />
        </form>
        <div className=" text-[12px] text-center mt-4">
          <span className="">New user?&nbsp; </span>

          <Link to={"/signup"} className=" underline font-medium">
            Sign Up
          </Link>
        </div>
        <div className="text-center text-[12px] m-0.5">-- Or--</div>
        <GoogleSignin />
      </div>
    </div>
  );
};

export default SignIn;
