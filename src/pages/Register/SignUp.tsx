import { Button, Input, InputPassword } from "../../CommonComponents";
import { useSignUp } from "./useSignUP";

const classNames = {
  label: "absolute top-[-10px] bg-white left-5 text-[15px]",
  div: "border-gray-400 rounded-lg  pt-2 pb-1 lg:h-10",
};

const SignUp = () => {
  const { handleSubmit, register, handleSignup, errors, password, Link } =
    useSignUp();

  return (
    <div className="flex h-screen justify-center items-center ">
      <div className=" border  rounded-[20px] border-gray-200  flex  flex-col justify-evenly shadow-md lg:w-[25%]  p-2">
        <h2 className=" text-blue-800 font-medium underline text-center sm:pb-2">
          SignUp
        </h2>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col gap-3"
        >
          <Input
            register={register}
            error={errors.userName?.message}
            name="userName"
            rules={{ required: "UserName is required" }}
            label="UserName"
            classnames={classNames}
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
          />

          <InputPassword
            register={register}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
            type="password"
            rules={{
              required: "Confirm Password is required",
              validate: {
                confirmPasswordMatch: (value) =>
                  value === password || "Password don't match",
              },
            }}
            label="Confirm Password"
            classnames={classNames}
          />
          <Button
            label="Sign Up"
            classNames="w-full text-sm rounded-lg py-1 bg-blue-800 border-none p-2"
          />
          <div className="text-center">
            <span className="text-[13px]">Already have account? </span>
            <Link
              to={"/signin"}
              className="text-blue-800 underline text-[14px]"
            >
              SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
