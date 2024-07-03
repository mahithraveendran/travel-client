import { DatePicker } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  prefix?: any;
};

const DrdDateRangePicker = ({
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
            {/* <DatePicker.RangePicker
              {...field}
              id={name}
              size="large"
              disabled={disabled}
              prefix={prefix}
            /> */}
            <DatePicker
              {...field}
              id={name}
              size="large"
              disabled={disabled}
              prefix={prefix}
              style={{ minWidth: "150px", maxWidth: "100%", width: "100%" }}
            />
            {error && <small className="text-red-500">{error.message}</small>}
          </FormItem>
        )}
      />
    </div>
  );
};

export default DrdDateRangePicker;
