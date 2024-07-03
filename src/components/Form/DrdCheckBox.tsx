import { Checkbox } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  required?: boolean;
};

const DrdCheckBox = ({ name, label, required }: TInputProps) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <Checkbox {...field} id={name}>
              {required && <span className="text-red-500">*</span>} {label}
            </Checkbox>
            {error && <small className="text-red-500">{error.message}</small>}
          </FormItem>
        )}
      />
    </div>
  );
};

export default DrdCheckBox;
