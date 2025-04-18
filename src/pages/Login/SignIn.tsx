import { useForm } from "react-hook-form";
import { Button, Input, InputPassword } from "../../CommonComponents";
import { SignInProps, useSignIn } from "./useSignIn";
import { GoogleSignin } from "../../Components";
const classNames = {
  label: "absolute top-[-10px] bg-white left-5 text-[15px]",
  div: "border-gray-400 rounded-lg  pt-2 pb-1 lg:h-10",
};
const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInProps>();
  const { handleLogin, authError, Link } = useSignIn();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border border-gray-200 rounded-[20px] flex flex-col justify-evenly shadow-md  lg:w-[25%]  p-3">
        <h1 className="underline font-medium text-blue-800 text-center text-[18px] ">
          SignIn
        </h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-3 "
        >
          {authError && (
            <p className="text-sm text-red-400 text-center ">{authError}</p>
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
          />
          <Button
            label="Sign In"
            classNames="w-full text-sm py-1 rounded-lg p-2 bg-blue-800 border-none"
          />
        </form>
        <div className="  text-center">
          <span className="text-[13px]">New user? </span>
          <Link to={"/signup"} className="text-blue-800 underline text-[14px]">
            SignUp
          </Link>
        </div>
        <div className="text-center text-[12px]">-- Or--</div>
        <GoogleSignin />
      </div>
    </div>
  );
};

export default SignIn;
