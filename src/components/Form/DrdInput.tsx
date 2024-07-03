import { Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  prefix?: any;
};

const DrdInput = ({
  type,
  name,
  label,
  placeholder,
  disabled,
  required,
  prefix,
}: TInputProps) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem label={label} required={required}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              placeholder={placeholder}
              disabled={disabled}
              prefix={prefix}
              allowClear
            />
            {error && <small className="text-red-500">{error.message}</small>}
          </FormItem>
        )}
      />
    </div>
  );
};

export default DrdInput;
