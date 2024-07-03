import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import Password from "antd/es/input/Password";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
};

const DrdPassInput = ({ type, name, label, placeholder }: TInputProps) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem label={label}>
            <Password
              placeholder={placeholder}
              {...field}
              type={type}
              id={name}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            {error && <small className="text-red-500">{error.message}</small>}
          </FormItem>
        )}
      />
    </div>
  );
};

export default DrdPassInput;
