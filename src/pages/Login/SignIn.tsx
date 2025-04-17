import { useForm } from "react-hook-form";
import { Button, Input, InputPassword } from "../../CommonComponents";
import { SignInProps, useSignIn } from "./useSignIn";
import { GoogleSignin } from "../../Components";
const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInProps>();
  const { handleLogin, authError, Link } = useSignIn();
  const classNames = {
    label: "absolute top-[-10px] bg-white left-4 text-[15px]",
    div: "border-blue-400 rounded-[3px] shadow-md pt-2 pb-1",
  };
  return (
    <div className="container mx-auto border w-fit rounded-md border-blue-200 p-10 flex items-center flex-col justify-center shadow-md">
      <h1 className="mb-5 underline font-medium text-blue-500">SignIn</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col items-center gap-3 mx-5"
      >
        {authError && <p className="text-sm text-red-400 mb-2">{authError}</p>}
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
          label="SignIn"
          classNames="w-full text-sm py-1 rounded-[3px] shadow-md "
        />
      </form>
      <div className="text-sm py-1">
        <span className="">New user? </span>
        <Link to={"/signup"} className="text-blue-500 underline">
          SignUp
        </Link>
      </div>
      <GoogleSignin />
    </div>
  );
};

export default SignIn;
