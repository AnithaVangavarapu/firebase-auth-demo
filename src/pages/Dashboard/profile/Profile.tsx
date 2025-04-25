import { Button, Input, InputPassword } from "../../../CommonComponents";
import { useProfile } from "./useProfile";
import BasicProfileInfo from "./BasicProfileInfo";

const Profile: React.FC = () => {
  const {
    handleSubmit,
    handleDataChange,
    register,
    classNames,
    new_password,
    current_password,
    errors,
    isDirty,
  } = useProfile();

  return (
    <div className="flex flex-col max-w-full mx-14 relative mt-14">
      <BasicProfileInfo />
      <form onSubmit={handleSubmit(handleDataChange)}>
        <div className="border-[1px] rounded-lg flex  py-5 px-6 mt-5 flex-col border-gray-200 bg-white">
          <div className="flex flex-col">
            <span className="font-medium text-[14px]">
              Personal Information
            </span>
            <span className="text-gray-400 text-[12px] font-medium">
              Update your personal information
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 w-[60%] mt-5">
            <Input
              label="First Name"
              register={register}
              name="firstName"
              classnames={classNames}
              error={errors?.firstName?.message}
              rules={{
                pattern: {
                  value: /^[a-zA-Z]/,
                  message: "Enter valid firstname",
                },
              }}
            />
            <Input
              label="Last Name"
              register={register}
              name="lastName"
              classnames={classNames}
              error={errors?.lastName?.message}
              rules={{
                pattern: {
                  value: /^[a-zA-Z]/,
                  message: "Enter valid lastname",
                },
              }}
            />
            <Input
              label="Email"
              register={register}
              name="email"
              readonly={true}
              classnames={classNames}
            />
            <Input
              label="Username"
              register={register}
              name="userName"
              readonly={true}
              classnames={classNames}
            />
          </div>
        </div>
        <div className="border-[1px] border-gray-200 rounded-lg flex  py-5 px-6 mt-5 flex-col bg-white">
          <div className="flex flex-col">
            <span className="font-medium text-[14px]">Change Password</span>
            <span className="text-gray-400 text-[12px] font-medium">
              Your new password length should be 8-10 letters
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-[60%] mt-5">
            <div className="col-span-2">
              <InputPassword
                label="Current Password"
                register={register}
                name="currentPassword"
                classnames={classNames}
                type="password"
                placeholder="Enter current Password"
                rules={{
                  minLength: {
                    value: 8,
                    message: "Minimum password length is 8",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum passwor length is 10",
                  },
                }}
                error={errors?.currentPassword?.message}
              />
            </div>
            <InputPassword
              label="New Password"
              register={register}
              name="newPassword"
              classnames={classNames}
              type="password"
              rules={{
                required: current_password && "New Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum password length is 8",
                },
                maxLength: {
                  value: 10,
                  message: "Maximum passwor length is 10",
                },
              }}
              error={errors?.newPassword?.message}
              readonly={current_password ? false : true}
            />
            <InputPassword
              label="Confirm New Password"
              register={register}
              name="confirmNewPassword"
              classnames={classNames}
              type="password"
              rules={{
                required:
                  current_password && "Confirm New Password is required",
                validate: {
                  confirmPasswordMatch: (value) =>
                    value === new_password || "Password don't match",
                },
              }}
              error={errors?.confirmNewPassword?.message}
              readonly={current_password ? false : true}
            />
          </div>
        </div>
        <Button
          label="Update Changes"
          classNames={`mx-4.5 mt-8 bg-black text-[14px] p-1 border-black font-medium rounded-lg `}
          type="submit"
          disable={!isDirty}
        />
      </form>
    </div>
  );
};

export default Profile;
