import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const DrdTextArea = ({ name, label, placeholder, required }: TInputProps) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem label={label} required={required}>
            <TextArea
              {...field}
              rows={3}
              id={name}
              size="large"
              placeholder={placeholder}
            />
            {error && <small className="text-red-500">{error.message}</small>}
          </FormItem>
        )}
      />
    </div>
  );
};

export default DrdTextArea;
