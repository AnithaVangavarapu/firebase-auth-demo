import { twMerge } from "tw-merge";
import { Button, Input, InputPassword } from "../../temporaryRename";
import { useSignUp } from "./useSignUP";
import clsx from "clsx";
const classNames = {
  label: "text-[12px] text-gray-600 pt-3 pb-1",
  div: "border-gray-300 rounded-lg py-[5px] mb-1",
  input: "text-[14px] p-1 font-medium",
  error: "text-red-500",
};

const SignUp = () => {
  const {
    handleSubmit,
    register,
    handleSignup,
    errors,
    password,
    Link,
    error,
  } = useSignUp();

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className=" border  rounded-[20px] border-gray-200  flex  flex-col justify-evenly shadow-md lg:w-[25%]  py-8 px-6 bg-white">
        <h2 className="text-lg font-medium pb-1">Sign Up</h2>
        {error && (
          <p className="text-red-500 text-[12px] text-center mt-4">{error}</p>
        )}
        <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col ">
          <Input
            register={register}
            error={errors.userName?.message}
            name="userName"
            rules={{ required: "Username is required" }}
            label="Username"
            classnames={classNames}
            placeholder="Username"
          />
          <Input
            register={register}
            error={errors.email?.message}
            name="email"
            type="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z]+\.[a-z]{2,}$/i,
                message: "Enter Valid mail",
              },
            }}
            label="Email"
            classnames={classNames}
            placeholder="Email"
          />
          <InputPassword
            register={register}
            error={errors.password?.message}
            name="password"
            type="password"
            rules={{
              required: "Password is required",
              minLength: { value: 8, message: "Minimum password length is 8" },
              maxLength: { value: 10, message: "Maximum passwor length is 10" },
            }}
            label="Password"
            classnames={classNames}
            placeholder="Password"
          />

          <InputPassword
            register={register}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
            type="password"
            rules={{
              required: "Confirm Password is required",
              validate: {
                confirmPasswordMatch: (value: string) =>
                  value === password || "Password don't match",
              },
            }}
            label="Confirm Password"
            classnames={classNames}
            placeholder="Confirm Password"
          />
          <Button
            label="Sign Up"
            classNames={twMerge(
              clsx(
                "w-full text-sm rounded-lg  bg-black border-none p-[10px] mt-6 font-medium ",
                Object.keys(errors).length > 0 && "bg-gray-500"
              )
            )}
          />
          <div className="text-center mt-3 text-[12px]">
            <span className="">Already have account?&nbsp;</span>
            <Link
              to={"/signin"}
              className={twMerge(clsx("underline  font-medium"))}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
