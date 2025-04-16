import { Button } from "../../CommonComponents";
import { useSignUp } from "./useSignUP";
import { Input } from "../../CommonComponents";

const SignUp = () => {
  const { handleSubmit, register, handleSignup, errors, password, Link } =
    useSignUp();
  const classNames = {
    input: "border-blue-400 rounded-[2px] shadow-md",
  };
  return (
    <div className="container mx-auto border w-fit rounded-md border-blue-200  flex items-center flex-col justify-center shadow-md">
      <h2 className="my-2 text-blue-500 font-medium underline">SignUp</h2>
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="flex flex-col items-center px-10 gap-3"
      >
        <Input
          register={register}
          error={errors.userName?.message}
          name="userName"
          rules={{ required: "UserName is required" }}
          placeholder="UserName"
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
          placeholder="Email"
          classnames={classNames}
        />
        <Input
          register={register}
          error={errors.password?.message}
          name="password"
          type="password"
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Minimum password length is 8" },
            maxLength: { value: 10, message: "Maximum passwor length is 10" },
          }}
          placeholder="Password"
          classnames={classNames}
        />

        <Input
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
          placeholder="Confirm Password"
          classnames={classNames}
        />
        <Button label="SignUp" classNames="w-full text-sm rounded-[3px] py-1" />
        <div className="text-sm mb-2">
          <span className="">Already have account? </span>
          <Link to={"/signin"} className="text-blue-500 underline">
            SignIn
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
