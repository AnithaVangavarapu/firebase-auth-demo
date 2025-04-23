import clsx from "clsx";
import { twMerge } from "tw-merge";
import { Controller } from "react-hook-form";
interface ClassNamesProps {
  label?: string;
  input?: string;
  div?: string;
}
interface FileUploadProps {
  accept?: string;
  label?: string;
  control: any;
  classnames?: ClassNamesProps;
  name: string;
}
const FileUpload = ({
  label,
  accept,
  control,
  classnames,
  name,
}: FileUploadProps) => {
  return (
    <div className={twMerge(clsx("", classnames?.div))}>
      <label className={twMerge(clsx("", classnames?.label))}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="file"
            accept={accept}
            className={twMerge(clsx("", classnames?.input))}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                field.onChange(e.target.files[0]);
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default FileUpload;
